import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "À propos",
  description: "Découvrez mon parcours, ma formation à l'école 42 et ma passion pour le développement web.",
};

export default function AProposPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto flex max-w-4xl flex-col gap-12 px-6 py-20">
        <header className="flex flex-col gap-4">
          <p className="text-sm uppercase tracking-[0.2em] text-indigo-300">
            À propos
          </p>
          <h1 className="text-4xl font-bold md:text-5xl">À propos de moi</h1>
        </header>

        <div className="flex flex-col gap-6">
          <p className="text-lg leading-7 text-zinc-300">
            Je m&apos;appelle Jules Deschamps, formé au développement à l&apos;école 42, passionné par la compréhension approfondie des systèmes afin de concevoir des applications web fiables et bien structurées. Cette formation m&apos;a permis d&apos;acquérir rigueur, autonomie et sens du code propre, des valeurs appliquées dans chacun des projets réalisés.
          </p>
          
          <p className="text-lg leading-7 text-zinc-300">
            Mon apprentissage se base principalement sur la réalisation de projets concrets, favorisant une progression rapide et une adaptation efficace aux nouvelles technologies. Curieux et motivé, j&apos;apprécie relever de nouveaux défis techniques et faire évoluer ses compétences en continu.
          </p>
        </div>
      </div>
    </main>
  );
}
