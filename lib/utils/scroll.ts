/**
 * Utilitaires pour la gestion du scroll vers les ancres
 */

import { LAYOUT, TIMING } from "@/lib/constants";

interface ScrollToAnchorOptions {
  anchorId: string;
  delay?: number;
  smooth?: boolean;
  headerOffset?: number;
}

/**
 * Fait défiler la page vers une ancre avec un délai optionnel
 */
export function scrollToAnchor({
  anchorId,
  delay = 0,
  smooth = true,
  headerOffset = LAYOUT.HEADER_OFFSET,
}: ScrollToAnchorOptions): void {
  const scroll = () => {
    const element = document.getElementById(anchorId);
    if (!element) return;

    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition =
      elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: Math.max(0, offsetPosition),
      behavior: smooth ? "smooth" : "auto",
    });
  };

  if (delay > 0) {
    setTimeout(scroll, delay);
  } else {
    scroll();
  }
}

/**
 * Extrait l'ID de l'ancre depuis le hash de l'URL
 */
export function getAnchorFromHash(): string {
  return window.location.hash.replace("#", "");
}

/**
 * Gère le scroll vers une ancre si présente dans l'URL
 */
export function handleHashScroll(
  delay: number = TIMING.SCROLL_DELAY_SHORT,
): void {
  const hash = getAnchorFromHash();
  if (hash) {
    scrollToAnchor({ anchorId: hash, delay });
  }
}

