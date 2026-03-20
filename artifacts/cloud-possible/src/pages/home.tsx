import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Shield, Server, Cloud, ChevronRight, Award, MapPin, Clock, Quote, Users, Zap, Star } from "lucide-react";
import { Layout } from "@/components/layout";

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 lg:pt-32 lg:pb-40 overflow-hidden">
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
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border/50 aspect-[4/3]">
                <img 
                  src="https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop" 
                  alt="IT Professionals working" 
                  className="w-full h-full object-cover"
                />
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
      <section className="py-24 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-primary font-semibold tracking-wide uppercase text-sm mb-3">What We Do</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Complete IT Solutions for Your Business</h3>
            <p className="text-lg text-muted-foreground">
              We provide end-to-end technology management so you never have to worry about your IT infrastructure again.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Server,
                title: "Managed IT Support",
                desc: "Proactive monitoring, unlimited remote helpdesk, and rapid on-site support to keep your team productive.",
                color: "bg-blue-50 text-blue-600 border-blue-100"
              },
              {
                icon: Cloud,
                title: "Cloud & Backup",
                desc: "Seamless Microsoft 365/Azure migrations, scalable cloud infrastructure, and automated disaster recovery.",
                color: "bg-indigo-50 text-indigo-600 border-indigo-100"
              },
              {
                icon: Shield,
                title: "Security & Protection",
                desc: "Enterprise-grade endpoint security, dark web monitoring, phishing training, and compliance management.",
                color: "bg-sky-50 text-sky-600 border-sky-100"
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
                <Link href="/services" className="inline-flex items-center text-primary font-semibold hover:text-blue-700 transition-colors">
                  Learn more <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-primary font-semibold tracking-wide uppercase text-sm mb-3">Client Stories</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Trusted by Ontario Businesses</h3>
            <p className="text-lg text-muted-foreground">
              Real results for real businesses across Ontario.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                quote: "Before Cloud Possible, we were constantly dealing with slow computers, network drops, and security worries — especially with sensitive student records. Since switching, everything just works. Our staff can focus on the kids, not the tech. Having a local team that can actually show up when needed makes all the difference.",
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

      {/* Pricing Preview */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Transparent, Predictable Pricing</h2>
            <p className="text-lg text-muted-foreground">
              Flat-rate monthly plans that scale with your business. No surprise bills.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Starter */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-border flex flex-col mt-4">
              <h4 className="text-xl font-semibold text-foreground mb-2">Starter</h4>
              <div className="flex items-baseline mb-6">
                <span className="text-4xl font-bold text-foreground">$79</span>
                <span className="text-muted-foreground ml-2">/device/mo</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {['Up to 10 devices', 'Standard business hours support', 'Basic remote monitoring', 'Managed Antivirus'].map((feat, i) => (
                  <li key={i} className="flex items-start text-muted-foreground">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mr-3" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
              <Link href="/pricing" className="w-full py-3 px-4 rounded-xl border-2 border-border text-center font-semibold hover:border-primary hover:text-primary transition-colors">
                View Details
              </Link>
            </div>

            {/* Growth - Highlighted */}
            <div className="bg-slate-900 rounded-2xl p-8 shadow-xl border border-slate-800 flex flex-col relative transform md:-translate-y-4">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-xs font-bold uppercase tracking-wider py-1 px-4 rounded-full">
                Most Popular
              </div>
              <h4 className="text-xl font-semibold text-white mb-2">Growth</h4>
              <div className="flex items-baseline mb-6">
                <span className="text-4xl font-bold text-white">$149</span>
                <span className="text-slate-400 ml-2">/device/mo</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {['Up to 25 devices', 'Priority helpdesk routing', 'Proactive remediation', 'Cloud backup included', 'Security patch management'].map((feat, i) => (
                  <li key={i} className="flex items-start text-slate-300">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mr-3" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="w-full py-3 px-4 rounded-xl bg-primary text-white text-center font-semibold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25">
                Get Started
              </Link>
            </div>

            {/* Business */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-border flex flex-col mt-4">
              <h4 className="text-xl font-semibold text-foreground mb-2">Business</h4>
              <div className="flex items-baseline mb-6">
                <span className="text-4xl font-bold text-foreground">$299</span>
                <span className="text-muted-foreground ml-2">/device/mo</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {['Up to 50 devices', '24/7 Priority Support', 'Dedicated account manager', 'Azure infrastructure management', 'Advanced compliance support'].map((feat, i) => (
                  <li key={i} className="flex items-start text-muted-foreground">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mr-3" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
              <Link href="/pricing" className="w-full py-3 px-4 rounded-xl border-2 border-border text-center font-semibold hover:border-primary hover:text-primary transition-colors">
                View Details
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Cloud Possible */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-primary font-semibold tracking-wide uppercase text-sm mb-3">Why Cloud Possible</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-6">IT support that actually shows up</h3>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                We built Cloud Possible for small businesses that are tired of waiting days for a callback, dealing with surprise invoices, or feeling like a low priority. You get a local team that knows your setup and treats your business like their own.
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
                  desc: "We're based right here in Ontario. On-site support within hours, not days — not a remote call centre.",
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
                  desc: "Month-to-month service. We earn your business every single month — not by locking you in.",
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
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] mix-blend-overlay opacity-10 bg-cover bg-center"></div>
        
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
