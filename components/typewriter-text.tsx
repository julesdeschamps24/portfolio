"use client";
import React, { useState, useEffect } from "react";

interface TypewriterTextProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  showCursor?: boolean;
  hideCursorWhenDone?: boolean;
  accelerate?: boolean;
  minSpeed?: number;
}

export function TypewriterText({
  text,
  speed = 50,
  delay = 0,
  className = "",
  showCursor = true,
  hideCursorWhenDone = false,
  accelerate = false,
  minSpeed = 20,
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    setDisplayedText("");
    setIsTyping(false);
    setIsDone(false);

    let timeoutId: NodeJS.Timeout | null = null;

    const startTimer = setTimeout(() => {
      setIsTyping(true);
      let currentIndex = 0;

      const typeNextChar = () => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          currentIndex++;

          // Calculer la vitesse progressive si l'accélération est activée
          let currentSpeed = speed;
          if (accelerate && text.length > 0) {
            // Progression avec courbe d'easing douce (ease-out cubic) pour une accélération constante et progressive
            const progress = currentIndex / text.length;
            // Fonction ease-out cubic : 1 - (1 - t)^3
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            currentSpeed = speed - (speed - minSpeed) * easedProgress;
          }

          timeoutId = setTimeout(typeNextChar, currentSpeed);
        } else {
          setIsTyping(false);
          setIsDone(true);
        }
      };

      typeNextChar();
    }, delay);

    return () => {
      clearTimeout(startTimer);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [text, speed, delay, accelerate, minSpeed]);

  // Le curseur apparaît seulement quand l'animation commence (isTyping) ou après si on ne le cache pas
  const shouldShowCursor = showCursor && (isTyping || (!hideCursorWhenDone && isDone));

  return (
    <span className={className}>
      {displayedText}
      {shouldShowCursor && (
        <span
          className={`inline-block w-[2px] h-[1em] bg-current ml-1 align-middle ${
            isTyping ? "opacity-100" : "animate-[blink_1s_infinite]"
          }`}
        />
      )}
    </span>
  );
}

