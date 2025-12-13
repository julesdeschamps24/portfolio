"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export function Navigation() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    // Fermer le menu mobile après avoir cliqué sur un lien
    setIsMobileMenuOpen(false);
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

  // Empêcher le scroll du body quand le menu mobile est ouvert
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { id: "accueil", label: "Accueil", href: "/", homeHref: "#accueil" },
    { id: "projets", label: "Projets", href: "/projets", homeHref: "#projets" },
    { id: "competences", label: "Compétences", href: "/competences", homeHref: "#competences" },
    { id: "a-propos", label: "À propos", href: "/#a-propos", homeHref: "#a-propos" },
    { id: "contact", label: "Contact", href: "/contact", homeHref: "#contact" },
  ];

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
        
        {/* Menu desktop - caché sur mobile */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-zinc-200">
          {navLinks.map((link) =>
            isHomePage ? (
              <a
                key={link.id}
                href={link.homeHref}
                onClick={(e) => handleScroll(e, link.id)}
                className="transition hover:text-white hover:underline underline-offset-4 cursor-pointer"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.id}
                href={link.href}
                className="transition hover:text-white hover:underline underline-offset-4 cursor-pointer"
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* Bouton hamburger - visible uniquement sur mobile */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2 text-white focus:outline-none"
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          <motion.span
            animate={isMobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.2 }}
            className="block h-0.5 w-6 bg-white"
          />
          <motion.span
            animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="block h-0.5 w-6 bg-white"
          />
          <motion.span
            animate={isMobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.2 }}
            className="block h-0.5 w-6 bg-white"
          />
        </button>
      </div>

      {/* Menu mobile dépliable */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-black/95 backdrop-blur border-t border-white/10"
          >
            <nav className="flex flex-col px-6 py-4 gap-4">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.2 }}
                >
                  {isHomePage ? (
                    <a
                      href={link.homeHref}
                      onClick={(e) => handleScroll(e, link.id)}
                      className="block py-2 text-base text-zinc-200 transition hover:text-white hover:underline underline-offset-4 cursor-pointer"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-2 text-base text-zinc-200 transition hover:text-white hover:underline underline-offset-4 cursor-pointer"
                    >
                      {link.label}
                    </Link>
                  )}
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
