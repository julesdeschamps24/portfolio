import Image from "next/image";
import type { CSSProperties } from "react";

// ui = couleur du haut de la capture, relevee sur l'image : la barre d'etat s'y
// fond, comme sur un vrai telephone ou elle prend la couleur de la page.
type Shot = { src: string; ui: string };
type Group = { name: string; home: Shot; contact: Shot };

// 2 groupes de 2 téléphones superposés (pattern vanholtz.co/work/studiomega).
// Un groupe = UN site : son accueil devant, sa page contact derrière. Montrer le
// formulaire du même site prouve que le mobile est soigné jusqu'au bout du
// parcours, pas seulement sur la page d'accueil.
const GROUPS: Group[] = [
  {
    name: "Au Poil",
    home: { src: "au-poil", ui: "#fcf8f2" },
    contact: { src: "au-poil-contact", ui: "#fefcf7" },
  },
  {
    name: "Dauffy Paysage",
    home: { src: "dauffy-paysage", ui: "#1e4641" },
    contact: { src: "dauffy-paysage-contact", ui: "#143a2a" },
  },
];

function PhoneFrame({ shot, alt }: { shot: Shot; alt: string }) {
  return (
    <div className="phone" style={{ "--phone-ui": shot.ui } as CSSProperties}>
      <div className="phone-screen">
        <div className="phone-status" />
        <div className="phone-media">
          <Image src={`/img/mobile/${shot.src}.jpg`} alt={alt} width={500} height={972} />
        </div>
        <div className="phone-home" />
      </div>
    </div>
  );
}

export function MobileSection() {
  return (
    <section id="mobile" className="sec">
      <div className="wrap">
        <div className="shead reveal">
          <span className="lbl">Mobile</span>
          <h2>Impeccable sur téléphone.</h2>
        </div>

        <p className="mobile-lead reveal">
          8 visiteurs sur 10 découvrent votre entreprise depuis leur téléphone.
          Chaque site est conçu pour le mobile d&apos;abord, pas adapté après coup.
        </p>

        <div className="phones">
          {GROUPS.map((g, gi) => (
            <div className="phone-group reveal" style={{ transitionDelay: `${gi * 120}ms` }} key={g.home.src}>
              <PhoneFrame shot={g.home} alt={`Accueil du site ${g.name} sur téléphone`} />
              <div className="phone-back">
                <PhoneFrame shot={g.contact} alt={`Page de contact du site ${g.name} sur téléphone`} />
              </div>
              <p className="phone-cap">{g.name} · accueil &amp; contact</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
