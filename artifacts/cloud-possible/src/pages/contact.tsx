import { useState } from "react";
import { Layout } from "@/components/layout";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, CheckCircle2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  company: z.string().optional(),
  message: z.string().min(10, "Please provide a few details about your inquiry"),
});

type FormValues = z.infer<typeof formSchema>;

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const [submitError, setSubmitError] = useState<string | null>(null);

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const response = await fetch("https://formspree.io/f/xwvrzqqd", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setIsSubmitted(true);
        reset();
      } else {
        setSubmitError("Something went wrong. Please email us directly at info@cloudpossible.ca.");
      }
    } catch {
      setSubmitError("Could not send your message. Please email info@cloudpossible.ca directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
            Whether you need immediate support or want to discuss a strategic partnership, our team is ready to help.
          </motion.p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-8">
            
            {/* Left Col: Info & Form */}
            <div className="lg:col-span-3 space-y-12">
              
              {/* Contact Cards */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="bg-slate-50 p-6 rounded-2xl border border-border">
                  <Mail className="h-8 w-8 text-primary mb-4" />
                  <h3 className="font-bold text-foreground mb-1">Email Us</h3>
                  <a href="mailto:info@cloudpossible.ca" className="text-muted-foreground hover:text-primary transition-colors">info@cloudpossible.ca</a>
                </div>
                <div className="bg-slate-50 p-6 rounded-2xl border border-border">
                  <Phone className="h-8 w-8 text-primary mb-4" />
                  <h3 className="font-bold text-foreground mb-1">Call Us</h3>
                  <a href="tel:15483840922" className="text-muted-foreground hover:text-primary transition-colors">1 (548) 384-0922</a>
                </div>
              </div>

              {/* Form */}
              <div className="bg-white rounded-3xl shadow-xl border border-border/60 p-8 sm:p-10">
                <h3 className="text-2xl font-bold text-foreground mb-6">Send a Message</h3>
                
                {isSubmitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center"
                  >
                    <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                      <CheckCircle2 className="h-8 w-8 text-green-600" />
                    </div>
                    <h4 className="text-xl font-bold text-green-900 mb-2">Message Sent!</h4>
                    <p className="text-green-700">Thank you for reaching out. A team member will get back to you within 1 business day.</p>
                    <button 
                      onClick={() => setIsSubmitted(false)}
                      className="mt-6 text-sm font-semibold text-green-700 hover:text-green-800 underline"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium text-foreground">Full Name *</label>
                        <input
                          {...register("name")}
                          className={`w-full px-4 py-3 rounded-xl bg-slate-50 border focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors ${errors.name ? 'border-destructive' : 'border-border focus:border-primary'}`}
                          placeholder="John Doe"
                        />
                        {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-foreground">Work Email *</label>
                        <input
                          {...register("email")}
                          className={`w-full px-4 py-3 rounded-xl bg-slate-50 border focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors ${errors.email ? 'border-destructive' : 'border-border focus:border-primary'}`}
                          placeholder="john@company.com"
                        />
                        {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="phone" className="text-sm font-medium text-foreground">Phone Number</label>
                        <input
                          {...register("phone")}
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-border focus:bg-white focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors"
                          placeholder="(555) 123-4567"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="company" className="text-sm font-medium text-foreground">Company Name</label>
                        <input
                          {...register("company")}
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-border focus:bg-white focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors"
                          placeholder="Acme Corp"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium text-foreground">How can we help? *</label>
                      <textarea
                        {...register("message")}
                        rows={4}
                        className={`w-full px-4 py-3 rounded-xl bg-slate-50 border focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors resize-none ${errors.message ? 'border-destructive' : 'border-border focus:border-primary'}`}
                        placeholder="Tell us about your IT needs..."
                      />
                      {errors.message && <p className="text-sm text-destructive">{errors.message.message}</p>}
                    </div>

                    {submitError && (
                      <p className="text-sm text-destructive bg-red-50 border border-red-200 rounded-lg px-4 py-3">{submitError}</p>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-xl bg-primary text-white font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        "Sending..."
                      ) : (
                        <>
                          Send Message <Send className="h-5 w-5" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Right Col: Calendly & Address */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Calendly Placeholder */}
              <div className="bg-slate-900 rounded-3xl p-8 text-white h-full max-h-[600px] flex flex-col relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
                
                <h3 className="text-2xl font-bold mb-4">Schedule a Free IT Assessment</h3>
                <p className="text-slate-300 mb-8">
                  Pick a time that works for you. We'll do a 30-minute discovery call to learn about your current setup.
                </p>

                <div className="flex-1 rounded-2xl overflow-hidden min-h-[500px]">
                  <iframe
                    src="https://calendly.com/jasongayle-8d-d/30min"
                    width="100%"
                    height="100%"
                    style={{ minHeight: "500px", border: "none" }}
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
