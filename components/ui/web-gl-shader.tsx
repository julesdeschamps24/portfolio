"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { WEBGL_SHADER, TIMING } from "@/lib/constants";

interface WebGLShaderProps {
  isActive?: boolean;
  targetFPS?: number;
}

interface ShaderUniforms {
  resolution: { value: [number, number] };
  time: { value: number };
  xScale: { value: number };
  yScale: { value: number };
}

interface SceneRefs {
  scene: THREE.Scene | null;
  camera: THREE.OrthographicCamera | null;
  renderer: THREE.WebGLRenderer | null;
  mesh: THREE.Mesh | null;
  uniforms: ShaderUniforms | null;
  animationId: number | null;
}

export function WebGLShader({
  isActive = true,
  targetFPS = WEBGL_SHADER.DEFAULT_TARGET_FPS,
}: WebGLShaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<SceneRefs>({
    scene: null,
    camera: null,
    renderer: null,
    mesh: null,
    uniforms: null,
    animationId: null,
  })

  useEffect(() => {
    if (!canvasRef.current || !isActive) return

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

      void main() {
        vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
        
        // Utiliser une seule courbe de base qui évolue progressivement
        // Cela évite les multiples changements de direction
        float baseCurve = sin((p.x + time) * xScale * 1.0) * yScale * 1.0;
        
        // Facteur de convergence très progressif avec une zone très étendue
        // Transition ultra-longue de droite (1.2) vers gauche (-1.0) pour une convergence très douce
        float rawConvergence = smoothstep(1.2, -1.0, p.x);
        // Fonction d'easing quintique pour une transition encore plus douce
        float t = rawConvergence;
        float convergenceFactor = t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
        
        // À droite : variations très subtiles de la courbe de base
        // Utiliser des variations minimales pour éviter les angles prononcés
        float variation1 = sin((p.x + time) * xScale * 0.98) * yScale * 0.95 - baseCurve;
        float variation2 = sin((p.x + time) * xScale * 1.02) * yScale * 1.05 - baseCurve;
        float variation3 = sin((p.x + time) * xScale * 0.96) * yScale * 0.92 - baseCurve;
        
        // Les variations convergent progressivement vers 0 (vers la courbe de base)
        float variationFactor = smoothstep(0.9, -0.7, p.x);
        variationFactor = variationFactor * variationFactor * variationFactor * (variationFactor * (variationFactor * 6.0 - 15.0) + 10.0);
        
        // Courbes finales : base + variations qui convergent vers 0
        float curve1 = baseCurve + variation1 * (1.0 - variationFactor);
        float curve2 = baseCurve + variation2 * (1.0 - variationFactor);
        float curve3 = baseCurve + variation3 * (1.0 - variationFactor);
        
        // Offsets qui convergent très tôt et progressivement vers 0
        // Commencer la convergence plus tôt pour éviter les changements multiples
        float offsetConvergenceFactor = smoothstep(0.7, -0.8, p.x);
        offsetConvergenceFactor = offsetConvergenceFactor * offsetConvergenceFactor * offsetConvergenceFactor * (offsetConvergenceFactor * (offsetConvergenceFactor * 6.0 - 15.0) + 10.0);
        float offsetSeparationFactor = 1.0 - offsetConvergenceFactor;
        
        // Offsets réduits et qui convergent tôt
        float offset1 = 0.12 * offsetSeparationFactor;
        float offset2 = 0.0;
        float offset3 = -0.12 * offsetSeparationFactor;
        
        // Calculer les traits avec les courbes unifiées
        float trait1 = 0.05 / abs(p.y + offset1 + curve1);
        float trait2 = 0.05 / abs(p.y + offset2 + curve2);
        float trait3 = 0.05 / abs(p.y + offset3 + curve3);
        
        // Teintes différentes pour chaque trait
        float gray1 = trait1 * mix(0.8, 0.6, convergenceFactor);
        float gray2 = trait2 * mix(0.6, 0.6, convergenceFactor);
        float gray3 = trait3 * mix(0.4, 0.6, convergenceFactor);
        
        // Combiner les traits
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
      refs.scene = new THREE.Scene();
      refs.renderer = new THREE.WebGLRenderer({ canvas });
      refs.renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, WEBGL_SHADER.MAX_PIXEL_RATIO),
      );
      refs.renderer.setClearColor(new THREE.Color(0x000000));

      refs.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, -1)

      refs.uniforms = {
        resolution: { value: [window.innerWidth, window.innerHeight] },
        time: { value: 0.0 },
        xScale: { value: 1.0 },
        yScale: { value: 0.5 },
      };

      const position = [
        -1.0, -1.0, 0.0,
         1.0, -1.0, 0.0,
        -1.0,  1.0, 0.0,
         1.0, -1.0, 0.0,
        -1.0,  1.0, 0.0,
         1.0,  1.0, 0.0,
      ]

      const positions = new THREE.BufferAttribute(
        new Float32Array(position),
        3,
      );
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", positions);

      const material = new THREE.RawShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: refs.uniforms as THREE.ShaderMaterialParameters["uniforms"],
        side: THREE.DoubleSide,
      });

      refs.mesh = new THREE.Mesh(geometry, material);
      refs.scene.add(refs.mesh);

      handleResize();
    }

    let lastFrameTime = 0;
    const frameInterval = 1000 / targetFPS;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - lastFrameTime;

      if (elapsed >= frameInterval) {
        if (refs.uniforms) refs.uniforms.time.value += 0.01;
        if (refs.renderer && refs.scene && refs.camera) {
          refs.renderer.render(refs.scene, refs.camera);
        }
        lastFrameTime = currentTime - (elapsed % frameInterval);
      }

      refs.animationId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      if (!refs.renderer || !refs.uniforms) return;
      const width = window.innerWidth;
      const height = window.innerHeight;
      refs.renderer.setSize(width, height, false);
      refs.uniforms.resolution.value = [width, height];
    };

    let resizeTimeout: ReturnType<typeof setTimeout> | null = null;
    const debouncedHandleResize = () => {
      if (resizeTimeout) clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        handleResize();
      }, TIMING.DEBOUNCE_RESIZE);
    };

    initScene();
    animate(performance.now());
    window.addEventListener("resize", debouncedHandleResize);

    return () => {
      if (refs.animationId) cancelAnimationFrame(refs.animationId);
      if (resizeTimeout) clearTimeout(resizeTimeout);
      window.removeEventListener("resize", debouncedHandleResize);
      if (refs.mesh) {
        refs.scene?.remove(refs.mesh);
        refs.mesh.geometry.dispose();
        if (refs.mesh.material instanceof THREE.Material) {
          refs.mesh.material.dispose();
        }
      }
      refs.renderer?.dispose();
    };
  }, [isActive, targetFPS]);

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


