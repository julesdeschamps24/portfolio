import { useEffect, useState } from "react";
import { STORAGE_KEYS, TIMING, ANIMATION } from "@/lib/constants";
import { handleHashScroll } from "@/lib/utils/scroll";

/**
 * Hook pour gérer l'affichage de l'intro et la transition vers le contenu
 * 
 * IMPORTANT: Toujours initialiser avec les mêmes valeurs côté serveur et client
 * pour éviter les erreurs d'hydratation. L'état est mis à jour dans useEffect
 * après le montage du composant côté client uniquement.
 */
export function useIntro() {
  // Toujours initialiser à false pour garantir un rendu identique serveur/client
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [isIntroVisible, setIsIntroVisible] = useState(false);
  const [isIntroCompletelyFinished, setIsIntroCompletelyFinished] = useState(false);

  useEffect(() => {
    // Vérifier si l'intro a déjà été vue (uniquement côté client)
    const hasSeenIntro = sessionStorage.getItem(STORAGE_KEYS.INTRO_SEEN);

    if (hasSeenIntro) {
      // Si l'intro a déjà été vue, afficher directement le contenu
      // Utiliser requestAnimationFrame pour éviter les warnings du linter
      requestAnimationFrame(() => {
        setIsContentVisible(true);
        setIsIntroVisible(false);
        setIsIntroCompletelyFinished(true);
      });
      // Gérer le scroll vers une ancre si présente dans l'URL
      handleHashScroll(TIMING.SCROLL_DELAY_SHORT);
    } else {
      // Si c'est la première visite, afficher l'intro puis transitionner
      // Utiliser requestAnimationFrame pour éviter les warnings du linter
      requestAnimationFrame(() => {
        setIsIntroVisible(true);
      });
      
      // Transition automatique après la durée définie
      const timer = setTimeout(() => {
        setIsContentVisible(true);
        setIsIntroVisible(false);
        // Marquer que l'intro a été vue
        sessionStorage.setItem(STORAGE_KEYS.INTRO_SEEN, "true");
        // Gérer le scroll vers une ancre si présente dans l'URL après l'intro
        handleHashScroll(TIMING.SCROLL_DELAY_LONG);
      }, TIMING.INTRO_DURATION);

      // Démarrer le fade de l'animation curve légèrement plus tôt
      // pour une transition plus fluide avec l'animation de sortie de l'intro
      const finishTimer = setTimeout(() => {
        setIsIntroCompletelyFinished(true);
      }, TIMING.INTRO_DURATION + ANIMATION.FADE_DURATION * 1000 - 800);

      return () => {
        clearTimeout(timer);
        clearTimeout(finishTimer);
      };
    }
  }, []);

  return {
    isContentVisible,
    isIntroVisible,
    isIntroCompletelyFinished,
  };
}

