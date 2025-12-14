import { ContactForm } from "@/components/contact-form";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto flex max-w-4xl flex-col gap-10 px-6 py-20">
        <header className="flex flex-col gap-3">
          <p className="text-sm uppercase tracking-[0.2em] text-indigo-300">
            Contact
          </p>
          <h1 className="text-4xl font-bold md:text-5xl">
            Discutons de votre projet
          </h1>
          <p className="text-base text-zinc-300">
            Vous avez une idée ou une mission ? Écrivez-moi, je réponds sous 24h.
          </p>
        </header>

        <section className="grid gap-8 rounded-2xl border border-white/10 bg-white/5 p-8 shadow-lg backdrop-blur md:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Coordonnées</h2>
            <p className="text-sm text-zinc-300">
              Email :{" "}
              <a
                href="mailto:contact@julesdeschamps.dev"
                className="text-indigo-300 underline underline-offset-4 hover:text-indigo-200"
              >
                contact@julesdeschamps.dev
              </a>
            </p>
            <p className="text-sm text-zinc-300">
              Disponible pour missions freelance et projets collaboratifs.
            </p>
          </div>

          <ContactForm className="space-y-4" />
        </section>
      </div>
    </main>
  );
}

