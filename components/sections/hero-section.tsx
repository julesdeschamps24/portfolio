import Image from "next/image";

const SECTORS = [
  "Restaurants",
  "Artisans",
  "Boutiques",
  "Coachs",
  "Praticiens",
  "Commerces",
];

const META = ["Conception & développement", "Identité & design", "Visibilité locale"];

export function HeroSection() {
  return (
    <section id="accueil" className="hero">
      <div className="wrap hero-grid">
        <div className="hero-text">
          <div className="eyebrow">Studio web · entreprises &amp; commerces locaux</div>
          <h1>
            Des sites web
            <br />
            sur-mesure pour les
            <br />
            <em className="s">entreprises locales</em>.
          </h1>
          <p className="sub">
            Studio indépendant. Je conçois et développe des sites soignés pour les
            commerces, artisans et indépendants qui veulent une présence en ligne à leur
            image.
          </p>
          <div className="btns">
            <a href="#work" className="btn">
              Voir mes réalisations <span className="arrow">↓</span>
            </a>
            <a href="#contact" className="link">
              Un projet ? Écrivez-moi
            </a>
          </div>
          <div className="meta">
            {META.map((m) => (
              <span key={m}>{m}</span>
            ))}
          </div>
        </div>

        <div className="hero-portrait">
          <div className="portrait-frame">
            <Image
              src="/img/jules.jpg"
              alt="Jules Deschamps, fondateur du studio"
              width={800}
              height={1000}
              priority
            />
          </div>
          <p className="portrait-cap">Jules Deschamps, Angoulême</p>
        </div>
      </div>

      <div className="marquee">
        <div className="mq-track">
          {[...SECTORS, ...SECTORS].map((s, i) => (
            <span key={i}>
              {s}
              <i>{" & "}</i>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
