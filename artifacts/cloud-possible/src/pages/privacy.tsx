import { Layout } from "@/components/layout";
import { motion } from "framer-motion";

const sections = [
  {
    title: "1. Information We Collect",
    content: [
      "When you fill out our contact form or book a consultation, we collect your name, email address, company name, and the details of your inquiry.",
      "When you become a client, we may collect additional business information necessary to provide IT services, including network documentation, software inventories, and account credentials stored securely.",
      "We do not collect payment information directly. Payments are processed through secure third-party providers.",
      "Our website may collect standard web analytics data (pages visited, browser type, referral source) through tools like Google Analytics. This data is anonymous and aggregated."
    ]
  },
  {
    title: "2. How We Use Your Information",
    content: [
      "To respond to your inquiries and provide the IT services you have requested.",
      "To send service-related communications such as invoices, maintenance notices, and support updates.",
      "To improve our website and services based on aggregated usage data.",
      "We do not sell, rent, or trade your personal information to third parties. Ever."
    ]
  },
  {
    title: "3. PIPEDA Compliance",
    content: [
      "Cloud Possible (a Think Jay Inc company) is committed to complying with the Personal Information Protection and Electronic Documents Act (PIPEDA) and applicable Ontario privacy legislation.",
      "You have the right to access, correct, or request deletion of your personal information at any time by contacting us at info@cloudpossible.ca.",
      "We retain personal information only as long as necessary to fulfill the purposes for which it was collected or as required by law."
    ]
  },
  {
    title: "4. Data Security",
    content: [
      "We apply the same security standards to our own data that we recommend to our clients: encrypted storage, access controls, and regular audits.",
      "Client credentials and sensitive business information are stored using industry-standard encryption and are accessible only to authorized personnel.",
      "In the unlikely event of a data breach affecting your personal information, we will notify you in accordance with applicable Canadian law."
    ]
  },
  {
    title: "5. Cookies",
    content: [
      "Our website uses essential cookies to ensure basic functionality and anonymous analytics cookies to understand how visitors use the site.",
      "You can disable cookies in your browser settings. Note that disabling cookies may affect some website functionality.",
      "We do not use cookies for advertising or tracking across third-party websites."
    ]
  },
  {
    title: "6. Third-Party Services",
    content: [
      "We use Formspree to process contact form submissions. Formspree's privacy policy governs the handling of data transmitted through our contact form.",
      "We use Calendly for scheduling. Calendly's privacy policy applies when you book a meeting through our site.",
      "Links to third-party websites are provided for your convenience. We are not responsible for the privacy practices of those sites."
    ]
  },
  {
    title: "7. Changes to This Policy",
    content: [
      "We may update this Privacy Policy from time to time. When we do, we will update the effective date at the top of this page.",
      "Continued use of our website or services after changes are posted constitutes your acceptance of the revised policy.",
      "For material changes, we will make reasonable efforts to notify active clients directly."
    ]
  },
  {
    title: "8. Contact Us",
    content: [
      "If you have any questions about this Privacy Policy or how we handle your personal information, please contact us at info@cloudpossible.ca.",
      "Cloud Possible is operated by Think Jay Inc, serving businesses across Ontario, Canada."
    ]
  }
];

export default function Privacy() {
  return (
    <Layout>
      <section className="bg-slate-50 pt-16 pb-12 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-extrabold text-foreground mb-4"
          >
            Privacy Policy
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            Effective date: January 1, 2025. Last updated: March 2025.
          </motion.p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-muted-foreground leading-relaxed mb-12 text-lg"
          >
            Cloud Possible, operated by Think Jay Inc, respects your privacy and is committed to protecting your personal information. This policy explains what information we collect, how we use it, and your rights regarding that information.
          </motion.p>

          <div className="space-y-10">
            {sections.map((section, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <h2 className="text-xl font-bold text-foreground mb-4 pb-2 border-b border-border">{section.title}</h2>
                <ul className="space-y-3">
                  {section.content.map((item, j) => (
                    <li key={j} className="text-muted-foreground leading-relaxed flex gap-3">
                      <span className="text-primary mt-1.5 shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
