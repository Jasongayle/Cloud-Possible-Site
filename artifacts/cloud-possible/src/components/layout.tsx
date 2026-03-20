import { ReactNode, useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ArrowRight, Shield, Cloud, Server, MonitorSmartphone, Mail, MapPin, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Pricing", href: "/pricing" },
  { name: "Contact", href: "/contact" },
];

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

  // Close mobile menu on route change
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
                className="h-10 w-auto group-hover:opacity-90 transition-opacity"
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
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
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-sm pt-24 pb-6 px-4 md:hidden flex flex-col h-screen"
          >
            <nav className="flex flex-col gap-6 text-center">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-2xl font-semibold transition-colors ${
                    location === link.href ? "text-primary" : "text-foreground"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-6 border-t border-border/50">
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
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors cursor-pointer">
                  <MonitorSmartphone className="h-5 w-5 text-white" />
                </div>
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors cursor-pointer">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors cursor-pointer">
                  <Cloud className="h-5 w-5 text-white" />
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-6">Quick Links</h4>
              <ul className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="hover:text-primary transition-colors inline-flex items-center gap-2">
                      <ArrowRight className="h-3 w-3" />
                      {link.name}
                    </Link>
                  </li>
                ))}
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
                  <Phone className="h-5 w-5 text-primary shrink-0" />
                  <a href="tel:1-800-555-0199" className="hover:text-white transition-colors">1-800-555-0199</a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary shrink-0" />
                  <span>Ontario, Canada<br />Serving the GTA and beyond</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
            <p>© {new Date().getFullYear()} Cloud Possible. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
