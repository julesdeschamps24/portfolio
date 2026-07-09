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

    const equalIndex = trimmedCookie.indexOf("=");
    if (equalIndex === -1) continue;

    const cookieName = trimmedCookie.substring(0, equalIndex);
    const cookieValue = trimmedCookie.substring(equalIndex + 1);

    if (cookieName === name) {
      if (cookieValue) {
        try {
          return decodeURIComponent(cookieValue);
        } catch {
          return cookieValue;
        }
      }
      return "";
    }
  }
  return null;
}

export function ContactForm({ className }: ContactFormProps) {
  const [formStatus, setFormStatus] = useState<FormStatus>({ type: null, message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const honeypot = formData.get("website") as string;
    if (honeypot && honeypot.length > 0) {
      return;
    }

    setIsSubmitting(true);
    setFormStatus({ type: null, message: "" });

    const hubspotutk = getCookie("hubspotutk");

    const data = {
      firstname: formData.get("firstname") as string,
      lastname: formData.get("lastname") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
      pageUri: typeof window !== "undefined" ? window.location.href : "",
      pageName: typeof document !== "undefined" ? document.title : "",
      hutk: hubspotutk,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.ok) {
        setFormStatus({ type: "success", message: MESSAGES.CONTACT_SUCCESS });
        (e.target as HTMLFormElement).reset();
      } else {
        setFormStatus({ type: "error", message: result.message || MESSAGES.CONTACT_ERROR });
      }
    } catch {
      setFormStatus({ type: "error", message: MESSAGES.CONTACT_ERROR });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className={className ? `form ${className}` : "form"} onSubmit={handleSubmit}>
      {/* Champ honeypot anti-spam */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        style={{ display: "none" }}
        aria-hidden="true"
      />

      <div className="row2">
        <div>
          <label htmlFor="firstname">Prénom</label>
          <input id="firstname" name="firstname" placeholder="Votre prénom" required />
        </div>
        <div>
          <label htmlFor="lastname">Nom</label>
          <input id="lastname" name="lastname" placeholder="Votre nom" required />
        </div>
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" placeholder="vous@email.com" required />
      </div>

      <div>
        <label htmlFor="message">Votre projet</label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Parlez-moi de votre activité et de ce que vous cherchez."
          required
        />
      </div>

      {formStatus.message && (
        <div className={`form-status ${formStatus.type === "success" ? "ok" : "err"}`}>
          {formStatus.message}
        </div>
      )}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Envoi…" : "Envoyer"}
      </button>
    </form>
  );
}
