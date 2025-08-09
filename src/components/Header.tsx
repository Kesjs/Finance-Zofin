/* eslint-disable @typescript-eslint/no-unused-vars */
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { SiGmail } from 'react-icons/si';

const creditOffers = [
  { title: 'Crédit Personnel', href: '/nos-offres/credit-personnel' },
  { title: 'Crédit Immobilier', href: '/nos-offres/credit-immobilier' },
  { title: 'Crédit Auto', href: '/nos-offres/credit-auto' },
  { title: 'Crédit Entreprise', href: '/nos-offres/credit-entreprise' },
];

export default function Header() {
  const location = useLocation();
  const currentPath = location.pathname + location.hash;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(false);

  const handleNosOffresClick = () => {
    setIsContentVisible(!isContentVisible);
    setShowDropdown(false);
  };

  const handleMenuKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      setIsMenuOpen(!isMenuOpen);
    }
  };

  function isActiveLink(to: string) {
    return currentPath === to;
  }

  return (
    <>
      <header className="fixed w-full bg-white shadow-md z-50" role="navigation" aria-label="Hauptnavigation">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center space-x-2"
            >
              <HashLink smooth to="/#hero" className="flex items-center space-x-2">
                <img
                  src="https://img.icons8.com/ios-filled/50/eab308/topup-payment.png"
                  alt="Zofin Bénin - Services Financiers"
                  className="w-8 h-8"
                  loading="eager"
                  width={50}
                  height={50}
                />
                <span className="text-2xl font-bold text-yellow-500">Zofin Bénin</span>
              </HashLink>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8 items-center" aria-label="Hauptmenü">
              {[
                { to: '/#hero', label: 'Accueil' },
                { to: '/#services', label: 'Services' },
                { to: '/#about', label: 'À propos' },
                { to: '/#contact', label: 'Contact' },
              ].map((link) => (
                <HashLink
                  smooth
                  to={link.to}
                  key={link.to}
                  className={`transition-colors ${
                    isActiveLink(link.to)
                      ? 'text-yellow-600 font-semibold underline'
                      : 'text-gray-600 hover:text-yellow-500'
                  }`}
                  aria-current={isActiveLink(link.to) ? 'page' : undefined}
                >
                  {link.label}
                </HashLink>
              ))}

              {/* Kreditangebote Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setShowDropdown(true)}
                onMouseLeave={() => setShowDropdown(false)}
              >
                <motion.button
                  className={`flex items-center transition-all ${
                    location.pathname.startsWith('/unsere-angebote')
                      ? 'text-yellow-600 font-semibold underline'
                      : 'text-gray-600 hover:text-yellow-500'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  onClick={handleNosOffresClick}
                  aria-label="Kreditangebote anzeigen"
                  aria-expanded={showDropdown}
                  aria-controls="kreditangebote-menu"
                >
                  Nos offres <ChevronDown className="ml-1 w-4 h-4" aria-hidden="true" />
                </motion.button>

                <AnimatePresence>
                  {showDropdown && !isContentVisible && (
                    <motion.ul
                      id="kreditangebote-menu"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute bg-white mt-2 shadow-xl rounded-lg py-2 w-56 z-50"
                      role="menu"
                    >
                      {creditOffers.map((offer, index) => (
                        <li key={index} role="none">
                          <Link
                            to={offer.href}
                            className={`block px-4 py-2 transition-all ${
                              location.pathname === offer.href
                                ? 'bg-yellow-200 text-yellow-600 font-semibold'
                                : 'text-gray-800 hover:bg-yellow-200 hover:text-yellow-600'
                            }`}
                            onClick={() => setShowDropdown(false)}
                            role="menuitem"
                            aria-label={offer.title}
                          >
                            {offer.title}
                          </Link>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            </nav>

            {/* E-Mail Desktop */}
            <motion.div
              className="hidden md:flex items-center"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link
                to="/demande-de-pret"
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors font-medium flex items-center space-x-2"
                aria-label="Faire une demande de crédit"
              >
                <SiGmail className="w-4 h-4" />
                <span>Faire une demande</span>
              </Link>
            </motion.div>

            {/* Mobile menu toggle */}
            <div className="md:hidden">
              <button
                onClick={() => {
                  setIsMenuOpen(!isMenuOpen);
                  setIsMobileDropdownOpen(false);
                }}
                className="text-gray-600 hover:text-yellow-500"
                aria-label={isMenuOpen ? 'Menü schließen' : 'Menü öffnen'}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
                tabIndex={0}
                onKeyDown={handleMenuKeyDown}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="md:hidden absolute left-0 right-0 top-20 bg-white bg-opacity-95 shadow-lg z-40 hover:bg-gray-100"
              role="menu"
            >
              <div className="space-y-4 px-4 py-4 flex flex-col items-center">
                {[
                  { to: '/#hero', label: 'Startseite' },
                  { to: '/#services', label: 'Dienstleistungen' },
                  { to: '/#about', label: 'Über uns' },
                  { to: '/#contact', label: 'Kontakt' },
                ].map((link) => (
                  <HashLink
                    smooth
                    to={link.to}
                    key={link.to}
                    className={`block transition-colors ${
                      isActiveLink(link.to)
                        ? 'text-yellow-600 font-semibold underline'
                        : 'text-gray-600 hover:text-yellow-500'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                    role="menuitem"
                    aria-current={isActiveLink(link.to) ? 'page' : undefined}
                  >
                    {link.label}
                  </HashLink>
                ))}

                {/* Mobile Dropdown Button */}
                <div className="w-full">
                  <button
                    className="w-full text-center font-semibold text-gray-800 py-2 flex justify-center items-center"
                    onClick={() => setIsMobileDropdownOpen((prev) => !prev)}
                    aria-expanded={isMobileDropdownOpen}
                    aria-controls="mobile-kreditangebote"
                  >
                    Nos offres <ChevronDown className="ml-1 w-4 h-4" />
                  </button>

                  <AnimatePresence>
                    {isMobileDropdownOpen && (
                      <motion.ul
                        id="mobile-kreditangebote"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-2 mt-2"
                      >
                        {creditOffers.map((offer, index) => (
                          <li key={index} className="text-center">
                            <Link
                              to={offer.href}
                              className="block text-gray-600 hover:text-yellow-500 transition-colors"
                              onClick={() => {
                                setIsMenuOpen(false);
                                setIsMobileDropdownOpen(false);
                              }}
                              role="menuitem"
                            >
                              {offer.title}
                            </Link>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Floating Email Button for Mobile */}
      <div className="md:hidden fixed bottom-4 right-4 z-50">
        <a
          href="mailto:support-contact@zofin.space"
          className="flex items-center bg-yellow-400 text-black px-4 py-2 rounded-full shadow-lg hover:bg-yellow-300 transition-colors"
          aria-label="E-Mail Kontakt"
        >
          <SiGmail className="w-5 h-5 mr-2" aria-hidden="true" />
          <span>E-Mail</span>
        </a>
      </div>
    </>
  );
}
