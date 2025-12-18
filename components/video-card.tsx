"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { VIDEO, TIMING, ANIMATION } from "@/lib/constants";

interface VideoCardProps {
  title: string;
  description?: string;
  src: string;
  poster?: string;
  className?: string;
}

// Constantes pour la gestion anti-spam
const DEBOUNCE_MS = 300;
// Délai typique du click synthétique sur mobile : ~300ms après touchstart
const SYNTHETIC_CLICK_DELAY = 50; // Clicks dans les 50ms après touch sont considérés synthétiques

// Gestion robuste des modals multiples
// Ces variables sont encapsulées dans un objet pour éviter les problèmes de closure
// et garantir un état cohérent même avec React StrictMode
const scrollLockState = {
  openModals: new Set<string>(),
  savedScrollPosition: 0,
  isLocked: false, // Indicateur primaire : le scroll est-il actuellement bloqué?
};

// Générer un ID unique pour chaque instance de VideoCard
let instanceCounter = 0;
const generateId = () => `video-card-${++instanceCounter}`;

// Bug 2 fix: Échapper les URLs pour une utilisation sûre dans CSS url()
// Les caractères spéciaux (, ), ', ", et \ doivent être échappés
const escapeCssUrl = (url: string): string => {
  return url.replace(/[()'"\\]/g, char => `\\${char}`);
};

export function VideoCard({
  title,
  description,
  src,
  poster,
  className,
}: VideoCardProps) {

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const modalVideoRef = useRef<HTMLVideoElement | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Refs pour anti-spam et gestion touch/click
  const isProcessingRef = useRef(false);
  const lastTouchTimeRef = useRef(0);
  const isAnimatingRef = useRef(false);
  
  // ID unique stable pour cette instance (Bug 1 fix: évite les race conditions)
  const instanceIdRef = useRef<string | null>(null);
  if (!instanceIdRef.current) {
    instanceIdRef.current = generateId();
  }

  const handlePlay = useCallback((ref: React.RefObject<HTMLVideoElement | null>) => {
    const el = ref.current;
    if (!el) return;
    void el.play().catch(() => {});
  }, []);

  const handlePause = useCallback((ref: React.RefObject<HTMLVideoElement | null>) => {
    const el = ref.current;
    if (!el) return;
    el.pause();
    el.currentTime = 0;
  }, []);

  const handleShowFirstFrame = useCallback(
    (ref: React.RefObject<HTMLVideoElement | null>) => {
      const el = ref.current;
      if (!el) return;
      el.currentTime = VIDEO.FIRST_FRAME_TIME;
      el.pause();
      setIsVideoLoaded(true);
    },
    [],
  );

  // Forcer le chargement de la première frame sur mobile (iOS/Android)
  const isVideoLoadedRef = useRef(false);
  
  useEffect(() => {
    const video = videoRef.current;
    // Si déjà chargé, ne rien faire (idempotent)
    if (!video || isVideoLoadedRef.current) return;

    // Définir les événements à écouter
    const events = ["loadedmetadata", "loadeddata", "canplay"] as const;
    
    // Créer le callback - capturé par valeur dans cette closure
    const forceLoadFirstFrame = () => {
      if (isVideoLoadedRef.current) return; // Guard contre les appels multiples
      isVideoLoadedRef.current = true;
      
      // Forcer la première frame si pas de poster
      if (!poster) {
        video.currentTime = VIDEO.FIRST_FRAME_TIME;
      }
      setIsVideoLoaded(true);
      
      // Auto-cleanup : retirer les listeners restants après le premier déclenchement
      // Utilise la même référence 'forceLoadFirstFrame' capturée dans cette closure
      events.forEach(evt => video.removeEventListener(evt, forceLoadFirstFrame));
    };

    // Ajouter les listeners
    events.forEach(evt => video.addEventListener(evt, forceLoadFirstFrame));
    
    // Forcer si déjà prêt (la vidéo peut être en cache)
    if (video.readyState >= 1) {
      forceLoadFirstFrame();
    }

    // Fallback timeout pour iOS Safari qui peut bloquer le chargement
    const fallbackTimer = setTimeout(() => {
      forceLoadFirstFrame(); // Réutilise le même callback avec le guard interne
    }, 3000);

    // Cleanup : capture 'forceLoadFirstFrame' par valeur (closure)
    // Cela garantit qu'on retire le BON callback, même si poster change entre-temps
    return () => {
      events.forEach(evt => video.removeEventListener(evt, forceLoadFirstFrame));
      clearTimeout(fallbackTimer);
    };
  }, [poster]);

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  // Gérer le blocage du scroll avec état partagé robuste
  // Utilise un objet pour éviter les problèmes de closure et React StrictMode
  useEffect(() => {
    const id = instanceIdRef.current;
    if (!id) return;
    
    if (isExpanded) {
      // Vérifier si ce modal est déjà enregistré (idempotent)
      if (scrollLockState.openModals.has(id)) return;
      
      // Premier modal à s'ouvrir : verrouiller le scroll
      // IMPORTANT: Ne sauvegarder la position QUE si le scroll n'est pas déjà bloqué
      // Cela évite de capturer une position incorrecte en cas de re-render React
      if (!scrollLockState.isLocked) {
        scrollLockState.savedScrollPosition = window.scrollY;
        scrollLockState.isLocked = true;
        document.body.style.overflow = "hidden";
        document.body.style.position = "fixed";
        document.body.style.top = `-${scrollLockState.savedScrollPosition}px`;
        document.body.style.width = "100%";
      }
      scrollLockState.openModals.add(id);
    }
    
    return () => {
      if (!id || !scrollLockState.openModals.has(id)) return;
      
      scrollLockState.openModals.delete(id);
      
      // Dernier modal fermé : restaurer le scroll
      // Vérifie à la fois le Set ET le flag isLocked pour plus de robustesse
      if (scrollLockState.openModals.size === 0 && scrollLockState.isLocked) {
        const positionToRestore = scrollLockState.savedScrollPosition;
        
        // Réinitialiser l'état AVANT de restaurer le scroll
        // pour éviter les race conditions avec d'autres effets
        scrollLockState.isLocked = false;
        scrollLockState.savedScrollPosition = 0;
        
        document.body.style.overflow = "";
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        window.scrollTo({ top: positionToRestore, behavior: "instant" });
      }
    };
  }, [isExpanded]);

  useEffect(() => {
    if (!isExpanded) {
      isAnimatingRef.current = false;
      return;
    }

    isAnimatingRef.current = true;

    // Démarrer la vidéo automatiquement quand le modal s'ouvre
    const timer = setTimeout(() => {
      if (modalVideoRef.current) {
        handlePlay(modalVideoRef);
      }
      isAnimatingRef.current = false;
    }, TIMING.VIDEO_MODAL_AUTO_PLAY_DELAY);
    
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        // Bug 1 fix: Vérifier isProcessingRef comme dans handleCloseModal
        if (isProcessingRef.current) {
          return;
        }
        
        isProcessingRef.current = true;
        handlePause(modalVideoRef);
        setIsExpanded(false);
        
        setTimeout(() => {
          isProcessingRef.current = false;
        }, DEBOUNCE_MS);
      }
    };
    
    window.addEventListener("keydown", handleEscape);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isExpanded, handlePlay, handlePause]);

  /**
   * Handler pour enregistrer le timestamp du touch ET déclencher l'action
   * Sur mobile, c'est onTouchStart qui déclenche l'action, pas onClick
   */
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    // Toujours enregistrer le timestamp pour la détection du click synthétique
    lastTouchTimeRef.current = Date.now();
    
    // Vérifications anti-spam AVANT preventDefault
    // Si on ne va pas traiter l'événement, on laisse les comportements par défaut (zoom, scroll, etc.)
    if (isExpanded || isProcessingRef.current || isAnimatingRef.current) {
      return;
    }
    
    // Maintenant qu'on sait qu'on va traiter l'événement, on empêche les comportements par défaut
    e.preventDefault();
    
    isProcessingRef.current = true;
    
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    
    setIsExpanded(true);
    
    setTimeout(() => {
      isProcessingRef.current = false;
    }, DEBOUNCE_MS);
  }, [isExpanded]);

  /**
   * Handler pour les clicks (desktop uniquement)
   * Ignore les clicks synthétiques qui arrivent juste après un touch
   */
  const handleExpand = useCallback((e: React.MouseEvent) => {
    const now = Date.now();
    const timeSinceTouch = now - lastTouchTimeRef.current;
    
    // Ignorer les clicks synthétiques (générés après un touch)
    // Ne pas appeler preventDefault ici car on ignore l'événement
    if (timeSinceTouch < SYNTHETIC_CLICK_DELAY) {
      return;
    }
    
    // Vérification d'idempotence - ne pas bloquer si déjà ouvert
    if (isExpanded) {
      return;
    }
    
    // Vérification anti-spam - ne pas bloquer si en cours de traitement
    if (isProcessingRef.current || isAnimatingRef.current) {
      return;
    }
    
    // Maintenant qu'on sait qu'on va traiter l'événement, on empêche les comportements par défaut
    e.preventDefault();
    e.stopPropagation();
    
    // Activer le verrou
    isProcessingRef.current = true;
    
    // Nettoyer le hover timeout si présent
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    
    // Ouvrir le modal
    setIsExpanded(true);
    
    // Libérer le verrou après le debounce
    setTimeout(() => {
      isProcessingRef.current = false;
    }, DEBOUNCE_MS);
  }, [isExpanded]);

  /**
   * Handler unifié anti-spam pour close
   */
  const handleCloseModal = useCallback((e?: React.MouseEvent | React.TouchEvent) => {
    // Idempotence : si déjà fermé, no-op
    if (!isExpanded) {
      return;
    }
    
    // Anti-spam
    if (isProcessingRef.current) {
      return;
    }
    
    // Maintenant qu'on sait qu'on va traiter l'événement, on empêche les comportements par défaut
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    isProcessingRef.current = true;
    handlePause(modalVideoRef);
    setIsExpanded(false);
    
    setTimeout(() => {
      isProcessingRef.current = false;
    }, DEBOUNCE_MS);
  }, [isExpanded, handlePause]);

  /**
   * Détecter si on est sur touch device (pour desktop hover behavior)
   */
  const isTouchDevice = useCallback(() => {
    if (typeof window === "undefined") return false;
    return "ontouchstart" in window || navigator.maxTouchPoints > 0;
  }, []);

  return (
    <>
      <div
        className={cn(
          "group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-lg backdrop-blur",
          "transition hover:border-white/30",
          className,
        )}
      >
        {/* 
          STRATÉGIE POSTER/PREMIÈRE FRAME:
          1. Image de fond CSS comme fallback ultime
          2. Poster natif si fourni
          3. Spinner pendant le chargement
          4. Première frame via currentTime une fois loadé
        */}
        
        {/* Fallback CSS background si poster fourni */}
        {poster && (
          <div 
            className="absolute inset-0 h-64 w-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('${escapeCssUrl(poster)}')` }}
            aria-hidden="true"
          />
        )}
        
        {/* Placeholder spinner avant chargement */}
        {!isVideoLoaded && !poster && (
          <div className="absolute inset-0 h-64 w-full bg-zinc-900 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
          </div>
        )}
        
        <video
          ref={videoRef}
          className={cn(
            "relative h-64 w-full object-cover transition duration-500 cursor-pointer",
            // Sur mobile, on ne cache pas la vidéo si on a un poster (le poster natif devrait s'afficher)
            !isVideoLoaded && !poster && "opacity-0"
          )}
          src={src}
          // Poster natif - fonctionne bien sur la plupart des navigateurs
          poster={poster}
          // Attributs critiques pour mobile
          muted
          playsInline // CRITIQUE pour iOS
          loop
          // preload="metadata" est plus léger et suffisant pour afficher le poster
          // preload="auto" charge tout et peut être lent sur mobile
          preload="metadata"
          // Webkit-specific pour iOS
          {...{ "webkit-playsinline": "true" } as React.VideoHTMLAttributes<HTMLVideoElement>}
          onMouseEnter={() => handlePlay(videoRef)}
          onMouseLeave={() => handlePause(videoRef)}
          onLoadedData={() => handleShowFirstFrame(videoRef)}
          // Bug 2 fix: onTouchStart enregistre le timestamp, onClick vérifie si c'est synthétique
          onTouchStart={handleTouchStart}
          onClick={handleExpand}
          // Bug 3 fix: onError sur video détecte les erreurs de SOURCE vidéo, pas du poster
          // Le poster est une image séparée, son erreur de chargement n'est pas détectable via video.onError
          // On utilise le fallback CSS background-image à la place (ligne 273)
        />

        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-70" />

        <div
          className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-4 pointer-events-none"
        >
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          {description && (
            <p className="text-sm text-zinc-300 leading-5">{description}</p>
          )}
        </div>

        <div className="absolute right-4 top-4 flex gap-2">
          <button
            type="button" // CRITIQUE: empêche submit implicite dans un form
            onMouseEnter={() => {
              // Seulement sur desktop : ouvrir le modal après un court délai
              if (isTouchDevice()) return;
              hoverTimeoutRef.current = setTimeout(() => {
                if (!isExpanded && !isProcessingRef.current) {
                  setIsExpanded(true);
                }
              }, TIMING.VIDEO_HOVER_DELAY);
            }}
            onMouseLeave={() => {
              if (hoverTimeoutRef.current) {
                clearTimeout(hoverTimeoutRef.current);
                hoverTimeoutRef.current = null;
              }
            }}
            // Bug 2 fix: onTouchStart enregistre le timestamp pour détecter les clicks synthétiques
            onTouchStart={handleTouchStart}
            onClick={handleExpand}
            className="pointer-events-auto rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur transition hover:bg-white/20 active:scale-95"
            aria-expanded={isExpanded}
            aria-label={isExpanded ? "Vidéo agrandie" : "Agrandir la vidéo"}
          >
            Agrandir
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {isExpanded && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleCloseModal}
          >
            <motion.div
              className="relative w-[92vw] max-w-5xl overflow-hidden rounded-2xl border border-white/15 bg-black shadow-2xl"
              initial={{ scale: 0.92 }}
              animate={{
                scale: 1,
                transition: { duration: ANIMATION.MODAL_SCALE_DURATION },
              }}
              exit={{
                scale: 0.95,
                transition: { duration: ANIMATION.MODAL_EXIT_DURATION },
              }}
              onClick={(e) => e.stopPropagation()}
              onMouseLeave={() => {
                // Seulement sur desktop
                if (isTouchDevice()) return;
                handleCloseModal();
              }}
            >
              <video
                ref={modalVideoRef}
                className="h-full w-full max-h-[80vh] object-contain bg-black"
                src={src}
                muted
                playsInline
                loop
                controls={false}
                preload="auto"
                {...{ "webkit-playsinline": "true" } as React.VideoHTMLAttributes<HTMLVideoElement>}
                onMouseEnter={() => handlePlay(modalVideoRef)}
                onMouseLeave={() => handlePause(modalVideoRef)}
                onLoadedData={() => handleShowFirstFrame(modalVideoRef)}
              />
              {/* Bouton fermer - visible sur tous les appareils pour UX claire */}
              <button
                type="button"
                onClick={handleCloseModal}
                className="absolute top-4 right-4 rounded-full bg-black/50 p-2 text-white backdrop-blur transition hover:bg-black/70 active:scale-95"
                aria-label="Fermer la vidéo"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


