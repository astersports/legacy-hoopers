/*
 * AiInsightsTicker — a live-feeling band of AI activity stats. The headline
 * counter ticks upward on an interval to feel "live"; the rotating insight
 * line cycles through cosmetic AI observations. All mock data, no API calls.
 * Respects prefers-reduced-motion (no ticking / rotation when reduced).
 */
import { useEffect, useRef, useState } from "react";
import { Cpu, Zap, Activity } from "lucide-react";

/** Rotating cosmetic insight lines "surfaced" by the platform AI. */
const INSIGHTS = [
  "Spotted a 12% jump in finishing reps across clinics this week.",
  "Flagged 3 athletes ready to move up an age group.",
  "Auto-tagged 218 new film clips overnight.",
  "Recommended 41 best-fit programs to new families.",
  "Balanced next week's schedule across 6 gyms, zero conflicts.",
] as const;

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  );
}

export function AiInsightsTicker() {
  const [reps, setReps] = useState(12480);
  const [idx, setIdx] = useState(0);
  const reduce = useRef(false);

  useEffect(() => {
    reduce.current = prefersReducedMotion();
    if (reduce.current) return;
    const tick = window.setInterval(() => {
      setReps((r) => r + Math.floor(Math.random() * 5) + 1);
    }, 1400);
    const rotate = window.setInterval(() => {
      setIdx((i) => (i + 1) % INSIGHTS.length);
    }, 3800);
    return () => {
      window.clearInterval(tick);
      window.clearInterval(rotate);
    };
  }, []);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-navy p-[1.5px] shadow-lg">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-gold/20 via-transparent to-gold/20" aria-hidden />
      <div className="relative rounded-[calc(1.5rem-1.5px)] bg-navy px-6 py-7 sm:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          {/* Live headline counter */}
          <div className="flex items-center gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/5 text-gold-light ring-1 ring-white/10">
              <Cpu className="h-6 w-6" />
            </span>
            <div>
              <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-gold-light">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-gold-light opacity-75 motion-safe:animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-gold-light" />
                </span>
                AI live · this week
              </div>
              <div className="mt-1 text-3xl font-extrabold tabular-nums text-white sm:text-4xl">
                {reps.toLocaleString()}
                <span className="ml-2 text-base font-semibold text-white/60">reps analyzed</span>
              </div>
            </div>
          </div>

          {/* Rotating insight */}
          <div className="max-w-md sm:text-right">
            <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-white/40 sm:justify-end">
              <Zap className="h-3.5 w-3.5" /> Latest insight
            </div>
            <p key={idx} className="mt-1.5 text-sm leading-relaxed text-white/80 motion-safe:animate-in motion-safe:fade-in motion-safe:duration-500" aria-live="polite">
              {INSIGHTS[idx]}
            </p>
          </div>
        </div>

        {/* Mini activity stats */}
        <div className="mt-6 grid grid-cols-3 gap-3 border-t border-white/10 pt-6">
          {[
            { icon: Activity, value: "98.6%", label: "Model uptime" },
            { icon: Zap, value: "0.4s", label: "Avg. response" },
            { icon: Cpu, value: "24/7", label: "Always-on" },
          ].map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="flex flex-col items-center gap-1 text-center sm:flex-row sm:gap-2 sm:text-left">
                <Icon className="h-4 w-4 text-gold-light" aria-hidden />
                <div>
                  <div className="text-sm font-extrabold text-white">{s.value}</div>
                  <div className="text-[10px] uppercase tracking-wider text-white/50">{s.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
