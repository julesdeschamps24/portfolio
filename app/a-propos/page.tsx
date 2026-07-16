import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Jules Deschamps, studio web indépendant. Je conçois des sites sur-mesure pour les commerces, artisans et indépendants qui veulent une présence en ligne à leur image.",
  alternates: {
    canonical: "/a-propos",
  },
};

export default function AProposPage() {
  return (
    <main className="studio">
      <div className="wrap page">
        <header className="page-head">
          <div className="eyebrow">À propos</div>
          <h1>
            Un studio,
            <br />
            un seul <em className="s">interlocuteur</em>.
          </h1>
        </header>

        <div className="prose">
          <p className="lead-p">
            Je m&apos;appelle Jules Deschamps. Je conçois et développe des sites web pour les
            commerces, artisans et indépendants qui veulent une présence en ligne à la
            hauteur de leur travail.
          </p>

          <h2>Pourquoi les entreprises locales</h2>
          <p>
            Un artisan qui fait un travail remarquable mérite mieux qu&apos;une page qui
            n&apos;en dit rien. Beaucoup d&apos;entreprises locales sont invisibles sur
            Google, ou renvoient une image qui ne leur ressemble pas. C&apos;est exactement
            là que je peux aider : rendre visible ce qui existe déjà, et le présenter avec
            le soin qu&apos;il mérite.
          </p>

          <h2>Comment je travaille</h2>
          <p>
            <strong>Un seul interlocuteur, du premier échange à la mise en ligne.</strong>{" "}
            On parle de votre métier, de vos clients, de votre secteur. Je dessine une
            proposition qui vous est propre, puis je la développe. Pas de thème générique
            recyclé : chaque site est conçu pour l&apos;entreprise qu&apos;il représente.
          </p>
          <p>
            À la livraison, le site est à vous : propre, rapide, et pensé pour durer sans
            entretien permanent.
          </p>

          <h2>D&apos;où je viens</h2>
          <p>
            J&apos;ai appris le développement à l&apos;<strong>école 42</strong>, une formation
            exigeante fondée sur la pratique et l&apos;autonomie. Ce n&apos;est pas mon
            argument de vente : c&apos;est simplement la garantie que la partie technique
            de votre site est entre de bonnes mains, et que vous n&apos;aurez pas à vous
            en soucier.
          </p>

          <h2>Parlons de votre projet</h2>
          <p>
            Vous avez une entreprise et pas encore de site, ou un site qui ne vous
            ressemble plus ? Écrivez-moi à{" "}
            <a href="mailto:contact@julesdeschamps.dev">contact@julesdeschamps.dev</a>, ou
            passez par la <Link href="/#contact">page de contact</Link>. Je réponds avec
            plaisir, sans engagement.
          </p>
        </div>
      </div>
    </main>
  );
}
