"use client";

import { competences } from "@/lib/data";
import { useCompetences } from "@/lib/hooks/use-competences";
import { SectionHeader } from "./section-header";

export function SkillsSection() {
  const { sortedCategories } = useCompetences();

  return (
    <section id="competences" className="min-h-screen text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-20">
        <SectionHeader
          label="Compétences"
          title="Mes Compétences"
          description="Technologies et outils que je maîtrise pour créer des projets innovants."
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {sortedCategories.map(({ category, skills }) => (
            <div
              key={category}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
            >
              <h3 className="mb-4 text-xl font-semibold text-indigo-300">
                {category}
              </h3>
              <ul className="flex flex-col gap-3">
                {skills.map((skill) => (
                  <li
                    key={skill}
                    className="flex items-center gap-2 text-zinc-200 transition hover:text-white"
                  >
                    <span className="h-2 w-2 rounded-full bg-indigo-400"></span>
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Section avec toutes les compétences en badges */}
        <section className="mt-8">
          <h3 className="mb-6 text-2xl font-semibold">
            Toutes mes compétences
          </h3>
          <div className="flex flex-wrap gap-3">
            {competences.map((competence) => (
              <span
                key={competence.name}
                className="rounded-lg border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-sm font-medium text-indigo-300 transition hover:border-indigo-400/50 hover:bg-indigo-500/20"
              >
                {competence.name}
              </span>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}

