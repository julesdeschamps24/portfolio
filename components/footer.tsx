import Link from "next/link";
import { SOCIAL_LINKS } from "@/lib/social-links";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-black/60 backdrop-blur py-8 mt-20">
      <div className="mx-auto max-w-6xl px-6 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
        <div className="text-zinc-500 text-sm text-center md:text-left order-2 md:order-1">
          © {currentYear} Jules Deschamps. Tous droits réservés.
        </div>
        
        <div className="flex flex-col md:flex-row items-center gap-6 order-1 md:order-2">
          <div className="flex gap-4">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-500 hover:text-white transition"
                aria-label={link.name}
              >
                <link.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
          
          <div className="hidden md:block w-px h-4 bg-white/10" />
          
          <div className="flex gap-6 text-sm">
            <Link 
              href="/mentions-legales" 
              className="text-zinc-500 hover:text-white transition"
            >
              Mentions Légales
            </Link>
            <Link 
              href="/politique-confidentialite" 
              className="text-zinc-500 hover:text-white transition"
            >
              Politique de Confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

