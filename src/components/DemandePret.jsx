import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Helmet from "react-helmet";

const DemandePret = () => {
  const [formData, setFormData] = useState({
    type: "",
    montant: "",
    duree: "",
    nom: "",
    email: "",
    telephone: "",
  });

  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const typeFromURL = queryParams.get("type");
    if (typeFromURL) {
      setFormData((prev) => ({ ...prev, type: typeFromURL }));
    }
  }, [location.search]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation supplémentaire du numéro de téléphone
    if (formData.telephone.length !== 8) {
      alert("Veuillez entrer un numéro de téléphone valide à 8 chiffres");
      return;
    }
    
    console.log("Demande envoyée :", formData);
    
    // Réinitialisation du formulaire après soumission
    setFormData({
      type: "",
      montant: "",
      duree: "",
      nom: "",
      email: "",
      telephone: "",
    });
    
    // Message de confirmation
    alert("Votre demande de crédit a été enregistrée avec succès !\n\nNotre équipe vous contactera dans les plus brefs délais au numéro fourni.\n\nMerci pour votre confiance !");
  };

  return (
    <>
      <Helmet>
        <title>Demande de crédit | Zofin Bénin - Demande en ligne rapide et sécurisée</title>
        <meta name="description" content="Remplissez notre formulaire simple pour soumettre votre demande de crédit. Traitement rapide et accompagnement personnalisé." />
        <meta name="keywords" content="demande de crédit, formulaire de crédit, prêt en ligne, Zofin Bénin, financement Bénin" />
        <meta property="og:title" content="Demande de crédit | Zofin Bénin" />
        <meta property="og:description" content="Faites votre demande de crédit en ligne - rapide, simple et sécurisé." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://zofin-benin.bj/demande-de-credit" />
      </Helmet>

      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl">
          <h2 className="text-3xl font-bold text-center mb-6 text-yellow-600">
            Demande de crédit
          </h2>
          <form 
            onSubmit={handleSubmit} 
            className="space-y-4"
            aria-label="Formulaire de demande de crédit"
          >
            <div>
              <label htmlFor="type" className="block text-gray-700 mb-2">Type de crédit</label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                aria-label="Sélectionnez un type de crédit"
              >
                <option value="">Sélectionnez un type de crédit</option>
                <option value="Crédit Personnel">Crédit Personnel</option>
                <option value="Crédit Immobilier">Crédit Immobilier</option>
                <option value="Crédit Auto">Crédit Auto</option>
                <option value="Crédit Entreprise">Crédit Entreprise</option>
              </select>
            </div>

            <div>
              <label htmlFor="montant" className="block text-gray-700 mb-2">Montant souhaité (FCFA)</label>
              <input
                id="montant"
                type="number"
                name="montant"
                placeholder="Montant souhaité (FCFA)"
                value={formData.montant}
                onChange={handleChange}
                required
                min="100000"
                step="10000"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                aria-label="Montant du crédit souhaité en FCFA"
              />
            </div>

            <div>
              <label htmlFor="duree" className="block text-gray-700 mb-2">Durée de remboursement</label>
              <select
                id="duree"
                name="duree"
                value={formData.duree}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                aria-label="Durée de remboursement"
              >
                <option value="">Sélectionnez une durée</option>
                <option value="12 mois">12 mois</option>
                <option value="24 mois">24 mois</option>
                <option value="36 mois">36 mois</option>
                <option value="48 mois">48 mois</option>
                <option value="60 mois">60 mois</option>
                <option value="72 mois">72 mois</option>
              </select>
            </div>

            <div>
              <label htmlFor="nom" className="block text-gray-700 mb-2">Nom complet</label>
              <input
                id="nom"
                type="text"
                name="nom"
                placeholder="Votre nom complet"
                value={formData.nom}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                aria-label="Votre nom complet"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-700 mb-2">Adresse email</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Votre adresse email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                aria-label="Votre adresse email"
              />
            </div>

            <div>
              <label htmlFor="telephone" className="block text-gray-700 mb-2">Numéro de téléphone</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <span className="text-gray-500">+229</span>
                </div>
                <input
                  id="telephone"
                  type="tel"
                  name="telephone"
                  placeholder="XX XX XX XX"
                  value={formData.telephone}
                  onChange={(e) => {
                    // Formatage pour n'accepter que des chiffres
                    const value = e.target.value.replace(/\D/g, '');
                    // Limite à 8 chiffres pour un numéro béninois
                    const formattedValue = value.slice(0, 8);
                    setFormData({...formData, telephone: formattedValue});
                  }}
                  required
                  pattern="[0-9]{8}"
                  className="w-full p-3 border rounded-lg pl-16 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                  aria-label="Votre numéro de téléphone"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-500 text-white py-3 px-6 rounded-lg hover:bg-yellow-600 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
            >
              Envoyer ma demande
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default DemandePret;
