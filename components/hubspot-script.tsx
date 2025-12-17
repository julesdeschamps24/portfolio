"use client";

import Script from "next/script";
import { useCookieConsent } from "@/lib/hooks/use-cookie-consent";

/**
 * Composant pour charger le script HubSpot uniquement après consentement aux cookies
 */
export function HubSpotScript() {
  const { hasConsent, isMounted } = useCookieConsent();

  // Ne pas charger avant le montage pour éviter l'hydratation mismatch
  if (!isMounted || !hasConsent) {
    return null;
  }

  return (
    <Script
      id="hs-script-loader"
      strategy="afterInteractive"
      src="https://js-eu1.hs-scripts.com/147436504.js"
    />
  );
}

