/**
 * Constantes de l'application
 */

// Timing et délais (en millisecondes)
export const TIMING = {
  INTRO_DURATION: 1500,
  SCROLL_DELAY_SHORT: 100,
  SCROLL_DELAY_LONG: 500,
  VIDEO_MODAL_AUTO_PLAY_DELAY: 100,
  VIDEO_HOVER_DELAY: 300,
  DEBOUNCE_RESIZE: 150,
} as const;

// Offsets et dimensions (en pixels)
export const LAYOUT = {
  HEADER_OFFSET: 80,
  INTRO_MIN_HEIGHT: 600,
} as const;

// Configuration des animations
export const ANIMATION = {
  FADE_DURATION: 1.5,
  EASING: "easeInOut" as const,
  MODAL_SCALE_DURATION: 0.25,
  MODAL_EXIT_DURATION: 0.2,
} as const;

// Configuration du typewriter
export const TYPEWRITER = {
  DEFAULT_SPEED: 50,
  DEFAULT_MIN_SPEED: 20,
  DEFAULT_DELAY: 0,
} as const;

// Configuration des vidéos
export const VIDEO = {
  FIRST_FRAME_TIME: 0.001,
} as const;

// Configuration du WebGL Shader
export const WEBGL_SHADER = {
  DEFAULT_TARGET_FPS: 30,
  MAX_PIXEL_RATIO: 2,
} as const;

// Messages et textes
export const MESSAGES = {
  CONTACT_SUCCESS: "Message envoyé avec succès !",
  CONTACT_ERROR: "Erreur lors de l'envoi du message.",
  ERROR_BOUNDARY_DEFAULT: "Une erreur s'est produite",
} as const;

// Session storage keys
export const STORAGE_KEYS = {
  INTRO_SEEN: "introSeen",
} as const;

