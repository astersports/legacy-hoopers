/*
 * GrowthProjectionChart — predictive skill-rating projection. A solid gold line
 * shows the athlete's history; a dashed gold line continues it as the AI
 * forecast, wrapped in a shaded confidence band (Area between low/high bounds).
 * Cosmetic data only. Animation off for reduced-motion safety (per dashboard
 * convention: isAnimationActive={false} on every series).
 */
import {
  Area,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  ReferenceLine,
} from "recharts";
import { LineChart, Sparkles } from "lucide-react";
import { AiCard } from "./AiCard";

type Row = {
  m: string;
  actual: number | null;
  forecast: number | null;
  band: [number, number] | null;
};

// Months: first 6 are observed, last 4 are AI forecast. The forecast row that
// joins history repeats the last actual so the dashed line connects cleanly.
const DATA: Row[] = [
  { m: "Jan", actual: 52, forecast: null, band: null },
  { m: "Feb", actual: 55, forecast: null, band: null },
  { m: "Mar", actual: 59, forecast: null, band: null },
  { m: "Apr", actual: 61, forecast: null, band: null },
  { m: "May", actual: 66, forecast: null, band: null },
  { m: "Jun", actual: 70, forecast: 70, band: [70, 70] },
  { m: "Jul", actual: null, forecast: 74, band: [71, 77] },
  { m: "Aug", actual: null, forecast: 78, band: [73, 83] },
  { m: "Sep", actual: null, forecast: 81, band: [75, 88] },
  { m: "Oct", actual: null, forecast: 84, band: [76, 92] },
];

export function GrowthProjectionChart() {
  return (
    <AiCard
      icon={LineChart}
      pillIcon={Sparkles}
      title="Growth projection"
      subtitle="Overall skill rating · AI 4-month forecast"
    >
      <div className="mb-3 mt-4 flex flex-wrap items-center gap-4 text-[11px] font-semibold">
        <span className="inline-flex items-center gap-1.5 text-gold-text">
          <span className="h-2 w-3 rounded-full bg-gold" /> History
        </span>
        <span className="inline-flex items-center gap-1.5 text-gold-text">
          <span className="h-2 w-3 rounded-full border-t-2 border-dashed border-gold" /> AI forecast
        </span>
        <span className="inline-flex items-center gap-1.5 text-muted-foreground">
          <span className="h-2.5 w-3 rounded-sm bg-gold/15 ring-1 ring-gold/20" /> Confidence band
        </span>
      </div>

      <div className="h-60">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={DATA} margin={{ top: 6, right: 8, left: -8, bottom: 0 }}>
            <defs>
              <linearGradient id="aiBand" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#c9952e" stopOpacity={0.22} />
                <stop offset="100%" stopColor="#c9952e" stopOpacity={0.04} />
              </linearGradient>
            </defs>
            <XAxis dataKey="m" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#5a6472" }} />
            <YAxis
              domain={[40, 100]}
              width={28}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11, fill: "#5a6472" }}
            />
            <Tooltip
              cursor={{ stroke: "#c9952e", strokeWidth: 1 }}
              contentStyle={{ borderRadius: 12, border: "1px solid #e4e8ee", fontSize: 12 }}
              formatter={(v, name) => {
                if (v == null) return ["—", name];
                if (name === "actual") return [`${v}`, "Rating"];
                if (name === "forecast") return [`${v}`, "AI forecast"];
                return [`${v}`, name];
              }}
            />
            {/* Shaded confidence band (rendered first so lines sit on top) */}
            <Area
              type="monotone"
              dataKey="band"
              stroke="none"
              fill="url(#aiBand)"
              isAnimationActive={false}
              connectNulls
              activeDot={false}
            />
            {/* Divider marking where forecast begins */}
            <ReferenceLine x="Jun" stroke="#cbd5e1" strokeDasharray="3 3" />
            {/* Observed history (solid) */}
            <Line
              type="monotone"
              dataKey="actual"
              stroke="#c9952e"
              strokeWidth={2.5}
              dot={{ r: 3, fill: "#c9952e" }}
              isAnimationActive={false}
              connectNulls={false}
            />
            {/* AI forecast (dashed) */}
            <Line
              type="monotone"
              dataKey="forecast"
              stroke="#c9952e"
              strokeWidth={2.5}
              strokeDasharray="6 5"
              dot={{ r: 3, fill: "#fff", stroke: "#c9952e", strokeWidth: 2 }}
              isAnimationActive={false}
              connectNulls
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
        <p className="text-sm text-foreground">
          Projected to reach <span className="font-bold text-gold-text">84</span> by October
          <span className="text-muted-foreground"> · +14 over the next 4 months</span>
        </p>
        <span className="rounded-full bg-gold-soft px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-gold-text ring-1 ring-gold/20">
          81% model confidence
        </span>
      </div>
    </AiCard>
  );
}
