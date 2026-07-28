import { useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Shield, Server, Cloud, ChevronRight, Award, MapPin, Clock, Quote, Users, Zap, Star, Bot, Lock, Lightbulb } from "lucide-react";
import { Layout } from "@/components/layout";

export default function Home() {
  useEffect(() => {
    document.title = "Cloud Possible | Managed IT Support for Ontario Small Businesses";
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-14 pb-16 lg:pt-32 lg:pb-40 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />
        <div className="absolute top-0 right-0 -mr-40 -mt-40 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary mb-6">
                <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
                IT Support for Ontario Small Businesses
              </div>
              <h1 className="text-5xl lg:text-6xl font-extrabold text-foreground leading-[1.1] mb-6 tracking-tight">
                Reliable IT Support <br className="hidden lg:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-700">
                  Without the Overhead
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                We handle your cloud migrations, cybersecurity, and daily helpdesk support so you can focus on growing your business, not fixing tech issues.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/contact" 
                  className="inline-flex items-center justify-center rounded-xl bg-primary text-primary-foreground font-semibold px-8 py-4 shadow-lg shadow-primary/25 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
                >
                  Book a Free IT Assessment
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link 
                  href="/services" 
                  className="inline-flex items-center justify-center rounded-xl bg-white border-2 border-border text-foreground font-semibold px-8 py-4 hover:border-primary hover:text-primary transition-all duration-200"
                >
                  Explore Services
                </Link>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Starting at <span className="font-semibold text-foreground">$85/user/mo</span> &middot; No long-term contracts
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              {/* Self-contained hero visual — a stylized IT-operations dashboard.
                  No external image dependency. To use a real photo instead, replace
                  this block with: <img src="/hero.jpg" alt="..." className="w-full h-full object-cover" />
                  after adding the image to /public. */}
              <div
                role="img"
                aria-label="Cloud Possible IT operations dashboard showing uptime, managed devices and threats blocked"
                className="relative rounded-2xl overflow-hidden shadow-2xl border border-border/50 aspect-[4/3] bg-gradient-to-br from-slate-900 via-slate-800 to-sky-900"
              >
                <div className="absolute inset-0 bg-grid-pattern opacity-[0.12]"></div>
                <div className="absolute -top-20 -right-16 w-72 h-72 rounded-full bg-primary/40 blur-3xl"></div>
                <div className="absolute -bottom-24 -left-10 w-72 h-72 rounded-full bg-sky-500/20 blur-3xl"></div>

                <div className="relative h-full p-6 flex flex-col justify-between">
                  {/* Window chrome */}
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-400/80"></span>
                    <span className="w-3 h-3 rounded-full bg-yellow-400/80"></span>
                    <span className="w-3 h-3 rounded-full bg-green-400/80"></span>
                    <span className="ml-3 text-xs font-medium text-slate-300">Cloud Possible · Monitoring</span>
                  </div>

                  {/* Stat cards */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="rounded-xl bg-white/5 border border-white/10 p-3 backdrop-blur-sm">
                      <Server className="h-4 w-4 text-sky-300 mb-2" />
                      <p className="text-lg font-bold text-white leading-none">99.9%</p>
                      <p className="text-[10px] text-slate-400 mt-1">Uptime</p>
                    </div>
                    <div className="rounded-xl bg-white/5 border border-white/10 p-3 backdrop-blur-sm">
                      <Cloud className="h-4 w-4 text-sky-300 mb-2" />
                      <p className="text-lg font-bold text-white leading-none">42</p>
                      <p className="text-[10px] text-slate-400 mt-1">Devices managed</p>
                    </div>
                    <div className="rounded-xl bg-white/5 border border-white/10 p-3 backdrop-blur-sm">
                      <Shield className="h-4 w-4 text-sky-300 mb-2" />
                      <p className="text-lg font-bold text-white leading-none">128</p>
                      <p className="text-[10px] text-slate-400 mt-1">Threats blocked</p>
                    </div>
                  </div>

                  {/* Mock activity chart */}
                  <div className="rounded-xl bg-white/5 border border-white/10 p-4 backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-medium text-slate-300">Network health</p>
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-green-300">
                        <CheckCircle2 className="h-3 w-3" /> All systems operational
                      </span>
                    </div>
                    <svg viewBox="0 0 320 64" className="w-full h-14" preserveAspectRatio="none" aria-hidden="true">
                      <defs>
                        <linearGradient id="heroSpark" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="rgb(56 189 248)" stopOpacity="0.35" />
                          <stop offset="100%" stopColor="rgb(56 189 248)" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path d="M0,48 L40,40 L80,44 L120,26 L160,32 L200,16 L240,22 L280,10 L320,18 L320,64 L0,64 Z" fill="url(#heroSpark)" />
                      <path d="M0,48 L40,40 L80,44 L120,26 L160,32 L200,16 L240,22 L280,10 L320,18" fill="none" stroke="rgb(56 189 248)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
              </div>
              
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-5 border border-border/50 flex items-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500 fill-mode-both">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="font-bold text-foreground">99.9% Uptime</p>
                  <p className="text-sm text-muted-foreground">Guaranteed reliability</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="bg-slate-900 py-12 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x-0 md:divide-x divide-slate-800">
            {[
              { icon: Award, title: "20+ Years", sub: "Industry Experience" },
              { icon: Cloud, title: "Azure Certified", sub: "Microsoft Partners" },
              { icon: MapPin, title: "Ontario-Based", sub: "Local Support Team" },
              { icon: Clock, title: "24/7 Support", sub: "Always Monitoring" }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center text-center px-4"
              >
                <stat.icon className="h-8 w-8 text-primary mb-3" />
                <h4 className="text-white font-bold text-lg">{stat.title}</h4>
                <p className="text-slate-400 text-sm">{stat.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 md:py-24 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-primary font-semibold tracking-wide uppercase text-sm mb-3">What We Do</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Complete IT Solutions for Your Business</h3>
            <p className="text-lg text-muted-foreground">
              We provide end-to-end technology management so you never have to worry about your IT infrastructure again.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Server,
                title: "Managed IT Support",
                desc: "Proactive monitoring and unlimited remote helpdesk to keep your team productive. Most issues resolved the same day.",
                color: "bg-blue-50 text-blue-600 border-blue-100",
                href: "/services"
              },
              {
                icon: Cloud,
                title: "Cloud & Backup",
                desc: "Seamless Microsoft 365/Azure migrations, scalable cloud infrastructure, and automated disaster recovery.",
                color: "bg-indigo-50 text-indigo-600 border-indigo-100",
                href: "/services"
              },
              {
                icon: Shield,
                title: "Security & Protection",
                desc: "Enterprise-grade endpoint security, dark web monitoring, phishing training, and compliance management.",
                color: "bg-sky-50 text-sky-600 border-sky-100",
                href: "/services"
              },
              {
                icon: Bot,
                title: "AI Configuration & Enablement",
                desc: "We help small businesses choose, configure, and govern AI tools like Microsoft Copilot and ChatGPT Business so teams can work faster without creating unnecessary data or security risk.",
                color: "bg-violet-50 text-violet-600 border-violet-100",
                href: "/ai"
              }
            ].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-sm border border-border/50 hover:shadow-xl hover:border-primary/20 hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 border ${service.color} group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="h-7 w-7" />
                </div>
                <h4 className="text-xl font-bold text-foreground mb-3">{service.title}</h4>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {service.desc}
                </p>
                <Link href={service.href} className="inline-flex items-center text-primary font-semibold hover:text-blue-700 transition-colors">
                  Learn more <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-primary font-semibold tracking-wide uppercase text-sm mb-3">Client Stories</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Trusted by Ontario Businesses</h3>
            <p className="text-lg text-muted-foreground">
              Real results for real businesses across Ontario.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "Our school website is the first impression parents get of us. Cloud Possible took over the management and security of our site completely. We no longer worry about updates, vulnerabilities, or downtime. They handle it quietly in the background so we can stay focused on education.",
                name: "Humber Land Montessori Academy",
                role: "School Administration",
                url: "https://humberlandmontessoriacademy.com/",
                initials: "HM",
                color: "bg-blue-600"
              },
              {
                quote: "Running a karate studio means I'm always focused on my students, not IT problems. Cloud Possible set up our systems, handles all our backups, and keeps everything secure. When I had an issue with our booking system on a Saturday morning, they had it fixed within the hour. Incredible service.",
                name: "Caledon Karate",
                role: "Studio Owner",
                url: "https://www.caledonkarate.ca/",
                initials: "CK",
                color: "bg-sky-600"
              },
              {
                quote: "When you're building a platform that handles people's personal finances, security is everything. Cloud Possible keeps our infrastructure locked down, our SSL and backups in order, and flags anything suspicious right away. It's one less thing to lose sleep over.",
                name: "Calmoniq",
                role: "Canadian Finance Planning Platform",
                url: "https://calmoniq.com/",
                initials: "CQ",
                color: "bg-indigo-600"
              }
            ].map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="bg-slate-50 rounded-2xl p-8 border border-border/50 flex flex-col gap-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex gap-1">
                  {[...Array(5)].map((_, s) => (
                    <Star key={s} className="h-5 w-5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <Quote className="h-8 w-8 text-primary/20" />
                <p className="text-foreground leading-relaxed flex-1">"{t.quote}"</p>
                <div className="flex items-center gap-4 pt-4 border-t border-border/50">
                  <div className={`w-12 h-12 rounded-full ${t.color} flex items-center justify-center text-white font-bold text-sm shrink-0`}>
                    {t.initials}
                  </div>
                  <div>
                    <a href={t.url} target="_blank" rel="noopener noreferrer" className="font-bold text-foreground hover:text-primary transition-colors">
                      {t.name}
                    </a>
                    <p className="text-sm text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Section */}
      <section className="py-12 md:py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-3xl pointer-events-none -ml-40 -mt-40" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-3xl pointer-events-none -mr-20 -mb-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center rounded-full border border-violet-400/30 bg-violet-400/10 px-3 py-1 text-sm font-medium text-violet-300 mb-6">
              <Bot className="h-4 w-4 mr-2" /> New Service
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Bring AI into your business the right way
            </h2>
            <p className="text-lg text-slate-300 leading-relaxed">
              AI tools can help small businesses save time, improve writing, summarize information, support research, and speed up daily work. Cloud Possible helps you choose the right business AI tools, configure access and administration, and roll them out with practical guardrails for your team.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: Lightbulb,
                title: "Choose the right AI platform",
                desc: "We assess your business needs and recommend whether Microsoft Copilot, ChatGPT Business, or another tool is the right fit — without vendor bias."
              },
              {
                icon: Lock,
                title: "Configure securely",
                desc: "Proper AI setup means controlling what data the tools can access, who has access, and how usage is logged. We handle the administration so your business stays protected."
              },
              {
                icon: Users,
                title: "Make AI useful",
                desc: "Tools don't help if your team doesn't use them well. We provide practical prompts, workflows, and guidance that fit your actual day-to-day work."
              }
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center mb-5">
                  <card.icon className="h-6 w-6 text-violet-300" />
                </div>
                <h4 className="text-lg font-bold text-white mb-3">{card.title}</h4>
                <p className="text-slate-400 leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/ai"
              className="inline-flex items-center justify-center rounded-xl bg-violet-600 text-white font-semibold px-8 py-4 shadow-lg hover:bg-violet-700 hover:-translate-y-0.5 transition-all duration-200"
            >
              Learn about AI Configuration <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Cloud Possible */}
      <section className="py-12 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-primary font-semibold tracking-wide uppercase text-sm mb-3">Why Cloud Possible</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-6">IT support that's always reachable</h3>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                We built Cloud Possible for small businesses that are tired of waiting days for a callback, dealing with surprise invoices, or feeling like a low priority. You get a dedicated remote team that knows your setup and resolves most issues the same day.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl bg-primary text-primary-foreground font-semibold px-8 py-4 shadow-lg shadow-primary/25 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
              >
                Book a Free Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  icon: MapPin,
                  title: "Local Ontario Team",
                  desc: "We're based right here in Ontario. Most issues are fixed remotely the same day. On-site visits available when truly needed.",
                  color: "bg-blue-50 text-blue-600"
                },
                {
                  icon: CheckCircle2,
                  title: "Flat Monthly Rate",
                  desc: "One predictable invoice every month. No hidden fees, no per-ticket charges, no surprises.",
                  color: "bg-green-50 text-green-600"
                },
                {
                  icon: Users,
                  title: "No Long-Term Contracts",
                  desc: "Month-to-month service. We earn your business every single month, not by locking you in.",
                  color: "bg-sky-50 text-sky-600"
                },
                {
                  icon: Zap,
                  title: "Proactive, Not Reactive",
                  desc: "We monitor your systems 24/7 and fix problems before they affect your team or your customers.",
                  color: "bg-amber-50 text-amber-600"
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="bg-slate-50 rounded-2xl p-6 border border-border/50"
                >
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${item.color}`}>
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h4 className="font-bold text-foreground mb-2">{item.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.15] mix-blend-overlay"></div>
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_25%_15%,rgba(255,255,255,0.22),transparent_45%),radial-gradient(circle_at_85%_0%,rgba(255,255,255,0.14),transparent_40%)]"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to simplify your IT?</h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Stop letting technology headaches slow down your business. Get a free, no-obligation assessment of your current IT setup.
          </p>
          <Link 
            href="/contact" 
            className="inline-flex items-center justify-center rounded-xl bg-white text-primary font-bold px-8 py-4 shadow-xl hover:scale-105 transition-transform duration-200"
          >
            Book Your Free Assessment
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </Layout>
  );
}
