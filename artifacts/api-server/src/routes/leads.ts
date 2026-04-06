import { Router, type IRouter } from "express";
import { z } from "zod/v4";
import { db, leadsTable } from "@workspace/db";
import { logger } from "../lib/logger";

const router: IRouter = Router();

const leadSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(7, "Valid phone number is required"),
  clientType: z.enum(["residential", "business"]),
  companyName: z.string().optional().nullable(),
  numEmployees: z.number().int().positive().optional().nullable(),
  currentSetup: z.string().optional().nullable(),
  deviceType: z.string().optional().nullable(),
  issueType: z.string().optional().nullable(),
  mainProblem: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  urgency: z.enum(["low", "medium", "high"]),
  consent: z.string().min(1, "Consent is required"),
});

function escHtml(str: string | null | undefined): string {
  if (str == null) return "—";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

async function sendEmails(lead: z.infer<typeof leadSchema>, leadId: number) {
  const apiKey = process.env["RESEND_API_KEY"];
  if (!apiKey) {
    logger.warn("RESEND_API_KEY not set — skipping email notifications");
    return;
  }

  const { Resend } = await import("resend");
  const resend = new Resend(apiKey);

  const urgencyLabel = { low: "Low", medium: "Medium", high: "High" }[lead.urgency];
  const clientLabel = lead.clientType === "business" ? "Business" : "Residential";

  const adminHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #1a1a1a;">
      <div style="background: #0ea5e9; padding: 20px; border-radius: 8px 8px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 20px;">New Lead – Cloud Possible</h1>
      </div>
      <div style="background: #f8fafc; padding: 24px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; font-weight: 600; width: 40%;">Lead #</td><td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">${leadId}</td></tr>
          <tr><td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; font-weight: 600;">Client Type</td><td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">${clientLabel}</td></tr>
          <tr><td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; font-weight: 600;">Name</td><td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">${escHtml(lead.name)}</td></tr>
          <tr><td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; font-weight: 600;">Email</td><td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;"><a href="mailto:${escHtml(lead.email)}">${escHtml(lead.email)}</a></td></tr>
          <tr><td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; font-weight: 600;">Phone</td><td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">${escHtml(lead.phone)}</td></tr>
          <tr><td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; font-weight: 600;">Urgency</td><td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">${urgencyLabel}</td></tr>
          ${lead.clientType === "business" ? `
          <tr><td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; font-weight: 600;">Company</td><td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">${escHtml(lead.companyName)}</td></tr>
          <tr><td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; font-weight: 600;">Employees</td><td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">${lead.numEmployees ?? "—"}</td></tr>
          <tr><td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; font-weight: 600;">Current Setup</td><td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">${escHtml(lead.currentSetup)}</td></tr>
          <tr><td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; font-weight: 600;">Main Problem</td><td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">${escHtml(lead.mainProblem)}</td></tr>
          ` : `
          <tr><td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; font-weight: 600;">Device Type</td><td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">${escHtml(lead.deviceType)}</td></tr>
          <tr><td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; font-weight: 600;">Issue Type</td><td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">${escHtml(lead.issueType)}</td></tr>
          `}
          ${lead.description ? `<tr><td style="padding: 8px 0; font-weight: 600; vertical-align: top;">Description</td><td style="padding: 8px 0;">${escHtml(lead.description)}</td></tr>` : ""}
        </table>
      </div>
    </div>
  `;

  const userHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #1a1a1a;">
      <div style="background: #0ea5e9; padding: 20px; border-radius: 8px 8px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 20px;">We've Received Your Request</h1>
      </div>
      <div style="background: #f8fafc; padding: 24px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px;">
        <p>Hi ${escHtml(lead.name)},</p>
        <p>Thanks for reaching out to Cloud Possible. We've received your IT support request and will get back to you shortly.</p>
        <div style="background: #e0f2fe; border-left: 4px solid #0ea5e9; padding: 16px; margin: 20px 0; border-radius: 4px;">
          <p style="margin: 0; font-weight: 600;">What happens next?</p>
          <p style="margin: 8px 0 0 0;">Our team reviews every request and typically responds within 1 business hour during business hours (Mon–Fri, 9am–5pm ET).</p>
        </div>
        <p>In the meantime, you can reach us directly at <a href="mailto:info@cloudpossible.ca" style="color: #0ea5e9;">info@cloudpossible.ca</a>.</p>
        <p style="margin-top: 24px; color: #64748b; font-size: 14px;">— The Cloud Possible Team</p>
      </div>
    </div>
  `;

  try {
    await Promise.all([
      resend.emails.send({
        from: "Cloud Possible <noreply@cloudpossible.ca>",
        to: ["info@cloudpossible.ca"],
        subject: `New Lead – Cloud Possible (#${leadId})`,
        html: adminHtml,
      }),
      resend.emails.send({
        from: "Cloud Possible <noreply@cloudpossible.ca>",
        to: [lead.email],
        subject: "We've Received Your Request – Cloud Possible",
        html: userHtml,
      }),
    ]);
    logger.info({ leadId }, "Emails sent successfully");
  } catch (err) {
    logger.error({ err, leadId }, "Failed to send emails");
  }
}

router.post("/leads", async (req, res) => {
  const parsed = leadSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({
      error: "Validation failed",
      details: parsed.error.message,
    });
    return;
  }

  try {
    const [inserted] = await db
      .insert(leadsTable)
      .values({
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone,
        clientType: parsed.data.clientType,
        companyName: parsed.data.companyName ?? null,
        numEmployees: parsed.data.numEmployees ?? null,
        currentSetup: parsed.data.currentSetup ?? null,
        deviceType: parsed.data.deviceType ?? null,
        issueType: parsed.data.issueType ?? null,
        mainProblem: parsed.data.mainProblem ?? null,
        description: parsed.data.description ?? null,
        urgency: parsed.data.urgency,
        consent: parsed.data.consent,
      })
      .returning({ id: leadsTable.id });

    logger.info({ leadId: inserted.id }, "Lead saved");

    sendEmails(parsed.data, inserted.id).catch((err) =>
      logger.error({ err }, "Email send failed")
    );

    res.status(201).json({
      success: true,
      message: "Your request has been received. We will be in touch shortly.",
      id: inserted.id,
    });
  } catch (err) {
    logger.error({ err }, "Failed to save lead");
    res.status(500).json({ error: "Failed to save your request. Please try again." });
  }
});

export default router;
