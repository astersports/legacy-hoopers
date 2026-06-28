/*
 * Predictive attendance — "AI expects N going" for the next game.
 *
 * COSMETIC / MOCK: the projected headcount + confidence are derived
 * deterministically from the event id (stable per event, no randomness on
 * re-render) to mimic a model output. No real RSVP model runs. Showcases the
 * future attendance-prediction surface.
 */
import { useMemo } from "react";
import { Users, TrendingUp } from "lucide-react";
import { type ScheduleEvent } from "@/lib/schedule";
import { AICard, ConfidenceBar } from "./aiKit";

/** Stable pseudo-value in [min,max] seeded by the event id (no Math.random). */
function seeded(id: string, salt: number, min: number, max: number): number {
  let h = salt;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return min + (h % (max - min + 1));
}

export function AIAttendancePredictor({ next }: { next: ScheduleEvent | null }) {
  const model = useMemo(() => {
    if (!next) return null;
    const id = next.event_id;
    const roster = seeded(id, 7, 10, 12); // cosmetic roster size
    const going = seeded(id, 13, 8, roster); // projected attending
    const confidence = seeded(id, 29, 78, 94);
    const trend = seeded(id, 41, 0, 1) === 1 ? "up" : "steady";
    return { roster, going, confidence, trend, pctOfRoster: Math.round((going / roster) * 100) };
  }, [next]);

  if (!next || !model) return null;

  return (
    <AICard icon={Users} title="Predicted attendance" caption={`${next.team_name} · next game`}>
      <div className="flex items-end gap-3">
        <div className="text-4xl font-extrabold tabular-nums leading-none text-foreground">
          {model.going}
        </div>
        <div className="pb-1 text-sm text-muted-foreground">
          of {model.roster} expected going
        </div>
        {model.trend === "up" && (
          <span className="mb-1 ml-auto inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-600">
            <TrendingUp className="h-3 w-3" aria-hidden="true" /> trending up
          </span>
        )}
      </div>

      <div className="mt-4 space-y-3">
        <ConfidenceBar value={model.pctOfRoster} label="Projected turnout" tone="gold" />
        <ConfidenceBar value={model.confidence} label="Model confidence" tone="navy" />
      </div>

      <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
        Estimated from past RSVP timing, weather, and travel distance. Preview — not a live RSVP count.
      </p>
    </AICard>
  );
}
