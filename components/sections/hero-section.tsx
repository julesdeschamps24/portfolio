"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const WORDS = ["paysagistes.", "praticiens.", "artisans.", "commerçants.", "indépendants."];
// cadence de la maquette validee (mockups/hero-photos.html) : plus lent = plus calme
const STEP_MS = 2600;
const ROLL_MS = 550;

export function HeroSection() {
  const reelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const reel = reelRef.current;
    if (!reel) return;

    // le 1er mot est dupliqué en fin de liste pour une boucle sans couture
    // NB: le pas de 1.08em doit rester synchronisé avec height:1.08em de .slot/.reel span
    let i = 0;
    let jumpTimer: ReturnType<typeof setTimeout> | undefined;
    let raf1 = 0;
    let raf2 = 0;
    const tick = setInterval(() => {
      i++;
      reel.style.transform = `translateY(${-i * 1.08}em)`;
      if (i === WORDS.length) {
        jumpTimer = setTimeout(() => {
          reel.style.transition = "none";
          reel.style.transform = "translateY(0)";
          i = 0;
          raf1 = requestAnimationFrame(() => {
            raf2 = requestAnimationFrame(() => {
              reel.style.transition = "";
            });
          });
        }, ROLL_MS + 30);
      }
    }, STEP_MS);

    return () => {
      clearInterval(tick);
      if (jumpTimer) clearTimeout(jumpTimer);
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, []);

  return (
    <section id="accueil" className="hero">
      <div className="hero-bg">
        <Image src="/img/hero-atelier.jpg" alt="" fill priority sizes="100vw" />
      </div>

      <div className="wrap hero-text">
        <div className="eyebrow">Créateur de sites internet</div>
        <h1>
          Des sites sur-mesure
          <br />
          pour les{" "}
          <span className="sr-only">entreprises locales.</span>
          <span className="slot" aria-hidden="true">
            <span className="reel" ref={reelRef}>
              {[...WORDS, WORDS[0]].map((w, k) => (
                <span key={k}>{w}</span>
              ))}
            </span>
          </span>
        </h1>
        <div className="brow">
          <span>10 sites en ligne</span>
          <span>Réponse sous 24 h</span>
          <span>Un seul interlocuteur</span>
        </div>
        <div className="btns">
          <a href="#work" className="btn">
            Voir mes réalisations <span className="arrow">↓</span>
          </a>
          <a href="#contact" className="link">
            Un projet ? Écrivez-moi
          </a>
        </div>
      </div>

      <div className="hero-foot">
        <div className="wrap">
          <span className="scroll-cue">
            <i>↓</i> Défiler pour voir le travail
          </span>
          <span>Sites livrés partout en France</span>
        </div>
      </div>
    </section>
  );
}
