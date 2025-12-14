"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export function WebGLShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sceneRef = useRef<{
    scene: THREE.Scene | null
    camera: THREE.OrthographicCamera | null
    renderer: THREE.WebGLRenderer | null
    mesh: THREE.Mesh | null
    uniforms: any
    animationId: number | null
  }>({
    scene: null,
    camera: null,
    renderer: null,
    mesh: null,
    uniforms: null,
    animationId: null,
  })

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const { current: refs } = sceneRef

    const vertexShader = `
      attribute vec3 position;
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `

    const fragmentShader = `
      precision highp float;
      uniform vec2 resolution;
      uniform float time;
      uniform float xScale;
      uniform float yScale;
      uniform float distortion;

      void main() {
        vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
        
        // Facteur de convergence : les traits se rejoignent progressivement vers la gauche
        // p.x va de -1 (gauche) à 1 (droite)
        // Utiliser une transition plus douce et centrée
        float convergenceFactor = smoothstep(0.8, -0.3, p.x); // Transition de droite vers gauche
        float separationFactor = 1.0 - convergenceFactor;
        
        // Courbe principale vers laquelle tous les traits convergent
        float mainCurve = sin((p.x + time) * xScale * 1.0) * yScale * 1.0;
        
        // À droite : 3 traits avec des courbes différentes
        // Trait 1 : courbe avec fréquence et amplitude différentes
        float curve1Right = sin((p.x + time) * xScale * 0.9) * yScale * 0.7;
        float offset1Right = 0.2; // Décalage vertical initial
        
        // Trait 2 : courbe avec fréquence différente
        float curve2Right = sin((p.x + time) * xScale * 1.1) * yScale * 0.8;
        float offset2Right = 0.0; // Pas de décalage
        
        // Trait 3 : courbe avec fréquence différente
        float curve3Right = sin((p.x + time) * xScale * 0.7) * yScale * 0.6;
        float offset3Right = -0.2; // Décalage opposé
        
        // Interpoler progressivement les courbes et offsets vers la courbe principale
        // À droite : courbes séparées, à gauche : courbe unifiée
        float curve1 = mix(curve1Right, mainCurve, convergenceFactor);
        float curve2 = mix(curve2Right, mainCurve, convergenceFactor);
        float curve3 = mix(curve3Right, mainCurve, convergenceFactor);
        
        // Les offsets convergent vers 0 (pas de décalage à gauche)
        float offset1 = offset1Right * separationFactor;
        float offset2 = offset2Right * separationFactor;
        float offset3 = offset3Right * separationFactor;
        
        // Calculer les traits avec les courbes interpolées
        float trait1 = 0.05 / abs(p.y + offset1 + curve1);
        float trait2 = 0.05 / abs(p.y + offset2 + curve2);
        float trait3 = 0.05 / abs(p.y + offset3 + curve3);
        
        // Teintes différentes pour chaque trait (gris clair, moyen, foncé)
        // Les teintes convergent aussi vers une teinte uniforme à gauche
        float gray1 = trait1 * mix(0.8, 0.6, convergenceFactor); // Gris clair -> moyen
        float gray2 = trait2 * mix(0.6, 0.6, convergenceFactor); // Gris moyen constant
        float gray3 = trait3 * mix(0.4, 0.6, convergenceFactor); // Gris foncé -> moyen
        
        // Combiner les traits - ils fusionnent naturellement car leurs courbes convergent
        float finalGray = gray1 + gray2 + gray3;
        
        // À gauche, augmenter l'intensité pour le trait fusionné
        finalGray *= mix(1.0, 1.3, convergenceFactor);
        
        // Assombrir légèrement à droite pour plus de contraste
        if (p.x > 0.0) {
          finalGray *= mix(1.0, 0.7, smoothstep(0.0, 1.0, p.x));
        }
        
        // Appliquer la valeur de gris aux trois canaux RGB
        gl_FragColor = vec4(finalGray, finalGray, finalGray, 1.0);
      }
    `

    const initScene = () => {
      refs.scene = new THREE.Scene()
      refs.renderer = new THREE.WebGLRenderer({ canvas })
      refs.renderer.setPixelRatio(window.devicePixelRatio)
      refs.renderer.setClearColor(new THREE.Color(0x000000))

      refs.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, -1)

      refs.uniforms = {
        resolution: { value: [window.innerWidth, window.innerHeight] },
        time: { value: 0.0 },
        xScale: { value: 1.0 },
        yScale: { value: 0.5 },
        distortion: { value: 0.05 },
      }

      const position = [
        -1.0, -1.0, 0.0,
         1.0, -1.0, 0.0,
        -1.0,  1.0, 0.0,
         1.0, -1.0, 0.0,
        -1.0,  1.0, 0.0,
         1.0,  1.0, 0.0,
      ]

      const positions = new THREE.BufferAttribute(new Float32Array(position), 3)
      const geometry = new THREE.BufferGeometry()
      geometry.setAttribute("position", positions)

      const material = new THREE.RawShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: refs.uniforms,
        side: THREE.DoubleSide,
      })

      refs.mesh = new THREE.Mesh(geometry, material)
      refs.scene.add(refs.mesh)

      handleResize()
    }

    const animate = () => {
      if (refs.uniforms) refs.uniforms.time.value += 0.01
      if (refs.renderer && refs.scene && refs.camera) {
        refs.renderer.render(refs.scene, refs.camera)
      }
      refs.animationId = requestAnimationFrame(animate)
    }

    const handleResize = () => {
      if (!refs.renderer || !refs.uniforms) return
      const width = window.innerWidth
      const height = window.innerHeight
      refs.renderer.setSize(width, height, false)
      refs.uniforms.resolution.value = [width, height]
    }

    initScene()
    animate()
    window.addEventListener("resize", handleResize)

    return () => {
      if (refs.animationId) cancelAnimationFrame(refs.animationId)
      window.removeEventListener("resize", handleResize)
      if (refs.mesh) {
        refs.scene?.remove(refs.mesh)
        refs.mesh.geometry.dispose()
        if (refs.mesh.material instanceof THREE.Material) {
          refs.mesh.material.dispose()
        }
      }
      refs.renderer?.dispose()
    }
  }, [])

  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10">
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{
          filter: "blur(0.5px) brightness(0.7) contrast(1.1)",
        }}
      />
    </div>
  )
}

