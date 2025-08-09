/* eslint-disable @typescript-eslint/no-unused-vars */
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CreditCard, Home, DollarSign, Shield, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import CountUp from 'react-countup';
import { Users, Banknote, CheckCircle2, FileText } from 'lucide-react';
import HowItWorks from './HowItWorks';
import Helmet from 'react-helmet';

const loanServices = [
  {
    icon: CreditCard,
    title: 'Crédit Personnel',
    description:
      'Obtenez un crédit adapté à vos projets personnels, que ce soit pour des rénovations, des études ou des dépenses imprévues. Des conditions claires et un processus simplifié pour un financement rapide.',
  },
  {
    icon: Home,
    title: 'Crédit Immobilier',
    description:
      'Réalisez l\'achat de votre maison ou appartement avec notre crédit immobilier à des taux avantageux. Bénéficiez d\'une offre sur mesure avec un accompagnement expert tout au long de votre projet.',
  },
  {
    icon: DollarSign,
    title: 'Crédit Automobile',
    description:
      'Le financement de votre véhicule neuf ou d\'occasion n\'a jamais été aussi simple. Profitez d\'un crédit auto avec des mensualités adaptées à votre budget et des formalités simplifiées.',
  },
  {
    icon: Shield,
    title: 'Crédit Entreprise',
    description:
      'Soutenez le développement de votre entreprise avec notre crédit professionnel. Que vous soyez entrepreneur ou dirigeant de PME, bénéficiez d\'un financement flexible et d\'un accompagnement personnalisé.',
  },
];

export default function Services() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  // Témoignages clients
  const testimonials = [
    {
      name: 'Aïcha K.',
      feedback:
        "Grâce à ce crédit, j'ai pu acheter mon premier logement à Cotonou ! L'accompagnement a été exemplaire et les démarches très simples. Je recommande vivement.",
      avatar: 'https://randomuser.me/api/portraits/women/42.jpg',
    },
    {
      name: 'Jean D.',
      feedback:
        "J'ai obtenu mon crédit auto très rapidement et sans difficulté. Les conditions étaient excellentes, et j'ai pu acheter la voiture dont j'avais besoin pour mon entreprise de transport !",
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
      name: 'Fatou N.',
      feedback:
        "Le crédit professionnel m'a permis de développer mon commerce de tissus à Dantokpa. Un service rapide, fiable et transparent. Merci pour ce véritable coup de pouce !",
      avatar: 'https://randomuser.me/api/portraits/women/63.jpg',
    },
  ];

  const stats = [
    { label: 'Clients satisfaits', value: 3200, icon: Users },
    { label: 'Montants accordés (FCFA)', value: 82000000, icon: Banknote },
    { label: 'Taux d\'approbation (%)', value: 88, icon: CheckCircle2 },
    { label: 'Dossiers traités', value: 5420, icon: FileText },
  ];

  // Kundenbewertungen: Karussell
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 7000); // 7 Sekunden

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const goToPrev = () => {
    setTestimonialIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setTestimonialIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <section
      id="services"
      className="bg-gradient-to-br from-yellow-50 via-yellow-100 to-yellow-200 py-20 text-gray-800"
      aria-labelledby="services-heading"
    >
      <Helmet>
        <title>Nos services de crédit | Zofin - Solutions de financement sur mesure</title>
        <meta name="description" content="Découvrez nos solutions de crédit sur mesure : crédit personnel, crédit immobilier, crédit auto et crédit professionnel. Traitement rapide et accompagnement personnalisé." />
        <meta name="keywords" content="crédit, prêt personnel, crédit immobilier, crédit auto, crédit professionnel, financement, Bénin" />
        <meta property="og:title" content="Nos services de crédit | Zofin" />
        <meta property="og:description" content="Solutions de crédit sur mesure pour vos projets personnels et professionnels. Traitement rapide et conditions transparentes." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://zofin.space/services" />
      </Helmet>

      <div className="container mx-auto px-4">
        <HowItWorks />
        {/* Sektionstitel */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 id="services-heading" className="text-4xl font-bold text-gray-900 mb-4">Nos services de crédit</h2>

          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Nos services de crédit sont conçus pour s'adapter à vos besoins spécifiques, que ce soit pour financer un projet personnel, l'achat d'un bien immobilier ou le développement de votre activité professionnelle. Avec des taux compétitifs, une approche transparente et un accompagnement personnalisé, nous vous proposons des solutions rapides et flexibles pour concrétiser vos projets en toute sérénité.
          </p>
        </motion.div>

        {/* Statistiken */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center mb-16"
          role="list"
          aria-label="Statistiques de l'entreprise"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: index * 0.2,
                type: 'spring',
                stiffness: 100,
              }}
              className="bg-gradient-to-br from-yellow-50 to-white p-6 rounded-xl shadow-lg border-t-4 border-yellow-400 hover:scale-105 hover:shadow-xl transition-transform duration-300"
              role="listitem"
            >
              <h3 className="text-4xl font-bold text-yellow-600" aria-label={`${stat.label}: ${stat.value}`}>
                {inView && <CountUp end={stat.value} duration={2} />}
              </h3>
              <p className="text-lg text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Dienstleistungen */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {loanServices.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                type: 'spring',
                stiffness: 100,
              }}
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 rounded-xl shadow-lg transition-transform hover:shadow-xl"
              role="listitem"
            >
              <div className="bg-yellow-300 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto" aria-hidden="true">
                <service.icon className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">{service.title}</h3>
              <p className="text-gray-600 text-center">{service.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Kundenbewertungen - Karussell */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 px-4"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Avis clients</h2>
          <p className="text-gray-700 max-w-xl mx-auto mb-8">
            La satisfaction de nos clients est notre priorité absolue. Découvrez leurs témoignages et comment nos solutions de crédit leur ont permis de concrétiser leurs projets rapidement et en toute confiance.
          </p>

          <div className="max-w-xl mx-auto relative bg-white p-8 rounded-xl shadow-lg" role="region" aria-label="Avis clients">
            <div className="flex items-center justify-center mb-6">
              <img
                src={testimonials[testimonialIndex].avatar}
                alt={`Photo de profil de ${testimonials[testimonialIndex].name}`}
                className="w-16 h-16 rounded-full"
                loading="lazy"
                width="64"
                height="64"
              />
            </div>
            <blockquote className="text-gray-700 italic mb-4" aria-live="polite">
              "{testimonials[testimonialIndex].feedback}"
            </blockquote>
            <p className="font-semibold text-gray-900">{testimonials[testimonialIndex].name}</p>
            
            <div className="flex justify-center mt-6 space-x-4">
              <button
                onClick={goToPrev}
                className="p-2 rounded-full hover:bg-yellow-100 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500"
                aria-label="Témoignage précédent"
                tabIndex={0}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <div className="flex items-center space-x-2" role="tablist">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setTestimonialIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === testimonialIndex ? 'bg-yellow-500' : 'bg-gray-300'
                    }`}
                    aria-label={`Aller au témoignage ${index + 1}`}
                    aria-selected={index === testimonialIndex}
                    role="tab"
                    tabIndex={0}
                  />
                ))}
              </div>
              <button
                onClick={goToNext}
                className="p-2 rounded-full hover:bg-yellow-100 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500"
                aria-label="Témoignage suivant"
                tabIndex={0}
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
