import Link from "next/link";
import { SOCIAL_LINKS } from "@/lib/social-links";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__top">
          <div className="fb">
            Jules Deschamps
          </div>

          <div className="fcol">
            <h4>Menu</h4>
            <Link href="/#work">Réalisations</Link>
            <Link href="/#services">Services</Link>
            <Link href="/#about">Approche</Link>
            <Link href="/#contact">Contact</Link>
          </div>

          <div className="fcol">
            <h4>Réseaux</h4>
            {SOCIAL_LINKS.map((link) => (
              <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer">
                {link.name}
              </a>
            ))}
          </div>

          <div className="fcol">
            <h4>Contact</h4>
            <a href="mailto:contact@julesdeschamps.dev">contact@julesdeschamps.dev</a>
            <Link href="/mentions-legales">Mentions légales</Link>
            <Link href="/politique-confidentialite">Politique de confidentialité</Link>
          </div>
        </div>

        <div className="site-footer__bottom">
          <div>© {currentYear} Jules Deschamps. Tous droits réservés.</div>
          <div>Création de sites web pour entreprises locales</div>
        </div>
      </div>
    </footer>
  );
}
