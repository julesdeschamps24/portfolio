"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LAYOUT, TIMING } from "@/lib/constants";

export function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === "/";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = useCallback(
    (targetId: string, smooth = true, retries = 3) => {
      const attemptScroll = () => {
        const element = document.getElementById(targetId);
        if (element) {
          const header = document.querySelector("header");
          const headerOffset = header ? header.offsetHeight : LAYOUT.HEADER_OFFSET;

          let absoluteTop = 0;
          let currentElement: HTMLElement | null = element;
          while (currentElement && currentElement !== document.body) {
            absoluteTop += currentElement.offsetTop;
            currentElement = currentElement.offsetParent as HTMLElement | null;
          }

          const scrollPosition = Math.max(0, absoluteTop - headerOffset);
          window.scrollTo({ top: scrollPosition, behavior: smooth ? "smooth" : "auto" });
          return true;
        }
        return false;
      };

      if (attemptScroll()) return;

      let attempt = 1;
      const tryScroll = () => {
        if (attemptScroll() || attempt >= retries) return;
        attempt++;
        setTimeout(tryScroll, TIMING.SCROLL_DELAY_SHORT * attempt);
      };
      setTimeout(tryScroll, 50);
    },
    [],
  );

  const handleScroll = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
      e.preventDefault();
      e.stopPropagation();
      setIsMobileMenuOpen(false);
      setTimeout(() => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => scrollToSection(targetId, true));
        });
      }, TIMING.SCROLL_DELAY_SHORT);
    },
    [scrollToSection],
  );

  const handleLinkClick = useCallback(
    (href: string, e?: React.MouseEvent) => {
      if (e) e.preventDefault();
      setIsMobileMenuOpen(false);
      if (href.startsWith("/#")) {
        const sectionId = href.replace("/#", "");
        router.push("/");
        setTimeout(() => {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => scrollToSection(sectionId, true));
          });
        }, TIMING.SCROLL_DELAY_SHORT * 3);
      }
    },
    [router, scrollToSection],
  );

  const navLinks = useMemo(
    () => [
      { id: "work", label: "Réalisations", href: "/#work", homeHref: "#work" },
      { id: "services", label: "Services", href: "/#services", homeHref: "#services" },
      { id: "about", label: "Approche", href: "/#about", homeHref: "#about" },
      { id: "contact", label: "Contact", href: "/#contact", homeHref: "#contact" },
    ],
    [],
  );

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      setTimeout(() => scrollToSection(hash, false), TIMING.SCROLL_DELAY_SHORT);
    }
  }, [scrollToSection]);

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

  return (
    <header className="site-header">
      <div className="site-header__inner">
        {isHomePage ? (
          <a href="#accueil" onClick={(e) => handleScroll(e, "accueil")} className="brand">
            Studio<span> — Jules Deschamps</span>
          </a>
        ) : (
          <Link href="/" className="brand">
            Studio<span> — Jules Deschamps</span>
          </Link>
        )}

        <nav className="nav-links">
          {navLinks.map((link) =>
            isHomePage ? (
              <a key={link.id} href={link.homeHref} onClick={(e) => handleScroll(e, link.id)}>
                {link.label}
              </a>
            ) : (
              <a key={link.id} href={link.href} onClick={(e) => handleLinkClick(link.href, e)}>
                {link.label}
              </a>
            ),
          )}
        </nav>

        {isHomePage ? (
          <a href="#contact" onClick={(e) => handleScroll(e, "contact")} className="nav-cta">
            Me contacter
          </a>
        ) : (
          <a href="/#contact" onClick={(e) => handleLinkClick("/#contact", e)} className="nav-cta">
            Me contacter
          </a>
        )}

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="nav-burger"
          aria-label="Menu"
          aria-expanded={isMobileMenuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className={`mobile-menu ${isMobileMenuOpen ? "open" : ""}`}>
        {navLinks.map((link) =>
          isHomePage ? (
            <a key={link.id} href={link.homeHref} onClick={(e) => handleScroll(e, link.id)}>
              {link.label}
            </a>
          ) : (
            <a key={link.id} href={link.href} onClick={(e) => handleLinkClick(link.href, e)}>
              {link.label}
            </a>
          ),
        )}
      </div>
    </header>
  );
}
