import React, { useState, useCallback, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, CheckCircle, Clock, Shield, AlertCircle, Mail, Phone, Printer } from 'lucide-react';
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
}

const LOCAL_STORAGE_KEY = 'privatkreditData';

const MAX_FILE_SIZE_MB = 5;
const ALLOWED_TYPES = ['application/pdf', 'image/jpeg', 'image/png'];

const MIN_AMOUNT = 1000;
const MAX_AMOUNT = 50000;
const MIN_DURATION = 12;
const MAX_DURATION = 84;

export default function Privatkredit() {
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
    };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  }, [currentStep, isAccepted, nom, email, telephone, adresse, codePostal, ville, montant, duree]);

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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      errors.email = 'Veuillez entrer une adresse email valide';
      isValid = false;
    }

    // Validation du téléphone (format béninois: +229 XX XX XX XX ou 00229 XX XX XX XX ou 9 chiffres)
    const phoneRegex = /^(\+229|00229)?[ -]?[0-9]{2}[ -]?[0-9]{2}[ -]?[0-9]{2}[ -]?[0-9]{2}$/;
    if (!telephone || !phoneRegex.test(telephone.replace(/\s/g, ''))) {
      errors.telephone = 'Veuillez entrer un numéro de téléphone valide';
      isValid = false;
    }

    // Validation de l'adresse
    if (!adresse.trim()) {
      errors.adresse = 'Veuillez entrer votre adresse';
      isValid = false;
    }

    // Validation du code postal (format béninois: 01 à 12)
    const postalRegex = /^(0[1-9]|1[0-2])$/;
    if (!codePostal || !postalRegex.test(codePostal)) {
      errors.codePostal = 'Veuillez entrer un code postal valide (01 à 12)';
      isValid = false;
    }

    // Validation de la ville
    if (!ville.trim()) {
      errors.ville = 'Veuillez entrer votre ville';
      isValid = false;
    }

    // Validation du montant (en FCFA)
    const amount = Number(montant);
    if (!montant || isNaN(amount) || amount < MIN_AMOUNT || amount > MAX_AMOUNT) {
      errors.montant = `Le montant doit être compris entre ${MIN_AMOUNT.toLocaleString()} FCFA et ${MAX_AMOUNT.toLocaleString()} FCFA`;
      isValid = false;
    }

    // Validation de la durée (en mois)
    const duration = Number(duree);
    if (!duree || isNaN(duration) || duration < MIN_DURATION || duration > MAX_DURATION) {
      errors.duree = `La durée doit être comprise entre ${MIN_DURATION} et ${MAX_DURATION} mois`;
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
        setDocError('Seuls les fichiers PDF, JPEG et PNG sont acceptés.');
        toast.error('Seuls les fichiers PDF, JPEG et PNG sont acceptés.');
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
    setDocuments([]);
    setDocError('');
    setCurrentStep('intro');
    setFormErrors({});
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    toast.success('Formulaire réinitialisé avec succès.');
  };

  const sendFormData = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    const formData = new FormData();
    formData.append('typePret', 'Crédit Personnel');
    formData.append('nom', nom);
    formData.append('email', email);
    formData.append('telephone', telephone);
    formData.append('adresse', adresse);
    formData.append('codePostal', codePostal);
    formData.append('ville', ville);
    formData.append('montant', montant);
    formData.append('duree', duree);

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
        throw new Error(text || 'Erreur lors de l\'envoi');
      }
      toast.success('Votre demande a été soumise avec succès !');
      nextStep();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setSubmitError(err.message || 'Erreur inconnue');
        toast.error(err.message || 'Erreur inconnue');
      } else {
        setSubmitError('Erreur inconnue');
        toast.error('Une erreur est survenue');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Crédit Personnel | Zofin Bénin</title>
        <meta name="description" content="Crédit personnel flexible avec des conditions avantageuses. Décision rapide et accompagnement personnalisé pour vos projets au Bénin." />
        <meta property="og:title" content="Crédit Personnel | Zofin Bénin" />
        <meta property="og:description" content="Crédit personnel flexible avec des conditions avantageuses. Décision rapide et accompagnement personnalisé pour vos projets au Bénin." />
        <meta name="keywords" content="Crédit personnel, Prêt personnel, Financement, Crédit à la consommation, Projet personnel, Zofin Bénin" />
      </Helmet>

      <section className="py-12 bg-gradient-to-b from-green-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-green-800 mb-4">Crédit Personnel</h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Financement flexible pour réaliser vos projets personnels au Bénin.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {[
              {
                icon: CreditCard,
                title: "Montants flexibles",
                description: "Crédits de 500 000 FCFA à 30 000 000 FCFA pour vos projets"
              },
              {
                icon: Clock,
                title: "Traitement rapide",
                description: "Réponse sous 48h ouvrées"
              },
              {
                icon: CheckCircle,
                title: "Remboursement simplifié",
                description: "Durées flexibles de 3 à 84 mois"
              },
              {
                icon: Shield,
                title: "Financement sécurisé",
                description: "Conditions transparentes sans frais cachés"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <feature.icon className="w-12 h-12 text-yellow-500 mb-4" />
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
            <h2 className="text-2xl font-bold mb-6 text-yellow-800">Avantages de notre crédit personnel</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <CheckCircle className="w-6 h-6 text-yellow-500 mr-2 flex-shrink-0" />
                <span>Aucun frais de dossier</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-6 h-6 text-yellow-500 mr-2 flex-shrink-0" />
                <span>Échéanciers de remboursement personnalisés</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-6 h-6 text-yellow-500 mr-2 flex-shrink-0" />
                <span>Demande en ligne en quelques minutes</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-6 h-6 text-yellow-500 mr-2 flex-shrink-0" />
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
                    Démarrez votre demande de crédit personnel. Le processus ne prend que quelques minutes.
                  </p>
                  <button
                    onClick={() => setCurrentStep('conditions')}
                    className="bg-blue-900 text-white px-6 py-3 rounded-lg hover:bg-yellow-500 transition transform hover:scale-105"
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
                      <li>• Le montant du crédit doit être compris entre 500 000 FCFA et 30 000 000 FCFA.</li>
                      <li>• La durée de remboursement est de 3 à 84 mois.</li>
                      <li>• Vous devez justifier d'une source de revenus stables.</li>
                      <li>• Tous les documents justificatifs requis doivent être fournis.</li>
                      <li>• Un apport personnel peut être demandé selon le profil.</li>
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
                    <span>J'accepte les conditions générales et la politique de confidentialité</span>
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
                      disabled={!isAccepted}
                      className="bg-blue-900 text-white px-6 py-2 rounded hover:bg-yellow-500 transition disabled:opacity-50"
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
                      <label className="block mb-1">Adresse email</label>
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
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
                      className="bg-blue-900 text-white px-6 py-2 rounded hover:bg-yellow-500 transition"
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
                      <li>Copie de la pièce d'identité (CNIB ou passeport)</li>
                      <li>Bulletins de paie des 3 derniers mois</li>
                      <li>Contrat de location ou justificatif de domicile</li>
                      <li>Relevés bancaires des 3 derniers mois</li>
                      <li>Dernier avis d'imposition (si disponible)</li>
                    </ul>
                    <p className="mt-2 text-sm text-gray-600">Format accepté : PDF, JPG, PNG (max {MAX_FILE_SIZE_MB} Mo par fichier)</p>
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
                      Zurück
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-900 text-white px-6 py-2 rounded hover:bg-yellow-500 transition"
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
                  <h2 className="text-2xl font-bold mb-4">Récapitulatif de votre demande</h2>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2">Informations personnelles</h3>
                      <p>Name: {nom}</p>
                      <p>E-Mail: {email}</p>
                      <p>Telefon: {telephone}</p>
                      <p>Adresse: {adresse}, {codePostal} {ville}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2">Détails du crédit</h3>
                      <p>Montant : {parseInt(montant).toLocaleString('fr-FR')} FCFA</p>
                      <p>Durée : {duree} mois</p>
                      <p>Date de la demande : {new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2">Documents joints</h3>
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
                      Zurück
                    </button>
                    <button
                      onClick={sendFormData}
                      disabled={isSubmitting}
                      className="bg-blue-900 text-white px-6 py-2 rounded hover:bg-yellow-500 transition disabled:opacity-50"
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
                    <h2 className="text-3xl font-bold mb-4 text-green-600">Antrag erfolgreich eingereicht!</h2>
                    <p className="text-gray-600 mb-6">
                      Vielen Dank für Ihren Kreditantrag. Wir werden uns innerhalb von 24 Stunden bei Ihnen melden.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg mb-8">
                    <h3 className="font-semibold text-lg mb-4">Ihre Antragsdaten</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                      <div>
                        <p className="text-sm text-gray-500">Antragsnummer</p>
                        <p className="text-xl font-mono font-bold text-blue-900">
                          {Math.random().toString(36).substr(2, 8).toUpperCase()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Eingereicht am</p>
                        <p className="text-lg font-semibold">
                          {new Date().toLocaleDateString('de-DE', {
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

                  <div className="bg-blue-50 p-6 rounded-lg mb-8">
                    <h3 className="font-semibold text-lg mb-4">Nächste Schritte</h3>
                    <ul className="space-y-3 text-left">
                      <li className="flex items-start">
                        <Clock className="w-5 h-5 text-blue-900 mr-2 mt-1 flex-shrink-0" />
                        <span>Wir bearbeiten Ihren Antrag innerhalb von 24 Stunden</span>
                      </li>
                      <li className="flex items-start">
                        <Mail className="w-5 h-5 text-blue-900 mr-2 mt-1 flex-shrink-0" />
                        <span>Sie erhalten eine Bestätigungs-E-Mail mit allen Details</span>
                      </li>
                      <li className="flex items-start">
                        <Phone className="w-5 h-5 text-blue-900 mr-2 mt-1 flex-shrink-0" />
                        <span>Ein Berater wird Sie kontaktieren, um die Details zu besprechen</span>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <button
                      onClick={resetAll}
                      className="bg-blue-900 text-white px-8 py-3 rounded-lg hover:bg-yellow-500 transition transform hover:scale-105"
                    >
                      Neuen Antrag stellen
                    </button>
                    <div>
                      <button
                        onClick={() => window.print()}
                        className="text-blue-900 hover:text-yellow-500 transition flex items-center mx-auto"
                      >
                        <Printer className="w-5 h-5 mr-2" />
                        Antragsdaten drucken
                      </button>
                    </div>
                  </div>
                </motion.section>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </>
  );
} 