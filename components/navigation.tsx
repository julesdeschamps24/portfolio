"use client";

import { useEffect } from "react";

export function Navigation() {
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
        <a
          href="#accueil"
          onClick={(e) => handleScroll(e, "accueil")}
          className="text-lg font-semibold text-white cursor-pointer"
        >
          Jules Deschamps
        </a>
        <nav className="flex items-center gap-6 text-sm text-zinc-200">
          <a
            href="#accueil"
            onClick={(e) => handleScroll(e, "accueil")}
            className="transition hover:text-white hover:underline underline-offset-4 cursor-pointer"
          >
            Accueil
          </a>
          <a
            href="#projets"
            onClick={(e) => handleScroll(e, "projets")}
            className="transition hover:text-white hover:underline underline-offset-4 cursor-pointer"
          >
            Projets
          </a>
          <a
            href="#contact"
            onClick={(e) => handleScroll(e, "contact")}
            className="transition hover:text-white hover:underline underline-offset-4 cursor-pointer"
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
