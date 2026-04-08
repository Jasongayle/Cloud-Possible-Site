import { useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout";
import {
  ArrowRight, Bot, CheckCircle2, ChevronDown, Lock, Lightbulb,
  Users, FileText, Shield, Clock, DollarSign, ChevronRight
} from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    q: "Is my business data safe when using AI tools like Microsoft Copilot or ChatGPT?",
    a: "It depends on how the tool is configured. Consumer AI tools — like the free version of ChatGPT — may use your inputs to train future models. Business plans (Microsoft Copilot, ChatGPT Business/Enterprise) are designed with data isolation. We help you select the right plan and configure it so your business data stays within your tenant and is not shared externally."
  },
  {
    q: "Do we need Microsoft 365 to use Copilot?",
    a: "Yes. Microsoft Copilot for Business requires a Microsoft 365 Business plan as a base. We can help assess whether your current licensing is sufficient or recommend an upgrade path."
  },
  {
    q: "We're a small team. Is AI configuration worth the investment?",
    a: "For most businesses, yes — even with 5–20 people. The productivity gains from well-configured AI tools in areas like email drafting, meeting summaries, document review, and research often pay for the configuration cost within a few months. We focus on practical, realistic use cases, not AI for its own sake."
  },
  {
    q: "What's the difference between your AI Readiness Review and AI Configuration Starter?",
    a: "The AI Readiness Review is a focused assessment. You come away knowing which tools fit your business, what your current setup supports, and what steps are needed to get started safely. The AI Configuration Starter is the implementation — we actually set everything up, establish access controls, and train your team on practical usage."
  },
  {
    q: "Can you help us if we've already started using AI tools without any configuration?",
    a: "Yes — and this is more common than you'd expect. We start with an audit of what's currently in use, identify any data exposure risks, and then apply the right controls going forward."
  },
  {
    q: "Do you lock us into ongoing contracts?",
    a: "No. Our AI services are project-based with clear scopes and fixed starting prices. We offer optional ongoing support if you want it, but there's no long-term commitment required."
  }
];

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

export default function AI() {
  useEffect(() => {
    document.title = "AI Configuration for Small Business | Cloud Possible";
  }, []);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative pt-20 pb-28 lg:pt-32 lg:pb-36 overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-violet-600/10 rounded-full blur-3xl pointer-events-none -mr-60 -mt-40" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-3xl pointer-events-none -ml-20" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center rounded-full border border-violet-400/30 bg-violet-400/10 px-3 py-1 text-sm font-medium text-violet-300 mb-6">
              <Bot className="h-4 w-4 mr-2" /> AI Configuration & Enablement
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-6 tracking-tight">
              AI Configuration for<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-primary">
                Ontario Small Businesses
              </span>
            </h1>
            <p className="text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl mx-auto">
              Cloud Possible helps businesses adopt AI tools like Microsoft Copilot and ChatGPT Business with the right setup, controls, and practical workflows — not just an account and a guess.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl bg-violet-600 text-white font-semibold px-8 py-4 shadow-lg hover:bg-violet-700 hover:-translate-y-0.5 transition-all duration-200"
              >
                Book an AI Readiness Review <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <a
                href="#offers"
                className="inline-flex items-center justify-center rounded-xl border-2 border-white/20 text-white font-semibold px-8 py-4 hover:border-white/50 transition-all duration-200"
              >
                See Pricing
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What we help with */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-primary font-semibold tracking-wide uppercase text-sm mb-3">What We Do</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">What we help with</h3>
            <p className="text-lg text-muted-foreground">
              AI tools work best when they're properly configured, not just turned on. We handle the setup so you can focus on using them.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Lightbulb,
                title: "AI tool selection",
                desc: "We assess your current Microsoft 365 licensing, team size, and business use cases to recommend the right AI platform — Copilot, ChatGPT Business, or both.",
                color: "bg-violet-50 text-violet-600 border-violet-100"
              },
              {
                icon: Lock,
                title: "Secure configuration",
                desc: "We set up admin controls, data access policies, and usage logging so AI tools work within your security and compliance boundaries from day one.",
                color: "bg-sky-50 text-sky-600 border-sky-100"
              },
              {
                icon: Users,
                title: "Team rollout",
                desc: "We provide practical onboarding — not generic training. Your team learns prompts and workflows that apply to their actual day-to-day tasks.",
                color: "bg-blue-50 text-blue-600 border-blue-100"
              },
              {
                icon: FileText,
                title: "AI usage policy",
                desc: "We help you write a clear, plain-language AI usage policy that sets expectations for your team without being overly restrictive.",
                color: "bg-indigo-50 text-indigo-600 border-indigo-100"
              },
              {
                icon: Shield,
                title: "Data exposure review",
                desc: "If your team is already using consumer AI tools, we review what data has been shared and apply controls to reduce future risk.",
                color: "bg-emerald-50 text-emerald-600 border-emerald-100"
              },
              {
                icon: Clock,
                title: "Ongoing governance",
                desc: "AI tools evolve quickly. We monitor updates, audit usage, and adjust configurations so your setup stays appropriate as the tools change.",
                color: "bg-amber-50 text-amber-600 border-amber-100"
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-slate-50 rounded-2xl p-8 border border-border/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 border ${item.color}`}>
                  <item.icon className="h-6 w-6" />
                </div>
                <h4 className="text-lg font-bold text-foreground mb-2">{item.title}</h4>
                <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Best-fit use cases */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-primary font-semibold tracking-wide uppercase text-sm mb-3">Use Cases</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Where AI actually saves time for small businesses</h3>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Not every AI use case is worth pursuing. These are the ones that consistently deliver practical time savings for businesses with 5–50 people.
              </p>
              <div className="space-y-4">
                {[
                  "Drafting emails, proposals, and client-facing documents",
                  "Summarizing long email threads and meeting notes",
                  "Researching topics, competitors, or regulations",
                  "Creating first drafts of policies, SOPs, and job descriptions",
                  "Answering repetitive internal questions via a knowledge base",
                  "Reviewing contracts or documents for key information"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-slate-900 rounded-3xl p-10 text-white"
            >
              <h4 className="text-xl font-bold mb-6">AI tools we support</h4>
              <div className="space-y-6">
                {[
                  {
                    name: "Microsoft Copilot for Microsoft 365",
                    desc: "Best for businesses already using Outlook, Teams, Word, and Excel. Copilot works inside the apps your team already uses."
                  },
                  {
                    name: "ChatGPT Business / Enterprise",
                    desc: "Flexible AI assistant for writing, research, analysis, and custom workflows. Business and Enterprise plans keep your data out of OpenAI's training sets."
                  },
                  {
                    name: "Microsoft Copilot Studio",
                    desc: "Build internal chatbots and automations that connect to your data — without needing a developer."
                  }
                ].map((tool, i) => (
                  <div key={i} className="border-l-2 border-violet-500 pl-5">
                    <h5 className="font-semibold text-white mb-1">{tool.name}</h5>
                    <p className="text-slate-400 text-sm leading-relaxed">{tool.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Offers */}
      <section id="offers" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-primary font-semibold tracking-wide uppercase text-sm mb-3">Pricing</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Fixed-scope AI services</h3>
            <p className="text-lg text-muted-foreground">
              Clear scope, clear pricing. No retainers required to get started.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* AI Readiness Review */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl p-8 shadow-sm border border-border flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center mb-6">
                <Bot className="h-6 w-6 text-violet-600" />
              </div>
              <h4 className="text-xl font-bold text-foreground mb-2">AI Readiness Review</h4>
              <div className="flex items-baseline mb-4">
                <span className="text-sm text-muted-foreground mr-1">Starting at</span>
                <span className="text-3xl font-bold text-foreground">$499</span>
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed flex-1">
                A focused assessment of your current setup, licensing, and business needs. You'll receive a plain-English report with tool recommendations and a clear path forward.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Microsoft 365 licensing review",
                  "AI tool recommendation report",
                  "Data risk and readiness assessment",
                  "Prioritized next steps"
                ].map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="w-full py-3 px-4 rounded-xl border-2 border-primary text-primary text-center font-semibold hover:bg-primary hover:text-white transition-colors"
              >
                Book a Review
              </Link>
            </motion.div>

            {/* AI Configuration Starter — highlighted */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-slate-900 rounded-2xl p-8 shadow-xl border border-slate-800 flex flex-col relative transform md:-translate-y-4"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-violet-600 text-white text-xs font-bold uppercase tracking-wider py-1 px-4 rounded-full">
                Most Popular
              </div>
              <div className="w-12 h-12 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center mb-6">
                <Lock className="h-6 w-6 text-violet-300" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">AI Configuration Starter</h4>
              <div className="flex items-baseline mb-4">
                <span className="text-sm text-slate-400 mr-1">Starting at</span>
                <span className="text-3xl font-bold text-white">$1,500</span>
              </div>
              <p className="text-slate-300 mb-6 leading-relaxed flex-1">
                Full implementation of your chosen AI platform with proper access controls, admin configuration, data policies, and practical team onboarding.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Copilot or ChatGPT Business setup",
                  "Admin and access controls configured",
                  "AI usage policy created",
                  "Team onboarding session",
                  "30-day follow-up check-in"
                ].map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                    <CheckCircle2 className="h-4 w-4 text-violet-400 shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="w-full py-3 px-4 rounded-xl bg-violet-600 text-white text-center font-semibold hover:bg-violet-700 transition-colors shadow-lg"
              >
                Get Started
              </Link>
            </motion.div>

            {/* AI Workflow Enablement */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-sm border border-border flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mb-6">
                <DollarSign className="h-6 w-6 text-indigo-600" />
              </div>
              <h4 className="text-xl font-bold text-foreground mb-2">AI Workflow Enablement</h4>
              <div className="flex items-baseline mb-4">
                <span className="text-sm text-muted-foreground mr-1">Starting at</span>
                <span className="text-3xl font-bold text-foreground">$3,000</span>
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed flex-1">
                Deeper engagement for businesses that want custom AI workflows, department-specific adoption, or integration with existing Microsoft 365 tools and data.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Everything in Configuration Starter",
                  "Custom prompt library for your team",
                  "Copilot Studio or Power Automate flows",
                  "Department-specific workflow design",
                  "Ongoing governance support"
                ].map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="w-full py-3 px-4 rounded-xl border-2 border-border text-center font-semibold hover:border-primary hover:text-primary transition-colors"
              >
                Request a Quote
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-primary font-semibold tracking-wide uppercase text-sm mb-3">FAQ</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Common questions</h3>
            <p className="text-lg text-muted-foreground">
              Straightforward answers about AI tools and how we help businesses use them properly.
            </p>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center rounded-full border border-violet-400/30 bg-violet-400/10 px-3 py-1 text-sm font-medium text-violet-300 mb-6">
              <Bot className="h-4 w-4 mr-2" /> Get Started
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Book an AI Readiness Review
            </h2>
            <p className="text-lg text-slate-300 mb-10 leading-relaxed">
              In one focused session, we'll review your current Microsoft 365 setup, identify which AI tools fit your business, and give you a clear, practical plan to move forward — without the guesswork.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl bg-violet-600 text-white font-semibold px-8 py-4 shadow-lg hover:bg-violet-700 hover:-translate-y-0.5 transition-all duration-200"
              >
                Book an AI Readiness Review <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl border-2 border-white/20 text-white font-semibold px-8 py-4 hover:border-white/50 transition-all duration-200"
              >
                Ask a Question
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
