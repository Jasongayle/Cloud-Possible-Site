import { useEffect } from "react";
import { Layout } from "@/components/layout";
import { motion } from "framer-motion";
import { CheckCircle2, HelpCircle, X, ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function Pricing() {
  useEffect(() => {
    document.title = "Pricing Plans | Cloud Possible";
  }, []);
  const tiers = [
    {
      name: "Starter",
      price: "79",
      description: "Perfect for small teams needing essential protection and support.",
      highlight: false,
      features: [
        "Up to 10 devices",
        "Business hours support (9-5)",
        "Basic remote monitoring",
        "Managed Antivirus",
        "Monthly health reports",
        "Remote troubleshooting"
      ],
      missing: [
        "Cloud backup",
        "Proactive remediation",
        "Dedicated account manager"
      ]
    },
    {
      name: "Growth",
      price: "149",
      description: "Our most popular plan. Comprehensive coverage for growing businesses.",
      highlight: true,
      features: [
        "Up to 25 devices",
        "Priority helpdesk routing",
        "Proactive remediation & monitoring",
        "Cloud backup included (1TB)",
        "Security patch management",
        "Quarterly strategy reviews",
        "Next-gen EDR security",
        "Email spam & phishing protection"
      ],
      missing: [
        "24/7 After-hours support"
      ]
    },
    {
      name: "Business",
      price: "299",
      description: "White-glove service for complex environments and compliance needs.",
      highlight: false,
      features: [
        "Up to 50 devices",
        "24/7 Priority Support",
        "Dedicated account manager",
        "Azure infrastructure management",
        "Advanced compliance support",
        "Unlimited cloud backup",
        "On-site visits available on request",
        "Dark web monitoring",
        "Employee security training"
      ],
      missing: []
    }
  ];

  const faqs = [
    {
      q: "Are there any setup or onboarding fees?",
      a: "We typically charge a one-time onboarding fee equivalent to one month of service. This covers the comprehensive initial audit, deploying our management agents, securing your network baseline, and documenting your entire infrastructure."
    },
    {
      q: "Do you require long-term contracts?",
      a: "No. We believe in earning your business every month. All our plans are month-to-month with a 30-day cancellation notice, though we do offer discounts for annual commitments."
    },
    {
      q: "What constitutes a 'device'?",
      a: "A device is any computer (PC or Mac) or server that requires active management, monitoring, and security software. Mobile phones and basic network equipment (switches, standard routers) are monitored at no extra per-device cost."
    },
    {
      q: "What happens if we need on-site support?",
      a: "Over 90% of issues are resolved remotely, usually within the same business day. When a visit is truly needed, on-site support is available for all plans at a flat hourly rate. We always try remote resolution first."
    }
  ];

  return (
    <Layout>
      {/* Page Hero */}
      <section className="bg-slate-50 pt-20 pb-32 border-b border-border relative">
        <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-primary/5 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-6"
          >
            Simple, Transparent <span className="text-primary">Pricing</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Flat-rate monthly plans designed to align our incentives with yours: keeping your technology running flawlessly.
          </motion.p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 -mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {tiers.map((tier, i) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 + 0.2 }}
                className={`relative flex flex-col bg-white rounded-3xl p-8 border-2 ${
                  tier.highlight 
                    ? "border-primary shadow-2xl shadow-primary/10 lg:-mt-8 lg:mb-8" 
                    : "border-border shadow-lg"
                }`}
              >
                {tier.highlight && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <span className="bg-primary text-white text-sm font-bold uppercase tracking-widest py-1.5 px-5 rounded-full shadow-md">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-foreground mb-2">{tier.name}</h3>
                  <p className="text-muted-foreground h-12">{tier.description}</p>
                </div>
                
                <div className="mb-8 pb-8 border-b border-border">
                  <div className="flex items-baseline">
                    <span className="text-5xl font-extrabold text-foreground">${tier.price}</span>
                    <span className="text-muted-foreground ml-2 font-medium">/device/mo</span>
                  </div>
                </div>

                <div className="flex-1 space-y-4 mb-8">
                  {tier.features.map((feature, j) => (
                    <div key={j} className="flex items-start">
                      <CheckCircle2 className={`h-5 w-5 shrink-0 mr-3 ${tier.highlight ? 'text-primary' : 'text-slate-400'}`} />
                      <span className="text-slate-700">{feature}</span>
                    </div>
                  ))}
                  
                  {tier.missing.map((feature, j) => (
                    <div key={`m-${j}`} className="flex items-start opacity-50">
                      <X className="h-5 w-5 shrink-0 mr-3 text-slate-400" />
                      <span className="text-slate-500 line-through">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link 
                  href="/contact" 
                  className={`w-full py-4 px-6 rounded-xl text-center font-bold transition-all duration-200 ${
                    tier.highlight 
                      ? "bg-primary text-white hover:bg-primary/90 hover:shadow-lg hover:-translate-y-0.5" 
                      : "bg-slate-100 text-slate-900 hover:bg-slate-200"
                  }`}
                >
                  {tier.highlight ? "Get Started" : "Choose " + tier.name}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground">Frequently Asked Questions</h2>
          </div>
          
          <div className="space-y-8">
            {faqs.map((faq, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-slate-50 p-8 rounded-2xl border border-border"
              >
                <div className="flex gap-4">
                  <HelpCircle className="h-6 w-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h4 className="text-lg font-bold text-foreground mb-3">{faq.q}</h4>
                    <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-slate-900 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-6">Need a custom enterprise plan?</h2>
          <p className="text-lg text-slate-300 mb-8">
            Have more than 50 employees or specific compliance requirements? Let's build a tailored solution.
          </p>
          <Link 
            href="/contact" 
            className="inline-flex items-center justify-center rounded-xl bg-primary text-white font-bold px-8 py-4 hover:bg-primary/90 transition-colors"
          >
            Contact Sales <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </Layout>
  );
}
