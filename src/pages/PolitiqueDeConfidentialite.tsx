import Header from '../components/Header';
import { Helmet } from 'react-helmet';

export default function PolitiqueDeConfidentialite() {
  return (
    <>
      <Helmet>
        <title>Politique de Confidentialité | Zofin - Vos données sont en sécurité</title>
        <meta name="description" content="Découvrez comment nous protégeons vos données personnelles. Notre politique de confidentialité explique de manière transparente comment nous utilisons et protégeons vos données dans le cadre de votre demande de crédit." />
        <meta name="keywords" content="Protection des données, Politique de confidentialité, Cookies, Données personnelles, Plateforme de crédit, Sécurité des données, Bénin" />
        <meta property="og:title" content="Politique de Confidentialité | Zofin Bénin" />
        <meta property="og:description" content="Informations transparentes sur la protection de vos données personnelles lors de l'utilisation de notre plateforme de crédit au Bénin." />
        <meta property="og:type" content="website" />
      </Helmet>

      <Header />
      <main className="max-w-3xl mx-auto px-4 py-10 text-gray-900 mt-24">
        <h1 className="text-3xl font-bold mb-6">Politique de Confidentialité</h1>
        <p className="mb-4">
          La présente politique de confidentialité décrit comment nous collectons, utilisons et protégeons vos données personnelles lorsque vous utilisez notre plateforme de crédit en ligne au Bénin.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">1. Collecte des informations</h2>
        <p className="mb-4">
          Nous collectons uniquement les informations nécessaires à l'étude et au traitement de votre demande de crédit (nom, prénom, coordonnées, informations financières, etc.). Certaines données sont collectées automatiquement via des cookies pour assurer le bon fonctionnement du site et améliorer votre expérience utilisateur.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">2. Utilisation des cookies</h2>
        <p className="mb-4">
          Les cookies utilisés sur notre site internet ont les finalités suivantes :
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Assurer la sécurité et le fonctionnement optimal du site</li>
          <li>Analyser la fréquentation et l'utilisation des pages</li>
          <li>Personnaliser votre expérience et faciliter votre navigation</li>
          <li>Adapter nos services à vos préférences</li>
        </ul>
        <p className="mb-4">
          Vous pouvez accepter ou refuser les cookies non essentiels à tout moment via notre bannière de consentement.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">3. Utilisation des données</h2>
        <p className="mb-4">
          Vos données sont utilisées exclusivement pour le traitement de votre demande de crédit et pour vous contacter dans le cadre de nos services. Elles ne seront jamais vendues à des tiers sans votre consentement explicite.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">4. Sécurité des données</h2>
        <p className="mb-4">
          Nous mettons en œuvre toutes les mesures techniques et organisationnelles nécessaires pour protéger vos données contre tout accès non autorisé, perte ou divulgation. Nos systèmes sont conformes aux normes de sécurité en vigueur au Bénin.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">5. Vos droits</h2>
        <p className="mb-4">
          Conformément à la loi n°2009-09 du 22 mai 2009 relative à la protection des données à caractère personnel en République du Bénin, vous disposez des droits suivants :
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Droit d'accès à vos données personnelles</li>
          <li>Droit de rectification des données inexactes</li>
          <li>Droit à l'effacement (droit à l'oubli)</li>
          <li>Droit d'opposition au traitement</li>
          <li>Droit à la portabilité des données</li>
        </ul>
        <p className="mb-4">
          Pour exercer ces droits, vous pouvez nous contacter via le formulaire de contact ou à l'adresse email indiquée dans nos mentions légales.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">6. Conservation des données</h2>
        <p className="mb-4">
          Vos données sont conservées pendant la durée nécessaire à la finalité pour laquelle elles ont été collectées, conformément aux obligations légales en vigueur au Bénin. Les données des demandes de crédit sont conservées pendant 5 ans à compter de la dernière mise à jour, sauf obligation légale contraire.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">7. Transfert des données</h2>
        <p className="mb-4">
          Vos données peuvent être transférées à nos partenaires financiers au Bénin dans le cadre du traitement de votre demande de crédit. Nous nous assurons que ces partenaires offrent des garanties suffisantes en matière de protection des données.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">8. Modifications de la politique</h2>
        <p className="mb-4">
          Nous nous réservons le droit de modifier la présente politique de confidentialité à tout moment. Les modifications prendront effet dès leur publication sur notre site. Nous vous encourageons à consulter régulièrement cette page pour rester informé des mises à jour.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">9. Contact</h2>
        <p className="mb-4">
          Pour toute question relative à la protection de vos données personnelles, vous pouvez nous contacter :
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Par email : donnees@zofin-benin.bj</li>
          <li>Par téléphone : +229 XX XX XX XX</li>
          <li>Par courrier : Zofin Bénin, Service Protection des Données, [Adresse complète], Bénin</li>
        </ul>
        <p>
          Notre délégué à la protection des données (DPO) est également à votre disposition à l'adresse dpo@zofin-benin.bj pour toute question spécifique concernant la protection de vos données personnelles.
        </p>
      </main>
    </>
  );
}