import Header from '../components/Header';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function ConditionsUtilisation() {
  return (
    <>
      <Helmet>
        <title>Conditions d'utilisation | Zofin - Solutions de crédit transparentes</title>
        <meta name="description" content="Consultez nos conditions d'utilisation pour zofin.space. En savoir plus sur l'utilisation de notre plateforme de crédit, la protection des données et vos droits." />
        <meta name="keywords" content="conditions d'utilisation, CGU, plateforme de crédit, protection des données, cookies, sécurité" />
        <meta property="og:title" content="Conditions d'utilisation | Zofin" />
        <meta property="og:description" content="Conditions d'utilisation transparentes pour notre plateforme de crédit. Informez-vous sur vos droits et obligations." />
        <meta property="og:type" content="website" />
      </Helmet>

      <Header />
      <main className="max-w-3xl mx-auto px-4 py-16 text-gray-900 mt-24 bg-gray-50 rounded-lg mb-8 shadow-md">
        <h1 className="text-3xl font-bold mb-8">Conditions d'utilisation</h1>

        <p className="mb-8">
          Les présentes conditions d'utilisation régissent l'accès et l'utilisation du site <strong>zofin.space</strong>. En utilisant ce site, vous acceptez ces conditions dans leur intégralité et sans réserve.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">1. Objet du site</h2>
        <p className="mb-8">
          Le site <strong>zofin.space</strong> propose des informations et des services liés à la simulation et à la demande de crédit en ligne. Les informations fournies sont données à titre indicatif uniquement et ne constituent pas une offre contractuelle.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">2. Accès au site</h2>
        <p className="mb-8">
          L'accès au site est gratuit. L'utilisateur reconnaît disposer des compétences et moyens nécessaires pour accéder et utiliser ce site. L'accès peut être suspendu pour maintenance ou en cas de force majeure.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">3. Responsabilité</h2>
        <p className="mb-8">
          Nous nous efforçons de fournir des informations précises et à jour. Cependant, nous ne pouvons être tenus responsables des erreurs, omissions ou résultats pouvant découler d'une mauvaise utilisation de ces informations. L'utilisateur reste seul responsable de l'utilisation des informations disponibles sur le site.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">4. Propriété intellectuelle</h2>
        <p className="mb-8">
          Le contenu du site (textes, images, logos, icônes, etc.) est protégé par le droit d'auteur et la propriété intellectuelle. Toute reproduction, représentation, modification, publication ou adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite sans autorisation écrite préalable.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">5. Données personnelles</h2>
        <p className="mb-8">
          Les informations collectées via le site sont traitées conformément à notre&nbsp;
          <Link to="/politique-de-confidentialite" className="underline text-blue-600 hover:text-blue-800">
            politique de confidentialité
          </Link>. Vous disposez d'un droit d'accès, de rectification et de suppression de vos données.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">6. Cookies</h2>
        <p className="mb-8">
          Le site utilise des cookies pour améliorer l'expérience utilisateur, établir des statistiques de fréquentation et proposer des contenus personnalisés. Vous pouvez gérer vos préférences à tout moment via la bannière de cookies.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">7. Sécurité</h2>
        <p className="mb-8">
          Nous mettons en œuvre toutes les mesures nécessaires pour assurer la sécurité des informations échangées. Cependant, une sécurité totale sur Internet ne peut être garantie.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">8. Liens externes</h2>
        <p className="mb-8">
          Le site peut contenir des liens vers d'autres sites. Nous ne sommes pas responsables du contenu ou des pratiques en matière de protection des données de ces sites tiers.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">9. Modification des conditions</h2>
        <p className="mb-8">
          Nous nous réservons le droit de modifier ces conditions d'utilisation à tout moment. Les utilisateurs sont invités à les consulter régulièrement.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">10. Contact</h2>
        <p>
          Pour toute question concernant ces conditions, vous pouvez nous contacter via le formulaire de contact ou par email à l'adresse indiquée dans nos mentions légales.
        </p>
      </main>
    </>
  );
}
