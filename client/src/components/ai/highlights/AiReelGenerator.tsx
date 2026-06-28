/*
 * AiReelGenerator — pick the moments to include, hit "Generate", watch a faux
 * progress run (selecting clips → matching beats → rendering), then land on a
 * "reel ready" result card. Fully cosmetic: no real generation, just staged UI
 * that mimics an AI editor assembling a highlight reel.
 */
import { useEffect, useRef, useState } from "react";
import { Wand2, Film, Check, RotateCcw, Play } from "lucide-react";
import { AiFilmCard } from "./AiFilmCard";
import { MOMENTS } from "./aiMock";

const CHIP_TONE: Record<string, string> = {
  gold: "border-gold/40 bg-gold-soft text-gold-text",
  cyan: "border-cyan-300/50 bg-cyan-50 text-cyan-700",
  green: "border-emerald-300/50 bg-emerald-50 text-emerald-700",
  violet: "border-violet-300/50 bg-violet-50 text-violet-700",
};

const STAGES = ["Selecting best clips", "Matching the beat", "Color + captions", "Rendering reel"];

type Phase = "idle" | "running" | "done";

export function AiReelGenerator() {
  const [picked, setPicked] = useState<string[]>(["m1", "m3"]);
  const [phase, setPhase] = useState<Phase>("idle");
  const [stage, setStage] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clear = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };
  useEffect(() => clear, []);

  const toggle = (id: string) =>
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  const totalClips = MOMENTS.filter((m) => picked.includes(m.id)).reduce((n, m) => n + m.clips, 0);

  const generate = () => {
    clear();
    setPhase("running");
    setStage(0);
    STAGES.forEach((_, i) =>
      timers.current.push(setTimeout(() => setStage(i), i * 700)),
    );
    timers.current.push(setTimeout(() => setPhase("done"), STAGES.length * 700));
  };

  const reset = () => {
    clear();
    setPhase("idle");
    setStage(0);
  };

  return (
    <AiFilmCard
      icon={Wand2}
      title="AI reel generator"
      subtitle="Pick the moments — the model cuts, scores and captions a shareable reel."
    >
      {phase === "done" ? (
        <div className="rounded-xl border border-gold/30 bg-gold-soft/60 p-4">
          <div className="overflow-hidden rounded-lg border border-white/10">
            <div className="hero-navy relative grid aspect-video place-items-center text-white">
              <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-gold px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-navy">
                <Check className="h-3 w-3" /> Reel ready
              </span>
              <button
                type="button"
                aria-label="Play generated reel"
                className="grid h-16 w-16 place-items-center rounded-full bg-gold text-navy shadow-lg ring-4 ring-white/10 transition-transform hover:scale-105"
              >
                <Play className="h-7 w-7 translate-x-0.5 fill-navy" />
              </button>
              <span className="absolute bottom-3 right-3 font-mono text-[11px] text-white/70">1:48</span>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between gap-3">
            <p className="text-sm text-foreground">
              <span className="font-bold">{totalClips} clips</span> stitched into a{" "}
              <span className="font-bold">1:48</span> reel.
            </p>
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              <RotateCcw className="h-3.5 w-3.5" /> New reel
            </button>
          </div>
        </div>
      ) : (
        <>
          <fieldset disabled={phase === "running"} className="min-w-0">
            <legend className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Include moments
            </legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {MOMENTS.map((m) => {
                const on = picked.includes(m.id);
                return (
                  <button
                    key={m.id}
                    type="button"
                    aria-pressed={on}
                    onClick={() => toggle(m.id)}
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold disabled:opacity-60 ${
                      on ? CHIP_TONE[m.tone] : "border-border bg-card text-muted-foreground hover:bg-secondary"
                    }`}
                  >
                    {on && <Check className="h-3.5 w-3.5" />}
                    {m.label}
                    <span className="font-mono text-[10px] opacity-70">{m.clips}</span>
                  </button>
                );
              })}
            </div>
          </fieldset>

          {phase === "running" ? (
            <div className="mt-4" aria-live="polite">
              <div className="flex items-center justify-between text-xs font-semibold text-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Film className="h-3.5 w-3.5 text-gold-text" /> {STAGES[stage]}…
                </span>
                <span className="font-mono text-muted-foreground">
                  {Math.round(((stage + 1) / STAGES.length) * 100)}%
                </span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full rounded-full bg-gold transition-all duration-500 ease-out"
                  style={{ width: `${((stage + 1) / STAGES.length) * 100}%` }}
                />
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={generate}
              disabled={picked.length === 0}
              className={`mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gold px-5 py-3 text-sm font-semibold text-navy shadow-sm transition-colors hover:bg-gold-light disabled:cursor-not-allowed disabled:opacity-50`}
            >
              <Wand2 className="h-4 w-4" /> Generate reel · {totalClips} clips
            </button>
          )}
        </>
      )}
    </AiFilmCard>
  );
}
