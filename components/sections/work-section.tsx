"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

type Work = { slug: string; name: string; tag: string; url?: string; video?: string };

// url présent = site en ligne (cliquable). Sans url = concept sectoriel (démo).
const ROW_TOP: Work[] = [
  { slug: "dauffy-paysage", name: "Dauffy Paysage", tag: "Paysagiste · Issé (44)", url: "https://dauffy-paysage.julesdeschamps.dev" },
  { slug: "estelle-fonder", name: "Estelle Fonder", tag: "Psychologue · Albi", url: "https://estelle-fonder.julesdeschamps.dev" },
  { slug: "laborde-services", name: "Laborde Services", tag: "Travaux forestiers · Béarn (64)", url: "https://laborde-services.julesdeschamps.dev" },
  { slug: "toilettage-canin", name: "Au Poil", tag: "Toilettage canin · Angoulême" },
  { slug: "bs-atout-vert", name: "BS Atout Vert", tag: "Paysagiste · Création & entretien", url: "https://bs-atout-vert.julesdeschamps.dev" },
];

const ROW_BOTTOM: Work[] = [
  { slug: "medecine-alternative", name: "Léa Roussel", tag: "Naturopathe · Bordeaux" },
  { slug: "kerinou-bois", name: "Kerinou Bois", tag: "Paysagiste & bois", url: "https://kerinou-bois.julesdeschamps.dev" },
  { slug: "asana", name: "Asana", tag: "Motion design", video: "/vid/asana.webm" },
  { slug: "ab-paysage", name: "AB Paysage", tag: "Paysagiste · Création & entretien", url: "https://ab-paysage.julesdeschamps.dev" },
  { slug: "bl-paysages", name: "BL Paysages", tag: "Paysagiste · Création & entretien", url: "https://bl-paysages.julesdeschamps.dev" },
];

function Card({ w }: { w: Work }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // La video tourne en boucle. C'est tenable parce qu'elle a ete re-encodee de
  // 12 Mo (VP8 1913px) a 348 Ko (VP9 800px) : a l'ancien poids, 3 exemplaires en
  // boucle auraient ete inacceptables.
  // On pilote la lecture a l'entree dans le champ plutot que par l'attribut
  // autoPlay : un simple play() au montage ne suffit pas, Chrome met en pause les
  // videos hors ecran et ne les relance pas si la lecture a ete demandee a la
  // main - la carte etant sous la ligne de flottaison, elle serait restee figee.
  // Ca evite aussi de decoder en continu ce qui n'est pas regarde.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.15 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  const inner = (
    <>
      <div className="wcard-media">
        {w.video ? (
          <video ref={videoRef} src={w.video} muted loop playsInline preload="auto" />
        ) : (
          <Image src={`/img/realisations/${w.slug}.jpg`} alt={`Site web ${w.name}`} width={1280} height={800} />
        )}
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
  // contenu triplé pour une boucle infinie sans couture : l'animation décale d'UN
  // jeu (-33.333%), il faut donc que deux jeux couvrent l'écran. En doublant, un
  // seul jeu devait couvrir l'écran seul, et 5 cartes n'y suffisent plus (~2110px,
  // soit un trou dès 2560px de large).
  return (
    <div className={`wmq-row wmq-${dir}`}>
      <div className="wmq-track">
        {[...works, ...works, ...works].map((w, i) => (
          <Card key={`${w.slug}-${i}`} w={w} />
        ))}
      </div>
    </div>
  );
}

export function WorkSection() {
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
        </div>
      </div>
    </section>
  );
}
