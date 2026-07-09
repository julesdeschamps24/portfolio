import { ContactForm } from "@/components/contact-form";

export function ContactSection() {
  return (
    <section id="contact" className="contact band">
      <div className="wrap">
        <div className="eyebrow reveal">Contact</div>
        <h2 className="reveal" style={{ transitionDelay: "60ms" }}>
          Un projet
          <br />
          de <em className="s">site</em> ?
        </h2>
        <p className="lead reveal" style={{ transitionDelay: "120ms" }}>
          Parlez-moi de votre entreprise. Je vous réponds avec plaisir, sans engagement.
        </p>
        <a
          href="mailto:contact@julesdeschamps.dev"
          className="mail reveal"
          style={{ transitionDelay: "160ms" }}
        >
          contact@julesdeschamps.dev
        </a>

        <div className="reveal" style={{ transitionDelay: "200ms" }}>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
