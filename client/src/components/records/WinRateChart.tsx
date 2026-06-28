/*
 * WinRateChart — a compact recharts horizontal bar comparing every team's win
 * rate, tinted with each team's color. Presentation only; reads derived values.
 */
import { Bar, BarChart, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import type { TeamRecord } from "@/lib/aster";
import { winRate } from "./recordsUtils";

export function WinRateChart({ records }: { records: TeamRecord[] }) {
  if (records.length < 2) return null;
  const data = records.map((t) => ({
    name: t.name,
    pct: Math.round(winRate(t) * 100),
    color: t.color,
  }));

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-gold-text">Win rate by team</div>
      <ResponsiveContainer width="100%" height={Math.max(140, data.length * 38)}>
        <BarChart data={data} layout="vertical" margin={{ left: 8, right: 24, top: 0, bottom: 0 }}>
          <XAxis
            type="number"
            domain={[0, 100]}
            tickFormatter={(v) => `${v}%`}
            tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="name"
            width={110}
            tick={{ fontSize: 12, fill: "var(--foreground)" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            cursor={{ fill: "var(--secondary)" }}
            formatter={(v: number) => [`${v}%`, "Win rate"]}
            contentStyle={{ borderRadius: 12, border: "1px solid var(--border)", fontSize: 12 }}
          />
          <Bar dataKey="pct" radius={[0, 6, 6, 0]} isAnimationActive={false}>
            {data.map((d) => (
              <Cell key={d.name} fill={d.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
