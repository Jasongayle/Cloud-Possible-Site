import { useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout";
import { ArrowRight, CheckCircle2, Monitor, Wifi, Shield, HardDrive, Wrench, Database, Phone, Clock, DollarSign, MapPin } from "lucide-react";

const services = [
  {
    icon: Monitor,
    title: "Computer Tune-Up",
    price: "$69",
    startingAt: false,
    desc: "Slow PC getting you down? We clear out junk files, disable startup bloat, update drivers, and get your computer running like new.",
    includes: ["Performance optimization", "Startup program cleanup", "Driver & OS updates", "Health report included"],
    color: "bg-blue-50 text-blue-600 border-blue-100"
  },
  {
    icon: Shield,
    title: "Virus & Malware Removal",
    price: "$89",
    startingAt: false,
    desc: "Suspicious pop-ups, slow browsing, or strange behaviour? We scan, remove, and secure your device so you can use it safely again.",
    includes: ["Full malware scan & removal", "Browser cleanup", "Security software install", "Prevention tips included"],
    color: "bg-red-50 text-red-600 border-red-100"
  },
  {
    icon: Wrench,
    title: "New Device Setup",
    price: "$79",
    startingAt: true,
    desc: "Got a new laptop or desktop? We set it up properly — accounts, security, apps, printer, and transfer your files from your old device.",
    includes: ["Account & profile setup", "Essential apps installed", "File transfer from old device", "Printer & peripherals connected"],
    color: "bg-green-50 text-green-600 border-green-100"
  },
  {
    icon: Wifi,
    title: "WiFi Troubleshooting",
    price: "$69",
    startingAt: true,
    desc: "Dropped connections, weak signal, or devices that won't connect? We diagnose your home network and get everything running reliably.",
    includes: ["Router & modem check", "Signal strength testing", "Device reconnection", "Security settings review"],
    color: "bg-sky-50 text-sky-600 border-sky-100"
  },
  {
    icon: HardDrive,
    title: "Software Help",
    price: "$59",
    startingAt: true,
    desc: "Need help installing software, setting up email, or figuring out a program? We'll walk through it with you remotely or in person.",
    includes: ["Software installation", "Email account setup", "App configuration", "Basic training included"],
    color: "bg-purple-50 text-purple-600 border-purple-100"
  },
  {
    icon: Database,
    title: "Data Backup & Transfer",
    price: "$79",
    startingAt: true,
    desc: "Don't lose your photos, documents, and memories. We set up reliable backups and safely move your files wherever you need them.",
    includes: ["External or cloud backup", "File organization", "Transfer to new device", "Recovery walkthrough"],
    color: "bg-amber-50 text-amber-600 border-amber-100"
  }
];

const steps = [
  {
    icon: Phone,
    step: "1",
    title: "Get in Touch",
    desc: "Send us a message or give us a call. Tell us what's going on and we'll let you know the price before anything starts."
  },
  {
    icon: Clock,
    step: "2",
    title: "Remote Session or Visit",
    desc: "We connect remotely and fix most problems in under an hour. If we need to come to you, we'll find a time that works."
  },
  {
    icon: DollarSign,
    step: "3",
    title: "Fixed Price, Done",
    desc: "You pay what we said you'd pay. No hourly billing, no hidden charges. We'll walk you through what we did before we wrap up."
  }
];

export default function Residential() {
  useEffect(() => {
    document.title = "Residential IT Support | Cambridge, Waterloo, Brantford | Cloud Possible";

    const desc = "Affordable flat-rate computer repair and IT help for homes in Cambridge, Waterloo, Brantford, Paris, and surrounding Ontario areas. Virus removal, WiFi setup, device repair and more. Starting at $59.";

    const setMeta = (selector: string, attr: string, value: string) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr.split("=")[0], attr.split("=")[1] ?? attr);
        document.head.appendChild(el);
      }
      el.setAttribute("content", value);
    };

    setMeta('meta[name="description"]', 'name=description', desc);
    setMeta('meta[property="og:title"]', 'property=og:title', "Residential IT Support | Cambridge, Waterloo, Brantford | Cloud Possible");
    setMeta('meta[property="og:description"]', 'property=og:description', desc);
    setMeta('meta[property="og:url"]', 'property=og:url', "https://cloudpossible.ca/residential");

    return () => {
      document.title = "Cloud Possible | Managed IT Support for Ontario Small Businesses";
      setMeta('meta[name="description"]', 'name=description', "Cloud Possible provides managed IT support, cybersecurity, and cloud solutions for small businesses in Ontario. Flat-rate plans starting at $79/device/month. No long-term contracts.");
      setMeta('meta[property="og:title"]', 'property=og:title', "Cloud Possible | Managed IT Support for Ontario Small Businesses");
      setMeta('meta[property="og:description"]', 'property=og:description', "Flat-rate managed IT support, cybersecurity, and cloud solutions for small businesses across Ontario. Starting at $79/device/month. No long-term contracts.");
      setMeta('meta[property="og:url"]', 'property=og:url', "https://cloudpossible.ca/");
    };
  }, []);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative pt-20 pb-20 lg:pt-32 lg:pb-28 overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="absolute top-0 right-0 -mr-40 -mt-40 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary mb-6">
                <MapPin className="h-3.5 w-3.5 mr-2" />
                Cambridge · Waterloo · Brantford · Paris & Surrounding Areas
              </div>
              <h1 className="text-4xl lg:text-5xl font-extrabold text-foreground leading-[1.1] mb-6 tracking-tight">
                Friendly Computer Help <br className="hidden lg:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-700">
                  Right in Your Area
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl">
                Slow computer, WiFi issues, virus problems, or a new device to set up? We fix it fast with honest flat-rate pricing. No confusing jargon, no surprise bills.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-xl bg-primary text-primary-foreground font-semibold px-8 py-4 shadow-lg shadow-primary/25 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
                >
                  Book a Home Visit or Remote Session
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
              <p className="text-sm text-muted-foreground mt-3">
                Flat rates starting at <span className="font-semibold text-foreground">$59</span> &middot; Remote or in-home &middot; No hourly billing
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Service Cards */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-primary font-semibold tracking-wide uppercase text-sm mb-3">Residential Services</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Simple, Honest Pricing</h3>
            <p className="text-lg text-muted-foreground">
              Every service is a flat rate. What you see is what you pay.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-white rounded-2xl p-8 shadow-sm border border-border/50 hover:shadow-xl hover:border-primary/20 hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center border ${service.color}`}>
                    <service.icon className="h-7 w-7" />
                  </div>
                  <div className="text-right">
                    {service.startingAt && (
                      <p className="text-xs text-muted-foreground mb-0.5">Starting at</p>
                    )}
                    <span className="text-3xl font-extrabold text-foreground">{service.price}</span>
                    {!service.startingAt && (
                      <p className="text-xs text-muted-foreground">flat rate</p>
                    )}
                  </div>
                </div>
                <h4 className="text-xl font-bold text-foreground mb-2">{service.title}</h4>
                <p className="text-muted-foreground leading-relaxed mb-6 flex-1">{service.desc}</p>
                <ul className="space-y-2">
                  {service.includes.map((item, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mt-12 bg-slate-50 border border-border rounded-2xl p-6 text-center max-w-2xl mx-auto"
          >
            <p className="text-muted-foreground text-sm leading-relaxed">
              Don't see your issue listed? <Link href="/contact" className="text-primary font-semibold hover:underline">Get in touch</Link> — most repairs are covered under one of the above rates, and we'll confirm the price before we start.
            </p>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-primary font-semibold tracking-wide uppercase text-sm mb-3">How It Works</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Three steps to a fixed computer</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {steps.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-white rounded-2xl p-8 border border-border/50 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold mx-auto mb-6">
                  {s.step}
                </div>
                <s.icon className="h-6 w-6 text-primary mx-auto mb-4" />
                <h4 className="font-bold text-foreground text-lg mb-3">{s.title}</h4>
                <p className="text-muted-foreground leading-relaxed text-sm">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Area */}
      <section className="py-16 bg-white border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <MapPin className="h-8 w-8 text-primary mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-foreground mb-3">Serving Your Community</h3>
          <p className="text-muted-foreground mb-4 max-w-xl mx-auto">
            We provide residential IT support across Cambridge, Waterloo, Brantford, Paris, Kitchener, Guelph, and surrounding areas in Ontario.
          </p>
          <p className="text-sm text-slate-400">
            Cambridge · Waterloo · Kitchener · Brantford · Paris · Guelph · Ayr · Plattsville · New Hamburg · Elmira
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to get your computer fixed?</h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Send us a message with your issue and we'll get back to you quickly with a flat-rate quote.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-xl bg-white text-primary font-bold px-8 py-4 shadow-xl hover:scale-105 transition-transform duration-200"
          >
            Get in Touch
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </Layout>
  );
}
