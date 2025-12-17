"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCookieConsent } from "@/lib/hooks/use-cookie-consent";
import { ANIMATION } from "@/lib/constants";

export function CookieBanner() {
  const { consentStatus, acceptCookies, rejectCookies, isMounted } =
    useCookieConsent();

  // Ne pas afficher avant le montage pour éviter l'hydratation mismatch
  if (!isMounted || consentStatus !== "pending") {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{
          duration: ANIMATION.FADE_DURATION,
          ease: ANIMATION.EASING,
        }}
        className="fixed bottom-6 left-6 z-50 bg-zinc-900 border border-white/10 rounded-lg p-4 shadow-lg max-w-md"
      >
        <div>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-white mb-2">
                Gestion des cookies
              </h3>
              <p className="text-xs text-zinc-300">
                Ce site utilise des cookies de tracking HubSpot pour améliorer
                l'expérience utilisateur et analyser le trafic. Vous pouvez
                accepter ou refuser ces cookies.
              </p>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <button
                onClick={rejectCookies}
                className="px-4 py-2 text-xs font-medium text-zinc-300 hover:text-white transition rounded-lg border border-white/10 hover:border-white/20"
              >
                Refuser
              </button>
              <button
                onClick={acceptCookies}
                className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition rounded-lg"
              >
                Accepter
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

