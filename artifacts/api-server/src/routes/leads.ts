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

const EMAIL_HEADER = `
  <div style="background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%); padding: 32px 40px; border-radius: 12px 12px 0 0; text-align: center;">
    <div style="display: inline-block; background: #0ea5e9; border-radius: 10px; width: 42px; height: 42px; line-height: 42px; text-align: center; font-size: 22px; font-weight: 900; color: white; margin-bottom: 10px; font-family: Arial, sans-serif;">C</div>
    <div style="font-family: Arial, sans-serif; font-size: 20px; font-weight: 700; color: #ffffff; letter-spacing: 0.5px; margin-bottom: 2px;">Cloud Possible</div>
    <div style="font-family: Arial, sans-serif; font-size: 12px; color: #94a3b8; letter-spacing: 1px; text-transform: uppercase;">Managed IT · Ontario</div>
  </div>
`;

const EMAIL_FOOTER = `
  <div style="background: #0f172a; padding: 24px 40px; border-radius: 0 0 12px 12px; text-align: center;">
    <p style="font-family: Arial, sans-serif; font-size: 13px; color: #64748b; margin: 0 0 8px 0;">
      <a href="mailto:info@cloudpossible.ca" style="color: #0ea5e9; text-decoration: none;">info@cloudpossible.ca</a>
      &nbsp;·&nbsp;
      <a href="https://cloudpossible.ca" style="color: #0ea5e9; text-decoration: none;">cloudpossible.ca</a>
    </p>
    <p style="font-family: Arial, sans-serif; font-size: 12px; color: #334155; margin: 0;">
      © ${new Date().getFullYear()} Cloud Possible — a Think Jay Inc company · Ontario, Canada
    </p>
  </div>
`;

async function sendEmails(lead: z.infer<typeof leadSchema>, leadId: number) {
  const apiKey = process.env["RESEND_API_KEY"];
  if (!apiKey) {
    logger.warn("RESEND_API_KEY not set — skipping email notifications");
    return;
  }

  const { Resend } = await import("resend");
  const resend = new Resend(apiKey);

  const urgencyLabel = { low: "Low", medium: "Medium", high: "High" }[lead.urgency];
  const urgencyColor = { low: "#10b981", medium: "#f59e0b", high: "#ef4444" }[lead.urgency];
  const clientLabel = lead.clientType === "business" ? "Business" : "Residential";

  const row = (label: string, value: string) => `
    <tr>
      <td style="padding: 11px 16px; font-family: Arial, sans-serif; font-size: 13px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; white-space: nowrap; width: 38%; border-bottom: 1px solid #1e293b;">${label}</td>
      <td style="padding: 11px 16px; font-family: Arial, sans-serif; font-size: 14px; color: #e2e8f0; border-bottom: 1px solid #1e293b;">${value}</td>
    </tr>
  `;

  const adminHtml = `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
    <body style="margin: 0; padding: 20px; background: #060d1a; font-family: Arial, sans-serif;">
      <div style="max-width: 600px; margin: 0 auto;">
        ${EMAIL_HEADER}

        <div style="background: #0f172a; border: 1px solid #1e293b; border-top: none; padding: 28px 40px;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; padding-bottom: 16px; border-bottom: 1px solid #1e293b;">
            <div>
              <p style="margin: 0 0 4px 0; font-size: 11px; color: #64748b; text-transform: uppercase; letter-spacing: 1px;">New Lead Submission</p>
              <h2 style="margin: 0; font-size: 22px; color: #f1f5f9; font-weight: 700;">Lead #${leadId}</h2>
            </div>
            <div style="background: ${urgencyColor}22; border: 1px solid ${urgencyColor}55; border-radius: 20px; padding: 5px 14px;">
              <span style="font-size: 12px; font-weight: 700; color: ${urgencyColor}; text-transform: uppercase; letter-spacing: 0.5px;">${urgencyLabel} Priority</span>
            </div>
          </div>

          <table style="width: 100%; border-collapse: collapse; background: #0a1628; border-radius: 8px; overflow: hidden; border: 1px solid #1e293b;">
            ${row("Type", clientLabel)}
            ${row("Name", escHtml(lead.name))}
            ${row("Email", `<a href="mailto:${escHtml(lead.email)}" style="color: #0ea5e9; text-decoration: none;">${escHtml(lead.email)}</a>`)}
            ${row("Phone", `<a href="tel:${escHtml(lead.phone)}" style="color: #0ea5e9; text-decoration: none;">${escHtml(lead.phone)}</a>`)}
            ${lead.clientType === "business" ? `
              ${row("Company", escHtml(lead.companyName))}
              ${row("Employees", String(lead.numEmployees ?? "—"))}
              ${row("Current Setup", escHtml(lead.currentSetup))}
              ${row("Main Problem", escHtml(lead.mainProblem))}
            ` : `
              ${row("Device Type", escHtml(lead.deviceType))}
              ${row("Issue Type", escHtml(lead.issueType))}
            `}
            ${lead.description ? row("Description", escHtml(lead.description)) : ""}
          </table>

          <div style="margin-top: 24px; text-align: center;">
            <a href="mailto:${escHtml(lead.email)}" style="display: inline-block; background: #0ea5e9; color: white; text-decoration: none; font-weight: 700; font-size: 14px; padding: 12px 28px; border-radius: 8px; letter-spacing: 0.3px;">Reply to ${escHtml(lead.name)}</a>
          </div>
        </div>

        ${EMAIL_FOOTER}
      </div>
    </body>
    </html>
  `;

  const userHtml = `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
    <body style="margin: 0; padding: 20px; background: #060d1a; font-family: Arial, sans-serif;">
      <div style="max-width: 600px; margin: 0 auto;">
        ${EMAIL_HEADER}

        <div style="background: #0f172a; border: 1px solid #1e293b; border-top: none; padding: 36px 40px;">
          <h2 style="margin: 0 0 8px 0; font-size: 24px; font-weight: 700; color: #f1f5f9;">We've received your request.</h2>
          <p style="margin: 0 0 24px 0; font-size: 15px; color: #94a3b8; line-height: 1.6;">
            Hi ${escHtml(lead.name)}, thanks for reaching out. We've logged your request and someone from our team will be in touch shortly.
          </p>

          <div style="background: #0a1628; border: 1px solid #1e293b; border-left: 4px solid #0ea5e9; border-radius: 8px; padding: 20px 24px; margin-bottom: 28px;">
            <p style="margin: 0 0 6px 0; font-size: 13px; font-weight: 700; color: #0ea5e9; text-transform: uppercase; letter-spacing: 0.5px;">What happens next</p>
            <p style="margin: 0; font-size: 14px; color: #cbd5e1; line-height: 1.6;">Our team reviews every request and typically responds within <strong style="color: #f1f5f9;">1 business hour</strong> during business hours (Mon–Fri, 9am–5pm ET).</p>
          </div>

          <div style="background: #0a1628; border: 1px solid #1e293b; border-radius: 8px; padding: 20px 24px; margin-bottom: 28px;">
            <p style="margin: 0 0 12px 0; font-size: 13px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">Your submission</p>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 6px 0; font-size: 13px; color: #64748b; width: 40%;">Reference #</td>
                <td style="padding: 6px 0; font-size: 13px; color: #e2e8f0; font-weight: 600;">${leadId}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-size: 13px; color: #64748b;">Priority</td>
                <td style="padding: 6px 0; font-size: 13px; color: ${urgencyColor}; font-weight: 600;">${urgencyLabel}</td>
              </tr>
              ${lead.clientType === "business" && lead.companyName ? `
              <tr>
                <td style="padding: 6px 0; font-size: 13px; color: #64748b;">Company</td>
                <td style="padding: 6px 0; font-size: 13px; color: #e2e8f0;">${escHtml(lead.companyName)}</td>
              </tr>` : ""}
            </table>
          </div>

          <p style="margin: 0 0 6px 0; font-size: 14px; color: #94a3b8; line-height: 1.6;">
            Need to reach us sooner? Email us at
            <a href="mailto:info@cloudpossible.ca" style="color: #0ea5e9; text-decoration: none; font-weight: 600;">info@cloudpossible.ca</a>.
          </p>
        </div>

        ${EMAIL_FOOTER}
      </div>
    </body>
    </html>
  `;

  try {
    const [adminResult, userResult] = await Promise.all([
      resend.emails.send({
        from: "Cloud Possible <onboarding@resend.dev>",
        to: ["jasongayle@gmail.com"],
        subject: `New Lead – Cloud Possible (#${leadId})`,
        html: adminHtml,
      }),
      resend.emails.send({
        from: "Cloud Possible <onboarding@resend.dev>",
        to: [lead.email],
        subject: "We've Received Your Request – Cloud Possible",
        html: userHtml,
      }),
    ]);

    if (adminResult.error) {
      logger.error({ leadId, error: adminResult.error }, "Admin email failed");
    } else {
      logger.info({ leadId, id: adminResult.data?.id }, "Admin email sent");
    }

    if (userResult.error) {
      logger.error({ leadId, error: userResult.error }, "Confirmation email failed");
    } else {
      logger.info({ leadId, id: userResult.data?.id }, "Confirmation email sent");
    }
  } catch (err) {
    logger.error({ err, leadId }, "Email send threw an exception");
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
