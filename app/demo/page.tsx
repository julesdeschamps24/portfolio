"use client"

import { useState, lazy, Suspense } from "react"
import { LiquidButton } from "@/components/ui/liquid-glass-button"

const WebGLShader = lazy(() => import("@/components/ui/web-gl-shader").then(m => ({ default: m.WebGLShader })));

export default function DemoPage() {
  const [isShaderActive, setIsShaderActive] = useState(false)

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center gap-8 p-8">
      {/* Shader de démo (optionnel, car déjà dans le layout) */}
      <div className="absolute inset-0 -z-20">
        <Suspense fallback={null}>
          <WebGLShader isActive={isShaderActive} />
        </Suspense>
      </div>

      {/* Overlay de démo */}
      <div 
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background: "linear-gradient(135deg, rgba(255, 182, 193, 0.15) 0%, rgba(221, 160, 221, 0.12) 50%, rgba(173, 216, 230, 0.15) 100%)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
      />

      {/* Contenu de la démo */}
      <div className="relative z-10 flex flex-col items-center gap-8 max-w-4xl w-full">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-4">
          Démo des Composants
        </h1>

        <div className="flex flex-col gap-6 w-full">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">WebGL Shader</h2>
            <p className="text-zinc-300">
              Le shader WebGL avec palette pastel. Il démarre automatiquement après l&apos;animation d&apos;introduction.
            </p>
            <div className="flex gap-4">
              <LiquidButton
                onClick={() => setIsShaderActive(!isShaderActive)}
                variant="default"
              >
                {isShaderActive ? "Désactiver" : "Activer"} le Shader
              </LiquidButton>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Liquid Glass Button</h2>
            <p className="text-zinc-300">
              Boutons avec effet de verre liquide et backdrop blur.
            </p>
            <div className="flex flex-wrap gap-4">
              <LiquidButton variant="default" size="default">
                Bouton Par Défaut
              </LiquidButton>
              <LiquidButton variant="outline" size="default">
                Bouton Outline
              </LiquidButton>
              <LiquidButton variant="ghost" size="default">
                Bouton Ghost
              </LiquidButton>
              <LiquidButton variant="link" size="default">
                Bouton Link
              </LiquidButton>
            </div>
            <div className="flex flex-wrap gap-4">
              <LiquidButton variant="default" size="sm">
                Petit
              </LiquidButton>
              <LiquidButton variant="default" size="default">
                Normal
              </LiquidButton>
              <LiquidButton variant="default" size="lg">
                Grand
              </LiquidButton>
              <LiquidButton variant="default" size="icon">
                🔍
              </LiquidButton>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Intégration</h2>
            <p className="text-zinc-300">
              Le shader est intégré dans le layout principal et sert d&apos;arrière-plan pour toutes les pages.
              L&apos;overlay avec teinte et blur est appliqué au-dessus du shader pour adoucir l&apos;effet.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
