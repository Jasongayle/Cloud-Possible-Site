import { useEffect, useRef, useState } from "react";
import { Layout } from "@/components/layout";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck, FileText,
  ClipboardCheck, Map, Wallet, Presentation, Github, MapPin,
} from "lucide-react";

const BOOKING_URL = "https://calendly.com/jasongayle-8d-d/30min";
const GITHUB_URL = "https://github.com/Jasongayle/Cloud-Possible-Site";

type RowState = "met" | "gap";
const CONTROLS: { id: string; q: string; state: RowState }[] = [
  { id: "CTL-01", q: "Is multi-factor authentication enforced for all user accounts?", state: "met" },
  { id: "CTL-02", q: "Is multi-factor authentication enforced for all administrative accounts?", state: "gap" },
  { id: "CTL-03", q: "Have legacy authentication protocols been disabled tenant-wide?", state: "gap" },
  { id: "CTL-04", q: "Are email forwarding rules to external domains blocked or monitored?", state: "met" },
  { id: "CTL-05", q: "Are backups immutable and recoverable within your stated objective?", state: "gap" },
  { id: "CTL-06", q: "Is privileged access reviewed on a documented schedule?", state: "gap" },
];

function ControlMatrix() {
  const ref = useRef<HTMLDivElement>(null);
  const [resolved, setResolved] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setResolved(true); return; }
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) { setResolved(true); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { setResolved(true); io.disconnect(); }
      });
    }, { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="mt-10 rounded-2xl overflow-hidden border border-border bg-white shadow-xl">
      <div className="flex items-baseline justify-between gap-3 flex-wrap bg-slate-900 text-white px-5 py-3.5">
        <strong className="text-sm">Cyber-liability application — control section</strong>
        <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Sample · abridged</span>
      </div>

      {CONTROLS.map((c, i) => {
        const met = c.state === "met";
        return (
          <div
            key={c.id}
            className="grid grid-cols-[56px_1fr_auto] max-[520px]:grid-cols-[1fr_auto] items-center gap-3 px-5 py-3.5 border-t border-border first:border-t-0"
          >
            <span className="font-mono text-[11px] text-muted-foreground tracking-wide max-[520px]:col-span-2">{c.id}</span>
            <span className="text-sm text-foreground leading-snug">{c.q}</span>
            <span
              className={`justify-self-end inline-flex items-center gap-1.5 font-mono text-[10.5px] font-semibold uppercase tracking-wider whitespace-nowrap px-2.5 py-1.5 rounded-md border transition-all duration-500 ${
                !resolved
                  ? "text-muted-foreground bg-slate-50 border-border"
                  : met
                    ? "text-emerald-700 bg-emerald-50 border-emerald-200"
                    : "text-red-600 bg-red-50 border-red-200"
              }`}
              style={{ transitionDelay: resolved ? `${i * 220}ms` : "0ms" }}
            >
              {!resolved ? "Pending" : met ? (<><CheckCircle2 className="h-3 w-3" /> Met</>) : (<><AlertTriangle className="h-3 w-3" /> Not met</>)}
            </span>
          </div>
        );
      })}

      <p className="border-t border-border bg-slate-50 px-5 py-3.5 text-sm text-muted-foreground leading-relaxed">
        <b className="text-foreground font-semibold">This is the deliverable, not a sales graphic.</b> Every line is
        answered against your actual configuration, with evidence attached. Most first assessments come back looking
        about like this.
      </p>
    </div>
  );
}

function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-3 ${className}`}>{children}</p>
  );
}

const FIT_FOR = [
  "Your cyber insurance renews in the next six months",
  "A customer sent a security questionnaire you don't know how to answer",
  "Microsoft 365 was set up years ago and nobody has audited it since",
  "You have an IT provider who runs your environment — and nobody who checks their work",
];
const REVIEWED = [
  "Identity — MFA coverage, admin accounts, legacy authentication, guest access",
  "Conditional Access — what is actually enforced versus what you believe is",
  "Email security — forwarding rules, SPF, DKIM and DMARC, phishing protection",
  "Backup, retention and recoverability of mail, files and Teams data",
  "Licensing — unassigned, duplicated and over-tiered subscriptions",
];
const DELIVERABLES = [
  { icon: FileText, title: "Security posture report", body: "Twelve pages. Every finding rated by severity, with the business consequence in plain English — not a screenshot dump of Secure Score." },
  { icon: ClipboardCheck, title: "Insurance & questionnaire control matrix", body: "Your configuration mapped line by line against what carriers and enterprise customers ask. Met, partially met, or not met, with evidence." },
  { icon: Map, title: "90-day remediation roadmap", body: "Prioritised by risk reduction per hour of effort, and costed. Yours to execute in-house, hand to your provider, or have me deliver." },
  { icon: Wallet, title: "Licensing waste analysis", body: "Where you're paying for seats and tiers you don't use. This line frequently covers a meaningful share of the engagement cost." },
  { icon: Presentation, title: "Executive readout", body: "Forty-five minutes with you and whoever else needs to hear it. Questions answered on the call, not in a follow-up invoice." },
];
const STEPS = [
  { n: "01", title: "Access", body: "You grant read-only delegated access and give me ninety minutes on a kickoff call. That is the entirety of your time commitment." },
  { n: "02", title: "Assessment", body: "Three days of analysis against Microsoft, CIS and carrier control expectations. No disruption, no configuration changes." },
  { n: "03", title: "Readout", body: "Report delivered and walked through within ten business days of access being granted. Access revoked within five days after." },
];
const CREDS = [
  { b: "Jason “Jay” Gayle", s: "Principal, Cloud Possible" },
  { b: "AZ-305", s: "Azure Solutions Architect Expert" },
  { b: "AZ-104", s: "Azure Administrator Associate" },
  { b: "SC-900", s: "Security, Compliance & Identity" },
  { b: "25 years", s: "in IT infrastructure" },
  { b: "Cambridge, Ontario", s: "Think Jay Inc. o/a Cloud Possible" },
];
const FAQS = [
  { q: "We already have an IT provider. Isn't this their job?", a: "They run your environment. I audit it. Nobody grades their own homework, and your insurer increasingly expects the review to be independent. Most of my clients keep their provider and hand them the roadmap — that's a good outcome, not an awkward one." },
  { q: "Will this disrupt our users or change anything?", a: "No. The engagement is read-only from start to finish. I request the Global Reader, Security Reader and Reports Reader roles, which cannot make changes. Your users will not know it happened." },
  { q: "Is $4,500 really the whole cost?", a: "For the scope described above, yes. There is no hourly billing and I don't issue change orders for work inside the agreed scope, regardless of the hours it takes. If something genuinely falls outside it, I tell you before doing the work rather than after." },
  { q: "What if you find something serious?", a: "If I find evidence of an active or historical compromise, I call you the same day. That situation needs incident response, which is a different engagement with different people — I will tell you that plainly rather than quietly expanding the invoice." },
  { q: "Do we have to buy the remediation from you?", a: "No, and a meaningful share of clients don't. The roadmap is written so your own team or your existing provider can execute it. You own the deliverables outright once the invoice is paid." },
  { q: "Where does our data go?", a: "Anything extracted for analysis is stored encrypted, used only for your engagement, never transmitted outside Canada, and destroyed after twenty-four months — sooner if you ask in writing." },
];

export default function Assessment() {
  useEffect(() => {
    document.title = "M365 Security Audit | Cloud Possible";
  }, []);

  return (
    <Layout>
      {/* HERO */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-14 md:pt-14 md:pb-20">
          <Eyebrow>Cambridge, Ontario · Fixed fee · No change orders</Eyebrow>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight max-w-4xl leading-[1.05]"
          >
            Your insurer wants proof. <span className="text-primary">Your customers want answers.</span>
          </motion.h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl leading-relaxed">
            An independent, read-only review of your Microsoft 365 environment that produces the evidence for both —
            in ten business days, for a price agreed before I start.
          </p>
          <p className="mt-5 font-mono text-sm text-muted-foreground">
            <b className="text-foreground">$4,500 CAD</b> &nbsp;/&nbsp; three days of work &nbsp;/&nbsp; report in ten business days
          </p>

          <ControlMatrix />

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={BOOKING_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 hover:-translate-y-0.5 transition-all"
            >
              Book 15 minutes <ArrowRight className="h-4 w-4" />
            </a>
            <span className="text-sm text-muted-foreground">No pitch deck. I'll tell you on the call whether it's worth doing.</span>
          </div>
        </div>
      </section>

      {/* SCOPE */}
      <section className="bg-slate-50 border-t border-border py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Eyebrow>Scope</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground max-w-2xl">Who this is for, and what gets looked at</h2>
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mt-10">
            <div className="bg-white rounded-2xl border border-border p-6 md:p-8">
              <p className="text-xs font-mono font-semibold uppercase tracking-widest text-foreground pb-2.5 mb-5 border-b-2 border-primary inline-block">This is for you if</p>
              <ul className="space-y-3">
                {FIT_FOR.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-[15px] text-foreground/90 leading-relaxed">
                    <span className="mt-2 h-1.5 w-1.5 rounded-sm bg-primary shrink-0" /> {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl border border-border p-6 md:p-8">
              <p className="text-xs font-mono font-semibold uppercase tracking-widest text-foreground pb-2.5 mb-5 border-b-2 border-primary inline-block">What gets reviewed</p>
              <ul className="space-y-3">
                {REVIEWED.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-[15px] text-foreground/90 leading-relaxed">
                    <span className="mt-2 h-1.5 w-1.5 rounded-sm bg-primary shrink-0" /> {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* DELIVERABLES */}
      <section className="bg-white border-t border-border py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Eyebrow>Deliverables</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">What you receive</h2>
          <div className="mt-10 divide-y divide-border border-t border-border">
            {DELIVERABLES.map((d) => (
              <div key={d.title} className="grid md:grid-cols-[minmax(0,300px)_1fr] gap-4 md:gap-10 py-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <d.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">{d.title}</h3>
                </div>
                <p className="text-[15px] text-muted-foreground leading-relaxed">{d.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS + PRICE */}
      <section className="bg-slate-900 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sky-300 mb-3">Engagement</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white max-w-2xl">Three stages. Ten business days.</h2>
          <p className="mt-4 text-slate-300 max-w-2xl">Read-only throughout. I make no change to your environment and your users notice nothing.</p>

          <div className="grid lg:grid-cols-[1.35fr_1fr] gap-10 lg:gap-14 mt-10 items-start">
            <div>
              {STEPS.map((s, i) => (
                <div key={s.n} className={`grid grid-cols-[40px_1fr] gap-4 py-5 ${i > 0 ? "border-t border-white/15" : ""}`}>
                  <span className="font-mono text-sm text-sky-300 pt-0.5">{s.n}</span>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">{s.title}</h3>
                    <p className="text-[15px] text-slate-300 leading-relaxed">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>

            <aside className="bg-white rounded-2xl p-7 md:p-8 border-l-4 border-primary">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-3">Fixed fee</p>
              <div className="flex items-end gap-1.5">
                <span className="text-5xl font-extrabold text-foreground tracking-tight leading-none">$4,500</span>
                <span className="text-sm font-semibold text-muted-foreground mb-1">CAD</span>
              </div>
              <ul className="mt-6 divide-y divide-border">
                {[
                  "50% on engagement, balance on delivery",
                  "No hourly billing and no change orders on the agreed scope",
                  "Remediation quoted separately — you're never obligated to buy it",
                  "Additional Microsoft 365 tenants $1,500 each",
                ].map((li) => (
                  <li key={li} className="text-sm text-foreground/80 py-2.5 leading-relaxed">{li}</li>
                ))}
              </ul>
              <a
                href={BOOKING_URL} target="_blank" rel="noopener noreferrer"
                className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Book 15 minutes <ArrowRight className="h-4 w-4" />
              </a>
            </aside>
          </div>
        </div>
      </section>

      {/* BIO */}
      <section className="bg-white border-t border-border py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Eyebrow>Who you're hiring</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">One architect. Not a call centre.</h2>
          <div className="grid lg:grid-cols-[1fr_1.55fr] gap-8 lg:gap-14 mt-8 items-start">
            <ul className="divide-y divide-border border-t border-border">
              {CREDS.map((c) => (
                <li key={c.b} className="py-3">
                  <p className="font-semibold text-foreground text-sm">{c.b}</p>
                  <p className="text-sm text-muted-foreground">{c.s}</p>
                </li>
              ))}
            </ul>
            <div className="space-y-4 text-[15px] text-muted-foreground leading-relaxed">
              <p>
                I spend my working life as Head of IT for a manufacturer — rebuilding identity and endpoint security on
                Zero Trust principles, and cutting cloud spend by thirty percent while doing it. I am not a salesperson
                who learned the vocabulary. I run the environments I assess.
              </p>
              <p>
                That matters for one specific reason: the person who reviews your tenant is the person who writes the
                report and the person who sits across from you at the readout. Nothing is handed to a junior and nothing
                is generated by a tool I don't understand.
              </p>
              <p>
                I publish my reference architectures publicly. If you want to see how I think before you spend anything,
                that's the fastest way — and it's free.
              </p>
              <a
                href={GITHUB_URL} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-5 py-2.5 text-sm font-semibold text-foreground hover:border-primary hover:text-primary transition-colors"
              >
                <Github className="h-4 w-4" /> Reference architectures on GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-slate-50 border-t border-border py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Eyebrow>Before you ask</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">The questions everyone asks</h2>
          <div className="mt-8 max-w-3xl border-t border-border">
            {FAQS.map((f) => (
              <details key={f.q} className="group border-b border-border">
                <summary className="cursor-pointer list-none flex items-start justify-between gap-4 py-4 font-semibold text-foreground">
                  <span>{f.q}</span>
                  <span className="text-primary text-xl leading-none shrink-0 transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="pb-5 -mt-1 text-[15px] text-muted-foreground leading-relaxed max-w-2xl">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSE */}
      <section className="bg-white border-t border-border py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ShieldCheck className="h-10 w-10 text-primary mx-auto mb-5" />
          <h2 className="text-3xl md:text-4xl font-bold text-foreground max-w-xl mx-auto">Find out before your insurer does</h2>
          <p className="mt-4 text-muted-foreground max-w-lg mx-auto">
            Fifteen minutes on the phone. If the assessment isn't the right thing for you right now, I'll say so and
            tell you what is.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={BOOKING_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 hover:-translate-y-0.5 transition-all"
            >
              Book 15 minutes <ArrowRight className="h-4 w-4" />
            </a>
            <a href="mailto:info@cloudpossible.ca" className="text-sm font-semibold text-primary hover:text-blue-700 transition-colors">
              or email info@cloudpossible.ca
            </a>
          </div>
          <p className="mt-6 text-xs text-muted-foreground inline-flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" /> Think Jay Inc. o/a Cloud Possible · Cambridge, Ontario
          </p>
        </div>
      </section>
    </Layout>
  );
}
