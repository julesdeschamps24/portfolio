"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ErrorBoundary } from "@/components/error-boundary";
import { WebGLShader } from "@/components/ui/web-gl-shader";
import { IntroSection } from "@/components/sections/intro-section";
import { HomeSection } from "@/components/sections/home-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { AboutSection } from "@/components/sections/about-section";
import { ContactSection } from "@/components/sections/contact-section";
import { useIntro } from "@/lib/hooks/use-intro";
import { ANIMATION } from "@/lib/constants";

export default function Home() {
  const { isContentVisible, isIntroVisible } = useIntro();

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* WebGL Shader Background - se lance uniquement après la fin de l'intro */}
      {isContentVisible && (
        <>
          <ErrorBoundary>
            <WebGLShader isActive={isContentVisible} />
          </ErrorBoundary>
          {/* Overlay avec flou et filtre de teinte pour améliorer la lisibilité */}
          <div className="fixed inset-0 -z-10 backdrop-blur-[2px] bg-black/20 pointer-events-none" />
        </>
      )}

      {/* Hero Section avec SparklesCore */}
      <IntroSection isVisible={isIntroVisible && !isContentVisible} />

      {/* Contenu principal du portfolio */}
      <AnimatePresence>
        {isContentVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: ANIMATION.FADE_DURATION,
              ease: ANIMATION.EASING,
            }}
            className="min-h-screen w-full"
          >
            <HomeSection />
            <ProjectsSection />
            <SkillsSection />
            <AboutSection />
            <ContactSection />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
