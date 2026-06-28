/*
 * AiTrainingPlan — a personalized, AI-ranked list of "next best drills" for the
 * athlete. Each row shows a fit/match % (the model's confidence the drill
 * addresses the athlete's biggest current gap), the skill it targets and the
 * reasoning. Cosmetic data; no API. The match bars are static (no animation),
 * accessible via aria-valuenow.
 */
import { Wand2, Sparkles, Dumbbell, Crosshair, Shield, Repeat, type LucideIcon } from "lucide-react";
import { AiCard } from "./AiCard";

type Drill = {
  name: string;
  targets: string;
  why: string;
  match: number;
  icon: LucideIcon;
};

/** Ranked highest-fit first (cosmetic). */
const DRILLS: Drill[] = [
  {
    name: "Catch-and-shoot ladder",
    targets: "Finishing · free throws",
    why: "Closes Maya's biggest gap — repeatability under fatigue.",
    match: 96,
    icon: Crosshair,
  },
  {
    name: "Closeout & contain circuit",
    targets: "Defense",
    why: "Lifts the one skill trailing her growth curve.",
    match: 89,
    icon: Shield,
  },
  {
    name: "2-ball handling series",
    targets: "Ball handling",
    why: "Compounds her fastest-rising strength.",
    match: 81,
    icon: Repeat,
  },
  {
    name: "Lower-body power block",
    targets: "Strength plan",
    why: "Keeps the 12-week block on pace.",
    match: 73,
    icon: Dumbbell,
  },
];

function matchTone(pct: number) {
  if (pct >= 90) return "text-emerald-600";
  if (pct >= 80) return "text-gold-text";
  return "text-muted-foreground";
}

export function AiTrainingPlan() {
  return (
    <AiCard
      icon={Wand2}
      pillIcon={Sparkles}
      title="Your AI training plan"
      subtitle="Next-best drills, ranked for Maya"
    >
      <ul className="mt-5 space-y-3">
        {DRILLS.map((d, i) => {
          const Icon = d.icon;
          return (
            <li
              key={d.name}
              className="flex items-center gap-3 rounded-xl border border-border bg-card p-3 transition-colors hover:border-gold/40"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-navy text-gold-light">
                <Icon className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-[11px] font-bold tabular-nums text-muted-foreground">
                    #{i + 1}
                  </span>
                  <span className="truncate text-sm font-bold text-foreground">{d.name}</span>
                </div>
                <p className="truncate text-xs text-muted-foreground">{d.targets}</p>
                <p className="mt-0.5 text-xs leading-snug text-foreground/80">{d.why}</p>
              </div>
              <div className="w-20 shrink-0 text-right">
                <div className={`text-base font-extrabold tabular-nums ${matchTone(d.match)}`}>
                  {d.match}%
                </div>
                <div className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                  match
                </div>
                <div
                  className="mt-1 h-1.5 overflow-hidden rounded-full bg-secondary"
                  role="progressbar"
                  aria-valuenow={d.match}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${d.name} match`}
                >
                  <div className="h-full rounded-full bg-gold" style={{ width: `${d.match}%` }} />
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <p className="mt-5 border-t border-border pt-4 text-[11px] text-muted-foreground">
        Ranked by Aster AI from Maya's skill profile, recent reps and goals. Illustrative — your
        coach finalizes the plan.
      </p>
    </AiCard>
  );
}
