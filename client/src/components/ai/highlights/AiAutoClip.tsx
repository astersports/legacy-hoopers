/*
 * AiAutoClip — the hero CV demo. A navy film frame (logo watermark) with a
 * scanning sweep line, animated bounding boxes labeling tracked players, and
 * play-recognition tags that surface as the model "analyzes" the footage.
 * Entirely cosmetic + motion-safe — a looping scan with no real inference.
 */
import { useEffect, useRef, useState } from "react";
import { ScanLine, Crosshair, Cpu, Sparkles } from "lucide-react";
import { Pill } from "@/components/kit";
import { Logo } from "@/components/Logo";
import { CV_BOXES, PLAY_TAGS } from "./aiMock";

const TONE: Record<string, string> = {
  gold: "border-gold text-gold",
  cyan: "border-cyan-300 text-cyan-200",
  green: "border-emerald-300 text-emerald-200",
};

export function AiAutoClip() {
  // `analyzing` drives the looping scan; respect reduced-motion by holding the
  // "analyzed" end state with everything revealed and no animation.
  const reduced = useRef(
    typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches,
  ).current;
  const [revealed, setRevealed] = useState(reduced ? CV_BOXES.length : 0);
  const [tagCount, setTagCount] = useState(reduced ? PLAY_TAGS.length : 0);

  useEffect(() => {
    if (reduced) return;
    let boxes = 0;
    let tags = 0;
    const box = setInterval(() => {
      boxes = boxes >= CV_BOXES.length ? 0 : boxes + 1;
      setRevealed(boxes);
    }, 900);
    const tag = setInterval(() => {
      tags = tags >= PLAY_TAGS.length ? 0 : tags + 1;
      setTagCount(tags);
    }, 1100);
    return () => {
      clearInterval(box);
      clearInterval(tag);
    };
  }, [reduced]);

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-navy">
      {/* Scoped keyframes for the scan sweep — kept local so index.css is untouched. */}
      <style>{`@keyframes ai-sweep{0%{left:-12%}100%{left:112%}}`}</style>
      {/* Film stage */}
      <div className="hero-navy relative aspect-video w-full overflow-hidden">
        {/* watermark */}
        <span className="absolute inset-0 grid place-items-center opacity-[0.07]" aria-hidden>
          <Logo className="h-40 w-40" />
        </span>

        {/* faint court grid for a "tracked footage" feel */}
        <span
          aria-hidden
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.12) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.12) 1px,transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />

        {/* scanning sweep */}
        {!reduced && (
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-gold/30 to-transparent motion-safe:animate-[ai-sweep_3.6s_linear_infinite]"
          />
        )}

        {/* bounding boxes */}
        {CV_BOXES.map((b, i) => {
          const on = i < revealed;
          return (
            <div
              key={b.id}
              className={`absolute rounded-md border-2 transition-all duration-500 ${TONE[b.tone]} ${
                on ? "opacity-100" : "opacity-0"
              }`}
              style={{ left: `${b.x}%`, top: `${b.y}%`, width: `${b.w}%`, height: `${b.h}%` }}
              aria-hidden
            >
              {/* corner ticks */}
              <span className="absolute -left-px -top-px h-2 w-2 border-l-2 border-t-2 border-current" />
              <span className="absolute -right-px -top-px h-2 w-2 border-r-2 border-t-2 border-current" />
              <span className="absolute -bottom-px -left-px h-2 w-2 border-b-2 border-l-2 border-current" />
              <span className="absolute -bottom-px -right-px h-2 w-2 border-b-2 border-r-2 border-current" />
              <span className="absolute -top-6 left-0 whitespace-nowrap rounded bg-navy/90 px-1.5 py-0.5 text-[10px] font-bold ring-1 ring-current">
                {b.label} · {Math.round(b.conf * 100)}%
              </span>
            </div>
          );
        })}

        {/* status chips overlaid on the frame */}
        <div className="absolute left-3 top-3 flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gold px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-navy">
            <ScanLine className="h-3 w-3" /> CV analyzing
          </span>
        </div>
        <div
          className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-navy/80 px-2.5 py-1 font-mono text-[10px] text-white/80 ring-1 ring-white/15"
          aria-live="polite"
        >
          <Crosshair className="h-3 w-3 text-gold" />
          {revealed} object{revealed === 1 ? "" : "s"} tracked
        </div>
      </div>

      {/* Detected play tags */}
      <div className="px-5 py-4">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-white/60">
            <Cpu className="h-3.5 w-3.5 text-gold" /> Plays recognized
          </span>
          <Pill icon={Sparkles} onDark>
            Auto-clip
          </Pill>
        </div>
        <ul className="mt-3 flex flex-wrap gap-2" aria-label="Recognized plays">
          {PLAY_TAGS.map((t, i) => {
            const on = i < tagCount;
            return (
              <li
                key={t.label}
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all duration-500 ${
                  on
                    ? "border-gold/40 bg-gold/10 text-gold-light"
                    : "border-white/10 bg-white/5 text-white/30"
                }`}
              >
                {t.label}
                <span className="font-mono text-[10px] text-white/50">
                  {Math.round(t.conf * 100)}%
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
