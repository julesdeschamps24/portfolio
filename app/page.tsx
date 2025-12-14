"use client";
import { useEffect, useState, useMemo } from "react";
import { SparklesCore } from "@/components/ui/sparkles";
import { motion, AnimatePresence } from "framer-motion";
import { TypewriterText } from "@/components/typewriter-text";
import { VideoCard } from "@/components/video-card";
import { ContactForm } from "@/components/contact-form";
import { videos, competences, categoryOrder } from "@/lib/data";
import { ErrorBoundary } from "@/components/error-boundary";
import { WebGLShader } from "@/components/ui/web-gl-shader";

export default function Home() {
  const [showContent, setShowContent] = useState(false);
  const [showIntro, setShowIntro] = useState(false);

  // Calculer les catégories de compétences une seule fois au niveau du composant
  const competencesData = useMemo(() => {
    const categories = competences.reduce((acc, comp) => {
      comp.categories.forEach((category) => {
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(comp.name);
      });
      return acc;
    }, {} as Record<string, string[]>);

    const sortedCategories = Object.entries(categories).sort((a, b) => {
      const indexA = categoryOrder.indexOf(a[0] as typeof categoryOrder[number]);
      const indexB = categoryOrder.indexOf(b[0] as typeof categoryOrder[number]);
      // Si la catégorie n'est pas dans l'ordre, la mettre à la fin
      if (indexA === -1 && indexB === -1) return 0;
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;
      return indexA - indexB;
    });

    return { categories, sortedCategories };
  }, []);

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
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* WebGL Shader Background - se lance uniquement après la fin de l'intro */}
      {showContent && (
        <>
          <ErrorBoundary>
            <WebGLShader isActive={showContent} />
          </ErrorBoundary>
          {/* Overlay avec flou et filtre de teinte pour améliorer la lisibilité */}
          <div className="fixed inset-0 -z-10 backdrop-blur-[2px] bg-black/20 pointer-events-none" />
        </>
      )}
      
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
            <section id="accueil" className="flex min-h-screen w-full flex-col items-center justify-center py-32 px-16 text-white">
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
            <section id="projets" className="min-h-screen text-white">
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
            <section id="competences" className="min-h-screen text-white">
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

                <>
                  <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {competencesData.sortedCategories.map(([category, skills]) => (
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
              </div>
            </section>

            {/* Section À propos */}
            <section id="a-propos" className="min-h-screen text-white">
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
            <section id="contact" className="min-h-screen text-white">
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

                  <ContactForm className="space-y-4" />
                </section>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
