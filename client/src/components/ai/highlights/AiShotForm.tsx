/*
 * AiShotForm — cosmetic CV mechanics breakdown. A radar of the four shot-form
 * scores (release, arc, balance, follow-through) plus a per-metric bar list and
 * a single "fix" tip. Recharts with isAnimationActive={false} per the page rule.
 * Static mock scores — no real pose estimation.
 */
import { Crosshair, Lightbulb } from "lucide-react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";
import { AiFilmCard } from "./AiFilmCard";
import { FORM_METRICS, FORM_TIP } from "./aiMock";

const overall = Math.round(
  FORM_METRICS.reduce((n, m) => n + m.value, 0) / FORM_METRICS.length,
);

export function AiShotForm() {
  const data = FORM_METRICS.map((m) => ({ label: m.label, value: m.value }));

  return (
    <AiFilmCard
      icon={Crosshair}
      title="AI shot-form analysis"
      subtitle="Frame-by-frame mechanics from your last shooting clip."
    >
      <div className="grid gap-5 sm:grid-cols-[1fr_1.1fr] sm:items-center">
        {/* Radar */}
        <div className="relative h-44">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={data} outerRadius="72%">
              <PolarGrid stroke="#e4e8ee" />
              <PolarAngleAxis dataKey="label" tick={{ fontSize: 10, fill: "#5a6472" }} />
              <Radar
                dataKey="value"
                stroke="#c9952e"
                fill="#c9952e"
                fillOpacity={0.25}
                isAnimationActive={false}
              />
            </RadarChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 grid place-items-center">
            <div className="text-center">
              <div className="text-2xl font-extrabold tabular-nums text-foreground">{overall}</div>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Form score
              </div>
            </div>
          </div>
        </div>

        {/* Per-metric bars */}
        <ul className="space-y-2.5">
          {FORM_METRICS.map((m) => (
            <li key={m.label}>
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-foreground">{m.label}</span>
                <span className="font-mono text-muted-foreground">
                  {m.value} · <span className="text-gold-text">{m.ideal}</span>
                </span>
              </div>
              <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-secondary">
                <div className="h-full rounded-full bg-gold" style={{ width: `${m.value}%` }} />
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Fix tip */}
      <div className="mt-4 flex items-start gap-3 rounded-xl border border-gold/20 bg-gold-soft/60 p-3">
        <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-gold-text" aria-hidden />
        <p className="text-sm text-foreground">
          <span className="font-bold">Coaching cue: </span>
          {FORM_TIP}
        </p>
      </div>
    </AiFilmCard>
  );
}
