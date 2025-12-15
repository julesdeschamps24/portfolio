"use client";

import { TypewriterText } from "@/components/typewriter-text";
import { TYPEWRITER } from "@/lib/constants";

export function HomeSection() {
  return (
    <section
      id="accueil"
      className="flex min-h-screen w-full flex-col items-center justify-center py-32 px-16 text-white"
    >
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
            minSpeed={TYPEWRITER.DEFAULT_MIN_SPEED}
          />
        </p>
      </div>
    </section>
  );
}

