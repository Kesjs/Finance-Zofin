import { useState, useEffect } from 'react';
import { ArrowRight, CreditCard, Home, DollarSign, Shield, Info, TrendingUp, Calendar, Euro, X } from 'lucide-react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const images = [
  {
    url: 'https://images.unsplash.com/photo-1621846326788-b2c8d5e9d6f7?q=80&w=2070&auto=format&fit=crop',
    alt: 'Agence bancaire moderne au Bénin avec un service client de qualité'
  },
  {
    url: 'https://images.unsplash.com/photo-1621846326788-b2c8d5e9d6f7?q=80&w=2071&auto=format&fit=crop',
    alt: 'Services bancaires en ligne sécurisés au Bénin'
  },
  {
    url: 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop',
    alt: 'Conseil financier professionnel au Bénin'
  }
];

const loanTypes = [
  {
    id: 'personnel',
    icon: CreditCard,
    title: 'Crédit Personnel',
    description: 'Pour vos projets personnels et dépenses',
    minAmount: 50000,
    maxAmount: 10000000,
    minDuration: 3,
    maxDuration: 60,
    interestRate: 0.08,
    features: ['Remboursement flexible', 'Sans frais de remboursement anticipé', 'Déblocage rapide sous 48h']
  },
  {
    id: 'immobilier',
    icon: Home,
    title: 'Crédit Immobilier',
    description: 'Pour l\'achat, la construction ou la rénovation de votre bien',
    minAmount: 5000000,
    maxAmount: 200000000,
    minDuration: 60,
    maxDuration: 300,
    interestRate: 0.065,
    features: ['Taux fixe jusqu\'à 25 ans', 'Période de franchise possible', 'Financement jusqu\'à 90% du projet']
  },
  {
    id: 'auto',
    icon: DollarSign,
    title: 'Crédit Auto',
    description: 'Pour l\'achat de véhicules neufs ou d\'occasion',
    minAmount: 500000,
    maxAmount: 50000000,
    minDuration: 12,
    maxDuration: 84,
    interestRate: 0.075,
    features: ['Financement jusqu\'à 100%', 'Délai de rétraction légal', 'Assurance dommages optionnelle']
  },
  {
    id: 'professionnel',
    icon: TrendingUp,
    title: 'Crédit Professionnel',
    description: 'Pour le développement de votre entreprise',
    minAmount: 1000000,
    maxAmount: 50000000,
    minDuration: 6,
    maxDuration: 84,
    interestRate: 0.085,
    features: ['Taux compétitifs', 'Délais de remboursement flexibles', 'Délai d\'instruction rapide']
  },
  {
    id: 'etudiant',
    icon: Shield,
    title: 'Crédit Étudiant',
    description: 'Pour financer vos études supérieures',
    minAmount: 100000,
    maxAmount: 5000000,
    minDuration: 12,
    maxDuration: 60,
    interestRate: 0.05,
    features: ['Différé de remboursement possible', 'Taux préférentiel', 'Garantie parentale']
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [showSimulator, setShowSimulator] = useState(false);
  const [selectedType, setSelectedType] = useState(loanTypes[0].id);
  const [amount, setAmount] = useState(loanTypes[0].minAmount);
  const [duration, setDuration] = useState(loanTypes[0].minDuration);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [paymentSchedule, setPaymentSchedule] = useState<Array<{ month: number; payment: number; interest: number; principal: number; remaining: number }>>([]);
  const length = images.length;

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % length);
    }, 5000);
    return () => clearTimeout(timer);
  }, [current, length]);

  useEffect(() => {
    calculateLoanDetails();
  }, [amount, duration, selectedType]);

  const selectedLoan = loanTypes.find(loan => loan.id === selectedType);

  const calculateLoanDetails = () => {
    if (!selectedLoan) return;
    
    const monthlyRate = selectedLoan.interestRate / 12;
    const payment = (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -duration));
    setMonthlyPayment(payment);

    const total = payment * duration;
    const interest = total - amount;
    setTotalInterest(interest);
    setTotalPayment(total);

    // Calculate payment schedule
    const schedule = [];
    let remaining = amount;
    for (let month = 1; month <= duration; month++) {
      const interestPayment = remaining * monthlyRate;
      const principalPayment = payment - interestPayment;
      remaining -= principalPayment;
      schedule.push({
        month,
        payment,
        interest: interestPayment,
        principal: principalPayment,
        remaining: Math.max(0, remaining)
      });
    }
    setPaymentSchedule(schedule);
  };

  const handleTypeChange = (typeId: string) => {
    const loan = loanTypes.find(loan => loan.id === typeId);
    if (loan) {
      setSelectedType(typeId);
      setAmount(loan.minAmount);
      setDuration(loan.minDuration);
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (selectedLoan && value >= selectedLoan.minAmount && value <= selectedLoan.maxAmount) {
      setAmount(value);
    }
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (selectedLoan && value >= selectedLoan.minDuration && value <= selectedLoan.maxDuration) {
      setDuration(value);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(value);
  };

  return (
    <>
      <Helmet>
        <html lang="fr" />
        <title>Crédit personnel & crédit auto | Demande rapide en ligne | Zofin</title>
        <meta name="description" content="Obtenez un crédit personnel ou un crédit auto en moins de 24 heures. 100% en ligne, sans documents inutiles. Plateforme sécurisée avec réponse garantie sous 24 heures." />
        <meta name="keywords" content="Crédit personnel, crédit auto, crédit en ligne, demande de crédit rapide, financement, Bénin, simulateur de crédit, simulation de crédit" />
        <meta name="author" content="Zofin" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#FCD34D" />
        
        {/* Géolocalisation */}
        <meta name="geo.region" content="DE" />
        <meta name="geo.placename" content="Deutschland" />
        <meta name="geo.position" content="51.1657;10.4515" />
        <meta name="ICBM" content="51.1657, 10.4515" />
        <meta name="target" content="DE" />
        <meta name="distribution" content="Global" />
        <meta name="coverage" content="Deutschland" />
        <meta name="language" content="de" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Persönlicher Kredit & Autokredit | Schnelle Online-Beantragung | Zofin" />
        <meta property="og:description" content="Obtenez un crédit personnel ou un crédit auto en moins de 24 heures. 100% en ligne, sans documents inutiles. Plateforme sécurisée avec réponse garantie sous 24 heures." />
        <meta property="og:image" content={images[0].url} />
        <meta property="og:url" content="https://zofin.space" />
        <meta property="og:site_name" content="Zofin" />
        <meta property="og:locale" content="fr_FR" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Crédit personnel & crédit auto | Demande rapide en ligne | Zofin" />
        <meta name="twitter:description" content="Obtenez un crédit personnel ou un crédit auto en moins de 24 heures. 100% en ligne, sans documents inutiles. Plateforme sécurisée avec réponse garantie sous 24 heures." />
        <meta name="twitter:image" content={images[0].url} />
        <meta name="twitter:site" content="@zofin" />
        
        {/* Schema.org markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FinancialProduct",
            "name": "Crédit personnel & crédit auto",
            "description": "Obtenez un crédit personnel ou un crédit auto en moins de 24 heures. 100% en ligne, sans documents inutiles. Plateforme sécurisée avec réponse garantie sous 24 heures.",
            "provider": {
              "@type": "Organization",
              "name": "Zofin",
              "url": "https://zofin.space"
            },
            "offers": {
              "@type": "Offer",
              "availability": "https://schema.org/InStock",
              "price": "0",
              "priceCurrency": "EUR",
              "areaServed": {
                "@type": "Country",
                "name": "Bénin"
              }
            }
          })}
        </script>
        <link
          rel="preload"
          href="/fonts/your-main-font.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <style>
          {`
            @font-face {
              font-family: 'Your Main Font';
              src: url('/fonts/your-main-font.woff2') format('woff2');
              font-display: swap;
            }
            .hero-text {
              font-family: 'Your Main Font', system-ui, -apple-system, sans-serif;
              font-size: clamp(2rem, 5vw, 3.5rem);
              line-height: 1.2;
              font-weight: 700;
              color: #1a1a1a;
            }
          `}
        </style>
      </Helmet>

      <section
        id="hero"
        className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 text-white sm:py-32 overflow-hidden"
        aria-label="Hauptbereich"
      >
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full">
            {images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={image.alt}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                  index === current ? 'opacity-100' : 'opacity-0'
                }`}
                draggable={false}
                loading={index === 0 ? "eager" : "lazy"}
                width="2070"
                height="1380"
              />
            ))}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <img 
                src="https://flagcdn.com/w80/bj.png"
                alt="Drapeau béninois"
                className="w-12 h-auto mr-3"
                width="80"
                height="40"
              />
              <span className="text-lg font-semibold">Disponible au Bénin</span>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="hero-text text-3xl sm:text-5xl font-extrabold leading-tight mb-5"
            >
              Demande de crédit rapide, simple et 100% en ligne
            </motion.h1>

            <h2 className="text-base sm:text-lg mb-6 max-w-2xl mx-auto">
              Obtenez un crédit personnel ou un crédit auto en moins de 24h. Aucun document inutile, démarches simplifiées.
            </h2>

            <p className="inline-block bg-white text-gray-900 text-xs sm:text-sm font-semibold px-4 py-2 rounded-full shadow mb-10">
              🔒 Plateforme sécurisée — Réponse garantie sous 24h
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  setShowSimulator(true);
                  setTimeout(() => {
                    const simulatorElement = document.getElementById('kredit-simulator');
                    if (simulatorElement) {
                      simulatorElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }, 100);
                }}
                className="flex items-center justify-center bg-yellow-400 text-black px-6 py-3 rounded-full text-sm font-medium hover:bg-yellow-300 transition-colors"
                aria-label="Simuler une demande de crédit"
              >
                Simuler une demande de crédit
                <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
              </button>
              <Link
                to="/unsere-angebote"
                className="flex items-center justify-center border-2 border-white text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-white hover:text-black transition-colors"
                aria-label="Découvrir nos offres de crédit"
              >
                Découvrir nos offres de crédit
              </Link>
            </div>
          </div>
        </div>

        {showSimulator && (
          <motion.div
            id="kredit-simulator"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 w-full max-w-4xl mx-auto px-4 mt-8"
          >
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 text-gray-900">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Simulateur de crédit</h2>
                <button
                  onClick={() => setShowSimulator(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Fermer le simulateur"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {loanTypes.map((loan) => (
                  <motion.button
                    key={loan.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-3 sm:p-4 rounded-lg border-2 transition-colors ${
                      selectedType === loan.id
                        ? 'border-yellow-500 bg-yellow-50'
                        : 'border-gray-200 hover:border-yellow-300'
                    }`}
                    onClick={() => handleTypeChange(loan.id)}
                  >
                    <loan.icon className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500 mb-2" />
                    <h3 className="font-semibold text-sm sm:text-base mb-1">{loan.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-600">{loan.description}</p>
                  </motion.button>
                ))}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Montant du crédit (€)
                  </label>
                  <div className="relative">
                    <input
                      type="range"
                      min={selectedLoan?.minAmount}
                      max={selectedLoan?.maxAmount}
                      value={amount}
                      onChange={handleAmountChange}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs sm:text-sm text-gray-600 mt-1">
                      <span>{formatCurrency(selectedLoan?.minAmount || 0)}</span>
                      <span>{formatCurrency(selectedLoan?.maxAmount || 0)}</span>
                    </div>
                    <div className="relative mt-2">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                        <Euro className="w-4 h-4" />
                      </span>
                      <input
                        type="number"
                        value={amount}
                        onChange={handleAmountChange}
                        className="w-full pl-8 p-2 text-sm sm:text-base border border-gray-300 rounded-md"
                        min={selectedLoan?.minAmount}
                        max={selectedLoan?.maxAmount}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Durée (mois)
                  </label>
                  <div className="relative">
                    <input
                      type="range"
                      min={selectedLoan?.minDuration}
                      max={selectedLoan?.maxDuration}
                      value={duration}
                      onChange={handleDurationChange}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs sm:text-sm text-gray-600 mt-1">
                      <span>{selectedLoan?.minDuration} mois</span>
                      <span>{selectedLoan?.maxDuration} mois</span>
                    </div>
                    <div className="relative mt-2">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                        <Calendar className="w-4 h-4" />
                      </span>
                      <input
                        type="number"
                        value={duration}
                        onChange={handleDurationChange}
                        className="w-full pl-8 p-2 text-sm sm:text-base border border-gray-300 rounded-md"
                        min={selectedLoan?.minDuration}
                        max={selectedLoan?.maxDuration}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="p-3 sm:p-4 bg-yellow-50 rounded-lg">
                  <h3 className="text-base sm:text-lg font-semibold mb-2">Votre mensualité</h3>
                  <p className="text-2xl sm:text-3xl font-bold text-yellow-600">
                    {formatCurrency(monthlyPayment)}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600 mt-2">
                    * Taux annuel effectif global (TAEG) : {((selectedLoan?.interestRate || 0) * 100).toFixed(2)}%
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3 sm:p-4 bg-gray-50 rounded-lg">
                    <h4 className="text-xs sm:text-sm font-medium text-gray-700 mb-1">Intérêts totaux</h4>
                    <p className="text-lg sm:text-xl font-semibold text-gray-900">{formatCurrency(totalInterest)}</p>
                  </div>
                  <div className="p-3 sm:p-4 bg-gray-50 rounded-lg">
                    <h4 className="text-xs sm:text-sm font-medium text-gray-700 mb-1">Remboursement total</h4>
                    <p className="text-lg sm:text-xl font-semibold text-gray-900">{formatCurrency(totalPayment)}</p>
                  </div>
                </div>

                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className="w-full flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-600 hover:text-gray-900"
                >
                  <Info className="w-4 h-4" />
                  {showDetails ? 'Masquer les détails' : 'Afficher les détails'}
                </button>

                <AnimatePresence>
                  {showDetails && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="border rounded-lg p-3 sm:p-4">
                        <h4 className="text-sm sm:text-base font-medium mb-3">Échéancier (extrait)</h4>
                        <div className="space-y-2 text-xs sm:text-sm">
                          {paymentSchedule.slice(0, 3).map((payment) => (
                            <div key={payment.month} className="flex justify-between">
                              <span>Mois {payment.month}</span>
                              <span>{formatCurrency(payment.payment)}</span>
                            </div>
                          ))}
                          <div className="text-center text-gray-500">...</div>
                          {paymentSchedule.slice(-3).map((payment) => (
                            <div key={payment.month} className="flex justify-between">
                              <span>Mois {payment.month}</span>
                              <span>{formatCurrency(payment.payment)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="mt-6 space-y-4">
                  <h4 className="text-sm sm:text-base font-medium">Avantages</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {selectedLoan?.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                        <TrendingUp className="w-4 h-4 text-yellow-500" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-yellow-500 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full text-sm sm:text-base font-medium hover:bg-yellow-600 transition-colors"
                    onClick={() => toast.success('Votre demande a été envoyée avec succès !')}
                  >
                    Faire une demande de crédit
                  </motion.button>
                  <p className="text-xs text-gray-500 mt-2">
                    Gratuit et sans engagement
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <div 
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3 z-20"
          role="tablist"
          aria-label="Navigation du carrousel"
        >
          {images.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === current}
              aria-label={`Aller à l'image ${i + 1}`}
              className={`w-4 h-4 rounded-full transition-colors ${
                i === current ? 'bg-yellow-400' : 'bg-white bg-opacity-50'
              }`}
              onClick={() => setCurrent(i)}
            />
          ))}
        </div>
      </section>
    </>
  );
}
