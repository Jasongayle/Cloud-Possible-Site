import { useEffect } from "react";
import { Layout } from "@/components/layout";
import { motion } from "framer-motion";
import {
  Server, Cloud, Shield, CheckCircle2, ArrowRight, Bot,
  BarChart2, Users, Home, ChevronRight
} from "lucide-react";
import { Link } from "wouter";

const businessServices = [
  {
    icon: Server,
    title: "Managed IT Support",
    description: "Day-to-day management of your technology so your team can stay focused on work. We handle helpdesk requests, system monitoring, hardware procurement, and vendor coordination.",
    bullets: [
      "Unlimited remote helpdesk support",
      "Proactive system monitoring",
      "Hardware and software procurement",
      "Vendor and ISP management",
      "Quarterly IT strategy reviews"
    ],
    color: "bg-blue-50 text-blue-600 border-blue-100"
  },
  {
    icon: Cloud,
    title: "Microsoft 365 Administration",
    description: "We handle the setup, configuration, and ongoing management of your Microsoft 365 environment — from user accounts and email to Teams, SharePoint, and licensing.",
    bullets: [
      "User account and license management",
      "Email configuration and migration",
      "Teams and SharePoint setup",
      "Microsoft 365 security hardening",
      "Monthly license optimization reviews"
    ],
    color: "bg-indigo-50 text-indigo-600 border-indigo-100"
  },
  {
    icon: Shield,
    title: "Cybersecurity & Endpoint Protection",
    description: "Enterprise-grade security tools and practices applied to your business — without the enterprise price tag. We protect devices, email, and user accounts from modern threats.",
    bullets: [
      "Next-gen endpoint detection and response (EDR)",
      "Email filtering and phishing protection",
      "Dark web credential monitoring",
      "Multi-factor authentication setup",
      "Security awareness training for staff"
    ],
    color: "bg-sky-50 text-sky-600 border-sky-100"
  },
  {
    icon: BarChart2,
    title: "Backup & Recovery Oversight",
    description: "We set up, monitor, and test your backups so your data is protected and recoverable. Most small businesses don't know their backups have been failing until something goes wrong.",
    bullets: [
      "Cloud backup configuration and monitoring",
      "Regular backup testing and validation",
      "Recovery time objective (RTO) planning",
      "Microsoft 365 data backup",
      "Disaster recovery documentation"
    ],
    color: "bg-emerald-50 text-emerald-600 border-emerald-100"
  },
  {
    icon: Cloud,
    title: "Cloud & IT Projects",
    description: "One-time or project-based technology work — migrations, new office setups, system upgrades, and more. Fixed scope, clear pricing, no surprise invoices.",
    bullets: [
      "Microsoft 365 and Azure migrations",
      "New business setup and onboarding",
      "Network and infrastructure upgrades",
      "IT security assessments",
      "Software transitions and integrations"
    ],
    color: "bg-cyan-50 text-cyan-600 border-cyan-100"
  },
  {
    icon: Users,
    title: "Fractional IT Manager",
    description: "A dedicated IT lead for your business without hiring a full-time employee. We attend your leadership meetings, manage your technology roadmap, and handle vendor relationships on your behalf.",
    bullets: [
      "Monthly leadership check-ins",
      "IT roadmap and budget planning",
      "Vendor negotiation and oversight",
      "Policy and procedure development",
      "Strategic technology guidance"
    ],
    color: "bg-violet-50 text-violet-600 border-violet-100"
  },
  {
    icon: Bot,
    title: "AI Configuration & Enablement",
    description: "We help small businesses choose, configure, and govern AI tools like Microsoft Copilot and ChatGPT Business so teams can work faster without creating unnecessary data or security risk.",
    bullets: [
      "AI tool selection and licensing guidance",
      "Secure admin configuration and access controls",
      "AI usage policy creation",
      "Team onboarding and practical training",
      "Ongoing governance and audit support"
    ],
    color: "bg-purple-50 text-purple-600 border-purple-100"
  }
];

export default function Services() {
  useEffect(() => {
    document.title = "IT Services for Ontario Small Businesses | Cloud Possible";
  }, []);

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-slate-900 py-14 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.04] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl pointer-events-none -mr-60 -mt-40" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6"
          >
            IT Services for<br className="hidden md:block" />
            <span className="text-primary">Ontario Small Businesses</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-300 max-w-3xl mx-auto mb-10"
          >
            From daily helpdesk support and Microsoft 365 administration to cybersecurity, AI configuration, and strategic IT leadership — we handle the technology so you can run your business.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl bg-primary text-white font-semibold px-8 py-4 shadow-lg hover:bg-primary/90 hover:-translate-y-0.5 transition-all duration-200"
            >
              Book a Free IT Review <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-xl border-2 border-white/20 text-white font-semibold px-8 py-4 hover:border-white/50 transition-all duration-200"
            >
              View Pricing
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Business Services */}
      <section className="py-12 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-primary font-semibold tracking-wide uppercase text-sm mb-3">Core Business Services</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">What we handle for your business</h3>
            <p className="text-lg text-muted-foreground">
              Every service is available as part of a managed plan or as a standalone engagement. No commitment required to get started.
            </p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {businessServices.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="bg-slate-50 rounded-2xl p-8 border border-border/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group flex flex-col"
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 border ${service.color} group-hover:scale-110 transition-transform duration-300 shrink-0`}>
                  <service.icon className="h-7 w-7" />
                </div>
                <h4 className="text-xl font-bold text-foreground mb-3">{service.title}</h4>
                <p className="text-muted-foreground mb-6 leading-relaxed flex-1">{service.description}</p>
                <ul className="space-y-2 mb-6">
                  {service.bullets.map((b, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-slate-600">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      {b}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="inline-flex items-center text-primary font-semibold hover:text-blue-700 transition-colors text-sm"
                >
                  Ask about this service <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Residential Divider */}
      <section className="py-12 md:py-20 bg-slate-50 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-muted-foreground font-semibold tracking-wide uppercase text-sm mb-3">Also Available</h2>
            <h3 className="text-3xl font-bold text-foreground mb-4">Residential Tech Support</h3>
            <p className="text-lg text-muted-foreground">
              Personal computer help for home users — same reliable service, designed for individuals and families.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 border border-border shadow-sm flex flex-col sm:flex-row gap-8 items-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center shrink-0 border border-border">
                <Home className="h-8 w-8 text-slate-500" />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h4 className="text-xl font-bold text-foreground mb-2">Residential Tech Support</h4>
                <p className="text-muted-foreground mb-4">
                  Remote and on-site help for home computers, device setup, WiFi issues, virus removal, and more. Starting from $99.
                </p>
                <Link
                  href="/residential"
                  className="inline-flex items-center text-primary font-semibold hover:text-blue-700 transition-colors"
                >
                  See residential services <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-20 bg-slate-900 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-3xl mx-auto px-4 relative">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Not sure where to start?</h2>
          <p className="text-lg text-slate-300 mb-10">
            Book a free 15-minute IT review. We'll listen to your situation and tell you honestly what would help most — no pressure, no sales pitch.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl bg-primary text-white font-semibold px-8 py-4 shadow-lg hover:bg-primary/90 hover:-translate-y-0.5 transition-all duration-200"
            >
              Book a Free IT Review <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl border-2 border-white/20 text-white font-semibold px-8 py-4 hover:border-white/50 transition-all duration-200"
            >
              Request a Custom Quote
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
