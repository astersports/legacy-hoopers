/*
 * useTypewriter — a cosmetic "streamed reveal" hook that types a string out
 * character-by-character to mimic a model streaming tokens. Motion-safe: when
 * the user prefers reduced motion, the full text appears immediately. No data
 * logic — pure presentation timing.
 */
import { useEffect, useRef, useState } from "react";

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function useTypewriter(text: string, active: boolean, cps = 90) {
  const [out, setOut] = useState("");
  const [done, setDone] = useState(false);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (!active) {
      setOut("");
      setDone(false);
      return;
    }
    if (prefersReducedMotion()) {
      setOut(text);
      setDone(true);
      return;
    }

    setOut("");
    setDone(false);
    const start = performance.now();
    const step = (now: number) => {
      const chars = Math.floor(((now - start) / 1000) * cps);
      if (chars >= text.length) {
        setOut(text);
        setDone(true);
        return;
      }
      setOut(text.slice(0, chars));
      raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);

    return () => {
      if (raf.current != null) cancelAnimationFrame(raf.current);
    };
  }, [text, active, cps]);

  return { out, done };
}
