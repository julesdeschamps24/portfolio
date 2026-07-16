import Image from "next/image";
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

        <div className="contact-bubble reveal" style={{ transitionDelay: "110ms" }}>
          <Image
            src="/img/jules.jpg"
            alt="Jules Deschamps"
            width={160}
            height={200}
          />
          <span>
            Jules Deschamps — c&apos;est moi qui vous répond, sans engagement.
          </span>
        </div>

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
