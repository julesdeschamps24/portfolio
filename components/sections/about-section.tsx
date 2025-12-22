"use client";

import { SectionHeader } from "./section-header";

export function AboutSection() {
  return (
    <section id="a-propos" className="min-h-screen text-white">
      <div className="mx-auto flex max-w-4xl flex-col gap-12 px-6 py-20">
        <SectionHeader label="À propos" title="À propos de moi" />

        <div className="flex flex-col gap-6">
          <p className="text-lg leading-7 text-zinc-300">
            Je m&apos;appelle Jules Deschamps, formé au développement à l&apos;école 42,
            passionné par la compréhension approfondie des systèmes afin de
            concevoir des applications web fiables et bien structurées. Cette
            formation m&apos;a permis d&apos;acquérir rigueur, autonomie et sens du code
            propre, des valeurs appliquées dans chacun des projets réalisés.
          </p>

          <p className="text-lg leading-7 text-zinc-300">
            Mon apprentissage se base principalement sur la réalisation de
            projets concrets, favorisant une progression rapide et une adaptation
            efficace aux nouvelles technologies. Curieux et motivé, j&apos;apprécie
            relever de nouveaux défis techniques et faire évoluer ces compétences
            en continu.
          </p>
        </div>
      </div>
    </section>
  );
}

