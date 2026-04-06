import { useEffect, useRef, useState } from "react";
import { Layout } from "@/components/layout";
import { motion } from "framer-motion";
import { Mail, MapPin } from "lucide-react";

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
      <section className="bg-slate-50 pt-16 pb-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-foreground mb-6"
          >
            Get in <span className="text-primary">Touch</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Need IT support or want to discuss a partnership? We're ready to help.
          </motion.p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-8">
            
            {/* Left Col: Lead Form */}
            <div className="lg:col-span-3 space-y-8">

              {/* Contact Card */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-border flex items-start gap-4">
                <Mail className="h-6 w-6 text-primary shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-foreground mb-1">Email Us Directly</h3>
                  <a href="mailto:info@cloudpossible.ca" className="text-muted-foreground hover:text-primary transition-colors">info@cloudpossible.ca</a>
                </div>
              </div>

              {/* Embedded Lead Form */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Tell Us About Your Issue</h2>
                <iframe
                  ref={iframeRef}
                  src="/lead-form/"
                  width="100%"
                  height={iframeHeight}
                  style={{ border: "none", borderRadius: "16px", display: "block", transition: "height 0.2s ease" }}
                  title="Get IT Support"
                />
              </div>
            </div>

            {/* Right Col: Calendly & Service Area */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Calendly */}
              <div className="bg-slate-900 rounded-3xl p-8 text-white flex flex-col relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
                
                <h3 className="text-2xl font-bold mb-4">Schedule a Free IT Assessment</h3>
                <p className="text-slate-300 mb-8">
                  Pick a time that works for you. We'll do a 30-minute discovery call to learn about your current setup.
                </p>

                <div className="rounded-2xl overflow-hidden min-h-[500px]">
                  <iframe
                    src="https://calendly.com/jasongayle-8d-d/30min"
                    width="100%"
                    height="500"
                    style={{ border: "none" }}
                    title="Book a Free IT Assessment"
                  />
                </div>
              </div>
              
              {/* Service Area */}
              <div className="bg-slate-50 p-8 rounded-2xl border border-border flex items-start gap-4">
                <MapPin className="h-6 w-6 text-primary shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-foreground mb-2">Service Area</h3>
                  <p className="text-muted-foreground">
                    Ontario, Canada<br />
                    Serving businesses across the GTA<br />
                    and surrounding regions
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>
    </Layout>
  );
}
