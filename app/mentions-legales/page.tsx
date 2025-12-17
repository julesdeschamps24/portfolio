import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions Légales | Jules Deschamps",
  description: "Mentions légales du site portfolio.",
};

export default function MentionsLegales() {
  return (
    <div className="container mx-auto px-6 py-24 md:py-32 max-w-4xl">
      <div className="rounded-2xl border border-white/10 bg-black/60 backdrop-blur p-8 md:p-12 text-zinc-300">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">Mentions Légales</h1>

        <section className="mb-8 space-y-4">
        <h2 className="text-xl font-semibold text-white">1. Éditeur du site</h2>
        <p>
          Le présent site est édité par :<br />
          <strong>[Votre Nom / Raison Sociale]</strong><br />
          [Statut juridique : ex. Entrepreneur individuel / SASU]<br />
          [Adresse postale complète]<br />
          [SIRET : XXX XXX XXX XXXXX]<br />
          Email : [votre@email.com]
        </p>
      </section>

      <section className="mb-8 space-y-4">
        <h2 className="text-xl font-semibold text-white">2. Directeur de la publication</h2>
        <p>
          [Votre Nom]<br />
          Contact : [votre@email.com]
        </p>
      </section>

      <section className="mb-8 space-y-4">
        <h2 className="text-xl font-semibold text-white">3. Hébergement</h2>
        <p>
          Ce site est hébergé par :<br />
          <strong>Vercel Inc.</strong><br />
          440 N Barranca Ave #4133<br />
          Covina, CA 91723<br />
          États-Unis<br />
          <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 underline">https://vercel.com</a>
        </p>
      </section>

      <section className="mb-8 space-y-4">
        <h2 className="text-xl font-semibold text-white">4. Propriété intellectuelle</h2>
        <p>
          L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle.
          Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
        </p>
        <p>
          La reproduction de tout ou partie de ce site sur un support électronique quel qu'il soit est formellement interdite sauf autorisation expresse du directeur de la publication.
        </p>
      </section>
      </div>
    </div>
  );
}

