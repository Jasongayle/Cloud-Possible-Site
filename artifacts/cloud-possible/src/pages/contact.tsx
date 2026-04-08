import { useEffect, useRef, useState } from "react";
import { Layout } from "@/components/layout";
import { motion } from "framer-motion";
import { Mail, MapPin, Clock, Phone } from "lucide-react";

export default function Contact() {
  useEffect(() => {
    document.title = "Contact Us | Cloud Possible";
  }, []);

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeHeight, setIframeHeight] = useState(640);

  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.data && e.data.type === "replco:resize" && typeof e.data.height === "number") {
        setIframeHeight(e.data.height + 32);
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

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

            {/* Lead Form */}
            <div className="lg:col-span-3">
              <h2 className="text-xl font-bold text-foreground mb-4">Tell us about your issue</h2>
              <iframe
                ref={iframeRef}
                src="/lead-form/"
                width="100%"
                height={iframeHeight}
                style={{ border: "none", borderRadius: "16px", display: "block", transition: "height 0.2s ease" }}
                title="Get IT Support"
              />
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
