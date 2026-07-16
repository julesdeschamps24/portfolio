"use client";

import { useRef } from "react";
import Image from "next/image";

type Work = { slug: string; name: string; tag: string; url?: string };

// url présent = site en ligne (cliquable). Sans url = concept sectoriel (démo).
const ROW_TOP: Work[] = [
  { slug: "dauffy-paysage", name: "Dauffy Paysage", tag: "Paysagiste · Issé (44)", url: "https://dauffy-paysage.julesdeschamps.dev" },
  { slug: "estelle-fonder", name: "Estelle Fonder", tag: "Psychologue · Albi", url: "https://estelle-fonder.julesdeschamps.dev" },
  { slug: "poelier-chauffagiste", name: "Atelier Braise", tag: "Poêlier · Périgueux (24)" },
  { slug: "laborde-services", name: "Laborde Services", tag: "Travaux forestiers · Béarn (64)", url: "https://laborde-services.julesdeschamps.dev" },
  { slug: "toilettage-canin", name: "Au Poil", tag: "Toilettage canin · Angoulême" },
  { slug: "avocat", name: "Camille Rivière", tag: "Avocat · Aix-en-Provence" },
  { slug: "bs-atout-vert", name: "BS Atout Vert", tag: "Paysagiste · Création & entretien", url: "https://bs-atout-vert.julesdeschamps.dev" },
];

const ROW_BOTTOM: Work[] = [
  { slug: "medecine-alternative", name: "Léa Roussel", tag: "Naturopathe · Bordeaux" },
  { slug: "grimpe-o-arbres", name: "Grimpe Ô Arbres", tag: "Élagage & grimpe", url: "https://grimpe-o-arbres.julesdeschamps.dev" },
  { slug: "brice-paysage", name: "Brice Paysage", tag: "Paysagiste · Création & entretien", url: "https://brice-paysage.julesdeschamps.dev" },
  { slug: "kerinou-bois", name: "Kerinou Bois", tag: "Paysagiste & bois", url: "https://kerinou-bois.julesdeschamps.dev" },
  { slug: "ab-paysage", name: "AB Paysage", tag: "Paysagiste · Création & entretien", url: "https://ab-paysage.julesdeschamps.dev" },
  { slug: "espace-paysage", name: "Espace Paysage", tag: "Paysagiste · Création & entretien", url: "https://espace-paysage.julesdeschamps.dev" },
  { slug: "bl-paysages", name: "BL Paysages", tag: "Paysagiste · Création & entretien", url: "https://bl-paysages.julesdeschamps.dev" },
];

function Card({ w }: { w: Work }) {
  const inner = (
    <>
      <div className="wcard-media">
        <Image src={`/img/realisations/${w.slug}.jpg`} alt={`Site web ${w.name}`} width={1280} height={800} />
      </div>
      <div className="wcard-meta">
        <div>
          <b>{w.name}</b>
          <span className="tag">{w.tag}</span>
        </div>
        {w.url && <span className="wcard-go">Voir ↗</span>}
      </div>
    </>
  );
  if (w.url) {
    return (
      <a className="wcard" href={w.url} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    );
  }
  return <div className="wcard wcard--static">{inner}</div>;
}

function Row({ works, dir }: { works: Work[]; dir: "right" | "left" }) {
  // contenu doublé pour une boucle infinie sans couture
  return (
    <div className={`wmq-row wmq-${dir}`}>
      <div className="wmq-track">
        {[...works, ...works].map((w, i) => (
          <Card key={`${w.slug}-${i}`} w={w} />
        ))}
      </div>
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
      </div>

      <div className="wmq reveal">
        <Row works={ROW_TOP} dir="right" />
        <Row works={ROW_BOTTOM} dir="left" />
      </div>

      <div className="wrap">
        <div className="work-foot reveal">
          <p className="work-note">
            Sites en ligne pour de vraies entreprises. Les cartes sont cliquables.
            Survolez pour mettre en pause.
          </p>

          {/* Motion design : Asana (conservé) */}
          <div className="asana-card" onMouseEnter={playAsana} onMouseLeave={pauseAsana}>
            <video ref={videoRef} src="/vid/asana.webm" muted loop playsInline preload="metadata" />
            <div>
              <b>Asana</b>
              <span>Motion design · survolez</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
