import { useEffect, useState } from "react";
import { Layout } from "@/components/layout";
import { motion } from "framer-motion";
import {
  CheckCircle2, ArrowRight, Server, Shield, Users,
  Zap, Bot, Lock, Home, ChevronDown, HelpCircle
} from "lucide-react";
import { Link } from "wouter";

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-slate-50 transition-colors"
      >
        <span className="font-semibold text-foreground pr-4">{q}</span>
        <ChevronDown className={`h-5 w-5 text-primary shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="px-6 pb-5 text-muted-foreground leading-relaxed border-t border-border bg-slate-50/50">
          <p className="pt-4">{a}</p>
        </div>
      )}
    </div>
  );
}

const faqs = [
  {
    q: "Are there setup or onboarding fees?",
    a: "We charge a one-time onboarding fee for managed IT plans, typically equivalent to one month of service. This covers the initial audit, deploying monitoring tools, documenting your systems, and establishing your security baseline."
  },
  {
    q: "Do you require long-term contracts?",
    a: "No. Managed IT plans run month-to-month with a 30-day cancellation notice. We believe in earning your business every month. Annual prepay discounts are available if you prefer."
  },
  {
    q: "What counts as a user?",
    a: "A user is an active team member with a managed device and a Microsoft 365 account. We manage the device and the account together. Printers, servers, and network equipment are managed as part of the environment, not billed separately per device."
  },
  {
    q: "What happens if we need someone on-site?",
    a: "Over 90% of issues are resolved remotely, usually the same business day. When an on-site visit is genuinely needed, it's available at a flat hourly rate. We always try remote resolution first."
  },
  {
    q: "Are the one-time project prices fixed?",
    a: "The listed prices are starting rates. Final pricing depends on the size and complexity of your environment. We scope every project in writing before any work begins — no surprise invoices."
  }
];

export default function Pricing() {
  useEffect(() => {
    document.title = "Pricing | Cloud Possible";
  }, []);

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-slate-50 pt-12 md:pt-20 pb-10 md:pb-16 border-b border-border relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-5"
          >
            Simple, Transparent <span className="text-primary">Pricing</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
          >
            Flat-rate plans and fixed-scope projects for Ontario small businesses. No hidden fees, no long-term lock-in.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-3 justify-center text-sm text-muted-foreground"
          >
            {["Managed IT Plans", "One-Time Business Services", "AI Configuration", "Residential Support"].map((s, i) => (
              <a key={i} href={`#${s.toLowerCase().replace(/[\s&]/g, "-").replace(/-+/g, "-")}`} className="bg-white border border-border rounded-full px-4 py-1.5 hover:border-primary hover:text-primary transition-colors">
                {s}
              </a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 1: Managed IT Plans ── */}
      <section id="managed-it-plans" className="py-12 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
              <Server className="h-4 w-4" /> Managed IT Plans
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Monthly managed IT support</h2>
            <p className="text-lg text-muted-foreground">
              All plans include helpdesk support, system monitoring, patch management, and Microsoft 365 administration. Billed per user per month.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 items-start max-w-5xl mx-auto">
            {/* Essential */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl p-8 border-2 border-border shadow-sm flex flex-col"
            >
              <div className="mb-6">
                <h3 className="text-xl font-bold text-foreground mb-1">Essential</h3>
                <p className="text-muted-foreground text-sm">Core IT support for businesses that need reliable, proactive management without complexity.</p>
              </div>
              <div className="mb-6 pb-6 border-b border-border">
                <div className="flex items-baseline gap-1">
                  <span className="text-xs text-muted-foreground">Starting at</span>
                </div>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-4xl font-extrabold text-foreground">$85</span>
                  <span className="text-muted-foreground">/user/month</span>
                </div>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {[
                  "Unlimited remote helpdesk support",
                  "Proactive device monitoring",
                  "Patch and update management",
                  "Microsoft 365 user administration",
                  "Managed antivirus and endpoint security",
                  "Monthly system health reports"
                ].map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                    <CheckCircle2 className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="w-full py-3 px-4 rounded-xl border-2 border-primary text-primary text-center font-semibold hover:bg-primary hover:text-white transition-colors">
                Book a Free IT Review
              </Link>
            </motion.div>

            {/* Secure — highlighted */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-slate-900 rounded-2xl p-8 border-2 border-slate-800 shadow-2xl flex flex-col relative lg:-translate-y-4"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-xs font-bold uppercase tracking-wider py-1 px-4 rounded-full">
                Most Popular
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-1">Secure</h3>
                <p className="text-slate-400 text-sm">Everything in Essential plus advanced cybersecurity, backup oversight, and priority response.</p>
              </div>
              <div className="mb-6 pb-6 border-b border-slate-700">
                <div className="flex items-baseline gap-1">
                  <span className="text-xs text-slate-400">Starting at</span>
                </div>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-4xl font-extrabold text-white">$125</span>
                  <span className="text-slate-400">/user/month</span>
                </div>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {[
                  "Everything in Essential",
                  "Next-gen EDR endpoint protection",
                  "Email phishing and spam filtering",
                  "Dark web credential monitoring",
                  "Cloud backup monitoring and testing",
                  "Microsoft 365 security hardening",
                  "Priority helpdesk routing",
                  "Quarterly IT strategy reviews"
                ].map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-200">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="w-full py-3 px-4 rounded-xl bg-primary text-white text-center font-semibold hover:bg-primary/90 transition-colors shadow-lg">
                Get Started
              </Link>
            </motion.div>

            {/* vIT Manager */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-2xl p-8 border-2 border-border shadow-sm flex flex-col"
            >
              <div className="mb-6">
                <h3 className="text-xl font-bold text-foreground mb-1">vIT Manager</h3>
                <p className="text-muted-foreground text-sm">A dedicated fractional IT manager for businesses that want strategic leadership, not just helpdesk support.</p>
              </div>
              <div className="mb-6 pb-6 border-b border-border">
                <div className="flex items-baseline gap-1">
                  <span className="text-xs text-muted-foreground">Starting at</span>
                </div>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-4xl font-extrabold text-foreground">$1,500</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {[
                  "Everything in Secure",
                  "Named fractional IT manager",
                  "Monthly leadership and planning sessions",
                  "IT roadmap and budget guidance",
                  "Vendor and contract negotiation",
                  "Policy and procedure development",
                  "On-site visits available"
                ].map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="w-full py-3 px-4 rounded-xl border-2 border-border text-center font-semibold hover:border-primary hover:text-primary transition-colors">
                Request a Custom Quote
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: One-Time Business Services ── */}
      <section id="one-time-business-services" className="py-12 md:py-24 bg-slate-50 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-slate-200 text-slate-700 rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
              <Zap className="h-4 w-4" /> One-Time Business Services
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Fixed-scope project work</h2>
            <p className="text-lg text-muted-foreground">
              No retainer required. These are standalone engagements with a clear scope, clear deliverable, and a starting price.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              {
                title: "IT & Security Snapshot",
                price: "$499",
                desc: "A focused assessment of your current IT environment — devices, accounts, security posture, and backup status. You receive a written report with prioritized recommendations.",
                cta: "Book an IT Review"
              },
              {
                title: "Microsoft 365 Review & Cleanup",
                price: "$750",
                desc: "We audit your Microsoft 365 tenant — licenses, user accounts, security settings, and email configuration — and fix what's out of order. Common savings: unused licenses and misconfigured security defaults.",
                cta: "Book a Review"
              },
              {
                title: "Backup & Recovery Review",
                price: "$750",
                desc: "We test and document your current backup setup, identify gaps, and verify your data is actually recoverable. Includes a written recovery time assessment.",
                cta: "Book a Review"
              },
              {
                title: "Small Business Project Work",
                price: "$1,500",
                desc: "New office setup, system migration, cloud transition, or any technology project with a defined scope. Priced per project after a brief scoping call.",
                cta: "Request a Quote"
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-white rounded-2xl p-6 border border-border shadow-sm flex flex-col hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <h4 className="text-lg font-bold text-foreground mb-2">{item.title}</h4>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-xs text-muted-foreground">Starting at</span>
                  <span className="text-2xl font-extrabold text-primary ml-1">{item.price}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-6">{item.desc}</p>
                <Link href="/contact" className="text-sm text-primary font-semibold hover:text-blue-700 transition-colors inline-flex items-center gap-1">
                  {item.cta} <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 3: AI Configuration ── */}
      <section id="ai-configuration" className="py-12 md:py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-3xl pointer-events-none -ml-40 -mt-40" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-violet-600/20 text-violet-300 border border-violet-500/30 rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
              <Bot className="h-4 w-4" /> AI Configuration & Enablement
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">AI services for small businesses</h2>
            <p className="text-lg text-slate-300">
              Structured AI adoption — the right tools, properly configured, with real guardrails for your team.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* AI Readiness Review */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col hover:bg-white/10 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center mb-6">
                <Bot className="h-6 w-6 text-violet-300" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">AI Readiness Review</h4>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-xs text-slate-400">Starting at</span>
                <span className="text-3xl font-extrabold text-white ml-1">$499</span>
              </div>
              <p className="text-slate-400 mb-6 leading-relaxed flex-1">
                A focused assessment of your Microsoft 365 setup, team workflows, and AI readiness. You receive a plain-English report with tool recommendations and a practical path forward.
              </p>
              <ul className="space-y-2 mb-8">
                {[
                  "Microsoft 365 licensing review",
                  "AI tool recommendation report",
                  "Data risk assessment",
                  "Prioritized next steps"
                ].map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                    <CheckCircle2 className="h-4 w-4 text-violet-400 shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="w-full py-3 px-4 rounded-xl border border-violet-500/50 text-violet-300 text-center font-semibold hover:bg-violet-600/20 transition-colors">
                Book a Review
              </Link>
            </motion.div>

            {/* AI Configuration Starter — highlighted */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-violet-600 rounded-2xl p-8 shadow-2xl flex flex-col relative md:-translate-y-4"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-violet-700 text-xs font-bold uppercase tracking-wider py-1 px-4 rounded-full shadow">
                Most Popular
              </div>
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-6">
                <Lock className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">AI Configuration Starter</h4>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-xs text-violet-200">Starting at</span>
                <span className="text-3xl font-extrabold text-white ml-1">$1,500</span>
              </div>
              <p className="text-violet-100 mb-6 leading-relaxed flex-1">
                Full implementation of Microsoft Copilot or ChatGPT Business with proper access controls, admin configuration, data policies, and practical team onboarding.
              </p>
              <ul className="space-y-2 mb-8">
                {[
                  "Copilot or ChatGPT Business setup",
                  "Admin and access controls",
                  "AI usage policy created",
                  "Team onboarding session",
                  "30-day follow-up check-in"
                ].map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-violet-100">
                    <CheckCircle2 className="h-4 w-4 text-white shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="w-full py-3 px-4 rounded-xl bg-white text-violet-700 text-center font-bold hover:bg-violet-50 transition-colors shadow-lg">
                Book an AI Readiness Review
              </Link>
            </motion.div>

            {/* AI Workflow Enablement */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col hover:bg-white/10 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center mb-6">
                <Users className="h-6 w-6 text-violet-300" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">AI Workflow Enablement</h4>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-xs text-slate-400">Starting at</span>
                <span className="text-3xl font-extrabold text-white ml-1">$3,000</span>
              </div>
              <p className="text-slate-400 mb-6 leading-relaxed flex-1">
                Deeper engagement for businesses that want custom AI workflows, department-specific adoption, or integration with Microsoft 365 data and tools.
              </p>
              <ul className="space-y-2 mb-8">
                {[
                  "Everything in Configuration Starter",
                  "Custom prompt library",
                  "Copilot Studio or Power Automate flows",
                  "Department-specific workflow design",
                  "Ongoing governance support"
                ].map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                    <CheckCircle2 className="h-4 w-4 text-violet-400 shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="w-full py-3 px-4 rounded-xl border border-violet-500/50 text-violet-300 text-center font-semibold hover:bg-violet-600/20 transition-colors">
                Request a Quote
              </Link>
            </motion.div>
          </div>

          <div className="text-center mt-10">
            <Link href="/ai" className="inline-flex items-center text-violet-300 hover:text-violet-200 font-semibold transition-colors">
              Learn more about our AI services <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: Residential Support ── */}
      <section id="residential-support" className="py-12 md:py-24 bg-white border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-slate-100 text-slate-600 rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
              <Home className="h-4 w-4" /> Residential Support
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Home computer and tech help</h2>
            <p className="text-lg text-muted-foreground">
              Personal tech support for home users — remote and on-site. Simple, friendly, and fairly priced.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              {
                title: "Remote Help",
                price: "From $99",
                desc: "Remote support session for any computer issue — viruses, slow performance, setup questions, account help, or software problems."
              },
              {
                title: "On-Site Home Visit",
                price: "From $149",
                desc: "We come to you. Ideal for WiFi issues, printer setup, device configuration, or anything that's easier to fix in person."
              },
              {
                title: "PC Tune-Up & Optimization",
                price: "From $199",
                desc: "Full cleanup of your Windows or Mac computer — remove bloatware, clear startup clutter, optimize performance, and update software."
              },
              {
                title: "New PC Setup & Data Transfer",
                price: "From $179",
                desc: "Set up your new computer the right way. We transfer your files, settings, and accounts so you're back up and running without the headache."
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-slate-50 rounded-2xl p-6 border border-border flex flex-col hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <h4 className="text-lg font-bold text-foreground mb-2">{item.title}</h4>
                <div className="text-2xl font-extrabold text-primary mb-4">{item.price}</div>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-6">{item.desc}</p>
                <Link href="/residential" className="text-sm text-primary font-semibold hover:text-blue-700 transition-colors inline-flex items-center gap-1">
                  Learn more <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 md:py-24 bg-slate-50 border-t border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">Common questions</h2>
            <p className="text-lg text-muted-foreground">Straightforward answers to what most businesses ask before getting started.</p>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 md:py-20 bg-slate-900 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-3xl mx-auto px-4 relative">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Not sure which plan is right?</h2>
          <p className="text-lg text-slate-300 mb-10">
            Book a free 15-minute IT review. We'll assess your situation and give you an honest recommendation — no pressure, no commitment required.
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
