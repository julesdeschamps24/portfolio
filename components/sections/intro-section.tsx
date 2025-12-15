"use client";

import { motion, AnimatePresence } from "framer-motion";
import { SparklesCore } from "@/components/ui/sparkles";
import { ANIMATION } from "@/lib/constants";

interface IntroSectionProps {
  isVisible: boolean;
}

export function IntroSection({ isVisible }: IntroSectionProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: ANIMATION.FADE_DURATION,
            ease: ANIMATION.EASING,
          }}
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
  );
}

