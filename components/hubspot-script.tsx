"use client";

import Script from "next/script";
import { useCookieConsent } from "@/lib/hooks/use-cookie-consent";
import { HUBSPOT } from "@/lib/constants";

/**
 * Composant pour charger le script HubSpot uniquement après consentement aux cookies
 */
export function HubSpotScript() {
  const { hasConsent, isMounted } = useCookieConsent();

  // Ne pas charger avant le montage pour éviter l'hydratation mismatch
  if (!isMounted || !hasConsent || !HUBSPOT.PORTAL_ID) {
    return null;
  }

  return (
    <Script
      id="hs-script-loader"
      strategy="afterInteractive"
      src={`https://js-eu1.hs-scripts.com/${HUBSPOT.PORTAL_ID}.js`}
    />
  );
}

