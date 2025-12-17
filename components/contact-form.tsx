"use client";

import { useState, FormEvent } from "react";
import { MESSAGES } from "@/lib/constants";

interface ContactFormProps {
  className?: string;
}

type FormStatus = {
  type: "success" | "error" | null;
  message: string;
};

// Fonction utilitaire pour récupérer un cookie par son nom
function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  
  const cookies = document.cookie.split(";");
  for (const cookie of cookies) {
    const trimmedCookie = cookie.trim();
    if (!trimmedCookie) continue;
    
    // Diviser uniquement sur le premier "=" pour gérer les valeurs contenant "="
    const equalIndex = trimmedCookie.indexOf("=");
    if (equalIndex === -1) continue;
    
    const cookieName = trimmedCookie.substring(0, equalIndex);
    const cookieValue = trimmedCookie.substring(equalIndex + 1);
    
    if (cookieName === name) {
      // Retourner même les valeurs vides pour gérer les cookies avec valeur vide
      if (cookieValue) {
        try {
          return decodeURIComponent(cookieValue);
        } catch {
          return cookieValue;
        }
      }
      return ""; // Retourner une chaîne vide si le cookie existe mais a une valeur vide
    }
  }
  return null;
}

export function ContactForm({ className }: ContactFormProps) {
  const [formStatus, setFormStatus] = useState<FormStatus>({
    type: null,
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Protection anti-spam : vérifier le champ honeypot
    const formData = new FormData(e.currentTarget);
    const honeypot = formData.get("website") as string;
    // Vérifier que le champ est vide (même avec uniquement des espaces, c'est suspect)
    // Un utilisateur légitime ne devrait jamais interagir avec ce champ caché
    if (honeypot && honeypot.length > 0) {
      // Bot détecté, ne pas envoyer
      return;
    }

    setIsSubmitting(true);
    setFormStatus({ type: null, message: "" });

    // Récupérer le cookie hubspotutk pour lier la soumission aux contacts existants
    const hubspotutk = getCookie("hubspotutk");

    const data = {
      firstname: formData.get("firstname") as string,
      lastname: formData.get("lastname") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
      pageUri: typeof window !== "undefined" ? window.location.href : "",
      pageName: typeof document !== "undefined" ? document.title : "",
      hutk: hubspotutk, // Envoyé uniquement si présent
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.ok) {
        setFormStatus({
          type: "success",
          message: MESSAGES.CONTACT_SUCCESS,
        });
        (e.target as HTMLFormElement).reset();
      } else {
        setFormStatus({
          type: "error",
          message: result.message || MESSAGES.CONTACT_ERROR,
        });
      }
    } catch {
      setFormStatus({
        type: "error",
        message: MESSAGES.CONTACT_ERROR,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className={className} onSubmit={handleSubmit}>
      {/* Champ honeypot pour protection anti-spam */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />
      
      <div className="space-y-2">
        <label htmlFor="firstname" className="text-sm text-zinc-200">
          Prénom
        </label>
        <input
          id="firstname"
          name="firstname"
          className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-2 text-sm text-white outline-none transition focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
          placeholder="Votre prénom"
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="lastname" className="text-sm text-zinc-200">
          Nom
        </label>
        <input
          id="lastname"
          name="lastname"
          className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-2 text-sm text-white outline-none transition focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
          placeholder="Votre nom"
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm text-zinc-200">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-2 text-sm text-white outline-none transition focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
          placeholder="vous@email.com"
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="message" className="text-sm text-zinc-200">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-2 text-sm text-white outline-none transition focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
          placeholder="Décrivez votre besoin"
          required
        />
      </div>
      {formStatus.message && (
        <div
          className={`rounded-lg px-4 py-2 text-sm ${
            formStatus.type === "success"
              ? "bg-green-500/20 text-green-300"
              : "bg-red-500/20 text-red-300"
          }`}
        >
          {formStatus.message}
        </div>
      )}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Envoi..." : "Envoyer"}
      </button>
    </form>
  );
}
