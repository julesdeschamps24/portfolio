import { VideoCard } from "@/components/video-card";

const videos = [
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
];

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
            Survolez une vidéo pour lancer la lecture. Cliquez sur “Agrandir”
            pour ouvrir un aperçu lissé en plein écran.
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

