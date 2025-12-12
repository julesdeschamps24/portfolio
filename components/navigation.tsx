"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navigation() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const scrollToSection = (targetId: string, smooth = true) => {
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 80; // Hauteur du header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: smooth ? "smooth" : "auto",
      });
    }
  };

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    scrollToSection(targetId, true);
  };

  useEffect(() => {
    // Gérer les ancres au chargement de la page
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      // Attendre que le contenu soit chargé
      setTimeout(() => {
        scrollToSection(hash, false);
      }, 100);
    }
  }, []);

  useEffect(() => {
    // Écouter les changements de hash
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        scrollToSection(hash, true);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/60 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {isHomePage ? (
          <a
            href="#accueil"
            onClick={(e) => handleScroll(e, "accueil")}
            className="text-lg font-semibold text-white cursor-pointer"
          >
            Jules Deschamps
          </a>
        ) : (
          <Link
            href="/"
            className="text-lg font-semibold text-white cursor-pointer"
          >
            Jules Deschamps
          </Link>
        )}
        <nav className="flex items-center gap-6 text-sm text-zinc-200">
          {isHomePage ? (
            <a
              href="#accueil"
              onClick={(e) => handleScroll(e, "accueil")}
              className="transition hover:text-white hover:underline underline-offset-4 cursor-pointer"
            >
              Accueil
            </a>
          ) : (
            <Link
              href="/"
              className="transition hover:text-white hover:underline underline-offset-4 cursor-pointer"
            >
              Accueil
            </Link>
          )}
          {isHomePage ? (
            <a
              href="#projets"
              onClick={(e) => handleScroll(e, "projets")}
              className="transition hover:text-white hover:underline underline-offset-4 cursor-pointer"
            >
              Projets
            </a>
          ) : (
            <Link
              href="/projets"
              className="transition hover:text-white hover:underline underline-offset-4 cursor-pointer"
            >
              Projets
            </Link>
          )}
          {isHomePage ? (
            <a
              href="#competences"
              onClick={(e) => handleScroll(e, "competences")}
              className="transition hover:text-white hover:underline underline-offset-4 cursor-pointer"
            >
              Compétences
            </a>
          ) : (
            <Link
              href="/competences"
              className="transition hover:text-white hover:underline underline-offset-4 cursor-pointer"
            >
              Compétences
            </Link>
          )}
          {isHomePage ? (
            <a
              href="#a-propos"
              onClick={(e) => handleScroll(e, "a-propos")}
              className="transition hover:text-white hover:underline underline-offset-4 cursor-pointer"
            >
              À propos
            </a>
          ) : (
            <Link
              href="/#a-propos"
              className="transition hover:text-white hover:underline underline-offset-4 cursor-pointer"
            >
              À propos
            </Link>
          )}
          {isHomePage ? (
            <a
              href="#contact"
              onClick={(e) => handleScroll(e, "contact")}
              className="transition hover:text-white hover:underline underline-offset-4 cursor-pointer"
            >
              Contact
            </a>
          ) : (
            <Link
              href="/contact"
              className="transition hover:text-white hover:underline underline-offset-4 cursor-pointer"
            >
              Contact
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
