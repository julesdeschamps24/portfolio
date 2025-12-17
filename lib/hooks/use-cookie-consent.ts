import { useEffect, useState } from "react";
import { STORAGE_KEYS } from "@/lib/constants";

type ConsentStatus = "pending" | "accepted" | "rejected";

/**
 * Hook pour gérer le consentement aux cookies
 * 
 * IMPORTANT: Toujours initialiser avec les mêmes valeurs côté serveur et client
 * pour éviter les erreurs d'hydratation. L'état est mis à jour dans useEffect
 * après le montage du composant côté client uniquement.
 */
export function useCookieConsent() {
  // Toujours initialiser à "pending" pour garantir un rendu identique serveur/client
  const [consentStatus, setConsentStatus] = useState<ConsentStatus>("pending");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Vérifier le consentement existant (uniquement côté client)
    const storedConsent = localStorage.getItem(STORAGE_KEYS.COOKIE_CONSENT);
    if (storedConsent === "accepted") {
      setConsentStatus("accepted");
    } else if (storedConsent === "rejected") {
      setConsentStatus("rejected");
    } else {
      setConsentStatus("pending");
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem(STORAGE_KEYS.COOKIE_CONSENT, "accepted");
    setConsentStatus("accepted");
  };

  const rejectCookies = () => {
    localStorage.setItem(STORAGE_KEYS.COOKIE_CONSENT, "rejected");
    setConsentStatus("rejected");
  };

  return {
    consentStatus,
    hasConsent: consentStatus === "accepted",
    isPending: consentStatus === "pending",
    acceptCookies,
    rejectCookies,
    isMounted, // Pour éviter l'hydratation mismatch
  };
}

