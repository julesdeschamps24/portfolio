const SERVICES = [
  {
    no: "01",
    title: "Design & identité",
    desc: "Une image soignée et cohérente, qui vous distingue de la concurrence du quartier.",
  },
  {
    no: "02",
    title: "Site sur-mesure",
    desc: "Conçu autour de votre métier — pas un thème générique recyclé pour tout le monde.",
  },
  {
    no: "03",
    title: "Visible localement",
    desc: "Pensé pour ressortir sur Google quand on cherche votre activité dans votre ville.",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="sec band">
      <div className="wrap">
        <div className="shead reveal">
          <span className="lbl">Ce que je fais</span>
          <h2>Du design à la mise en ligne.</h2>
        </div>
        {SERVICES.map((s, i) => (
          <div key={s.no} className="svc reveal" style={{ transitionDelay: `${i * 70}ms` }}>
            <div className="no">{s.no}</div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
