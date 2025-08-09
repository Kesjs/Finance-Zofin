import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cookie, Shield, Settings } from 'lucide-react';

export default function CookieBanner() {
  const [visible, setVisible] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

  const closeBanner = () => {
    setVisible(false);
  };

  const acceptCookies = () => {
    setVisible(false);
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  if (!visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="fixed bottom-0 left-0 right-0 z-50 w-full flex justify-center"
        aria-live="polite"
        role="dialog"
        aria-labelledby="cookie-title"
      >
        <div className="relative w-full max-w-4xl bg-white text-gray-900 px-6 py-6 shadow-2xl border-t border-gray-200 rounded-t-lg mx-4 mb-4">
          <button
            onClick={closeBanner}
            aria-label="Fermer"
            className="absolute top-4 right-4 text-gray-500 hover:text-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 rounded-full p-1"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-start gap-4">
            <div className="hidden sm:flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full flex-shrink-0">
              <Cookie className="w-6 h-6 text-yellow-600" />
            </div>

            <div className="flex-grow">
              <h2 id="cookie-title" className="text-xl font-semibold flex items-center gap-2 mb-3">
                <span className="sm:hidden">
                  <Cookie className="w-5 h-5 text-yellow-600" />
                </span>
                Gestion des cookies
              </h2>

              <p className="text-gray-700 mb-4">
                Nous utilisons des cookies pour assurer le bon fonctionnement et la sécurité de notre plateforme de crédit en ligne, analyser le trafic et personnaliser votre expérience.
                <span className="inline-flex items-center ml-1">
                  <Shield className="w-4 h-4 text-blue-600" />
                </span>
              </p>

              <p className="text-gray-700 mb-4">
                Certains cookies tiers (par exemple Google Analytics) peuvent être utilisés pour améliorer nos services.
                <span className="inline-flex items-center ml-1">
                  <Settings className="w-4 h-4 text-gray-600" />
                </span>
              </p>

              <div className="flex flex-wrap gap-2 text-sm text-gray-600 mb-4">
                <Link to="/politique-de-confidentialite" className="underline hover:text-blue-600 transition-colors">
                  Politique de confidentialité
                </Link>
                <span>•</span>
                <Link to="/conditions-utilisation" className="underline hover:text-blue-600 transition-colors">
                  Conditions d'utilisation
                </Link>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={acceptCookies}
                  className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-6 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors"
                  aria-label="Accepter les cookies"
                >
                  Accepter
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={toggleSettings}
                  className="border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold px-6 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors"
                  aria-label="Paramètres des cookies"
                >
                  Paramètres
                </motion.button>
              </div>

              <AnimatePresence>
                {showSettings && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 pt-4 border-t border-gray-200"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2">
                          <input type="checkbox" className="form-checkbox h-4 w-4 text-yellow-600" defaultChecked disabled />
                          <span>Cookies essentiels</span>
                        </label>
                        <span className="text-sm text-gray-500">Toujours actifs</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2">
                          <input type="checkbox" className="form-checkbox h-4 w-4 text-yellow-600" />
                          <span>Cookies d'analyse</span>
                        </label>
                        <span className="text-sm text-gray-500">Optionnel</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2">
                          <input type="checkbox" className="form-checkbox h-4 w-4 text-yellow-600" />
                          <span>Cookies de marketing</span>
                        </label>
                        <span className="text-sm text-gray-500">Optionnel</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}