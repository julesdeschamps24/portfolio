import { ContactForm } from "@/components/contact-form";

export function ContactSection() {
  return (
    <section id="contact" className="contact band">
      <div className="wrap">
        <div className="eyebrow">Contact</div>
        <h2>
          Un projet
          <br />
          de <em className="s">site</em> ?
        </h2>
        <p className="lead">
          Parlez-moi de votre entreprise. Je vous réponds avec plaisir, sans engagement.
        </p>
        <a href="mailto:contact@julesdeschamps.dev" className="mail">
          contact@julesdeschamps.dev
        </a>

        <ContactForm />
      </div>
    </section>
  );
}
