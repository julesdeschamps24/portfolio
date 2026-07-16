import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité et gestion des données personnelles du site Jules Deschamps.",
  alternates: {
    canonical: "/politique-confidentialite",
  },
};

export default function PolitiqueConfidentialite() {
  const lastUpdate = new Date().toLocaleDateString("fr-FR");

  return (
    <main className="studio">
      <div className="wrap page">
        <header className="page-head">
          <div className="eyebrow">Données personnelles</div>
          <h1>Politique de confidentialité</h1>
          <p className="updated">Dernière mise à jour : {lastUpdate}</p>
        </header>

        <div className="prose">
          <h2>1. Collecte des données</h2>
          <p>
            Dans le cadre de l&apos;utilisation du site, nous sommes amenés à collecter les
            données personnelles suivantes :
          </p>
          <ul>
            <li>
              <strong>Formulaire de contact :</strong> nom, prénom, email, message. Ces
              données sont nécessaires pour répondre à votre demande.
            </li>
            <li>
              <strong>Cookies et traceurs :</strong> données de navigation et
              d&apos;utilisation (via HubSpot) si vous avez donné votre consentement.
            </li>
          </ul>

          <h2>2. Finalités du traitement</h2>
          <p>Vos données sont collectées pour les finalités suivantes :</p>
          <ul>
            <li>
              Gestion et réponse aux demandes de contact (base légale : intérêt légitime /
              exécution de mesures précontractuelles).
            </li>
            <li>Analyse de l&apos;audience et amélioration du site (base légale : consentement).</li>
            <li>Sécurité du site (base légale : intérêt légitime).</li>
          </ul>

          <h2>3. Durée de conservation</h2>
          <ul>
            <li>
              <strong>Données de contact :</strong> 3 ans après le dernier contact.
            </li>
            <li>
              <strong>Cookies :</strong> 13 mois maximum après le dépôt.
            </li>
          </ul>

          <h2>4. Destinataires des données</h2>
          <p>
            Les données sont destinées à l&apos;éditeur du site. Elles peuvent être
            transmises à nos sous-traitants techniques :
          </p>
          <ul>
            <li>
              <strong>Hébergement :</strong> Vercel (USA, clause de protection via DPA
              standard).
            </li>
            <li>
              <strong>CRM et analytics :</strong> HubSpot (USA, adhérent au Data Privacy
              Framework UE-USA ou clauses contractuelles types).
            </li>
          </ul>

          <h2>5. Vos droits (RGPD)</h2>
          <p>
            Conformément au Règlement général sur la protection des données (RGPD), vous
            disposez des droits suivants :
          </p>
          <ul>
            <li>Droit d&apos;accès, de rectification et d&apos;effacement de vos données.</li>
            <li>Droit à la limitation du traitement.</li>
            <li>Droit d&apos;opposition au traitement.</li>
            <li>Droit à la portabilité de vos données.</li>
          </ul>
          <p>
            Pour exercer ces droits, vous pouvez nous contacter à l&apos;adresse :{" "}
            <a href="mailto:contact@julesdeschamps.dev">contact@julesdeschamps.dev</a>.
          </p>
          <p>
            Vous avez également le droit d&apos;introduire une réclamation auprès de la CNIL
            (<a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">www.cnil.fr</a>).
          </p>

          <h2>6. Cookies</h2>
          <p>
            Vous pouvez à tout moment modifier vos préférences en matière de cookies via le
            bandeau de gestion disponible sur le site, ou en paramétrant votre navigateur.
            Les cookies strictement nécessaires au fonctionnement du site ne nécessitent pas
            de consentement.
          </p>
        </div>
      </div>
    </main>
  );
}
