import React from 'react';
import { Helmet } from 'react-helmet';

console.log('CreditEntreprise component is loaded');

const CreditEntreprise: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Crédit Professionnel | Zofin Finance Bénin</title>
        <meta name="description" content="Financez votre entreprise avec nos solutions de crédit professionnel adaptées à vos besoins." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">Crédit Professionnel</h1>
            <p className="mt-1 text-sm text-gray-500">Financement adapté pour votre entreprise</p>
          </div>
          
          <div className="px-6 py-8">
            <div className="text-center">
              <h2 className="text-xl font-bold text-gray-900">Page en construction</h2>
              <p className="mt-2 text-gray-600">
                Cette page est actuellement en cours de développement. Veuillez nous excuser pour la gêne occasionnée.
              </p>
              <div className="mt-6">
                <a
                  href="/"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Retour à l'accueil
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditEntreprise;
