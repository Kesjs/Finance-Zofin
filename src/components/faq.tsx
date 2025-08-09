import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import Helmet from "react-helmet";

const faqData = [
  {
    question: "Quels types de crédits proposez-vous ?",
    answer:
      "Nous proposons une gamme complète de crédits : crédit personnel, crédit auto, crédit immobilier, crédit entreprise et rachat de crédit. Chaque solution est adaptée à vos besoins et à votre situation.",
  },
  {
    question: "Comment faire une demande de crédit en ligne ?",
    answer:
      "Cliquez sur 'Nos offres', choisissez le type de crédit souhaité et remplissez le formulaire en ligne. Après l'étude de votre dossier, vous recevrez rapidement une réponse par email.",
  },
  {
    question: "Quels documents dois-je fournir pour ma demande ?",
    answer:
      "Vous devez fournir une pièce d'identité, un justificatif de domicile, vos trois dernières fiches de paie ou justificatifs de revenus, et un RIB. Des documents complémentaires peuvent être demandés selon le type de crédit.",
  },
  {
    question: "En combien de temps vais-je recevoir une réponse ?",
    answer:
      "Après réception de votre dossier complet, vous recevrez généralement une réponse sous 48 heures ouvrables.",
  },
  {
    question: "Suis-je engagé par ma demande ?",
    answer:
      "Non, la demande de crédit en ligne est sans engagement. Vous pouvez l'annuler à tout moment avant la signature du contrat.",
  },
  {
    question: "Comment suivre l'avancement de ma demande ?",
    answer:
      "Après validation de votre dossier, vous recevrez un numéro de suivi par email. Vous pouvez également nous contacter à tout moment pour connaître l'état d'avancement.",
  },
  {
    question: "Proposez-vous des solutions pour les personnes fichées ou en situation de surendettement ?",
    answer:
      "Chaque demande fait l'objet d'une étude personnalisée. Des solutions peuvent être proposées même en cas d'incidents bancaires, sous réserve d'acceptation.",
  },
  {
    question: "Mes données sont-elles sécurisées ?",
    answer:
      "Oui, toutes vos données sont traitées de manière confidentielle et sécurisée, conformément à la réglementation sur la protection des données en vigueur au Bénin.",
  },
  {
    question: "Quels sont les frais de dossier ?",
    answer:
      "Les frais de dossier varient selon le type et le montant du crédit. Ils vous seront clairement indiqués avant toute signature.",
  },
  {
    question: "Comment contacter le service client ?",
    answer:
      "Vous pouvez nous joindre par email à contact@zofin-benin.bj ou via le formulaire de contact sur le site.",
  },
];

// JSON-LD für FAQPage SEO-Markup
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqData.map((item) => ({
    "@type": "Question",
    "name": item.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": item.answer,
    },
  })),
};

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Aufteilung in 2 Spalten
  const mid = Math.ceil(faqData.length / 2);
  const col1 = faqData.slice(0, mid);
  const col2 = faqData.slice(mid);

  const renderFaqColumn = (data: typeof faqData, offset = 0) =>
    data.map((item, idx) => (
      <motion.div
        key={idx + offset}
        initial={false}
        animate={{ backgroundColor: openIndex === idx + offset ? "#FEF9C3" : "#fff" }}
        className="rounded-xl shadow-md border border-yellow-200 mb-4"
      >
        <button
          className="w-full flex justify-between items-center px-6 py-4 text-left focus:outline-none"
          onClick={() => setOpenIndex(openIndex === idx + offset ? null : idx + offset)}
          aria-expanded={openIndex === idx + offset}
          aria-controls={`faq-panel-${idx + offset}`}
          id={`faq-question-${idx + offset}`}
        >
          <h3 className="text-lg font-semibold text-yellow-900 m-0">{item.question}</h3>
          {openIndex === idx + offset ? (
            <ChevronUp className="w-5 h-5 text-yellow-600" aria-hidden="true" />
          ) : (
            <ChevronDown className="w-5 h-5 text-yellow-600" aria-hidden="true" />
          )}
        </button>
        <AnimatePresence initial={false}>
          {openIndex === idx + offset && (
            <motion.div
              id={`faq-panel-${idx + offset}`}
              role="region"
              aria-labelledby={`faq-question-${idx + offset}`}
              initial="collapsed"
              animate="open"
              exit="collapsed"
              variants={{
                open: { height: "auto", opacity: 1 },
                collapsed: { height: 0, opacity: 0 },
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden px-6"
            >
              <p className="py-2 text-gray-700 text-base">{item.answer}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    ));

  return (
    <section id="faq" className="py-16 bg-gradient-to-b from-yellow-50 to-white">
      <Helmet>
        <title>Questions fréquentes | Zofin Bénin</title>
        <meta
          name="description"
          content="Réponses aux questions les plus fréquentes sur nos offres de crédit, les demandes et nos services au Bénin."
        />
      </Helmet>
      <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-yellow-600 mb-12">Questions fréquemment posées</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>{renderFaqColumn(col1, 0)}</div>
          <div>{renderFaqColumn(col2, col1.length)}</div>
        </div>
      </div>
    </section>
  );
}