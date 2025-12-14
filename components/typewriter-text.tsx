"use client";
import { useState, useEffect, useCallback, useRef } from "react";

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

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const startTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setDisplayedText("");
    setIsTyping(false);
    setIsDone(false);

    startTimerRef.current = setTimeout(() => {
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

          timeoutRef.current = setTimeout(typeNextChar, currentSpeed);
        } else {
          setIsTyping(false);
          setIsDone(true);
        }
      };

      typeNextChar();
    }, delay);

    return () => {
      if (startTimerRef.current) {
        clearTimeout(startTimerRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [text, speed, delay, accelerate, minSpeed]);

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

