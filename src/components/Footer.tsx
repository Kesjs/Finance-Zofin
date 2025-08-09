import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-blue-950 text-white py-12" aria-labelledby="footer-heading">
      {/* JSON-LD Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FinancialService",
          "name": "Zofin Bénin",
          "url": "https://zofin-benin.bj",
          "logo": "https://img.icons8.com/ios-filled/50/eab308/topup-payment.png",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Rue 3.14, Immeuble Le Patio",
            "addressLocality": "Cotonou",
            "postalCode": "01 BP 1234",
            "addressCountry": "BJ"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer support",
            "email": "contact@zofin-benin.bj",
            "telephone": "+229 21 30 40 50"
          },
          "sameAs": [
            "#", "#", "#", "#"
          ],
          "description": "Solutions de crédit sur mesure : crédit auto, crédit immobilier, crédit entreprise et crédit personnel au Bénin."
        })
      }} />
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8" role="presentation">
          
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            aria-labelledby="footer-brand"
          >
            <Link to="/" className="flex items-center space-x-2" aria-label="Zofin Bénin Accueil">
              <img
                src="https://img.icons8.com/ios-filled/50/eab308/topup-payment.png"
                alt="Logo Zofin Bénin Services Financiers"
                className="w-8 h-8"
                width={50}
                height={50}
              />
              <span id="footer-brand" className="text-2xl font-bold text-yellow-500">Zofin Bénin</span>
            </Link>
            <p className="text-gray-400 mt-2">
              <strong>Crédits sur mesure</strong> : Réalisez vos projets <strong>personnels</strong> ou <strong>professionnels</strong> avec nos solutions de financement <strong>rapides</strong> et <strong>flexibles</strong> au Bénin.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            aria-labelledby="footer-loans"
          >
            <h3 id="footer-loans" className="text-xl font-bold mb-4">Nos crédits</h3>
            <ul className="space-y-2 text-gray-400" aria-label="Types de crédits proposés">
              <li>
                <Link to="/unsere-angebote/autokredit" className="hover:text-yellow-400 transition focus:outline-none focus:ring-2 focus:ring-yellow-400" aria-label="Crédit auto">
                  Crédit auto
                </Link>
              </li>
              <li>
                <Link to="/unsere-angebote/immobilienkredit" className="hover:text-yellow-400 transition focus:outline-none focus:ring-2 focus:ring-yellow-400" aria-label="Crédit immobilier">
                  Crédit immobilier
                </Link>
              </li>
              <li>
                <Link to="/unsere-angebote/geschaeftskredit" className="hover:text-yellow-400 transition focus:outline-none focus:ring-2 focus:ring-yellow-400" aria-label="Crédit entreprise">
                  Crédit entreprise
                </Link>
              </li>
              <li>
                <Link to="/unsere-angebote/privatkredit" className="hover:text-yellow-400 transition focus:outline-none focus:ring-2 focus:ring-yellow-400" aria-label="Crédit personnel">
                  Crédit personnel
                </Link>
              </li>
            </ul>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            aria-labelledby="footer-contact"
          >
            <h3 id="footer-contact" className="text-xl font-bold mb-4">Kontakt</h3>
            <address className="not-italic space-y-2 text-gray-400" aria-label="Kontaktdaten">
              <div>
                <span aria-label="Adresse">Rue 3.14, Immeuble Le Patio</span>
              </div>
              <div>
                <span aria-label="Land">Bénin</span>
              </div>
              <div>
                <a 
                  href="mailto:support-contact@zofin.space" 
                  className="hover:text-yellow-400 transition focus:outline-none focus:ring-2 focus:ring-yellow-400 flex items-center gap-2" 
                  aria-label="E-Mail-Adresse"
                >
                  <Mail className="w-4 h-4" />
                  support-contact@zofin.space
                </a>
              </div>
            </address>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            aria-labelledby="footer-social"
          >
            <h3 id="footer-social" className="text-xl font-bold mb-4">Réseaux sociaux</h3>
            <nav aria-label="Réseaux sociaux">
              <ul className="flex space-x-4">
                <li>
                  <a href="#" className="hover:text-yellow-400 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400" aria-label="Zofin sur Facebook">
                    <Facebook className="w-6 h-6" aria-hidden="true" />
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-400 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400" aria-label="Zofin sur Twitter">
                    <Twitter className="w-6 h-6" aria-hidden="true" />
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-400 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400" aria-label="Zofin sur Instagram">
                    <Instagram className="w-6 h-6" aria-hidden="true" />
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-400 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400" aria-label="Zofin sur LinkedIn">
                    <Linkedin className="w-6 h-6" aria-hidden="true" />
                  </a>
                </li>
              </ul>
            </nav>
          </motion.section>

        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400 space-y-2"
        >
          <p>
            &copy; {new Date().getFullYear()} Zofin. Tous droits réservés.
          </p>
          <p className="text-sm">
          <Link to="/conditions-utilisation" className="underline text-blue-400 hover:text-yellow-400">
              Conditions d'utilisation
            </Link>{' '}
            |{' '}
            <Link to="/politique-de-confidentialite" className="underline text-blue-400 hover:text-yellow-400">
              Politique de confidentialité
            </Link>
            . Vous avez le droit d'accès, de rectification et de suppression de vos données.
          </p>
        </motion.div>

      </div>
    </footer>
  );
}