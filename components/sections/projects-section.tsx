"use client";

import { videos } from "@/lib/data";
import { VideoCard } from "@/components/video-card";
import { SectionHeader } from "./section-header";

export function ProjectsSection() {
  return (
    <section id="projets" className="min-h-screen text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-20">
        <SectionHeader
          label="Portfolio"
          title="Projets"
          description="Survolez le bouton « Agrandir » (ou cliquez sur la vidéo) pour ouvrir l'aperçu plein écran. La vidéo démarre automatiquement et se ferme dès que le curseur quitte la zone de lecture."
        />

        <div className="grid gap-8 md:grid-cols-2">
          {videos.map((video) => (
            <VideoCard key={video.title} {...video} />
          ))}
        </div>
      </div>
    </section>
  );
}

