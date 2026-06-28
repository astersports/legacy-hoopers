/*
 * AiWinProbability — COSMETIC AI feature. A recharts radial gauge showing a
 * "projected win probability" for a chosen team's next matchup, plus a
 * confidence read. No model, no API — the number is derived from the live win
 * rate + current form by aiMock and clearly labeled "AI · projected".
 */
import { useMemo, useState } from "react";
import { Cpu, Target, Sparkles } from "lucide-react";
import { PolarAngleAxis, RadialBar, RadialBarChart } from "recharts";
import type { TeamRecord } from "@/lib/aster";
import { AiCard } from "./AiCard";
import { TeamPicker } from "./TeamPicker";
import { aiWinProbability, aiConfidence } from "./aiMock";

const GOLD = "#c9952e";

export function AiWinProbability({ records }: { records: TeamRecord[] }) {
  const [selected, setSelected] = useState(records[0]?.name ?? "");
  const team = useMemo(
    () => records.find((t) => t.name === selected) ?? records[0] ?? null,
    [records, selected],
  );

  const prob = team ? aiWinProbability(team) : 0;
  const confidence = team ? aiConfidence(team) : 0;
  const data = [{ name: "win", value: prob, fill: team?.color || GOLD }];

  if (!team) return null;

  const verdict = prob >= 60 ? "Favored" : prob >= 45 ? "Toss-up" : "Underdog";

  return (
    <AiCard
      icon={Target}
      badgeIcon={Sparkles}
      title="Win Probability — Next Matchup"
      subtitle="The model projects a neutral-site result from form and season record."
      action={
        <TeamPicker
          id="ai-winprob-team"
          label="Team"
          records={records}
          value={selected}
          onChange={setSelected}
        />
      }
    >
      <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center sm:gap-8">
        {/* Radial gauge */}
        <div className="relative h-44 w-44 shrink-0" role="img" aria-label={`Projected win probability ${prob} percent`}>
          <RadialBarChart
            width={176}
            height={176}
            cx="50%"
            cy="50%"
            innerRadius="74%"
            outerRadius="100%"
            barSize={14}
            data={data}
            startAngle={90}
            endAngle={-270}
          >
            <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
            <RadialBar background={{ fill: "var(--secondary)" }} dataKey="value" cornerRadius={8} isAnimationActive={false} />
          </RadialBarChart>
          <div className="pointer-events-none absolute inset-0 grid place-items-center">
            <div className="text-center">
              <div className="text-3xl font-extrabold tabular-nums text-foreground">{prob}%</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">to win</div>
            </div>
          </div>
        </div>

        {/* Read-out */}
        <div className="min-w-0 flex-1 space-y-3">
          <div className="flex items-center gap-2">
            <span className="h-3 w-1.5 rounded-full" style={{ backgroundColor: team.color }} aria-hidden />
            <span className="truncate text-base font-bold tracking-tight text-foreground">{team.name}</span>
            <span className="rounded-full bg-gold-soft px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-gold-text ring-1 ring-gold/20">
              {verdict}
            </span>
          </div>

          <div className="rounded-xl border border-border bg-secondary/40 p-3">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 font-semibold text-muted-foreground">
                <Cpu className="h-3.5 w-3.5" aria-hidden /> Model confidence
              </span>
              <span className="font-bold tabular-nums text-foreground">{confidence}%</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-secondary">
              <div className="h-full rounded-full bg-gold" style={{ width: `${confidence}%` }} aria-hidden />
            </div>
          </div>

          <p className="text-[11px] text-muted-foreground">
            AI projection — derived from live record + recent form. Cosmetic preview; not yet wired to a model.
          </p>
        </div>
      </div>
    </AiCard>
  );
}
