import { Metadata } from "next";
import { SkillsSection } from "@/components/sections/skills-section";

export const metadata: Metadata = {
  title: "Compétences Techniques",
  description: "Mes compétences techniques en développement web : React, Next.js, Node.js, TypeScript et plus encore.",
  alternates: {
    canonical: '/competences',
  },
};

export default function CompetencesPage() {
  return (
    <main className="min-h-screen bg-black text-white">
        <SkillsSection />
    </main>
  );
}
