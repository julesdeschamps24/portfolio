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

export function ContactForm({ className }: ContactFormProps) {
  const [formStatus, setFormStatus] = useState<FormStatus>({
    type: null,
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: null, message: "" });

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
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
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm text-zinc-200">
          Nom
        </label>
        <input
          id="name"
          name="name"
          className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-2 text-sm text-white outline-none transition focus:border-indigo-400"
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
          className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-2 text-sm text-white outline-none transition focus:border-indigo-400"
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
          className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-2 text-sm text-white outline-none transition focus:border-indigo-400"
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
