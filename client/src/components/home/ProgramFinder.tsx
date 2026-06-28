/*
 * ProgramFinder — interactive "find your program" picker. Selecting an age band
 * and a goal highlights the recommended SERVICES card with a gold ring +
 * "Recommended for you" label.
 */
import { useMemo, useState } from "react";
import { SERVICES } from "@/lib/content";
import { ServiceCard } from "@/components/ServiceCard";

const AGES = ["6-8", "9-11", "12-14", "15+"] as const;
const GOALS = ["Get started", "Compete", "Go elite"] as const;

type Age = (typeof AGES)[number];
type Goal = (typeof GOALS)[number];

/** Recommendation matrix → SERVICES key. */
function recommend(age: Age | null, goal: Goal | null): string | null {
  if (!age || !goal) return null;
  if (goal === "Get started") return age === "6-8" ? "camps" : "clinics";
  if (goal === "Compete") return age === "15+" ? "small-group" : "aau";
  // Go elite
  return age === "6-8" ? "training" : "elite";
}

function Chip({
  active,
  children,
  onClick,
  label,
}: {
  active: boolean;
  children: string;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      aria-label={label}
      className={`min-h-[44px] rounded-full px-4 py-2 text-sm font-semibold transition-all ${
        active
          ? "bg-gold text-navy shadow-sm ring-2 ring-gold"
          : "border border-border bg-card text-foreground hover:bg-secondary"
      }`}
    >
      {children}
    </button>
  );
}

export function ProgramFinder() {
  const [age, setAge] = useState<Age | null>(null);
  const [goal, setGoal] = useState<Goal | null>(null);
  const recKey = useMemo(() => recommend(age, goal), [age, goal]);
  const recommended = SERVICES.find((s) => s.key === recKey) ?? null;

  return (
    <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
      <div>
        <div className="space-y-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <fieldset>
            <legend className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold-text">
              Athlete age
            </legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {AGES.map((a) => (
                <Chip
                  key={a}
                  active={age === a}
                  onClick={() => setAge(a)}
                  label={`Age ${a}`}
                >
                  {a}
                </Chip>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold-text">
              Their goal
            </legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {GOALS.map((g) => (
                <Chip
                  key={g}
                  active={goal === g}
                  onClick={() => setGoal(g)}
                  label={`Goal: ${g}`}
                >
                  {g}
                </Chip>
              ))}
            </div>
          </fieldset>
          <p className="text-sm text-muted-foreground" aria-live="polite">
            {recommended
              ? `Based on that, we'd start with ${recommended.name}.`
              : "Pick an age and a goal to see your best-fit program."}
          </p>
        </div>
      </div>

      <div className="relative">
        {recommended ? (
          <div className="relative rounded-2xl ring-2 ring-gold ring-offset-2 ring-offset-background">
            <span className="absolute -top-3 left-6 z-10 rounded-full bg-gold px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-navy shadow-sm">
              Recommended for you
            </span>
            <ServiceCard s={recommended} />
          </div>
        ) : (
          <div className="grid min-h-[260px] place-items-center rounded-2xl border border-dashed border-border bg-secondary/30 p-8 text-center">
            <p className="max-w-xs text-sm text-muted-foreground">
              Your recommended program will appear here once you choose an age
              and a goal.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
