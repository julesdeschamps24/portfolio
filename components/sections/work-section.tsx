"use client";

import { useRef } from "react";
import Image from "next/image";

type Work = { slug: string; name: string; tag: string; url?: string };

// url présent = site en ligne (cliquable). Sans url = concept sectoriel (démo studio).
const WORKS: Work[] = [
  { slug: "dauffy-paysage", name: "Dauffy Paysage", tag: "Paysagiste · Issé (44)", url: "https://dauffy-paysage.julesdeschamps.dev" },
  { slug: "estelle-fonder", name: "Estelle Fonder", tag: "Psychologue · Albi", url: "https://estelle-fonder.julesdeschamps.dev" },
  { slug: "poelier-chauffagiste", name: "Atelier Braise", tag: "Poêlier · Périgueux (24)" },
  { slug: "laborde-services", name: "Laborde Services", tag: "Travaux forestiers · Béarn (64)", url: "https://laborde-services.julesdeschamps.dev" },
  { slug: "toilettage-canin", name: "Au Poil", tag: "Toilettage canin · Angoulême" },
  { slug: "avocat", name: "Camille Rivière", tag: "Avocat · Aix-en-Provence" },
  { slug: "bs-atout-vert", name: "BS Atout Vert", tag: "Paysagiste · Création & entretien", url: "https://bs-atout-vert.julesdeschamps.dev" },
  { slug: "medecine-alternative", name: "Léa Roussel", tag: "Naturopathe · Bordeaux" },
  { slug: "grimpe-o-arbres", name: "Grimpe Ô Arbres", tag: "Élagage & grimpe", url: "https://grimpe-o-arbres.julesdeschamps.dev" },
  { slug: "brice-paysage", name: "Brice Paysage", tag: "Paysagiste · Création & entretien", url: "https://brice-paysage.julesdeschamps.dev" },
  { slug: "kerinou-bois", name: "Kerinou Bois", tag: "Paysagiste & bois", url: "https://kerinou-bois.julesdeschamps.dev" },
  { slug: "ab-paysage", name: "AB Paysage", tag: "Paysagiste · Création & entretien", url: "https://ab-paysage.julesdeschamps.dev" },
  { slug: "espace-paysage", name: "Espace Paysage", tag: "Paysagiste · Création & entretien", url: "https://espace-paysage.julesdeschamps.dev" },
  { slug: "bl-paysages", name: "BL Paysages", tag: "Paysagiste · Création & entretien", url: "https://bl-paysages.julesdeschamps.dev" },
];

function Card({ w, i }: { w: Work; i: number }) {
  const delay = { transitionDelay: `${Math.min(i, 9) * 45}ms` };
  const media = (
    <div className="rcard-media">
      <Image src={`/img/realisations/${w.slug}.jpg`} alt={`Site web ${w.name}`} width={1280} height={800} />
    </div>
  );
  const meta = (
    <div className="rcard-meta">
      <div>
        <b>{w.name}</b>
        <span className="tag">{w.tag}</span>
      </div>
      {w.url && <span className="rcard-go">Voir le site ↗</span>}
    </div>
  );

  if (w.url) {
    return (
      <a className="rcard reveal" style={delay} href={w.url} target="_blank" rel="noopener noreferrer">
        {media}
        {meta}
      </a>
    );
  }
  return (
    <div className="rcard rcard--static reveal" style={delay}>
      {media}
      {meta}
    </div>
  );
}

export function WorkSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const playAsana = () => {
    videoRef.current?.play().catch(() => {});
  };
  const pauseAsana = () => {
    const v = videoRef.current;
    if (v) {
      v.pause();
      v.currentTime = 0;
    }
  };

  return (
    <section id="work" className="sec">
      <div className="wrap">
        <div className="shead reveal">
          <span className="lbl">Réalisations</span>
          <h2>Des sites qui leur ressemblent.</h2>
        </div>

        <div className="rgrid">
          {WORKS.map((w, i) => (
            <Card key={w.slug} w={w} i={i} />
          ))}

          {/* Motion design — Asana (conservé) */}
          <div
            className="rcard rcard--static reveal"
            style={{ transitionDelay: `${Math.min(WORKS.length, 9) * 45}ms` }}
            onMouseEnter={playAsana}
            onMouseLeave={pauseAsana}
          >
            <div className="rcard-media">
              <video ref={videoRef} src="/vid/asana.webm" muted loop playsInline preload="metadata" />
            </div>
            <div className="rcard-meta">
              <div>
                <b>Asana</b>
                <span className="tag">Motion design</span>
              </div>
              <span className="rcard-go">Survolez ▸</span>
            </div>
          </div>
        </div>

        <p className="work-note reveal">
          Restaurants, artisans, indépendants, professions libérales… Chaque secteur, sa
          création. Les sites en ligne sont cliquables.
        </p>
      </div>
    </section>
  );
}
