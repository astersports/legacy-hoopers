/*
 * Shared cosmetic primitives for the Schedule AI surfaces.
 *
 * IMPORTANT: everything here is presentation-only / mock. No network calls,
 * no model inference. These cards SHOWCASE where Aster's AI will live; they
 * are wired to live data later. The "AI" Pill + gold-gradient border make the
 * provenance unmistakable to the user.
 */
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Sparkles, type LucideIcon } from "lucide-react";
import { Pill } from "@/components/kit";

/**
 * Gold-gradient bordered shell with a header row (icon + title + "AI" pill).
 * The gradient border is a padded wrapper so it reads premium without a custom
 * token. `prefers-reduced-motion` is honored by every animated child, not here.
 */
export function AICard({
  icon: Icon = Sparkles,
  title,
  caption,
  badge = "AI",
  children,
  className = "",
}: {
  icon?: LucideIcon;
  title: string;
  caption?: string;
  badge?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl bg-gradient-to-br from-gold/40 via-gold/10 to-transparent p-px shadow-sm ${className}`}
    >
      <div className="rounded-2xl bg-card p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gold-soft text-gold-text ring-1 ring-gold/20">
              <Icon className="h-4 w-4" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <div className="truncate text-sm font-extrabold tracking-tight text-foreground">{title}</div>
              {caption && <div className="truncate text-xs text-muted-foreground">{caption}</div>}
            </div>
          </div>
          <Pill icon={Sparkles}>{badge}</Pill>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}

/** A confidence / probability meter with an animated fill (motion-safe). */
export function ConfidenceBar({
  value,
  label,
  tone = "gold",
}: {
  value: number; // 0..100
  label?: string;
  tone?: "gold" | "navy";
}) {
  const pct = Math.max(0, Math.min(100, value));
  const [fill, setFill] = useState(0);
  useEffect(() => {
    const id = requestAnimationFrame(() => setFill(pct));
    return () => cancelAnimationFrame(id);
  }, [pct]);
  const bar = tone === "navy" ? "bg-primary" : "bg-gold";
  return (
    <div>
      {label && (
        <div className="mb-1 flex items-center justify-between text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
          <span>{label}</span>
          <span className="tabular-nums text-foreground">{Math.round(pct)}%</span>
        </div>
      )}
      <div
        className="h-2 w-full overflow-hidden rounded-full bg-secondary"
        role="progressbar"
        aria-valuenow={Math.round(pct)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ?? "confidence"}
      >
        <div
          className={`h-full rounded-full ${bar} motion-safe:transition-[width] motion-safe:duration-700 motion-safe:ease-out`}
          style={{ width: `${fill}%` }}
        />
      </div>
    </div>
  );
}

/**
 * Typewriter reveal of a multi-line script. Respects prefers-reduced-motion:
 * if the user prefers reduced motion (or `instant` is set) the full text shows
 * immediately. Returns the visible text + a `done` flag for a blinking caret.
 */
export function useTypewriter(full: string, speed = 14, start = true) {
  const [out, setOut] = useState("");
  const [done, setDone] = useState(false);
  const iRef = useRef(0);

  useEffect(() => {
    iRef.current = 0;
    setOut("");
    setDone(false);
    if (!start) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setOut(full);
      setDone(true);
      return;
    }

    const id = setInterval(() => {
      iRef.current += 1;
      setOut(full.slice(0, iRef.current));
      if (iRef.current >= full.length) {
        clearInterval(id);
        setDone(true);
      }
    }, speed);
    return () => clearInterval(id);
  }, [full, speed, start]);

  return { out, done };
}

/** Tiny shimmering "AI is thinking" caret/loader. */
export function ThinkingDots() {
  return (
    <span className="inline-flex items-center gap-1" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-gold motion-safe:animate-pulse"
          style={{ animationDelay: `${i * 160}ms` }}
        />
      ))}
    </span>
  );
}
