import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Helmet } from 'react-helmet';

export default function HowItWorks() {
  const eligibilityConditions: string[] = [
    "Avoir entre 21 et 65 ans",
    "Résider au Bénin de manière légale",
    "Avoir un revenu stable (salarié, retraité ou travailleur indépendant déclaré)",
    "Fournir les pièces justificatives requises",
    "Nous acceptons également les travailleurs indépendants et les professions libérales"
  ];

  return (
    <>
      <Helmet>
        <title>Comment ça marche ? | Zofin Bénin</title>
        <meta name="description" content="Découvrez notre processus de crédit simplifié, les montants disponibles, les taux d'intérêt et les conditions d'éligibilité. Traitement rapide et transparence des coûts." />
        <meta name="keywords" content="processus de crédit, conditions de prêt, taux d'intérêt, montant du prêt, durée de remboursement, conditions d'éligibilité Bénin" />
        <meta property="og:title" content="Comment obtenir un crédit ? | Zofin Bénin" />
        <meta property="og:description" content="Découvrez notre processus de crédit simplifié, les montants disponibles et les conditions d'éligibilité au Bénin." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://zofin-benin.bj/comment-ca-marche" />
      </Helmet>

      <section 
        className="max-w-5xl mx-auto px-4 py-16 space-y-12"
        aria-label="Kreditprozess Informationen"
      >
        <h1 className="text-4xl font-bold text-center text-yellow-600 mb-12">
          Comment ça marche ?
        </h1>

        {/* Beträge & Laufzeit */}
        <motion.article
          className="bg-yellow-50 border-l-4 border-yellow-400 shadow rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold text-yellow-700 mb-4">Montants & Durée</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Montants disponibles : de 100 000 FCFA à 50 000 000 FCFA</li>
            <li>Durée de remboursement : de 12 à 72 mois</li>
            <li>Premier versement différé possible selon le type de crédit</li>
          </ul>
        </motion.article>

        {/* Teilnahmebedingungen */}
        <motion.article
          className="bg-yellow-50 border-l-4 border-yellow-400 shadow rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold text-yellow-700 mb-4">Conditions d'éligibilité</h2>
          <ul className="space-y-3 text-gray-700">
            {eligibilityConditions.map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle className="text-yellow-600 w-5 h-5 mt-1" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.article>

        {/* Zinsen & Kosten */}
        <motion.article
          className="bg-yellow-50 border-l-4 border-yellow-400 shadow rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold text-yellow-700 mb-4">Taux & Frais</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Taux d'intérêt : à partir de 5,9% (selon le montant et la durée)</li>
            <li>Aucun frais caché</li>
            <li>Frais de dossier : 0,5% à 2,5% selon le type de crédit</li>
            <li>Assurance emprunteur incluse pour les crédits immobiliers</li>
            <li>Notre simulateur en ligne vous permet d'estimer votre mensualité</li>
          </ul>
        </motion.article>
      </section>
    </>
  );
}
