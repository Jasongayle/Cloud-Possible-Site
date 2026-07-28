import { useEffect, useState } from "react";
import { Layout } from "@/components/layout";
import { motion } from "framer-motion";
import { Mail, MapPin, Clock, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

// Formspree endpoint — submissions are emailed to info@cloudpossible.ca.
// Manage the form (and confirm/verify it) at https://formspree.io
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xwvrzqqd";

type Status = "idle" | "submitting" | "success" | "error";

export default function Contact() {
  useEffect(() => {
    document.title = "Contact Us | Cloud Possible";
  }, []);

  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        const body = await res.json().catch(() => null);
        const msg =
          body?.errors?.map((err: { message: string }) => err.message).join(", ") ||
          "Something went wrong. Please email us directly at info@cloudpossible.ca.";
        setErrorMsg(msg);
        setStatus("error");
      }
    } catch {
      setErrorMsg(
        "We couldn't reach the server. Please email us directly at info@cloudpossible.ca.",
      );
      setStatus("error");
    }
  }

  const inputClass =
    "w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors";

  return (
    <Layout>
      <section className="bg-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Page heading */}
          <div className="text-center mb-10 md:mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-extrabold text-foreground mb-3"
            >
              Get in <span className="text-primary">Touch</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-muted-foreground max-w-xl mx-auto"
            >
              Need IT support or want to discuss your options? We're ready to help.
            </motion.p>
          </div>

          {/* Info cards row */}
          <div className="grid sm:grid-cols-3 gap-4 mb-10">
            <div className="bg-slate-50 rounded-2xl border border-border p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Email</p>
                <a href="mailto:info@cloudpossible.ca" className="text-sm font-medium text-foreground hover:text-primary transition-colors">info@cloudpossible.ca</a>
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl border border-border p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Response Time</p>
                <p className="text-sm font-medium text-foreground">Within 1 business hour</p>
                <p className="text-xs text-muted-foreground">Mon–Fri, 9am–5pm ET</p>
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl border border-border p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Service Area</p>
                <p className="text-sm font-medium text-foreground">Ontario, Canada</p>
                <p className="text-xs text-muted-foreground">GTA and surrounding regions</p>
              </div>
            </div>
          </div>

          {/* Form + sidebar */}
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-10">

            {/* Contact form */}
            <div className="lg:col-span-3">
              <h2 className="text-xl font-bold text-foreground mb-4">Tell us about your issue</h2>

              {status === "success" ? (
                <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 text-center">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Thanks — we've got it!</h3>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto">
                    Your message is on its way to our team. We'll get back to you within one business hour
                    during business hours (Mon–Fri, 9am–5pm ET).
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-blue-700 transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1.5">Name <span className="text-primary">*</span></label>
                      <input id="name" name="name" type="text" required autoComplete="name" className={inputClass} placeholder="Your name" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">Email <span className="text-primary">*</span></label>
                      <input id="email" name="email" type="email" required autoComplete="email" className={inputClass} placeholder="you@company.com" />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1.5">Phone</label>
                      <input id="phone" name="phone" type="tel" autoComplete="tel" className={inputClass} placeholder="(optional)" />
                    </div>
                    <div>
                      <label htmlFor="clientType" className="block text-sm font-medium text-foreground mb-1.5">I'm a <span className="text-primary">*</span></label>
                      <select id="clientType" name="clientType" required defaultValue="" className={inputClass}>
                        <option value="" disabled>Select one…</option>
                        <option value="business">Business</option>
                        <option value="residential">Home / residential</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-foreground mb-1.5">Company</label>
                      <input id="company" name="company" type="text" autoComplete="organization" className={inputClass} placeholder="(if applicable)" />
                    </div>
                    <div>
                      <label htmlFor="urgency" className="block text-sm font-medium text-foreground mb-1.5">Urgency</label>
                      <select id="urgency" name="urgency" defaultValue="medium" className={inputClass}>
                        <option value="low">Low — just exploring</option>
                        <option value="medium">Medium — soon</option>
                        <option value="high">High — need help now</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1.5">How can we help? <span className="text-primary">*</span></label>
                    <textarea id="message" name="message" required rows={5} className={inputClass} placeholder="Describe your issue or what you're looking for…" />
                  </div>

                  <label className="flex items-start gap-3 text-sm text-muted-foreground">
                    <input type="checkbox" name="consent" required className="mt-0.5 h-4 w-4 rounded border-border text-primary focus:ring-primary/30" />
                    <span>I agree to be contacted by Cloud Possible about my request.</span>
                  </label>

                  {/* Formspree helpers */}
                  <input type="hidden" name="_subject" value="New enquiry from cloudpossible.ca" />
                  <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

                  {status === "error" && (
                    <div className="flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
                      <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                      </>
                    ) : (
                      "Send message"
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-5">
              <div className="bg-slate-900 rounded-2xl p-6 text-white">
                <h3 className="font-bold text-lg mb-3">What happens after you submit?</h3>
                <ol className="space-y-4">
                  {[
                    { step: "1", text: "We review your request and assess what's needed." },
                    { step: "2", text: "You'll hear from us within 1 business hour during business hours." },
                    { step: "3", text: "We schedule a quick call or get started right away." },
                  ].map((item) => (
                    <li key={item.step} className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-xs font-bold text-primary shrink-0 mt-0.5">{item.step}</span>
                      <p className="text-sm text-slate-300 leading-relaxed">{item.text}</p>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="bg-slate-50 rounded-2xl border border-border p-6">
                <h3 className="font-bold text-foreground mb-3">Cities we serve</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Brampton · Mississauga · Caledon · Georgetown · Oakville · Milton · Kitchener · Guelph · Waterloo · Cambridge · Brantford · Paris
                </p>
              </div>

              <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6">
                <h3 className="font-bold text-foreground mb-2">Prefer email?</h3>
                <p className="text-sm text-muted-foreground mb-3">You can reach us directly and we'll respond the same business day.</p>
                <a href="mailto:info@cloudpossible.ca" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-blue-700 transition-colors">
                  <Mail className="h-4 w-4" /> info@cloudpossible.ca
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
