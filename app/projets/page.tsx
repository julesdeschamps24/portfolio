import { VideoCard } from "@/components/video-card";
import { videos } from "@/lib/data";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projets Web & Réalisations",
  description: "Explorez mes projets de développement web : applications, sites vitrines et expériences interactives.",
  alternates: {
    canonical: '/projets',
  },
};

export default function ProjetsPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-20">
        <header className="flex flex-col gap-4">
          <p className="text-sm uppercase tracking-[0.2em] text-indigo-300">
            Portfolio
          </p>
          <h1 className="text-4xl font-bold md:text-5xl">Projets</h1>
          <p className="text-base text-zinc-300">
            Survolez le bouton “Agrandir” (ou cliquez sur la vidéo) pour ouvrir
            l’aperçu plein écran. La vidéo démarre automatiquement et se ferme
            dès que le curseur quitte la zone de lecture.
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-2">
          {videos.map((video) => (
            <VideoCard key={video.title} {...video} />
          ))}
        </div>
      </div>
    </main>
  );
}
