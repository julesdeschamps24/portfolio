import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de Confidentialité | Jules Deschamps",
  description: "Politique de confidentialité et gestion des données personnelles.",
};

export default function PolitiqueConfidentialite() {
  return (
    <div className="container mx-auto px-6 py-24 md:py-32 max-w-4xl">
      <div className="rounded-2xl border border-white/10 bg-black/60 backdrop-blur p-8 md:p-12 text-zinc-300">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">Politique de Confidentialité</h1>
        <p className="mb-8 text-sm text-zinc-400">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>

        <section className="mb-8 space-y-4">
        <h2 className="text-xl font-semibold text-white">1. Collecte des données</h2>
        <p>
          Dans le cadre de l'utilisation du site, nous sommes amenés à collecter les données personnelles suivantes :
        </p>
        <ul className="list-disc list-inside ml-4 space-y-2">
          <li>
            <strong>Formulaire de contact :</strong> Nom, Prénom, Email, Message. Ces données sont nécessaires pour répondre à votre demande.
          </li>
          <li>
            <strong>Cookies & Traceurs :</strong> Données de navigation et d'utilisation (via HubSpot) si vous avez donné votre consentement.
          </li>
        </ul>
      </section>

      <section className="mb-8 space-y-4">
        <h2 className="text-xl font-semibold text-white">2. Finalités du traitement</h2>
        <p>Vos données sont collectées pour les finalités suivantes :</p>
        <ul className="list-disc list-inside ml-4 space-y-2">
          <li>Gestion et réponse aux demandes de contact (Base légale : Intérêt légitime / Exécution de mesures précontractuelles).</li>
          <li>Analyse de l'audience et amélioration du site (Base légale : Consentement).</li>
          <li>Sécurité du site (Base légale : Intérêt légitime).</li>
        </ul>
      </section>

      <section className="mb-8 space-y-4">
        <h2 className="text-xl font-semibold text-white">3. Durée de conservation</h2>
        <ul className="list-disc list-inside ml-4 space-y-2">
          <li><strong>Données de contact :</strong> 3 ans après le dernier contact.</li>
          <li><strong>Cookies :</strong> 13 mois maximum après le dépôt.</li>
        </ul>
      </section>

      <section className="mb-8 space-y-4">
        <h2 className="text-xl font-semibold text-white">4. Destinataires des données</h2>
        <p>
          Les données sont destinées à l'éditeur du site.
          Elles peuvent être transmises à nos sous-traitants techniques :
        </p>
        <ul className="list-disc list-inside ml-4 space-y-2">
          <li><strong>Hébergement :</strong> Vercel (USA - Clause de protection via DPA standard).</li>
          <li><strong>CRM & Analytics :</strong> HubSpot (USA - Adhérent au Data Privacy Framework UE-USA ou Clauses Contractuelles Types).</li>
        </ul>
      </section>

      <section className="mb-8 space-y-4">
        <h2 className="text-xl font-semibold text-white">5. Vos droits (RGPD)</h2>
        <p>
          Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants :
        </p>
        <ul className="list-disc list-inside ml-4 space-y-2">
          <li>Droit d'accès, de rectification et d'effacement de vos données.</li>
          <li>Droit à la limitation du traitement.</li>
          <li>Droit d'opposition au traitement.</li>
          <li>Droit à la portabilité de vos données.</li>
        </ul>
        <p className="mt-4">
          Pour exercer ces droits, vous pouvez nous contacter à l'adresse : <strong>contact@julesdeschamps.dev</strong>.
        </p>
        <p>
          Vous avez également le droit d'introduire une réclamation auprès de la CNIL (www.cnil.fr).
        </p>
      </section>

      <section className="mb-8 space-y-4">
        <h2 className="text-xl font-semibold text-white">6. Cookies</h2>
        <p>
          Vous pouvez à tout moment modifier vos préférences en matière de cookies via le bandeau de gestion disponible sur le site ou en paramétrant votre navigateur.
          Les cookies "strictement nécessaires" au fonctionnement du site ne nécessitent pas de consentement.
        </p>
      </section>
      </div>
    </div>
  );
}

