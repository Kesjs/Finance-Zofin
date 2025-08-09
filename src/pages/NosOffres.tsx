
import { Link } from 'react-router-dom';
import { MdHome, MdAttachMoney, MdWork } from 'react-icons/md'; // Material Design Icons
import { BiCar } from 'react-icons/bi'; // Bootstrap Icons
import { Helmet } from 'react-helmet';

export default function NosOffres() {
  return (
    <>
      <Helmet>
        <title>Nos offres de crédit | Zofin Bénin - Solutions de financement flexibles</title>
        <meta name="description" content="Découvrez nos offres de crédit personnalisées : crédits personnels, crédits immobiliers, crédits auto et crédits entreprise. Traitement rapide et conditions équitables." />
        <meta name="keywords" content="offres de crédit, crédit personnel, crédit immobilier, crédit auto, crédit entreprise, financement Bénin" />
        <meta property="og:title" content="Nos offres de crédit | Zofin Bénin" />
        <meta property="og:description" content="Découvrez nos offres de crédit personnalisées pour vos besoins personnels et professionnels au Bénin." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://zofin-benin.bj/nos-offres" />
      </Helmet>

      <section id="nos-offres" className="bg-gradient-to-br from-yellow-50 via-yellow-100 to-yellow-200 py-20 text-gray-800">
        <div className="pt-28 px-6">
          <h1 className="text-3xl font-bold mb-8 text-yellow-600 text-center">Nos offres de crédit</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Privatkredit */}
            <article className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105">
              <div className="flex justify-center mb-4">
                <MdHome className="text-yellow-500 text-4xl" aria-hidden="true" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Crédit Personnel</h2>
              <p className="text-gray-700 mb-4">
                Obtenez un financement personnalisé pour vos projets personnels. Ce crédit couvre tous vos besoins, des projets de voyage à l'achat de biens de consommation.
              </p>
              <Link to="/nos-offres/credit-personnel">
                <span className="text-yellow-600 font-semibold cursor-pointer hover:underline">En savoir plus</span>
              </Link>
            </article>

            {/* Immobilienkredit */}
            <article className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105">
              <div className="flex justify-center mb-4">
                <MdAttachMoney className="text-yellow-500 text-4xl" aria-hidden="true" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Crédit Immobilier</h2>
              <p className="text-gray-700 mb-4">
                Réalisez votre projet immobilier avec des conditions flexibles. Découvrez des solutions personnalisées pour chaque étape de votre projet, de l'acquisition à la rénovation.
              </p>
              <Link to="/nos-offres/credit-immobilier">
                <span className="text-yellow-600 font-semibold cursor-pointer hover:underline">En savoir plus</span>
              </Link>
            </article>

            {/* Autokredit */}
            <article className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105">
              <div className="flex justify-center mb-4">
                <BiCar className="text-yellow-500 text-4xl" aria-hidden="true" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Crédit Auto</h2>
              <p className="text-gray-700 mb-4">
                Financez l'achat de votre véhicule neuf ou d'occasion simplement. Trouvez l'option qui vous convient pour rouler en toute sérénité.
              </p>
              <Link to="/nos-offres/credit-auto">
                <span className="text-yellow-600 font-semibold cursor-pointer hover:underline">En savoir plus</span>
              </Link>
            </article>

            {/* Geschäftskredit */}
            <article className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105">
              <div className="flex justify-center mb-4">
                <MdWork className="text-yellow-500 text-4xl" aria-hidden="true" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Crédit Entreprise</h2>
              <p className="text-gray-700 mb-4">
                Donnez à votre entreprise les moyens de se développer. Découvrez nos solutions de financement sur mesure adaptées à votre secteur d'activité au Bénin.
              </p>
              <Link to="/nos-offres/credit-entreprise">
                <span className="text-yellow-600 font-semibold cursor-pointer hover:underline">En savoir plus</span>
              </Link>
            </article>
            
          </div>
        </div>
      </section>
    </>
  );
}
