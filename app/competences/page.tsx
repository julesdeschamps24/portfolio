export default function CompetencesPage() {
  const competences = [
    { name: "HTML5/CSS3", categories: ["Frontend"] },
    { name: "JavaScript", categories: ["Langage"] },
    { name: "TypeScript", categories: ["Langage"] },
    { name: "React", categories: ["Frontend"] },
    { name: "Node.js", categories: ["Backend"] },
    { name: "Next.js", categories: ["Frontend", "Backend"] },
    { name: "C", categories: ["Langage"] },
    { name: "C++", categories: ["Langage"] },
    { name: "Git", categories: ["Outils"] },
  ];

  const categories = competences.reduce((acc, comp) => {
    comp.categories.forEach((category) => {
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(comp.name);
    });
    return acc;
  }, {} as Record<string, string[]>);

  const categoryOrder = ["Frontend", "Backend", "Langage", "Outils"];
  const sortedCategories = Object.entries(categories).sort((a, b) => {
    const indexA = categoryOrder.indexOf(a[0]);
    const indexB = categoryOrder.indexOf(b[0]);
    // Si la catégorie n'est pas dans l'ordre, la mettre à la fin
    if (indexA === -1 && indexB === -1) return 0;
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-20">
        <header className="flex flex-col gap-4">
          <p className="text-sm uppercase tracking-[0.2em] text-indigo-300">
            Compétences
          </p>
          <h1 className="text-4xl font-bold md:text-5xl">Mes Compétences</h1>
          <p className="text-base text-zinc-300">
            Technologies et outils que je maîtrise pour créer des projets innovants.
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {sortedCategories.map(([category, skills]) => (
            <div
              key={category}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
            >
              <h2 className="mb-4 text-xl font-semibold text-indigo-300">
                {category}
              </h2>
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
          <h2 className="mb-6 text-2xl font-semibold">Toutes mes compétences</h2>
          <div className="flex flex-wrap gap-3">
            {competences.map((comp) => (
              <span
                key={comp.name}
                className="rounded-lg border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-sm font-medium text-indigo-300 transition hover:border-indigo-400/50 hover:bg-indigo-500/20"
              >
                {comp.name}
              </span>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

