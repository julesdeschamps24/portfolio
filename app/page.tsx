"use client";
import React, { useEffect, useState } from "react";
import { SparklesCore } from "@/components/ui/sparkles";
import { motion, AnimatePresence } from "framer-motion";
import { VideoCard } from "@/components/video-card";
import { TypewriterText } from "@/components/typewriter-text";

const videos = [
  {
    title: "Motion Design – Asana",
    description: "Exploration graphique en basse lumière avec effets de lueurs.",
    src: "/vid/asana.webm",
  },
  {
    title: "Cinematic – Sport Avenue",
    description: "Sequence narrative pour tester la narration visuelle.",
    src: "/vid/sport_avenue.webm",
  },
];

const competences = [
  { name: "HTML5/CSS3", category: "Frontend" },
  { name: "JavaScript", category: "Frontend" },
  { name: "React", category: "Frontend" },
  { name: "Node.js", category: "Backend" },
  { name: "Next.js", category: "Frontend" },
  { name: "C", category: "Langage" },
  { name: "C++", category: "Langage" },
  { name: "Git", category: "Outils" },
];

export default function Home() {
  const [showContent, setShowContent] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [formStatus, setFormStatus] = useState<{ type: "success" | "error" | null; message: string }>({ type: null, message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Vérifier si l'intro a déjà été vue dans cette session
    const introSeen = sessionStorage.getItem("introSeen");
    
    if (introSeen) {
      // Si l'intro a déjà été vue, afficher directement le contenu
      setShowContent(true);
      setShowIntro(false);
      // Gérer le scroll vers une ancre si présente dans l'URL
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            const headerOffset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth",
            });
          }
        }, 100);
      }
    } else {
      // Si c'est la première visite, afficher l'intro
      setShowIntro(true);
      // Transition automatique après 1.5 secondes
      const timer = setTimeout(() => {
        setShowContent(true);
        setShowIntro(false);
        // Marquer que l'intro a été vue
        sessionStorage.setItem("introSeen", "true");
        // Gérer le scroll vers une ancre si présente dans l'URL après l'intro
        const hash = window.location.hash.replace("#", "");
        if (hash) {
          setTimeout(() => {
            const element = document.getElementById(hash);
            if (element) {
              const headerOffset = 80;
              const elementPosition = element.getBoundingClientRect().top;
              const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
              window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
              });
            }
          }, 500);
        }
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Hero Section avec SparklesCore */}
      <AnimatePresence>
        {showIntro && !showContent && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center"
          >
            <div className="h-[100vh] min-h-[600px] sm:h-[40rem] w-full bg-black flex flex-col items-center justify-center overflow-hidden px-4">
              <h1 className="md:text-7xl text-3xl lg:text-9xl font-bold text-center text-white relative z-20">
                Jules Deschamps
              </h1>
              <div className="w-full max-w-[60rem] h-32 sm:h-48 md:h-56 lg:h-64 relative mt-2 sm:mt-4">
                {/* Gradients */}
                <div className="absolute inset-x-4 sm:inset-x-8 md:inset-x-12 lg:inset-x-16 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-[85%] sm:w-[80%] blur-sm" />
                <div className="absolute inset-x-4 sm:inset-x-8 md:inset-x-12 lg:inset-x-16 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-[85%] sm:w-[80%]" />
                <div className="absolute inset-x-12 sm:inset-x-24 md:inset-x-36 lg:inset-x-48 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-[40%] sm:w-[38%] md:w-[36%] lg:w-[35%] blur-sm" />
                <div className="absolute inset-x-12 sm:inset-x-24 md:inset-x-36 lg:inset-x-48 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-[40%] sm:w-[38%] md:w-[36%] lg:w-[35%]" />

                {/* Core component */}
                <SparklesCore
                  background="transparent"
                  minSize={0.4}
                  maxSize={1}
                  particleDensity={1200}
                  className="w-full h-full"
                  particleColor="#FFFFFF"
                />

                {/* Radial Gradient to prevent sharp edges - responsive */}
                <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(200px_120px_at_top,transparent_20%,white)] sm:[mask-image:radial-gradient(300px_180px_at_top,transparent_20%,white)] md:[mask-image:radial-gradient(400px_240px_at_top,transparent_20%,white)] lg:[mask-image:radial-gradient(480px_300px_at_top,transparent_20%,white)]"></div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contenu principal du portfolio */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="min-h-screen w-full"
          >
            {/* Section Accueil */}
            <section id="accueil" className="flex min-h-screen w-full flex-col items-center justify-center py-32 px-16 bg-black text-white">
              <div className="flex flex-col items-center gap-6 text-center max-w-4xl">
                <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                  <TypewriterText 
                    text="Bienvenue sur mon portfolio" 
                    speed={100}
                    delay={1200}
                    showCursor={true}
                    hideCursorWhenDone={true}
                    accelerate={true}
                    minSpeed={72}
                  />
                </h1>
                <p className="text-lg md:text-xl leading-8 text-zinc-400">
                  <TypewriterText 
                    text="Découvrez mes projets et compétences" 
                    speed={60}
                    delay={4400}
                    showCursor={true}
                    accelerate={true}
                    minSpeed={50}
                  />
                </p>
              </div>
            </section>

            {/* Section Projets */}
            <section id="projets" className="min-h-screen bg-black text-white">
              <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-20">
                <header className="flex flex-col gap-4">
                  <p className="text-sm uppercase tracking-[0.2em] text-indigo-300">
                    Portfolio
                  </p>
                  <h2 className="text-4xl font-bold md:text-5xl">Projets</h2>
                  <p className="text-base text-zinc-300">
                    Survolez le bouton "Agrandir" (ou cliquez sur la vidéo) pour ouvrir
                    l'aperçu plein écran. La vidéo démarre automatiquement et se ferme
                    dès que le curseur quitte la zone de lecture.
                  </p>
                </header>

                <div className="grid gap-8 md:grid-cols-2">
                  {videos.map((video) => (
                    <VideoCard key={video.title} {...video} />
                  ))}
                </div>
              </div>
            </section>

            {/* Section Compétences */}
            <section id="competences" className="min-h-screen bg-black text-white">
              <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-20">
                <header className="flex flex-col gap-4">
                  <p className="text-sm uppercase tracking-[0.2em] text-indigo-300">
                    Compétences
                  </p>
                  <h2 className="text-4xl font-bold md:text-5xl">Mes Compétences</h2>
                  <p className="text-base text-zinc-300">
                    Technologies et outils que je maîtrise pour créer des projets innovants.
                  </p>
                </header>

                {(() => {
                  const categories = competences.reduce((acc, comp) => {
                    if (!acc[comp.category]) {
                      acc[comp.category] = [];
                    }
                    acc[comp.category].push(comp.name);
                    return acc;
                  }, {} as Record<string, string[]>);

                  return (
                    <>
                      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {Object.entries(categories).map(([category, skills]) => (
                          <div
                            key={category}
                            className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
                          >
                            <h3 className="mb-4 text-xl font-semibold text-indigo-300">
                              {category}
                            </h3>
                            <ul className="flex flex-col gap-3">
                              {skills.map((skill) => (
                                <li
                                  key={skill}
                                  className="flex items-center gap-2 text-zinc-200 transition hover:text-white"
                                >
                                  <span className="h-2 w-2 rounded-full bg-indigo-400"></span>
                                  <span>{skill}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>

                      {/* Section avec toutes les compétences en badges */}
                      <section className="mt-8">
                        <h3 className="mb-6 text-2xl font-semibold">Toutes mes compétences</h3>
                        <div className="flex flex-wrap gap-3">
                          {competences.map((comp) => (
                            <span
                              key={comp.name}
                              className="rounded-lg border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-sm font-medium text-indigo-300 transition hover:border-indigo-400/50 hover:bg-indigo-500/20"
                            >
                              {comp.name}
                            </span>
                          ))}
                        </div>
                      </section>
                    </>
                  );
                })()}
              </div>
            </section>

            {/* Section À propos */}
            <section id="a-propos" className="min-h-screen bg-black text-white">
              <div className="mx-auto flex max-w-4xl flex-col gap-12 px-6 py-20">
                <header className="flex flex-col gap-4">
                  <p className="text-sm uppercase tracking-[0.2em] text-indigo-300">
                    À propos
                  </p>
                  <h2 className="text-4xl font-bold md:text-5xl">À propos de moi</h2>
                </header>

                <div className="flex flex-col gap-6">
                  <p className="text-base leading-7 text-zinc-300">
                    Je m'appelle Jules Deschamps, formé au développement à l'école 42, passionné par la compréhension approfondie des systèmes afin de concevoir des applications web fiables et bien structurées. Cette formation m'a permis d'acquérir rigueur, autonomie et sens du code propre, des valeurs appliquées dans chacun des projets réalisés.
                  </p>
                  
                  <p className="text-base leading-7 text-zinc-300">
                    Mon apprentissage se base principalement sur la réalisation de projets concrets, favorisant une progression rapide et une adaptation efficace aux nouvelles technologies. Curieux et motivé, j'apprécie relever de nouveaux défis techniques et faire évoluer ses compétences en continu.
                  </p>
                </div>
              </div>
            </section>

            {/* Section Contact */}
            <section id="contact" className="min-h-screen bg-black text-white">
              <div className="mx-auto flex max-w-4xl flex-col gap-10 px-6 py-20">
                <header className="flex flex-col gap-3">
                  <p className="text-sm uppercase tracking-[0.2em] text-indigo-300">
                    Contact
                  </p>
                  <h2 className="text-4xl font-bold md:text-5xl">
                    Discutons de votre projet
                  </h2>
                  <p className="text-base text-zinc-300">
                    Vous avez une idée ou une mission ? Écrivez-moi, je réponds sous 24h.
                  </p>
                </header>

                <section className="grid gap-8 rounded-2xl border border-white/10 bg-white/5 p-8 shadow-lg backdrop-blur md:grid-cols-2">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Coordonnées</h3>
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

                  <form
                    className="space-y-4"
                    onSubmit={async (e) => {
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
                            message: "Message envoyé avec succès !",
                          });
                          (e.target as HTMLFormElement).reset();
                        } else {
                          setFormStatus({
                            type: "error",
                            message: result.message || "Erreur lors de l'envoi du message.",
                          });
                        }
                      } catch (error) {
                        setFormStatus({
                          type: "error",
                          message: "Erreur lors de l'envoi du message.",
                        });
                      } finally {
                        setIsSubmitting(false);
                      }
                    }}
                  >
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
                </section>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
