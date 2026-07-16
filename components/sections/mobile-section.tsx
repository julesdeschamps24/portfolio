import Image from "next/image";

type Group = { name: string; home: string; contact: string };

// 2 groupes de 2 téléphones superposés (pattern vanholtz.co/work/studiomega).
// Un groupe = UN site : son accueil devant, sa page contact derrière. Montrer le
// formulaire de contact du même site prouve que le mobile est soigné jusqu'au
// bout du parcours, pas seulement sur la page d'accueil.
const GROUPS: Group[] = [
  { name: "Au Poil", home: "au-poil", contact: "au-poil-contact" },
  { name: "Dauffy Paysage", home: "dauffy-paysage", contact: "dauffy-paysage-contact" },
];

function PhoneFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="phone">
      <div className="phone-notch" />
      <Image src={`/img/mobile/${src}.jpg`} alt={alt} width={500} height={1084} />
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
            <div className="phone-group reveal" style={{ transitionDelay: `${gi * 120}ms` }} key={g.home}>
              <PhoneFrame src={g.home} alt={`Accueil du site ${g.name} sur téléphone`} />
              <div className="phone-back">
                <PhoneFrame src={g.contact} alt={`Page de contact du site ${g.name} sur téléphone`} />
              </div>
              <p className="phone-cap">{g.name} · accueil &amp; contact</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
