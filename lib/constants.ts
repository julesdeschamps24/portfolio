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
  DEFAULT_TARGET_FPS: 15,
  MAX_PIXEL_RATIO: 2,
} as const;

// Messages et textes
export const MESSAGES = {
  CONTACT_SUCCESS: "Message envoyé",
  CONTACT_ERROR: "Échec de l'envoi",
  ERROR_BOUNDARY_DEFAULT: "Une erreur s'est produite",
} as const;

// Session storage keys
export const STORAGE_KEYS = {
  INTRO_SEEN: "introSeen",
  COOKIE_CONSENT: "cookieConsent",
} as const;

// Configuration HubSpot Forms API
export const HUBSPOT = {
  PORTAL_ID: "147436504",
  FORM_GUID: "e5053cc1-a296-4616-9816-56c111b75ada",
  ENDPOINT: "https://api.hsforms.com/submissions/v3/integration/submit/147436504/e5053cc1-a296-4616-9816-56c111b75ada",
  // Mapping des champs du formulaire vers les noms internes HubSpot
  FIELD_MAPPING: {
    firstname: "firstname",
    lastname: "lastname",
    email: "email",
    // TODO: Si le champ "Message" dans HubSpot n'a pas le nom interne "message",
    // modifier cette valeur avec le nom interne correct trouvé dans la config HubSpot
    message: "message",
  } as const,
} as const;

