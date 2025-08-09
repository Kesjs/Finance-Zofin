import { motion } from 'framer-motion';
import { Mail, MapPin, Send, Phone, Building2, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import Helmet from 'react-helmet';
import { toast } from 'react-hot-toast';

// Schema.org-Markup für SEO (ContactPage + Organization)
const contactJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "mainEntity": {
    "@type": "Organization",
    "name": "Zofin Bénin",
    "url": "https://zofin-benin.bj",
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "contact@zofin-benin.bj",
      "telephone": "+229 21 30 40 50",
      "contactType": "customer support"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Rue 3.14, Immeuble Le Patio",
      "postalCode": "01 BP 1234",
      "addressLocality": "Cotonou",
      "addressCountry": "BJ"
    }
  }
};

export default function Contact() {
  const [formStatus, setFormStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simuler un délai d'envoi
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setFormStatus('Message envoyé !');
    toast.success('Votre message a été envoyé avec succès !');
    setTimeout(() => setFormStatus(''), 3000);
    setIsSubmitting(false);
  };

  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-br from-yellow-50 via-white to-yellow-100"
      aria-label="Kontakt"
    >
      <Helmet>
        <title>Contact | Zofin Bénin - Nous sommes là pour vous</title>
        <meta name="description" content="Des questions sur nos offres de crédit ? Notre équipe est à votre écoute. Contactez-nous par téléphone, email ou via notre formulaire de contact." />
        <meta name="keywords" content="contact, conseil en crédit, financement, Zofin, Bénin, Cotonou" />
        <meta property="og:title" content="Contact | Zofin Bénin - Votre partenaire crédit" />
        <meta property="og:description" content="Contactez-nous pour un conseil personnalisé sur vos possibilités de financement. Un accompagnement rapide et compétent." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://zofin-benin.bj/contact" />
      </Helmet>

      {/* SEO ContactPage JSON-LD */}
      <script type="application/ld+json">{JSON.stringify(contactJsonLd)}</script>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-yellow-800 mb-4">Contactez-nous</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Un projet ? Une question ? Notre équipe vous répond rapidement et professionnellement.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Kontaktinformationen */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8 bg-white p-8 rounded-2xl shadow-lg"
          >
            <div className="flex items-center">
              <div className="bg-yellow-500 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
                <Building2 className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-800">Zofin Bénin</h3>
                <p className="text-gray-600">Votre partenaire financier de confiance</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-yellow-600" />
              <span className="text-gray-700">+229 01 97 91 49 22</span>
            </div>

            <div className="flex items-center">
              <div className="bg-yellow-500 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
                <MapPin className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-800">Adresse</h3>
                <p className="text-gray-600">Rue 3.14, Immeuble Le Patio, 01 BP 1234, Cotonou, Bénin</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="bg-yellow-500 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
                <Mail className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-800">E-Mail</h3>
                <a href="mailto:contact@zofin-benin.bj" className="text-yellow-600 hover:text-yellow-700 transition-colors">
                  contact@zofin-benin.bj
                </a>
              </div>
            </div>
          </motion.div>

          {/* Kontaktformular */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg space-y-6" aria-label="Formulaire de contact">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Téléphone *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="tel"
                      id="phone"
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 focus:outline-none transition"
                      placeholder="Votre numéro de téléphone"
                      pattern="(\+229|0)[0-9]{8}"
                      title="Veuillez entrer un numéro de téléphone béninois valide"
                    />
                  </div>
                </div>

                <div className="relative">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    E-Mail *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      id="email"
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 focus:outline-none transition"
                      placeholder="Votre adresse e-mail"
                    />
                  </div>
                </div>
              </div>

              <div className="relative">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Sujet *
                </label>
                <select
                  id="subject"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 focus:outline-none transition appearance-none bg-white"
                  required
                >
                  <option value="" disabled selected>Sélectionnez un sujet</option>
                  <option value="credit">Demande de crédit</option>
                  <option value="support">Support technique</option>
                  <option value="rdv">Prendre rendez-vous</option>
                  <option value="general">Demande d'information</option>
                  <option value="other">Autre demande</option>
                </select>
              </div>

              <div className="relative">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-4 text-gray-400 w-5 h-5" />
                  <textarea
                    id="message"
                    required
                    rows={4}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 focus:outline-none transition resize-none"
                    placeholder="Votre message"
                  ></textarea>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition-colors flex items-center justify-center font-semibold shadow-lg ${
                  isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                }`}
                aria-label="Envoyer le message"
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Envoi en cours...
                  </div>
                ) : (
                  <>
                    Envoyer le message
                    <Send className="w-5 h-5 ml-2" aria-hidden="true" />
                  </>
                )}
              </motion.button>

              {formStatus && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-green-600 text-center font-medium"
                  role="status"
                  aria-live="polite"
                >
                  {formStatus}
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}