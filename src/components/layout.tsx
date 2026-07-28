import { ReactNode, useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import {
  Menu, X, ArrowRight, Shield, Cloud, Server, MonitorSmartphone, Mail, MapPin,
  Linkedin, Bot, BarChart2, Users, Home, ChevronDown
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const businessServices = [
  { name: "Managed IT Support", href: "/services", icon: Server },
  { name: "Microsoft 365 Administration", href: "/services", icon: Cloud },
  { name: "Cybersecurity & Endpoint Protection", href: "/services", icon: Shield },
  { name: "Backup & Recovery Oversight", href: "/services", icon: BarChart2 },
  { name: "Cloud & IT Projects", href: "/services", icon: Cloud },
  { name: "Fractional IT Manager", href: "/services", icon: Users },
  { name: "AI Configuration & Enablement", href: "/ai", icon: Bot },
];

const navLinks = [
  { name: "Home", href: "/" },
  { name: "M365 Security Audit", href: "/assessment" },
  { name: "AI Configuration", href: "/ai" },
  { name: "Residential", href: "/residential" },
  { name: "Pricing", href: "/pricing" },
  { name: "Contact", href: "/contact" },
];

const mobileNavLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "M365 Security Audit", href: "/assessment" },
  { name: "AI Configuration", href: "/ai" },
  { name: "Residential", href: "/residential" },
  { name: "Pricing", href: "/pricing" },
  { name: "Contact", href: "/contact" },
];

function ServicesDropdown({ location }: { location: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const isActive = location === "/services" || location === "/ai";

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary ${isActive ? "text-primary" : "text-foreground/80"}`}
      >
        Services
        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18 }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[520px] bg-white rounded-2xl shadow-2xl border border-border p-5 z-50"
          >
            <div className="mb-3 px-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Core Business Services</p>
            </div>
            <div className="grid grid-cols-2 gap-1 mb-4">
              {businessServices.map((s) => (
                <Link
                  key={s.name}
                  href={s.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <s.icon className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors leading-tight">{s.name}</span>
                </Link>
              ))}
            </div>
            <div className="border-t border-border pt-3 flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <Home className="h-4 w-4 text-muted-foreground" />
                <Link href="/residential" onClick={() => setOpen(false)} className="text-sm text-muted-foreground hover:text-primary font-medium transition-colors">
                  Residential Tech Support
                </Link>
              </div>
              <Link href="/services" onClick={() => setOpen(false)} className="text-sm text-primary font-semibold hover:text-blue-700 transition-colors inline-flex items-center gap-1">
                View all services <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Layout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Navigation */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "glass-nav py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <img
                src={`${import.meta.env.BASE_URL}cloud-possible-logo.png`}
                alt="Cloud Possible Logo"
                className="h-16 w-auto group-hover:opacity-90 transition-opacity"
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-4 lg:gap-6">
              <Link
                href="/"
                className={`text-sm font-medium transition-colors hover:text-primary ${location === "/" ? "text-primary" : "text-foreground/80"}`}
              >
                Home
              </Link>
              <ServicesDropdown location={location} />
              {navLinks.slice(1).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    location === link.href ? "text-primary" : "text-foreground/80"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:-translate-y-0.5 h-10 px-6 py-2"
              >
                Book Free Assessment
              </Link>
            </nav>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 text-foreground/80 hover:text-foreground transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-sm pt-24 pb-6 px-4 md:hidden flex flex-col h-screen overflow-y-auto"
          >
            <nav className="flex flex-col gap-1">
              {mobileNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-xl font-semibold transition-colors px-4 py-3 rounded-xl ${
                    location === link.href ? "text-primary bg-primary/5" : "text-foreground hover:bg-slate-50"
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              <div className="mx-4 mt-2 pt-4 border-t border-border/50">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 px-0">All Services</p>
                {businessServices.map((s) => (
                  <Link
                    key={s.name}
                    href={s.href}
                    className="flex items-center gap-3 py-2.5 px-0 text-base text-muted-foreground hover:text-primary transition-colors"
                  >
                    <s.icon className="h-4 w-4 text-primary shrink-0" />
                    {s.name}
                  </Link>
                ))}
              </div>

              <div className="pt-6 border-t border-border/50 mx-4 mt-2">
                <Link
                  href="/contact"
                  className="inline-flex w-full items-center justify-center rounded-xl text-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring bg-primary text-primary-foreground hover:bg-primary/90 h-14 px-8"
                >
                  Book Free Assessment
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative z-10 pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-300 py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-8">
            <div className="md:col-span-2">
              <img
                src={`${import.meta.env.BASE_URL}cloud-possible-logo.png`}
                alt="Cloud Possible Logo"
                className="h-10 w-auto mb-6 brightness-0 invert"
              />
              <p className="text-slate-400 max-w-sm mb-6 leading-relaxed">
                Reliable IT support, cloud solutions, and security for small businesses in Ontario. We manage your technology so you can manage your business.
              </p>
              <div className="flex items-center gap-4">
                <a href="https://www.linkedin.com/company/cloud-possible" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors" aria-label="LinkedIn">
                  <Linkedin className="h-5 w-5 text-white" />
                </a>
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors cursor-pointer">
                  <MonitorSmartphone className="h-5 w-5 text-white" />
                </div>
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors cursor-pointer">
                  <Shield className="h-5 w-5 text-white" />
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-6">Services</h4>
              <ul className="flex flex-col gap-3">
                {businessServices.map((s) => (
                  <li key={s.name}>
                    <Link href={s.href} className="hover:text-primary transition-colors inline-flex items-center gap-2 text-sm">
                      <ArrowRight className="h-3 w-3 shrink-0" />
                      {s.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/residential" className="hover:text-primary transition-colors inline-flex items-center gap-2 text-sm">
                    <ArrowRight className="h-3 w-3 shrink-0" />
                    Residential Tech Support
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-6">Contact Us</h4>
              <ul className="flex flex-col gap-4 text-sm">
                <li className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-primary shrink-0" />
                  <a href="mailto:info@cloudpossible.ca" className="hover:text-white transition-colors">info@cloudpossible.ca</a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>
                    Ontario, Canada<br />
                    <span className="text-slate-500 text-xs leading-relaxed">
                      Brampton · Mississauga · Caledon · Georgetown · Oakville · Milton · Kitchener · Guelph · Waterloo · Cambridge · Brantford · Paris
                    </span>
                  </span>
                </li>
              </ul>
              <div className="mt-6 flex flex-col gap-3">
                <Link href="/assessment" className="hover:text-primary transition-colors inline-flex items-center gap-2 text-sm">
                  <ArrowRight className="h-3 w-3" /> M365 Security Audit
                </Link>
                <Link href="/pricing" className="hover:text-primary transition-colors inline-flex items-center gap-2 text-sm">
                  <ArrowRight className="h-3 w-3" /> Pricing
                </Link>
                <Link href="/contact" className="hover:text-primary transition-colors inline-flex items-center gap-2 text-sm">
                  <ArrowRight className="h-3 w-3" /> Contact
                </Link>
                <Link href="/privacy" className="hover:text-primary transition-colors inline-flex items-center gap-2 text-sm">
                  <ArrowRight className="h-3 w-3" /> Privacy Policy
                </Link>
                <Link href="/terms" className="hover:text-primary transition-colors inline-flex items-center gap-2 text-sm">
                  <ArrowRight className="h-3 w-3" /> Terms of Service
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
            <p>© {new Date().getFullYear()} Cloud Possible — a <span className="text-slate-400">Think Jay Inc</span> company. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
