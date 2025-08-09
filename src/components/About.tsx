import { motion } from 'framer-motion';
import { FileText, ThumbsUp, Clock, Shield, Award, Users, TrendingUp, Star, CheckCircle2 } from 'lucide-react';
import Helmet from 'react-helmet';

export default function About() {
  const stats = [
    { number: "5000+", label: "Clients satisfaits", icon: Users },
    { number: "98%", label: "Taux de réussite", icon: TrendingUp },
    { number: "4.9/5", label: "Note moyenne", icon: Star },
    { number: "24/7", label: "Support client", icon: Shield }
  ];

  const certifications = [
    {
      title: "ISO 27001",
      description: "Certification en sécurité de l'information",
      icon: Shield
    },
    {
      title: "Agrément COB",
      description: "Agrément de la Commission de l'Organisation Bancaire du Bénin",
      icon: Award
    },
    {
      title: "Conforme RGPD",
      description: "Respect strict des règles de protection des données",
      icon: CheckCircle2
    }
  ];

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="bg-gradient-to-br from-yellow-50 via-yellow-100 to-yellow-200 py-20 text-gray-800"
      itemScope
      itemType="https://schema.org/Organization"
    >
      <Helmet>
        <title>À propos | Zofin Bénin - Votre partenaire crédit de confiance</title>
        <meta name="description" content="Depuis 2010, nous accompagnons les particuliers et les entreprises avec des solutions de financement sur mesure. Découvrez notre équipe expérimentée et nos valeurs." />
        <meta name="keywords" content="crédit, financement, crédit personnel, crédit entreprise, Bénin, Cotonou, Zofin Bénin" />
        <meta property="og:title" content="À propos de Zofin Bénin - Votre partenaire crédit de confiance" />
        <meta property="og:description" content="Solutions de crédit sur mesure depuis 2010. Traitement rapide, accompagnement personnalisé et 90% de satisfaction client." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://zofin-benin.bj/a-propos" />
      </Helmet>

      <div className="container mx-auto px-6">
        {/* Haupttitel SEO-optimiert */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 id="about-title" className="text-4xl font-bold mb-4 text-yellow-900">
            À propos de notre entreprise de financement en ligne
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Depuis 2010, notre <strong>établissement de crédit</strong> accompagne les particuliers et les entreprises avec des <strong>solutions de financement sur mesure</strong>. Notre mission : vous proposer un <strong>crédit rapide, sécurisé et adapté</strong> à vos besoins, avec un taux de satisfaction client de 90%. Découvrez notre équipe, nos valeurs et notre engagement pour votre réussite financière.
          </p>
        </motion.header>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-lg text-center transform hover:scale-105 transition-transform"
            >
              <stat.icon className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-800 mb-2">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Einführungsblock mit Teambild */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="md:flex md:items-center md:gap-12 mb-20"
        >
          <img
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80"
            alt="Photo de notre équipe de crédit et financement"
            className="w-full md:w-1/2 rounded-xl shadow-lg mb-8 md:mb-0"
            loading="lazy"
            width={900}
            height={600}
          />
          <div className="md:w-1/2">
            <h2 className="text-2xl font-semibold mb-4 text-yellow-900">
              Une équipe engagée et expérimentée à votre service
            </h2>
            <p className="text-gray-700 mb-3">
              Avec plus de <strong>35 ans d'expérience</strong> dans le secteur du crédit, nous mettons notre expertise au service de votre projet. Notre équipe vous accompagne à chaque étape pour assurer un <strong>financement rapide, fiable et personnalisé</strong>.
            </p>
            <p className="text-gray-700">
              Spécialisé dans les <strong>crédits à la consommation</strong> et les <strong>crédits professionnels</strong>, nous proposons des <strong>offres sur mesure</strong> pour tous vos besoins de financement, que ce soit pour l'achat d'un bien immobilier, d'un véhicule, des travaux de rénovation ou le développement de votre entreprise.
            </p>
          </div>
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-yellow-800 text-center mb-8">
            Nos certifications
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-lg text-center"
              >
                <cert.icon className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{cert.title}</h3>
                <p className="text-gray-600">{cert.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Kreditprozess-Schritte */}
        <section
          className="grid md:grid-cols-3 gap-10 mb-20"
          aria-label="Schritte im Kreditantragsprozess"
          itemScope
          itemType="https://schema.org/HowTo"
        >
          {[
            {
              icon: <FileText className="w-8 h-8 text-yellow-600" />,
              title: '1. Remplissez votre demande',
              desc: 'Accédez en quelques clics au formulaire de crédit en ligne. Indiquez vos informations personnelles, le montant souhaité et le type de crédit adapté à votre projet.',
            },
            {
              icon: <Clock className="w-8 h-8 text-yellow-600" />,
              title: '2. Traitement rapide',
              desc: 'Notre équipe analyse votre demande et vous donne une réponse sous 24 heures. Profitez d\'un accompagnement personnalisé et d\'une analyse gratuite de votre solvabilité.',
            },
            {
              icon: <ThumbsUp className="w-8 h-8 text-yellow-600" />,
              title: '3. Financement immédiat',
              desc: 'Dès l\'approbation de votre demande, les fonds sont rapidement débloqués. Grâce à notre solution de crédit en ligne, vous pouvez réaliser vos projets sans délai.',
            },
          ].map((step, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition"
              itemProp="step"
              itemScope
              itemType="https://schema.org/HowToStep"
            >
              <div className="mb-4" aria-hidden="true">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-yellow-800" itemProp="name">{step.title}</h3>
              <p className="text-gray-600" itemProp="text">{step.desc}</p>
            </motion.article>
          ))}
        </section>

        {/* FAQ-Block SEO */}
        <section
          className="mt-20 max-w-3xl mx-auto"
          aria-label="Häufig gestellte Fragen zu Krediten"
          itemScope
          itemType="https://schema.org/ItemList"
        >
          <h2 className="text-2xl font-bold mb-6 text-yellow-900">Questions fréquemment posées sur nos crédits</h2>
          <div className="space-y-6" itemProp="itemListElement">
            <div itemScope itemType="https://schema.org/ListItem">
              <h3 className="font-semibold text-yellow-800" itemProp="name">Quels types de crédits proposez-vous ?</h3>
              <div itemProp="description">
                <p className="text-gray-700">
                  Nous proposons des prêts personnels, des prêts immobiliers, des prêts auto et des prêts professionnels, adaptés à chaque projet et profil.
                </p>
              </div>
            </div>
            <div itemScope itemType="https://schema.org/ListItem">
              <h3 className="font-semibold text-yellow-800" itemProp="name">Combien de temps pour obtenir une réponse ?</h3>
              <div itemProp="description">
                <p className="text-gray-700">
                  Après réception de votre dossier complet, vous recevrez une réponse sous 24 heures ouvrables.
                </p>
              </div>
            </div>
            <div itemScope itemType="https://schema.org/ListItem">
              <h3 className="font-semibold text-yellow-800" itemProp="name">Sont vos procédures sécurisées ?</h3>
              <div itemProp="description">
                <p className="text-gray-700">
                  Oui, toutes vos données sont traitées de manière sécurisée et confidentielle, conformément aux réglementations en vigueur.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}