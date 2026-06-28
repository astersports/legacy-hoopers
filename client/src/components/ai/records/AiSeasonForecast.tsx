/*
 * AiSeasonForecast — COSMETIC AI feature. A recharts line of each team's actual
 * cumulative win% (from live games) plus a dashed AI projection extending the
 * season forward inside a shaded confidence band. No model, no network — the
 * projection is derived by aiMock and clearly labeled "AI projection".
 */
import { useMemo, useState } from "react";
import { Sparkles, TrendingUp } from "lucide-react";
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { TeamRecord } from "@/lib/aster";
import { AiCard } from "./AiCard";
import { TeamPicker } from "./TeamPicker";
import { aiSeasonForecast } from "./aiMock";

const GOLD = "#c9952e";

export function AiSeasonForecast({ records }: { records: TeamRecord[] }) {
  const [selected, setSelected] = useState(records[0]?.name ?? "");
  const team = useMemo(
    () => records.find((t) => t.name === selected) ?? records[0] ?? null,
    [records, selected],
  );

  const series = useMemo(() => (team ? aiSeasonForecast(team) : []), [team]);
  const data = useMemo(
    () => series.map((p) => ({ ...p, band: p.lo != null && p.hi != null ? [p.lo, p.hi] : null })),
    [series],
  );
  const lastActual = series.filter((p) => p.actual != null).length;

  if (!team) return null;

  const enough = series.length >= 3;

  return (
    <AiCard
      icon={TrendingUp}
      badgeIcon={Sparkles}
      title="Season Trend Forecast"
      subtitle="Actual cumulative win % with a projected path and confidence band."
      action={
        <TeamPicker
          id="ai-forecast-team"
          label="Team"
          records={records}
          value={selected}
          onChange={setSelected}
        />
      }
    >
      {enough ? (
        <>
          <ResponsiveContainer width="100%" height={220}>
            <ComposedChart data={data} margin={{ left: -8, right: 12, top: 8, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis
                dataKey="game"
                tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                axisLine={false}
                tickLine={false}
                label={{ value: "Game", position: "insideBottom", offset: -2, fontSize: 10, fill: "var(--muted-foreground)" }}
              />
              <YAxis
                domain={[0, 100]}
                tickFormatter={(v) => `${v}%`}
                tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                axisLine={false}
                tickLine={false}
                width={40}
              />
              <Tooltip
                contentStyle={{ borderRadius: 12, border: "1px solid var(--border)", fontSize: 12 }}
                formatter={(value, name) => {
                  if (name === "Confidence band" || value == null) return [null, null] as [null, null];
                  return [`${value}%`, name as string];
                }}
                labelFormatter={(l) => `Game ${l}`}
              />
              {/* Confidence band (only on the projected horizon) */}
              <Area
                type="monotone"
                dataKey="band"
                name="Confidence band"
                stroke="none"
                fill={GOLD}
                fillOpacity={0.12}
                isAnimationActive={false}
                connectNulls
              />
              {/* "Now" divider between actual and projection */}
              {lastActual > 0 && (
                <ReferenceLine x={lastActual} stroke="var(--muted-foreground)" strokeDasharray="2 4" />
              )}
              {/* Actual win% */}
              <Line
                type="monotone"
                dataKey="actual"
                name="Actual win %"
                stroke={team.color}
                strokeWidth={2.5}
                dot={{ r: 2.5, fill: team.color }}
                isAnimationActive={false}
                connectNulls
              />
              {/* AI projection (dashed) */}
              <Line
                type="monotone"
                dataKey="projected"
                name="AI projection"
                stroke={GOLD}
                strokeWidth={2.5}
                strokeDasharray="6 5"
                dot={{ r: 2.5, fill: GOLD }}
                isAnimationActive={false}
                connectNulls
              />
            </ComposedChart>
          </ResponsiveContainer>

          <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-0.5 w-5 rounded-full" style={{ backgroundColor: team.color }} aria-hidden /> Actual
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-0.5 w-5 rounded-full bg-gold" style={{ backgroundImage: "repeating-linear-gradient(90deg,var(--color-gold) 0 4px,transparent 4px 8px)" }} aria-hidden />
              AI projection
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2.5 w-4 rounded-sm bg-gold/15 ring-1 ring-gold/20" aria-hidden /> Confidence band
            </span>
          </div>
          <p className="mt-2 text-[11px] text-muted-foreground">
            AI projection — extends the live trend forward. Cosmetic preview; not yet wired to a model.
          </p>
        </>
      ) : (
        <p className="text-sm text-muted-foreground">
          The model needs a few more decided games before it can project a trend for {team.name}.
        </p>
      )}
    </AiCard>
  );
}
