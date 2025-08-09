import React, { useState, useCallback, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Car, CheckCircle, Clock, Shield, AlertCircle, Mail, Phone, Printer } from 'lucide-react';
import { ProgressBar } from '../components/ProgressBar';
import { toast } from 'react-hot-toast';

type Step = 'intro' | 'conditions' | 'form' | 'documents' | 'summary' | 'confirmation';

interface FormErrors {
  nom?: string;
  email?: string;
  telephone?: string;
  adresse?: string;
  codePostal?: string;
  ville?: string;
  montant?: string;
  duree?: string;
  typeVoiture?: string;
  marque?: string;
  modele?: string;
  annee?: string;
}

const LOCAL_STORAGE_KEY = 'autokreditData';

const MAX_FILE_SIZE_MB = 5;
const ALLOWED_TYPES = ['application/pdf', 'image/jpeg', 'image/png'];

const MIN_AMOUNT = 5000;
const MAX_AMOUNT = 100000;
const MIN_DURATION = 12;
const MAX_DURATION = 84;

export default function Autokredit() {
  const [currentStep, setCurrentStep] = useState<Step>('intro');
  const [isAccepted, setIsAccepted] = useState(false);
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [adresse, setAdresse] = useState('');
  const [codePostal, setCodePostal] = useState('');
  const [ville, setVille] = useState('');
  const [montant, setMontant] = useState('');
  const [duree, setDuree] = useState('');
  const [typeVoiture, setTypeVoiture] = useState('');
  const [marque, setMarque] = useState('');
  const [modele, setModele] = useState('');
  const [annee, setAnnee] = useState('');
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
      typeVoiture,
      marque,
      modele,
      annee,
    };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  }, [currentStep, isAccepted, nom, email, telephone, adresse, codePostal, ville, montant, duree, typeVoiture, marque, modele, annee]);

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
        setTypeVoiture(data.typeVoiture || '');
        setMarque(data.marque || '');
        setModele(data.modele || '');
        setAnnee(data.annee || '');
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
      errors.nom = 'Veuillez entrer votre nom complet';
      isValid = false;
    }

    // Validation de l'email
    if (!email.trim()) {
      errors.email = 'Veuillez entrer votre adresse e-mail';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Veuillez entrer une adresse e-mail valide';
      isValid = false;
    }

    // Validation du téléphone
    if (!telephone.trim()) {
      errors.telephone = 'Veuillez entrer votre numéro de téléphone';
      isValid = false;
    } else if (!/^(\+229|00229)?[0-9]{8}$/.test(telephone)) {
      errors.telephone = 'Veuillez entrer un numéro de téléphone béninois valide';
      isValid = false;
    }

    // Validation de l'adresse
    if (!adresse.trim()) {
      errors.adresse = 'Veuillez entrer votre adresse complète';
      isValid = false;
    }

    // Validation du code postal
    if (!codePostal.trim()) {
      errors.codePostal = 'Veuillez entrer votre code postal';
      isValid = false;
    }

    // Validation de la ville
    if (!ville.trim()) {
      errors.ville = 'Veuillez entrer votre ville';
      isValid = false;
    }

    // Validation du montant
    const amount = Number(montant);
    if (!montant || isNaN(amount) || amount < MIN_AMOUNT || amount > MAX_AMOUNT) {
      errors.montant = `Le montant du crédit doit être compris entre ${MIN_AMOUNT} FCFA et ${MAX_AMOUNT} FCFA`;
      isValid = false;
    }

    // Validation de la durée
    const duration = Number(duree);
    if (!duree || isNaN(duration) || duration < MIN_DURATION || duration > MAX_DURATION) {
      errors.duree = `La durée doit être comprise entre ${MIN_DURATION} et ${MAX_DURATION} mois`;
      isValid = false;
    }

    // Validation du type de voiture
    if (!typeVoiture) {
      errors.typeVoiture = 'Veuillez sélectionner le type de véhicule';
      isValid = false;
    }

    // Validation de la marque
    if (!marque.trim()) {
      errors.marque = 'Veuillez entrer la marque du véhicule';
      isValid = false;
    }

    // Validation du modèle
    if (!modele.trim()) {
      errors.modele = 'Veuillez entrer le modèle du véhicule';
      isValid = false;
    }

    // Validation de l'année
    const currentYear = new Date().getFullYear();
    const year = Number(annee);
    if (!annee || isNaN(year) || year < 1900 || year > currentYear) {
      errors.annee = 'Veuillez entrer une année de fabrication valide';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => {
      switch (prev) {
        case 'intro': return 'conditions';
        case 'conditions': return 'form';
        case 'form': return 'documents';
        case 'documents': return 'summary';
        case 'summary': return 'confirmation';
        default: return prev;
      }
    });
  }, []);

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => {
      switch (prev) {
        case 'confirmation': return 'summary';
        case 'summary': return 'documents';
        case 'documents': return 'form';
        case 'form': return 'conditions';
        case 'conditions': return 'intro';
        default: return prev;
      }
    });
  }, []);

  const handleAcceptConditions = () => {
    if (!isAccepted) {
      toast.error('Veuillez accepter les conditions pour continuer.');
      return;
    }
    nextStep();
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      nextStep();
    } else {
      toast.error('Veuillez corriger les erreurs dans le formulaire.');
    }
  };

  const handleDocumentsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDocError('');
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const tooLarge = newFiles.some(f => f.size > MAX_FILE_SIZE_MB * 1024 * 1024);
      if (tooLarge) {
        setDocError(`Un ou plusieurs fichiers dépassent la taille maximale de ${MAX_FILE_SIZE_MB} Mo.`);
        toast.error(`Un ou plusieurs fichiers dépassent la taille maximale de ${MAX_FILE_SIZE_MB} Mo.`);
        return;
      }
      const invalidType = newFiles.some(f => !ALLOWED_TYPES.includes(f.type));
      if (invalidType) {
        setDocError('Seuls les fichiers PDF, JPEG et PNG sont autorisés.');
        toast.error('Seuls les fichiers PDF, JPEG et PNG sont autorisés.');
        return;
      }
      setDocuments(prev => {
        const existingIds = new Set(prev.map(f => f.name + f.size));
        const filteredNew = newFiles.filter(f => !existingIds.has(f.name + f.size));
        return [...prev, ...filteredNew];
      });
      toast.success(`${newFiles.length} fichier(s) téléchargé(s) avec succès.`);
    }
  };

  const removeDocument = (indexToRemove: number) => {
    setDocuments(prev => prev.filter((_, i) => i !== indexToRemove));
    setDocError('');
    toast.success('Document supprimé avec succès.');
  };

  const handleSubmitDocuments = (e: React.FormEvent) => {
    e.preventDefault();
    if (documents.length === 0) {
      setDocError('Veuillez joindre les documents requis.');
      toast.error('Veuillez joindre les documents requis.');
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
    setTypeVoiture('');
    setMarque('');
    setModele('');
    setAnnee('');
    setDocuments([]);
    setDocError('');
    setCurrentStep('intro');
    setFormErrors({});
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    toast.success('Formulaire réinitialisé avec succès.');
  };

  const sendFormData = async () => {
    try {
      setIsSubmitting(true);
      setSubmitError(null);

      const formData = new FormData();
      formData.append('typePret', 'Crédit Auto');
      formData.append('nom', nom);
      formData.append('email', email);
      formData.append('telephone', telephone);
      formData.append('adresse', adresse);
      formData.append('codePostal', codePostal);
      formData.append('ville', ville);
      formData.append('montant', montant);
      formData.append('duree', duree);
      formData.append('typeVoiture', typeVoiture);
      formData.append('marque', marque);
      formData.append('modele', modele);
      formData.append('annee', annee);

      documents.forEach((file) => {
        formData.append('documents[]', file);
      });

      const response = await fetch('https://antiquewhite-salamander-475773.hostingersite.com/send-mail.php', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || 'Erreur lors de l\'envoi');
      }
      
      // Si tout se passe bien, on passe à l'étape de confirmation
      setCurrentStep('confirmation');
      
    } catch (err: unknown) {
      if (err instanceof Error) {
        setSubmitError(err.message || 'Erreur inconnue');
        toast.error(err.message || 'Une erreur est survenue lors de l\'envoi');
      } else {
        setSubmitError('Erreur inconnue');
        toast.error('Une erreur inattendue est survenue');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Crédit Auto | Zofin Bénin - Financement automobile avantageux</title>
        <meta name="description" content="Crédits auto et financements pour véhicules neufs et d'occasion au Bénin. Demandez votre crédit en ligne et profitez de nos taux avantageux." />
        <meta name="keywords" content="crédit auto Bénin, financement automobile, crédit voiture occasion, crédit voiture neuve, crédit auto en ligne, taux crédit auto" />
        <meta property="og:title" content="Crédit Auto | Zofin Bénin" />
        <meta property="og:description" content="Crédits auto et financements pour véhicules neufs et d'occasion au Bénin. Demandez votre crédit en ligne." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://zofin-benin.bj/credit-auto" />
      </Helmet>

      <section className="bg-gradient-to-br from-red-50 via-red-100 to-red-200 py-20">
        <div className="container mx-auto px-4 pt-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-red-800 mb-4">Crédit Auto</h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Réalisez votre projet automobile avec notre offre de crédit adaptée à vos besoins au Bénin.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {[
              {
                icon: Car,
                title: "Financement sur mesure",
                description: "Crédits de 500 000 FCFA à 50 000 000 FCFA pour votre véhicule"
              },
              {
                icon: Clock,
                title: "Traitement rapide",
                description: "Réponse sous 48 heures ouvrées"
              },
              {
                icon: CheckCircle,
                title: "Taux compétitifs",
                description: "Des conditions claires et des taux avantageux"
              },
              {
                icon: Shield,
                title: "Financement sécurisé",
                description: "Accompagnement personnalisé par nos experts"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <feature.icon className="w-12 h-12 text-red-500 mb-4" />
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
            <h2 className="text-2xl font-bold mb-6 text-red-800">Les avantages de notre crédit auto</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <CheckCircle className="w-6 h-6 text-red-500 mr-2 flex-shrink-0" />
                <span>Financement pour véhicules neufs et d'occasion</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-6 h-6 text-red-500 mr-2 flex-shrink-0" />
                <span>Durées flexibles de 12 à 84 mois</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-6 h-6 text-red-500 mr-2 flex-shrink-0" />
                <span>Pas de frais cachés</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-6 h-6 text-red-500 mr-2 flex-shrink-0" />
                <span>Accompagnement personnalisé</span>
              </li>
            </ul>
          </motion.div>

          {/* Formulaire de demande de prêt */}
          <div className="mt-12 bg-white rounded-xl shadow-lg p-8 max-w-3xl mx-auto">
            <ProgressBar currentStep={currentStep} />
            <AnimatePresence mode="wait">
              {currentStep === 'intro' && (
                <motion.section
                  key="intro"
                  initial="enter"
                  animate="center"
                  exit="exit"
                  variants={variants}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl font-bold mb-4">Demande de crédit en ligne</h2>
                  <p className="mb-6">
                    Démarrez votre demande de crédit auto. Le processus ne prend que quelques minutes.
                  </p>
                  <button
                    onClick={() => setCurrentStep('conditions')}
                    className="bg-red-900 text-white px-6 py-3 rounded-lg hover:bg-yellow-500 transition transform hover:scale-105"
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
                      <li>• Le montant du crédit doit être compris entre 500 000 FCFA et 50 000 000 FCFA.</li>
                      <li>• La durée du crédit est comprise entre 12 et 84 mois.</li>
                      <li>• Vous devez justifier de revenus stables.</li>
                      <li>• Tous les documents requis doivent être fournis.</li>
                    </ul>
                  </div>
                  <label className="flex items-center mb-6">
                    <input
                      type="checkbox"
                      checked={isAccepted}
                      onChange={(e) => setIsAccepted(e.target.checked)}
                      className="mr-2"
                    />
                    <span>J'accepte les conditions générales d'utilisation</span>
                  </label>
                  <div className="flex justify-between">
                    <button
                      onClick={prevStep}
                      className="px-4 py-2 border rounded hover:bg-gray-100 transition"
                    >
                      Précédent
                    </button>
                    <button
                      onClick={handleAcceptConditions}
                      className="bg-red-900 text-white px-6 py-2 rounded hover:bg-yellow-500 transition"
                    >
                      Continuer
                    </button>
                  </div>
                </motion.section>
              )}

              {currentStep === 'form' && (
                <motion.form
                  key="form"
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
                        placeholder="+229 XX XX XX XX"
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
                      <label className="block mb-1">Adresse</label>
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

                  <h3 className="text-xl font-semibold mt-8 mb-4">Informations sur le véhicule</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-1">Type de véhicule</label>
                      <select
                        value={typeVoiture}
                        onChange={(e) => setTypeVoiture(e.target.value)}
                        className={`w-full border rounded p-2 ${formErrors.typeVoiture ? 'border-red-500' : ''}`}
                        required
                      >
                        <option value="">Sélectionner un type</option>
                        <option value="Neuf">Véhicule neuf</option>
                        <option value="Occasion">Véhicule d'occasion</option>
                        <option value="Electrique">Véhicule électrique</option>
                        <option value="Hybride">Véhicule hybride</option>
                      </select>
                      {formErrors.typeVoiture && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {formErrors.typeVoiture}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block mb-1">Marque</label>
                      <input
                        type="text"
                        value={marque}
                        onChange={(e) => setMarque(e.target.value)}
                        className={`w-full border rounded p-2 ${formErrors.marque ? 'border-red-500' : ''}`}
                        required
                      />
                      {formErrors.marque && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {formErrors.marque}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block mb-1">Modèle</label>
                      <input
                        type="text"
                        value={modele}
                        onChange={(e) => setModele(e.target.value)}
                        className={`w-full border rounded p-2 ${formErrors.modele ? 'border-red-500' : ''}`}
                        required
                      />
                      {formErrors.modele && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {formErrors.modele}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block mb-1">Année de fabrication</label>
                      <input
                        type="number"
                        min="1900"
                        max={new Date().getFullYear()}
                        value={annee}
                        onChange={(e) => setAnnee(e.target.value)}
                        className={`w-full border rounded p-2 ${formErrors.annee ? 'border-red-500' : ''}`}
                        required
                      />
                      {formErrors.annee && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {formErrors.annee}
                        </p>
                      )}
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold mt-8 mb-4">Détails du crédit</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-1">Montant souhaité (FCFA)</label>
                      <input
                        type="number"
                        min={MIN_AMOUNT}
                        max={MAX_AMOUNT}
                        value={montant}
                        onChange={(e) => setMontant(e.target.value)}
                        className={`w-full border rounded p-2 ${formErrors.montant ? 'border-red-500' : ''}`}
                        required
                      />
                      {formErrors.montant && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {formErrors.montant}
                        </p>
                      )}
                      <p className="text-xs text-gray-500 mt-1">Entre {MIN_AMOUNT.toLocaleString()} FCFA et {MAX_AMOUNT.toLocaleString()} FCFA</p>
                    </div>
                    <div>
                      <label className="block mb-1">Durée en mois</label>
                      <input
                        type="number"
                        min={MIN_DURATION}
                        max={MAX_DURATION}
                        value={duree}
                        onChange={(e) => setDuree(e.target.value)}
                        className={`w-full border rounded p-2 ${formErrors.duree ? 'border-red-500' : ''}`}
                        required
                      />
                      {formErrors.duree && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {formErrors.duree}
                        </p>
                      )}
                      <p className="text-xs text-gray-500 mt-1">Entre {MIN_DURATION} et {MAX_DURATION} mois</p>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-between">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-4 py-2 border rounded hover:bg-gray-100 transition"
                    >
                      Précédent
                    </button>
                    <button
                      type="submit"
                      className="bg-red-900 text-white px-6 py-2 rounded hover:bg-yellow-500 transition"
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
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold mb-2">Veuillez fournir les documents suivants :</h3>
                    <ul className="list-disc ml-5 space-y-1">
                      <li>Copie de la pièce d'identité (CNI ou passeport)</li>
                      <li>Bulletins de salaire des 3 derniers mois</li>
                      <li>Carte grise ou contrat de vente du véhicule</li>
                      <li>Relevés bancaires des 3 derniers mois</li>
                      <li>Justificatifs de revenus</li>
                      <li>Attestation d'assurance du véhicule</li>
                    </ul>
                  </div>
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
                      Précédent
                    </button>
                    <button
                      type="submit"
                      className="bg-red-900 text-white px-6 py-2 rounded hover:bg-yellow-500 transition"
                    >
                      Continuer
                    </button>
                  </div>
                </motion.form>
              )}

              {currentStep === 'summary' && (
                <motion.section
                  key="summary"
                  initial="enter"
                  animate="center"
                  exit="exit"
                  variants={variants}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl font-bold mb-4">Récapitulatif</h2>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2">Informations personnelles</h3>
                      <p>Nom : {nom}</p>
                      <p>E-mail : {email}</p>
                      <p>Téléphone : {telephone}</p>
                      <p>Adresse : {adresse}, {codePostal} {ville}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2">Détails du crédit</h3>
                      <p>Montant : {Number(montant).toLocaleString('fr-FR')} FCFA</p>
                      <p>Durée : {duree} mois</p>
                      <p>Type de véhicule : {typeVoiture}</p>
                      <p>Marque : {marque}</p>
                      <p>Modèle : {modele}</p>
                      <p>Année : {annee}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2">Documents fournis</h3>
                      <ul className="list-disc ml-5">
                        {documents.map((file, index) => (
                          <li key={index}>{file.name}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="flex justify-between mt-6">
                    <button
                      onClick={prevStep}
                      className="px-4 py-2 border rounded hover:bg-gray-100 transition"
                    >
                      Précédent
                    </button>
                    <button
                      onClick={sendFormData}
                      disabled={isSubmitting}
                      className="bg-red-900 text-white px-6 py-2 rounded hover:bg-yellow-500 transition disabled:opacity-50"
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
                      <CheckCircle className="w-20 h-20 text-red-500 mx-auto mb-4" />
                    </motion.div>
                    <h2 className="text-3xl font-bold mb-4 text-red-600">Demande envoyée avec succès !</h2>
                    <p className="text-gray-600 mb-6">
                      Merci pour votre demande de crédit auto. Nous vous contacterons dans les plus brefs délais.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg mb-8">
                    <h3 className="font-semibold text-lg mb-4">Vos informations de demande</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                      <div>
                        <p className="text-sm text-gray-500">Numéro de demande</p>
                        <p className="text-xl font-mono font-bold text-red-900">
                          {Math.random().toString(36).substr(2, 8).toUpperCase()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Date de soumission</p>
                        <p className="text-lg font-semibold">
                          {new Date().toLocaleDateString('fr-FR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-red-50 p-6 rounded-lg mb-8">
                    <h3 className="font-semibold text-lg mb-4">Prochaines étapes</h3>
                    <ul className="space-y-3 text-left">
                      <li className="flex items-start">
                        <Clock className="w-5 h-5 text-red-900 mr-2 mt-1 flex-shrink-0" />
                        <span>Nous traitons votre demande dans les plus brefs délais</span>
                      </li>
                      <li className="flex items-start">
                        <Mail className="w-5 h-5 text-red-900 mr-2 mt-1 flex-shrink-0" />
                        <span>Vous recevrez un e-mail de confirmation avec tous les détails</span>
                      </li>
                      <li className="flex items-start">
                        <Phone className="w-5 h-5 text-red-900 mr-2 mt-1 flex-shrink-0" />
                        <span>Un conseiller vous contactera sous 24h ouvrées</span>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <button
                      onClick={resetAll}
                      className="bg-red-900 text-white px-8 py-3 rounded-lg hover:bg-yellow-500 transition transform hover:scale-105"
                    >
                      Nouveau formulaire
                    </button>
                    <div className="mt-4">
                      <button
                        type="button"
                        onClick={handlePrint}
                        className="flex items-center justify-center w-full md:w-auto px-6 py-2 border border-red-900 text-red-900 rounded hover:bg-red-50 transition"
                      >
                        <Printer className="w-4 h-4 mr-2" />
                        Imprimer la confirmation
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