"use client";

import { ContactForm } from "@/components/contact-form";
import { SectionHeader } from "./section-header";
import { SOCIAL_LINKS } from "@/lib/social-links";

export function ContactSection() {
  return (
    <section id="contact" className="min-h-screen text-white">
      <div className="mx-auto flex max-w-4xl flex-col gap-10 px-6 py-20">
        <SectionHeader
          label="Contact"
          title="Discutons de votre projet"
          description="Vous avez une idée ou une mission ? Utilisez le formulaire ci-dessous pour me contacter."
        />

        <section className="grid gap-8 rounded-2xl border border-white/10 bg-white/5 p-8 shadow-lg backdrop-blur md:grid-cols-2">
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Informations</h3>
              <p className="text-sm text-zinc-300">
                Disponible pour missions freelance et projets collaboratifs.
              </p>
              <p className="text-sm text-zinc-300">
                Remplissez le formulaire ci-contre pour me contacter directement.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-medium text-zinc-400 uppercase tracking-wider">Retrouvez-moi sur</h4>
              <div className="flex gap-4">
                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition border border-white/5 hover:border-white/20"
                    aria-label={link.name}
                  >
                    <link.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <ContactForm className="space-y-4" />
        </section>
      </div>
    </section>
  );
}

