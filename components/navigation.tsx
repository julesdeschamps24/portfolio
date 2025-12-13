"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === "/";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (targetId: string, smooth = true, retries = 3) => {
    // #region agent log
    fetch('http://127.0.0.1:7244/ingest/ebde0495-8865-4dbb-a9a0-427bd006428b',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'navigation.tsx:scrollToSection',message:'scrollToSection called',data:{targetId,smooth,retries,currentScrollY:window.pageYOffset,bodyOverflow:document.body.style.overflow,windowHeight:window.innerHeight,documentHeight:document.documentElement.scrollHeight},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A,B,D'})}).catch(()=>{});
    // #endregion
    const attemptScroll = (attempt: number) => {
      const element = document.getElementById(targetId);
      // #region agent log
      fetch('http://127.0.0.1:7244/ingest/ebde0495-8865-4dbb-a9a0-427bd006428b',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'navigation.tsx:attemptScroll',message:'attemptScroll start',data:{targetId,attempt,elementFound:!!element,currentScrollY:window.pageYOffset},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A,B'})}).catch(()=>{});
      // #endregion
      if (element) {
        // Obtenir la hauteur réelle du header
        const header = document.querySelector('header');
        const headerOffset = header ? header.offsetHeight : 80;
        
        // Calculer la position absolue depuis le haut du document en remontant depuis l'élément
        // jusqu'au body. Cette méthode est plus fiable que getBoundingClientRect() + pageYOffset
        // car elle ne dépend pas de la position actuelle du scroll
        let absoluteTop = 0;
        let currentElement: HTMLElement | null = element;
        while (currentElement && currentElement !== document.body) {
          absoluteTop += currentElement.offsetTop;
          currentElement = currentElement.offsetParent as HTMLElement | null;
        }
        
        // Calculer la position de scroll pour amener le début de la section juste sous le header
        const scrollPosition = Math.max(0, absoluteTop - headerOffset);
        
        // #region agent log
        fetch('http://127.0.0.1:7244/ingest/ebde0495-8865-4dbb-a9a0-427bd006428b',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'navigation.tsx:attemptScroll',message:'scroll calculation',data:{targetId,attempt,pageYOffset:window.pageYOffset,headerOffset,absoluteTop,scrollPosition,elementOffsetTop:element.offsetTop},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'A,B,C'})}).catch(()=>{});
        // #endregion
        
        window.scrollTo({
          top: scrollPosition,
          behavior: smooth ? "smooth" : "auto",
        });
        
        // #region agent log
        fetch('http://127.0.0.1:7244/ingest/ebde0495-8865-4dbb-a9a0-427bd006428b',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'navigation.tsx:attemptScroll',message:'scroll executed',data:{targetId,attempt,scrollPosition,currentScrollY:window.pageYOffset},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
        // #endregion
        
        // Vérifier la position après un court délai pour voir si le scroll a atteint la position calculée
        if (smooth) {
          setTimeout(() => {
            const finalRect = element.getBoundingClientRect();
            // #region agent log
            fetch('http://127.0.0.1:7244/ingest/ebde0495-8865-4dbb-a9a0-427bd006428b',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'navigation.tsx:attemptScroll',message:'scroll position after delay',data:{targetId,attempt,expectedScrollPosition:scrollPosition,actualScrollY:window.pageYOffset,elementTopAfterScroll:finalRect.top,elementOffsetTop:element.offsetTop},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
            // #endregion
          }, 500);
        }
        
        return true;
      }
      return false;
    };

    // Essayer immédiatement
    if (attemptScroll(0)) return;

    // Si l'élément n'est pas trouvé, réessayer avec des délais progressifs
    let attempt = 1;
    const tryScroll = () => {
      if (attemptScroll(attempt) || attempt >= retries) return;
      attempt++;
      setTimeout(tryScroll, 100 * attempt);
    };
    
    setTimeout(tryScroll, 50);
  };

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    // #region agent log
    fetch('http://127.0.0.1:7244/ingest/ebde0495-8865-4dbb-a9a0-427bd006428b',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'navigation.tsx:handleScroll',message:'handleScroll called',data:{targetId,isMobileMenuOpen,currentScrollY:window.pageYOffset,bodyOverflow:document.body.style.overflow,documentHeight:document.documentElement.scrollHeight},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A,D'})}).catch(()=>{});
    // #endregion
    e.preventDefault();
    e.stopPropagation();
    
    // Fermer le menu d'abord
    setIsMobileMenuOpen(false);
    // #region agent log
    fetch('http://127.0.0.1:7244/ingest/ebde0495-8865-4dbb-a9a0-427bd006428b',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'navigation.tsx:handleScroll',message:'menu closed, before timeout',data:{targetId,currentScrollY:window.pageYOffset,bodyOverflow:document.body.style.overflow,documentHeight:document.documentElement.scrollHeight},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
    // #endregion
    
    // Attendre que le useEffect ait restauré l'overflow et que le DOM soit stabilisé
    // Utiliser requestAnimationFrame pour s'assurer que le DOM est mis à jour
    // Ajouter un petit délai pour que le menu soit complètement fermé avant de scroller
    setTimeout(() => {
      // #region agent log
      fetch('http://127.0.0.1:7244/ingest/ebde0495-8865-4dbb-a9a0-427bd006428b',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'navigation.tsx:handleScroll',message:'timeout callback, before RAF',data:{targetId,currentScrollY:window.pageYOffset,bodyOverflow:document.body.style.overflow,documentHeight:document.documentElement.scrollHeight},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
      // #endregion
      requestAnimationFrame(() => {
        // #region agent log
        fetch('http://127.0.0.1:7244/ingest/ebde0495-8865-4dbb-a9a0-427bd006428b',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'navigation.tsx:handleScroll',message:'first RAF, before second RAF',data:{targetId,currentScrollY:window.pageYOffset,bodyOverflow:document.body.style.overflow,documentHeight:document.documentElement.scrollHeight},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
        // #endregion
        requestAnimationFrame(() => {
          // #region agent log
          fetch('http://127.0.0.1:7244/ingest/ebde0495-8865-4dbb-a9a0-427bd006428b',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'navigation.tsx:handleScroll',message:'second RAF, calling scrollToSection',data:{targetId,currentScrollY:window.pageYOffset,bodyOverflow:document.body.style.overflow,documentHeight:document.documentElement.scrollHeight},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
          // #endregion
          scrollToSection(targetId, true);
        });
      });
    }, 100);
  };

  const handleLinkClick = (href: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
    }
    
    // Fermer le menu immédiatement
    setIsMobileMenuOpen(false);
    
    // Si c'est un lien vers une section de la page d'accueil depuis une autre page
    if (href.startsWith("/#")) {
      const sectionId = href.replace("/#", "");
      // Naviguer vers la page d'accueil
      router.push("/");
      // Attendre que la navigation soit terminée puis scroller
      setTimeout(() => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            scrollToSection(sectionId, true);
          });
        });
      }, 300);
    }
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
    // #region agent log
    fetch('http://127.0.0.1:7244/ingest/ebde0495-8865-4dbb-a9a0-427bd006428b',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'navigation.tsx:useEffect overflow',message:'overflow state changed',data:{isMobileMenuOpen,newOverflow:isMobileMenuOpen?'hidden':'unset',currentScrollY:window.pageYOffset,documentHeight:document.documentElement.scrollHeight},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
    // #endregion
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
                      className="block py-3 text-base text-zinc-200 transition hover:text-white hover:underline underline-offset-4 cursor-pointer touch-manipulation active:text-indigo-300"
                    >
                      {link.label}
                    </a>
                  ) : link.href.startsWith("/#") ? (
                    <a
                      href={link.href}
                      onClick={(e) => handleLinkClick(link.href, e)}
                      className="block py-3 text-base text-zinc-200 transition hover:text-white hover:underline underline-offset-4 cursor-pointer touch-manipulation active:text-indigo-300"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-3 text-base text-zinc-200 transition hover:text-white hover:underline underline-offset-4 cursor-pointer touch-manipulation active:text-indigo-300"
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
