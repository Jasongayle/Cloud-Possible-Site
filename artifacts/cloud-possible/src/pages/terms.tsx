import { Layout } from "@/components/layout";
import { motion } from "framer-motion";

const sections = [
  {
    title: "1. Services",
    content: [
      "Cloud Possible (a Think Jay Inc company) provides managed IT support, cloud solutions, cybersecurity services, and related technology services to small and medium-sized businesses in Ontario, Canada.",
      "The specific services provided to each client are defined in a signed Service Agreement or Statement of Work. These Terms govern the general relationship between Cloud Possible and the client.",
      "We reserve the right to modify or discontinue any service offering with reasonable notice to affected clients."
    ]
  },
  {
    title: "2. Service Plans and Billing",
    content: [
      "Services are billed on a flat monthly rate as outlined in your Service Agreement. Invoices are issued at the beginning of each billing cycle.",
      "Payment is due within 15 days of the invoice date. Late payments may result in a service interruption after 30 days past due.",
      "All prices are in Canadian dollars and do not include applicable taxes (HST). Tax will be added to invoices in accordance with Ontario tax law.",
      "Hardware, software licenses, and third-party subscriptions procured on your behalf are billed at cost plus a procurement fee as outlined in your Service Agreement."
    ]
  },
  {
    title: "3. Term and Cancellation",
    content: [
      "All plans are month-to-month unless a fixed-term agreement has been signed. Either party may terminate the service with 30 days written notice.",
      "Annual commitment plans that are cancelled early may be subject to an early termination fee equivalent to the remaining months at the monthly rate.",
      "Upon termination, we will assist with a reasonable transition period and return or transfer any client-owned assets, credentials, and documentation within 10 business days."
    ]
  },
  {
    title: "4. Client Responsibilities",
    content: [
      "You agree to provide accurate information about your environment and cooperate reasonably with our team to enable effective service delivery.",
      "You are responsible for maintaining valid software licenses for all applications in use at your organization. Cloud Possible is not liable for compliance issues arising from unlicensed software.",
      "You agree not to use Cloud Possible's services for any unlawful purpose or in a way that could damage, disable, or impair our infrastructure or that of third parties."
    ]
  },
  {
    title: "5. Service Levels",
    content: [
      "Response time targets vary by plan and are defined in your Service Agreement. We aim to acknowledge all support requests within one business hour during standard hours.",
      "While we strive for maximum uptime, Cloud Possible does not guarantee uninterrupted service. Scheduled maintenance will be communicated in advance.",
      "Service level credits, if applicable, are outlined in your individual Service Agreement and represent your sole remedy for service level failures."
    ]
  },
  {
    title: "6. Limitation of Liability",
    content: [
      "Cloud Possible's total liability to you for any claim arising under these Terms shall not exceed the total fees paid by you in the three months preceding the claim.",
      "We are not liable for indirect, incidental, special, or consequential damages including loss of revenue, loss of data, or business interruption, even if we have been advised of the possibility of such damages.",
      "We are not responsible for failures caused by factors outside our reasonable control, including internet outages, third-party service failures, power outages, or acts of nature."
    ]
  },
  {
    title: "7. Confidentiality",
    content: [
      "Both parties agree to keep confidential any non-public business information shared during the course of the service relationship.",
      "Cloud Possible will not disclose your business information, credentials, or infrastructure details to any third party without your consent, except as required by law or as necessary to deliver the services.",
      "This confidentiality obligation survives the termination of your service agreement for a period of two years."
    ]
  },
  {
    title: "8. Intellectual Property",
    content: [
      "Any custom scripts, automation tools, or documentation created specifically for your environment remain your property upon termination and will be provided to you.",
      "General tools, templates, and methodologies developed by Cloud Possible remain our intellectual property.",
      "You retain full ownership of all your data, files, and systems at all times."
    ]
  },
  {
    title: "9. Governing Law",
    content: [
      "These Terms are governed by the laws of the Province of Ontario and the federal laws of Canada applicable therein.",
      "Any dispute arising from these Terms that cannot be resolved through good-faith negotiation shall be submitted to binding arbitration in Ontario, Canada.",
      "If any provision of these Terms is found to be unenforceable, the remaining provisions will continue in full force and effect."
    ]
  },
  {
    title: "10. Changes to These Terms",
    content: [
      "We may update these Terms from time to time. We will provide at least 30 days notice of material changes to active clients via email.",
      "Continued use of our services after the effective date of updated Terms constitutes acceptance of the changes.",
      "For questions about these Terms, contact us at info@cloudpossible.ca."
    ]
  }
];

export default function Terms() {
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
            Terms of Service
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
            By engaging Cloud Possible for IT services, you agree to the following Terms of Service. Please read them carefully. If you have questions, contact us at info@cloudpossible.ca before proceeding.
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
