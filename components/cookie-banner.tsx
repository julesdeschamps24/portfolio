"use client";

import { useCookieConsent } from "@/lib/hooks/use-cookie-consent";

export function CookieBanner() {
  const { consentStatus, acceptCookies, rejectCookies, isMounted } = useCookieConsent();

  // Ne pas afficher avant le montage pour éviter un mismatch d'hydratation
  if (!isMounted || consentStatus !== "pending") {
    return null;
  }

  return (
    <div className="cookie-banner" role="dialog" aria-label="Gestion des cookies">
      <h3>Gestion des cookies</h3>
      <p>
        Ce site utilise des cookies de mesure d&apos;audience (HubSpot) pour comprendre
        comment il est consulté. Vous pouvez les accepter ou les refuser.
      </p>
      <div className="cb-actions">
        <button onClick={rejectCookies}>Refuser</button>
        <button onClick={acceptCookies} className="cb-accept">
          Accepter
        </button>
      </div>
    </div>
  );
}
