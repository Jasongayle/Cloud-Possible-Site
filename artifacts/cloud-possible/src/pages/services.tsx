import { Layout } from "@/components/layout";
import { motion } from "framer-motion";
import { Server, Cloud, Shield, CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function Services() {
  const services = [
    {
      id: "managed-it",
      icon: Server,
      title: "Managed IT Support",
      description: "Comprehensive day-to-day management of your technology infrastructure. We act as your entire IT department for a fraction of the cost of hiring internally.",
      benefits: [
        "Unlimited remote helpdesk support (on-site available when needed)",
        "24/7 proactive system monitoring",
        "Hardware and software procurement",
        "Vendor management (we talk to your ISPs and software reps)",
        "Quarterly IT strategy reviews"
      ],
      image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: "cloud-backup",
      icon: Cloud,
      title: "Cloud & Backup Solutions",
      description: "Modernize your workflow by moving to the cloud securely. We ensure your data is accessible anywhere, fully backed up, and protected from disasters.",
      benefits: [
        "Microsoft 365 and Google Workspace migrations",
        "Azure infrastructure setup and management",
        "Automated daily encrypted backups",
        "Disaster recovery planning and testing",
        "Secure remote access / VPN solutions"
      ],
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
    },
    {
      id: "security",
      icon: Shield,
      title: "Security & Protection",
      description: "Cyber threats are evolving rapidly. Our enterprise-grade security stack protects small businesses against ransomware, phishing, and data breaches.",
      benefits: [
        "Next-generation Endpoint Detection and Response (EDR)",
        "Email filtering and phishing protection",
        "Dark web credential monitoring",
        "Employee security awareness training",
        "Compliance support (HIPAA, PIPEDA, SOC2)"
      ],
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop"
    }
  ];

  return (
    <Layout>
      {/* Page Hero */}
      <section className="bg-slate-900 py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6"
          >
            Comprehensive IT Services <br className="hidden md:block" />
            <span className="text-primary">for Ontario Businesses</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-300 max-w-3xl mx-auto"
          >
            From daily helpdesk support to advanced cybersecurity and cloud migrations, we provide the enterprise-level technology management your small business needs to thrive.
          </motion.p>
        </div>
      </section>

      {/* Services Detailed */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-32">
            {services.map((service, index) => (
              <motion.div 
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
                className={`flex flex-col lg:flex-row gap-12 lg:gap-20 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
              >
                {/* Image Side */}
                <div className="w-full lg:w-1/2 relative">
                  <div className="absolute inset-0 bg-primary/10 rounded-3xl transform translate-x-4 translate-y-4 -z-10"></div>
                  <div className="rounded-3xl overflow-hidden shadow-2xl border border-border aspect-[4/3]">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Content Side */}
                <div className="w-full lg:w-1/2">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 border border-primary/20">
                    <service.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">{service.title}</h2>
                  <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="bg-slate-50 rounded-2xl p-8 border border-border mb-8">
                    <h3 className="font-semibold text-foreground mb-4">Key Benefits Include:</h3>
                    <ul className="space-y-4">
                      {service.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mr-3" />
                          <span className="text-slate-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link 
                    href="/contact" 
                    className="inline-flex items-center text-primary font-semibold hover:text-blue-700 transition-colors text-lg"
                  >
                    Discuss this service <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mini CTA */}
      <section className="bg-slate-50 py-20 border-t border-border">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">Not sure what you need?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Every business is unique. We offer a free, comprehensive IT assessment to identify your risks, inefficiencies, and opportunities for improvement.
          </p>
          <Link 
            href="/contact" 
            className="inline-flex items-center justify-center rounded-xl bg-primary text-white font-bold px-8 py-4 shadow-lg shadow-primary/25 hover:shadow-xl hover:-translate-y-0.5 transition-all"
          >
            Get a Custom Assessment
          </Link>
        </div>
      </section>
    </Layout>
  );
}
