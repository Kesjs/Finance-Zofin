import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect, useState, lazy, Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import { Helmet } from 'react-helmet';

// Lazy loading des composants
const Home = lazy(() => import('./pages/Home'));
const NosOffres = lazy(() => import('./pages/NosOffres'));
const CreditAuto = lazy(() => import('./pages/CreditAuto'));
const CreditImmobilier = lazy(() => import('./pages/CreditImmobilier'));
const CreditPersonnel = lazy(() => import('./pages/CreditPersonnel'));
const CreditEntreprise = lazy(() => import('./pages/CreditEntreprise'));
const Header = lazy(() => import('./components/Header'));
const Footer = lazy(() => import('./components/Footer'));
const Breadcrumb = lazy(() => import('./components/Breadcrumb'));
const Loader = lazy(() => import('./components/Loader'));
const CookieBanner = lazy(() => import('./pages/CookieBanner'));
const PolitiqueDeConfidentialite = lazy(() => import('./pages/PolitiqueDeConfidentialite'));
const ConditionsUtilisation = lazy(() => import('./pages/ConditionsUtilisation'));
const ScrollToTop = lazy(() => import('./components/ScrollToTop'));

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Réduire le temps de chargement à 1 seconde
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <Router>
      <Helmet>
        {/* Google tag (gtag.js) - Chargé de manière asynchrone */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-17097206468"></script>
        <script async>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17097206468');
          `}
        </script>
      </Helmet>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Toaster position="top-center" />
        <Suspense fallback={<Loader />}>
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/nos-offres" element={<NosOffres />} />
              <Route path="/nos-offres/credit-personnel" element={<WithBreadcrumb component={<CreditPersonnel />} title="Crédit Personnel" />} />
              <Route path="/nos-offres/credit-immobilier" element={<WithBreadcrumb component={<CreditImmobilier />} title="Crédit Immobilier" />} />
              <Route path="/nos-offres/credit-auto" element={<WithBreadcrumb component={<CreditAuto />} title="Crédit Auto" />} />
              <Route path="/nos-offres/credit-entreprise" element={<WithBreadcrumb component={<CreditEntreprise />} title="Crédit Entreprise" />} />
              <Route path="/politique-de-confidentialite" element={<PolitiqueDeConfidentialite />} /> 
              <Route path="/conditions-utilisation" element={<ConditionsUtilisation />} /> 
              <Route path="*" element={<div className="text-center text-gray-600">Page non trouvée</div>} />
            </Routes>
          </main>
          <Footer />
          <CookieBanner />
        </Suspense>
      </div>
    </Router>
  );
}

const WithBreadcrumb = ({ component, title }: { component: JSX.Element; title: string }) => {
  console.log('WithBreadcrumb rendering with title:', title);
  return (
    <div className="container mx-auto px-4 py-6">
      <Breadcrumb
        items={[
          { label: 'Accueil', path: '/' },
          { label: 'Nos offres', path: '/nos-offres' },
          { label: title }
        ]}
      />
      {component}
    </div>
  );
};

export default App;