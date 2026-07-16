import Image from "next/image";

type Phone = { slug: string; name: string };

// 2 groupes de 2 téléphones superposés (pattern vanholtz.co/work/studiomega)
const GROUPS: [Phone, Phone][] = [
  [
    { slug: "dauffy-paysage", name: "Dauffy Paysage" },
    { slug: "laborde-services", name: "Laborde Services" },
  ],
  [
    { slug: "estelle-fonder", name: "Estelle Fonder" },
    { slug: "bs-atout-vert", name: "BS Atout Vert" },
  ],
];

function PhoneFrame({ p }: { p: Phone }) {
  return (
    <div className="phone">
      <div className="phone-notch" />
      <Image
        src={`/img/mobile/${p.slug}.jpg`}
        alt={`Version mobile du site ${p.name}`}
        width={500}
        height={1084}
      />
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
          Chaque site est conçu pour le mobile d&apos;abord — pas adapté après coup.
        </p>

        <div className="phones">
          {GROUPS.map(([a, b], gi) => (
            <div className="phone-group reveal" style={{ transitionDelay: `${gi * 120}ms` }} key={gi}>
              <PhoneFrame p={a} />
              <div className="phone-back">
                <PhoneFrame p={b} />
              </div>
              <p className="phone-cap">
                {a.name} · {b.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
