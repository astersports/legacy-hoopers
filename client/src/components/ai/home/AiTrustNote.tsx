/*
 * AiTrustNote — privacy-first / explainability strip that grounds the AI
 * showcase in trust. Cosmetic copy; no data. Three short pillars + a quiet
 * disclosure line.
 */
import { ShieldCheck, Eye, Lock, type LucideIcon } from "lucide-react";

type Point = { icon: LucideIcon; title: string; blurb: string };

const POINTS: Point[] = [
  {
    icon: Eye,
    title: "Explainable",
    blurb: "Every recommendation shows the why — the signals behind it, in plain language.",
  },
  {
    icon: Lock,
    title: "Privacy-first",
    blurb: "Athlete data stays inside your program. We never sell it or train public models on it.",
  },
  {
    icon: ShieldCheck,
    title: "Coach in the loop",
    blurb: "AI assists — a real coach reviews and approves what reaches your family.",
  },
];

export function AiTrustNote() {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
      <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-gold-text">
        <ShieldCheck className="h-3.5 w-3.5" /> How our AI works
      </div>
      <h3 className="mt-2 text-xl font-extrabold tracking-tight text-foreground sm:text-2xl">
        Powerful AI, built on trust.
      </h3>
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {POINTS.map((p) => {
          const Icon = p.icon;
          return (
            <div key={p.title} className="flex gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gold-soft text-gold-text ring-1 ring-gold/20">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <h4 className="font-bold text-foreground">{p.title}</h4>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{p.blurb}</p>
              </div>
            </div>
          );
        })}
      </div>
      <p className="mt-6 border-t border-border pt-4 text-xs text-muted-foreground">
        Aster AI features are in active development and shown here as a preview. Outputs are
        illustrative until each capability goes live for your program.
      </p>
    </div>
  );
}
