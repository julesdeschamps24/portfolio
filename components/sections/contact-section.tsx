"use client";

import { ContactForm } from "@/components/contact-form";
import { SectionHeader } from "./section-header";

const CONTACT_EMAIL = "contact@julesdeschamps.dev";

export function ContactSection() {
  return (
    <section id="contact" className="min-h-screen text-white">
      <div className="mx-auto flex max-w-4xl flex-col gap-10 px-6 py-20">
        <SectionHeader
          label="Contact"
          title="Discutons de votre projet"
          description="Vous avez une idée ou une mission ? Écrivez-moi, je réponds sous 24h."
        />

        <section className="grid gap-8 rounded-2xl border border-white/10 bg-white/5 p-8 shadow-lg backdrop-blur md:grid-cols-2">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Coordonnées</h3>
            <p className="text-sm text-zinc-300">
              Email :{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-indigo-300 underline underline-offset-4 hover:text-indigo-200"
              >
                {CONTACT_EMAIL}
              </a>
            </p>
            <p className="text-sm text-zinc-300">
              Disponible pour missions freelance et projets collaboratifs.
            </p>
          </div>

          <ContactForm className="space-y-4" />
        </section>
      </div>
    </section>
  );
}

