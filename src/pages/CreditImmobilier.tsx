import React, { useState, useCallback, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, CheckCircle, Clock, Shield, AlertCircle, Mail, Phone, Printer } from 'lucide-react';
import { ProgressBar } from '../components/ProgressBar';
import { toast } from 'react-hot-toast';

type Step = 'introduction' | 'conditions' | 'formulaire' | 'documents' | 'resume' | 'confirmation';

interface FormErrors {
  nom?: string;
  email?: string;
  telephone?: string;
  adresse?: string;
  codePostal?: string;
  ville?: string;
  montant?: string;
  duree?: string;
  typeBien?: string;
  valeurBien?: string;
  apport?: string;
}

const LOCAL_STORAGE_KEY = 'creditImmobilierData';

const MAX_FILE_SIZE_MB = 5;
const ALLOWED_TYPES = ['application/pdf', 'image/jpeg', 'image/png'];

const MIN_AMOUNT = 50000;
const MAX_AMOUNT = 1000000;
const MIN_DURATION = 120;
const MAX_DURATION = 360;

export default function Immobilienkredit() {
  const [currentStep, setCurrentStep] = useState<Step>('introduction');
  const [isAccepted, setIsAccepted] = useState(false);
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [adresse, setAdresse] = useState('');
  const [codePostal, setCodePostal] = useState('');
  const [ville, setVille] = useState('');
  const [montant, setMontant] = useState('');
  const [duree, setDuree] = useState('');
  const [typeBien, setTypeBien] = useState('');
  const [valeurBien, setValeurBien] = useState('');
  const [apport, setApport] = useState('');
  const [documents, setDocuments] = useState<File[]>([]);
  const [docError, setDocError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  // Sauvegarde automatique dans le localStorage
  useEffect(() => {
    const data = {
      currentStep,
      isAccepted,
      nom,
      email,
      telephone,
      adresse,
      codePostal,
      ville,
      montant,
      duree,
      typeBien,
      valeurBien,
      apport,
    };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  }, [currentStep, isAccepted, nom, email, telephone, adresse, codePostal, ville, montant, duree, typeBien, valeurBien, apport]);

  // Restauration automatique au chargement
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setCurrentStep(data.currentStep || 'intro');
        setIsAccepted(data.isAccepted || false);
        setNom(data.nom || '');
        setEmail(data.email || '');
        setTelephone(data.telephone || '');
        setAdresse(data.adresse || '');
        setCodePostal(data.codePostal || '');
        setVille(data.ville || '');
        setMontant(data.montant || '');
        setDuree(data.duree || '');
        setTypeBien(data.typeBien || '');
        setValeurBien(data.valeurBien || '');
        setApport(data.apport || '');
      } catch {
        // ignore erreur de parsing
      }
    }
  }, []);

  const variants = {
    enter: { opacity: 0, x: 100 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    let isValid = true;

    // Validation du nom
    if (!nom.trim()) {
      errors.nom = 'Bitte geben Sie Ihren vollständigen Namen ein';
      isValid = false;
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      errors.email = 'Bitte geben Sie eine gültige E-Mail-Adresse ein';
      isValid = false;
    }

    // Validation du téléphone
    const phoneRegex = /^\+?[0-9\s-]{10,}$/;
    if (!telephone || !phoneRegex.test(telephone)) {
      errors.telephone = 'Bitte geben Sie eine gültige Telefonnummer ein';
      isValid = false;
    }

    // Validation de l'adresse
    if (!adresse.trim()) {
      errors.adresse = 'Bitte geben Sie Ihre Adresse ein';
      isValid = false;
    }

    // Validation du code postal
    const postalRegex = /^[0-9]{4,5}$/;
    if (!codePostal || !postalRegex.test(codePostal)) {
      errors.codePostal = 'Bitte geben Sie eine gültige Postleitzahl ein';
      isValid = false;
    }

    // Validation de la ville
    if (!ville.trim()) {
      errors.ville = 'Bitte geben Sie Ihre Stadt ein';
      isValid = false;
    }

    // Validation du montant
    const amount = Number(montant);
    if (!montant || isNaN(amount) || amount < MIN_AMOUNT || amount > MAX_AMOUNT) {
      errors.montant = `Der Kreditbetrag muss zwischen ${MIN_AMOUNT}€ und ${MAX_AMOUNT}€ liegen`;
      isValid = false;
    }

    // Validation de la durée
    const duration = Number(duree);
    if (!duree || isNaN(duration) || duration < MIN_DURATION || duration > MAX_DURATION) {
      errors.duree = `Die Laufzeit muss zwischen ${MIN_DURATION} und ${MAX_DURATION} Monaten liegen`;
      isValid = false;
    }

    // Validation du type de bien
    if (!typeBien) {
      errors.typeBien = 'Bitte wählen Sie den Immobilientyp aus';
      isValid = false;
    }

    // Validation de la valeur du bien
    const bienValue = Number(valeurBien);
    if (!valeurBien || isNaN(bienValue) || bienValue <= 0) {
      errors.valeurBien = 'Bitte geben Sie einen gültigen Immobilienwert ein';
      isValid = false;
    }

    // Validation de l'apport
    const apportValue = Number(apport);
    if (!apport || isNaN(apportValue) || apportValue < 0 || apportValue > bienValue) {
      errors.apport = 'Bitte geben Sie einen gültigen Eigenkapitalbetrag ein';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => {
      switch (prev) {
        case 'introduction': return 'conditions';
        case 'conditions': return 'formulaire';
        case 'formulaire': return 'documents';
        case 'documents': return 'resume';
        case 'resume': return 'confirmation';
        default: return prev;
      }
    });
  }, []);

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => {
      switch (prev) {
        case 'confirmation': return 'resume';
        case 'resume': return 'documents';
        case 'documents': return 'formulaire';
        case 'formulaire': return 'conditions';
        case 'conditions': return 'introduction';
        default: return prev;
      }
    });
  }, []);

  const handleAcceptConditions = () => {
    if (!isAccepted) {
      toast.error('Bitte akzeptieren Sie die Bedingungen, um fortzufahren.');
      return;
    }
    nextStep();
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      nextStep();
    } else {
      toast.error('Bitte korrigieren Sie die Fehler im Formular.');
    }
  };

  const handleDocumentsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDocError('');
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const tooLarge = newFiles.some(f => f.size > MAX_FILE_SIZE_MB * 1024 * 1024);
      if (tooLarge) {
        setDocError(`Eine oder mehrere Dateien überschreiten die maximale Größe von ${MAX_FILE_SIZE_MB} MB.`);
        toast.error(`Eine oder mehrere Dateien überschreiten die maximale Größe von ${MAX_FILE_SIZE_MB} MB.`);
        return;
      }
      const invalidType = newFiles.some(f => !ALLOWED_TYPES.includes(f.type));
      if (invalidType) {
        setDocError('Nur PDF-, JPEG- und PNG-Dateien sind erlaubt.');
        toast.error('Nur PDF-, JPEG- und PNG-Dateien sind erlaubt.');
        return;
      }
      setDocuments(prev => {
        const existingIds = new Set(prev.map(f => f.name + f.size));
        const filteredNew = newFiles.filter(f => !existingIds.has(f.name + f.size));
        return [...prev, ...filteredNew];
      });
      toast.success(`${newFiles.length} Datei(en) erfolgreich hochgeladen.`);
    }
  };

  const removeDocument = (indexToRemove: number) => {
    setDocuments(prev => prev.filter((_, i) => i !== indexToRemove));
    setDocError('');
    toast.success('Dokument erfolgreich entfernt.');
  };

  const handleSubmitDocuments = (e: React.FormEvent) => {
    e.preventDefault();
    if (documents.length === 0) {
      setDocError('Bitte fügen Sie die erforderlichen Dokumente bei.');
      toast.error('Bitte fügen Sie die erforderlichen Dokumente bei.');
      return;
    }
    nextStep();
  };

  const resetAll = () => {
    setIsAccepted(false);
    setNom('');
    setEmail('');
    setTelephone('');
    setAdresse('');
    setCodePostal('');
    setVille('');
    setMontant('');
    setDuree('');
    setTypeBien('');
    setValeurBien('');
    setApport('');
    setDocuments([]);
    setDocError('');
    setCurrentStep('introduction');
    setFormErrors({});
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    toast.success('Formular zurückgesetzt.');
  };

  const sendFormData = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    const formData = new FormData();
    formData.append('typePret', 'Immobilienkredit');
    formData.append('nom', nom);
    formData.append('email', email);
    formData.append('telephone', telephone);
    formData.append('adresse', adresse);
    formData.append('codePostal', codePostal);
    formData.append('ville', ville);
    formData.append('montant', montant);
    formData.append('duree', duree);
    formData.append('typeBien', typeBien);
    formData.append('valeurBien', valeurBien);
    formData.append('apport', apport);

    documents.forEach((file) => {
      formData.append('documents[]', file);
    });

    try {
      const response = await fetch('https://antiquewhite-salamander-475773.hostingersite.com/send-mail.php', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || 'Fehler beim Senden');
      }
      toast.success('Ihr Antrag wurde erfolgreich eingereicht!');
      nextStep();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setSubmitError(err.message || 'Unbekannter Fehler');
        toast.error(err.message || 'Unbekannter Fehler');
      } else {
        setSubmitError('Unbekannter Fehler');
        toast.error('Unbekannter Fehler');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Crédit Immobilier | Zofin Finance Bénin</title>
        <meta name="description" content="Demandez votre crédit immobilier en ligne. Rapide, simple et sans engagement." />
        <meta name="keywords" content="crédit immobilier, financement immobilier, hypothèque, prêt immobilier, Zofin Finance, Bénin" />
        <meta property="og:title" content="Crédit Immobilier | Zofin Finance Bénin" />
        <meta property="og:description" content="Demandez votre crédit immobilier en ligne. Rapide, simple et sans engagement." />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>

      <section className="py-12">
        <div className="container mx-auto px-4 pt-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-green-800 mb-4">Crédit Immobilier</h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Réalisez votre rêve de devenir propriétaire avec notre crédit immobilier flexible et adapté au marché béninois.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {[
              {
                icon: Home,
                title: "Financement sur mesure",
                description: "Crédits de 10 à 500 millions FCFA pour votre projet immobilier"
              },
              {
                icon: Clock,
                title: "Traitement rapide",
                description: "Réponse sous 48h ouvrées"
              },
              {
                icon: CheckCircle,
                title: "Taux compétitifs",
                description: "Des conditions avantageuses et une totale transparence"
              },
              {
                icon: Shield,
                title: "Financement sécurisé",
                description: "Conseil personnalisé et solutions adaptées à vos besoins"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <feature.icon className="w-12 h-12 text-green-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white p-8 rounded-xl shadow-lg max-w-3xl mx-auto"
          >
            <h2 className="text-2xl font-bold mb-6 text-green-800">Les avantages de notre crédit immobilier</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <CheckCircle className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" />
                <span>Financement pour l'achat, la construction ou la rénovation</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" />
                <span>Durées flexibles de 5 à 25 ans</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" />
                <span>Pas de frais cachés</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" />
                <span>Accompagnement personnalisé par nos experts</span>
              </li>
            </ul>
          </motion.div>

          {/* Formulaire de demande de prêt */}
          <div className="mt-12 bg-white rounded-xl shadow-lg p-8 max-w-3xl mx-auto">
            <ProgressBar currentStep={currentStep} />
            <AnimatePresence mode="wait">
              {currentStep === 'introduction' && (
                <motion.section
                  key="introduction"
                  initial="enter"
                  animate="center"
                  exit="exit"
                  variants={variants}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl font-bold mb-4">Demande de crédit en ligne</h2>
                  <p className="mb-6">
                    Démarrez dès maintenant votre demande de crédit immobilier. Le processus ne prend que quelques minutes.
                  </p>
                    <button
                      onClick={() => setCurrentStep('conditions')}
                      className="bg-green-900 text-white px-6 py-3 rounded-lg hover:bg-yellow-500 transition transform hover:scale-105"
                    >
                      Faire une demande
                    </button>
                </motion.section>
              )}

              {currentStep === 'conditions' && (
                <motion.section
                  key="conditions"
                  initial="enter"
                  animate="center"
                  exit="exit"
                  variants={variants}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl font-bold mb-4">Conditions générales</h2>
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg max-h-60 overflow-y-auto">
                    <ul className="space-y-2 text-sm">
                      <li>• Vous devez être majeur et résider au Bénin.</li>
                      <li>• Le montant du crédit doit être compris entre 10 et 500 millions FCFA.</li>
                      <li>• La durée du prêt est de 5 à 25 ans maximum.</li>
                      <li>• Vous devez justifier de revenus stables et réguliers.</li>
                      <li>• Tous les documents justificatifs doivent être fournis.</li>
                      <li>• Un apport personnel est recommandé pour faciliter l'étude de votre dossier.</li>
                    </ul>
                  </div>
                  <label className="flex items-center mb-6">
                    <input
                      type="checkbox"
                      checked={isAccepted}
                      onChange={(e) => setIsAccepted(e.target.checked)}
                      className="mr-2"
                      required
                    />
                    <span>J'accepte les conditions générales d'utilisation</span>
                  </label>
                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-4 py-2 border rounded hover:bg-gray-100 transition"
                    >
                      Retour
                    </button>
                    <button
                      type="button"
                      onClick={handleAcceptConditions}
                      className="bg-green-900 text-white px-6 py-2 rounded hover:bg-yellow-500 transition"
                      disabled={!isAccepted}
                    >
                      Continuer
                    </button>
                  </div>
                </motion.section>
              )}

              {currentStep === 'formulaire' && (
                <motion.form
                  key="formulaire"
                  onSubmit={handleSubmitForm}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  variants={variants}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <h2 className="text-2xl font-bold mb-4">Informations personnelles</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-1">Nom complet</label>
                      <input
                        type="text"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                        className={`w-full border rounded p-2 ${formErrors.nom ? 'border-red-500' : ''}`}
                        required
                      />
                      {formErrors.nom && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {formErrors.nom}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block mb-1">Adresse e-mail</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-full border rounded p-2 ${formErrors.email ? 'border-red-500' : ''}`}
                        required
                      />
                      {formErrors.email && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {formErrors.email}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block mb-1">Téléphone</label>
                      <input
                        type="tel"
                        value={telephone}
                        onChange={(e) => setTelephone(e.target.value)}
                        className={`w-full border rounded p-2 ${formErrors.telephone ? 'border-red-500' : ''}`}
                        required
                      />
                      {formErrors.telephone && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {formErrors.telephone}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block mb-1">Adresse complète</label>
                      <input
                        type="text"
                        value={adresse}
                        onChange={(e) => setAdresse(e.target.value)}
                        className={`w-full border rounded p-2 ${formErrors.adresse ? 'border-red-500' : ''}`}
                        required
                      />
                      {formErrors.adresse && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {formErrors.adresse}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block mb-1">Code postal</label>
                      <input
                        type="text"
                        value={codePostal}
                        onChange={(e) => setCodePostal(e.target.value)}
                        className={`w-full border rounded p-2 ${formErrors.codePostal ? 'border-red-500' : ''}`}
                        required
                      />
                      {formErrors.codePostal && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {formErrors.codePostal}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block mb-1">Ville</label>
                      <input
                        type="text"
                        value={ville}
                        onChange={(e) => setVille(e.target.value)}
                        className={`w-full border rounded p-2 ${formErrors.ville ? 'border-red-500' : ''}`}
                        required
                      />
                      {formErrors.ville && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {formErrors.ville}
                        </p>
                      )}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mt-8 mb-4">Détails du financement</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-1">Montant du crédit (FCFA)</label>
                      <input
                        type="number"
                        value={montant}
                        onChange={(e) => setMontant(e.target.value)}
                        className={`w-full border rounded p-2 ${formErrors.montant ? 'border-red-500' : ''}`}
                        min={MIN_AMOUNT}
                        max={MAX_AMOUNT}
                        required
                      />
                      {formErrors.montant && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {formErrors.montant}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block mb-1">Durée (mois)</label>
                      <input
                        type="number"
                        value={duree}
                        onChange={(e) => setDuree(e.target.value)}
                        className={`w-full border rounded p-2 ${formErrors.duree ? 'border-red-500' : ''}`}
                        min={MIN_DURATION}
                        max={MAX_DURATION}
                        required
                      />
                      {formErrors.duree && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {formErrors.duree}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block mb-1">Type de bien</label>
                      <select
                        value={typeBien}
                        onChange={(e) => setTypeBien(e.target.value)}
                        className={`w-full border rounded p-2 ${formErrors.typeBien ? 'border-red-500' : ''}`}
                        required
                        aria-label="Sélectionner le type de bien"
                      >
                        <option value="">Sélectionnez...</option>
                        <option value="appartement">Appartement</option>
                        <option value="maison">Maison individuelle</option>
                        <option value="immeuble">Immeuble</option>
                        <option value="terrain">Terrain à bâtir</option>
                        <option value="local">Local commercial</option>
                      </select>
                      {formErrors.typeBien && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {formErrors.typeBien}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block mb-1">Valeur du bien (FCFA)</label>
                      <input
                        type="number"
                        value={valeurBien}
                        onChange={(e) => setValeurBien(e.target.value)}
                        className={`w-full border rounded p-2 ${formErrors.valeurBien ? 'border-red-500' : ''}`}
                        required
                      />
                      {formErrors.valeurBien && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {formErrors.valeurBien}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block mb-1">Apport personnel (FCFA)</label>
                      <input
                        type="number"
                        value={apport}
                        onChange={(e) => setApport(e.target.value)}
                        className={`w-full border rounded p-2 ${formErrors.apport ? 'border-red-500' : ''}`}
                        required
                      />
                      {formErrors.apport && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {formErrors.apport}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between mt-6">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-4 py-2 border rounded hover:bg-gray-100 transition"
                    >
                      Retour
                    </button>
                    <button
                      type="submit"
                      className="bg-green-900 text-white px-6 py-2 rounded hover:bg-yellow-500 transition"
                    >
                      Continuer
                    </button>
                  </div>
                </motion.form>
              )}

              {currentStep === 'documents' && (
                <motion.form
                  key="documents"
                  onSubmit={handleSubmitDocuments}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  variants={variants}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl font-bold mb-4">Documents requis</h2>
                  <p className="mb-4">Veuillez télécharger les documents suivants :</p>
                  <ul className="list-disc pl-5 mb-6 space-y-2">
                    <li>Pièce d'identité (CNI ou passeport en cours de validité)</li>
                    <li>Les trois dernières fiches de paie</li>
                    <li>Avis d'imposition des deux dernières années</li>
                    <li>Acte de propriété ou titre foncier</li>
                    <li>Contrat de vente ou avant-contrat (si disponible)</li>
                    <li>Plan de financement détaillé du projet</li>
                  </ul>
                  <div className="mb-4">
                    <input
                      type="file"
                      multiple
                      onChange={handleDocumentsChange}
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="w-full"
                    />
                    {docError && (
                      <p className="text-red-600 mt-2 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {docError}
                      </p>
                    )}
                  </div>
                  {documents.length > 0 && (
                    <div className="mb-4">
                      <h3 className="font-semibold mb-2">Documents téléchargés :</h3>
                      <ul className="space-y-2">
                        {documents.map((file, index) => (
                          <li key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                            <span>{file.name}</span>
                            <button
                              type="button"
                              onClick={() => removeDocument(index)}
                              className="text-red-600 hover:text-red-800 transition"
                            >
                              Supprimer
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-4 py-2 border rounded hover:bg-gray-100 transition"
                    >
                      Retour
                    </button>
                    <button
                      type="submit"
                      className="bg-green-900 text-white px-6 py-2 rounded hover:bg-yellow-500 transition"
                    >
                      Continuer
                    </button>
                  </div>
                </motion.form>
              )}

              {currentStep === 'resume' && (
                <motion.section
                  key="summary"
                  initial="enter"
                  animate="center"
                  exit="exit"
                  variants={variants}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl font-bold mb-4">Récapitulatif de votre demande</h2>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2">Informations personnelles</h3>
                      <p><span className="font-medium">Nom complet :</span> {nom}</p>
                      <p><span className="font-medium">E-mail :</span> {email}</p>
                      <p><span className="font-medium">Téléphone :</span> {telephone}</p>
                      <p><span className="font-medium">Adresse :</span> {adresse}, {codePostal} {ville}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2">Détails du crédit</h3>
                      <p><span className="font-medium">Montant :</span> {new Intl.NumberFormat('fr-FR').format(Number(montant) || 0)} FCFA</p>
                      <p><span className="font-medium">Durée :</span> {duree} mois</p>
                      <p><span className="font-medium">Type de bien :</span> {{
                        'appartement': 'Appartement',
                        'maison': 'Maison individuelle',
                        'immeuble': 'Immeuble',
                        'terrain': 'Terrain à bâtir',
                        'local': 'Local commercial'
                      }[typeBien] || typeBien}</p>
                      <p><span className="font-medium">Valeur du bien :</span> {new Intl.NumberFormat('fr-FR').format(Number(valeurBien) || 0)} FCFA</p>
                      <p><span className="font-medium">Apport personnel :</span> {new Intl.NumberFormat('fr-FR').format(Number(apport) || 0)} FCFA</p>
                    </div>
                    {documents.length > 0 && (
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-semibold mb-2">Documents joints</h3>
                        <ul className="list-disc ml-5">
                          {documents.map((file, index) => (
                            <li key={index} className="truncate">{file.name}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-between mt-6">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-4 py-2 border rounded hover:bg-gray-100 transition"
                    >
                      Retour
                    </button>
                    <button
                      type="button"
                      onClick={sendFormData}
                      disabled={isSubmitting}
                      className="bg-green-900 text-white px-6 py-2 rounded hover:bg-yellow-500 transition disabled:opacity-50"
                    >
                      {isSubmitting ? 'Envoi en cours...' : 'Soumettre la demande'}
                    </button>
                  </div>
                  {submitError && (
                    <p className="text-red-600 mt-4 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {submitError}
                    </p>
                  )}
                </motion.section>
              )}

              {currentStep === 'confirmation' && (
                <motion.section
                  key="confirmation"
                  initial="enter"
                  animate="center"
                  exit="exit"
                  variants={variants}
                  transition={{ duration: 0.3 }}
                  className="text-center"
                >
                  <div className="mb-8">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 10 }}
                    >
                      <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
                    </motion.div>
                    <h2 className="text-3xl font-bold mb-4 text-green-600">Votre demande a été envoyée avec succès !</h2>
                    <p className="text-gray-600 mb-6">
                      Merci pour votre demande de crédit immobilier. Notre équipe vous contactera dans les plus brefs délais.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg mb-8">
                    <h3 className="font-semibold text-lg mb-4">Récapitulatif de votre demande</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                      <div>
                        <p className="text-sm text-gray-500">Numéro de dossier</p>
                        <p className="text-xl font-mono font-bold text-green-900">
                          {Math.random().toString(36).substr(2, 8).toUpperCase()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Date de soumission</p>
                        <p className="text-lg font-semibold">
                          {new Date().toLocaleDateString('fr-FR', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 p-6 rounded-lg mb-8">
                    <h3 className="font-semibold text-lg mb-4">Prochaines étapes</h3>
                    <ul className="space-y-3 text-left">
                      <li className="flex items-start">
                        <Clock className="w-5 h-5 text-green-900 mr-2 mt-1 flex-shrink-0" />
                        <span>Notre équipe étudie votre demande sous 48h ouvrées</span>
                      </li>
                      <li className="flex items-start">
                        <Mail className="w-5 h-5 text-green-900 mr-2 mt-1 flex-shrink-0" />
                        <span>Vous recevrez un e-mail de confirmation avec les détails de votre demande</span>
                      </li>
                      <li className="flex items-start">
                        <Phone className="w-5 h-5 text-green-900 mr-2 mt-1 flex-shrink-0" />
                        <span>Un conseiller vous contactera pour finaliser votre dossier</span>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <button
                      onClick={resetAll}
                      className="bg-green-900 text-white px-8 py-3 rounded-lg hover:bg-yellow-500 transition transform hover:scale-105"
                    >
                      Faire une nouvelle demande
                    </button>
                    <div>
                      <button
                        onClick={() => window.print()}
                        className="text-green-900 hover:text-yellow-500 transition flex items-center mx-auto"
                      >
                        <Printer className="w-5 h-5 mr-2" />
                        Imprimer ce récapitulatif
                      </button>
                    </div>
                  </div>
                </motion.section>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
}