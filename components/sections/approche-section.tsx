const PRINCIPES = [
  { n: "I", title: "Sur-mesure", desc: "Aucun site identique à un autre. Le vôtre est unique." },
  { n: "II", title: "Rapide & mobile", desc: "Impeccable sur téléphone, où viennent la plupart des visiteurs." },
  { n: "III", title: "Trouvé localement", desc: "Optimisé pour le référencement de votre zone." },
  { n: "IV", title: "Accompagnement", desc: "Un seul interlocuteur, du premier échange au suivi." },
];

export function ApprocheSection() {
  return (
    <section id="about" className="sec manifesto">
      <div className="wrap">
        <p className="big reveal">
          Pas de template recyclé. Chaque site est <em className="s">dessiné</em> autour de votre
          métier, de vos clients et de votre quartier, pour qu&apos;il vous{" "}
          <em className="s">ressemble</em> vraiment.
        </p>
        <div className="principes">
          {PRINCIPES.map((p, i) => (
            <div key={p.n} className="principe reveal" style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="n">{p.n}</div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
