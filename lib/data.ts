export const videos = [
  {
    title: "Motion Design – Asana",
    description: "Exploration graphique en basse lumière avec effets de lueurs.",
    src: "/vid/asana.webm",
  },
  {
    title: "Cinematic – Sport Avenue",
    description: "Sequence narrative pour tester la narration visuelle.",
    src: "/vid/sport_avenue.webm",
  },
] as const;

export const competences = [
  { name: "HTML5/CSS3", categories: ["Frontend"] },
  { name: "JavaScript", categories: ["Langage"] },
  { name: "TypeScript", categories: ["Langage"] },
  { name: "React", categories: ["Frontend"] },
  { name: "Node.js", categories: ["Backend"] },
  { name: "Next.js", categories: ["Frontend", "Backend"] },
  { name: "C", categories: ["Langage"] },
  { name: "C++", categories: ["Langage"] },
  { name: "Git", categories: ["Outils"] },
] as const;

export const categoryOrder = ["Frontend", "Backend", "Langage", "Outils"] as const;
