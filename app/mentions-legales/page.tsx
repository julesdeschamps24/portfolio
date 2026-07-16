import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site Jules Deschamps.",
  alternates: {
    canonical: "/mentions-legales",
  },
};

export default function MentionsLegales() {
  return (
    <main className="studio">
      <div className="wrap page">
        <header className="page-head">
          <div className="eyebrow">Informations légales</div>
          <h1>Mentions légales</h1>
        </header>

        <div className="prose">
          <h2>1. Éditeur du site</h2>
          <p>
            Le présent site est édité par :<br />
            <strong>Jules Deschamps</strong>
            <br />
            Entrepreneur individuel (micro-entreprise)
            <br />
            38 rue des Lilas
            <br />
            16800 Soyaux, France
            <br />
            SIRET : 994 400 232 00017
            <br />
            Email : <a href="mailto:contact@julesdeschamps.dev">contact@julesdeschamps.dev</a>
          </p>

          <h2>2. Directeur de la publication</h2>
          <p>
            Jules Deschamps
            <br />
            Contact : <a href="mailto:contact@julesdeschamps.dev">contact@julesdeschamps.dev</a>
          </p>

          <h2>3. Hébergement</h2>
          <p>
            Ce site est hébergé par :<br />
            <strong>Vercel Inc.</strong>
            <br />
            440 N Barranca Ave #4133
            <br />
            Covina, CA 91723, États-Unis
            <br />
            <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">
              https://vercel.com
            </a>
          </p>

          <h2>4. Propriété intellectuelle</h2>
          <p>
            L&apos;ensemble de ce site relève de la législation française et internationale
            sur le droit d&apos;auteur et la propriété intellectuelle. Tous les droits de
            reproduction sont réservés, y compris pour les documents téléchargeables et les
            représentations iconographiques et photographiques.
          </p>
          <p>
            La reproduction de tout ou partie de ce site sur un support électronique quel
            qu&apos;il soit est formellement interdite sauf autorisation expresse du
            directeur de la publication.
          </p>
          <p>
            Les sites présentés dans la section « Réalisations » restent la propriété de
            leurs commanditaires respectifs.
          </p>
        </div>
      </div>
    </main>
  );
}
