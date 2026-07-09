const SECTORS = [
  "Restaurants",
  "Artisans",
  "Boutiques",
  "Coachs",
  "Praticiens",
  "Commerces",
];

export function HeroSection() {
  return (
    <section id="accueil" className="hero">
      <div className="wrap">
        <div className="eyebrow">Studio web · entreprises &amp; commerces locaux</div>
        <h1>
          Des sites web
          <br />
          sur-mesure pour les
          <br />
          <em className="s">entreprises locales</em>.
        </h1>
        <div className="hero-bottom">
          <p>
            Studio indépendant. Je conçois et développe des sites soignés pour les
            commerces, artisans et indépendants qui veulent une présence en ligne à leur
            image.
          </p>
          <div className="meta">
            Conception &amp; développement
            <br />
            Identité &amp; design
            <br />
            Visibilité locale
          </div>
        </div>
        <div className="btns">
          <a href="#work" className="btn">
            Voir mes réalisations <span className="arrow">↓</span>
          </a>
          <a href="#contact" className="link">
            Un projet ? Écrivez-moi
          </a>
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
