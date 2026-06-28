/*
 * Sparklines — three mini KPI trend cards, each with a tiny recharts LineChart.
 * Animation off for reduced-motion safety.
 */
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { ArrowUpRight, ArrowDownRight, type LucideIcon } from "lucide-react";

type Spark = {
  label: string;
  value: string;
  delta: string;
  up: boolean;
  color: string;
  data: { v: number }[];
};

const mk = (arr: number[]) => arr.map((v) => ({ v }));

const SPARKS: Spark[] = [
  { label: "Practice minutes", value: "640", delta: "+12%", up: true, color: "#c9952e", data: mk([40, 44, 42, 50, 55, 58, 62, 64]) },
  { label: "Avg. RSVP time", value: "2.1d", delta: "+8%", up: true, color: "#16a34a", data: mk([3.2, 3.0, 2.8, 2.6, 2.5, 2.3, 2.2, 2.1]) },
  { label: "Film views", value: "37", delta: "-4%", up: false, color: "#3b82f6", data: mk([42, 40, 41, 39, 38, 40, 38, 37]) },
];

function Card({ s }: { s: Spark }) {
  const Arrow: LucideIcon = s.up ? ArrowUpRight : ArrowDownRight;
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm transition-transform duration-200 hover:-translate-y-0.5">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs font-medium text-muted-foreground">{s.label}</div>
          <div className="mt-1 text-2xl font-extrabold tabular-nums text-foreground">{s.value}</div>
        </div>
        <span
          className={`inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[11px] font-bold ${
            s.up ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
          }`}
        >
          <Arrow className="h-3 w-3" /> {s.delta}
        </span>
      </div>
      <div className="mt-3 h-10">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={s.data} margin={{ top: 4, right: 2, left: 2, bottom: 0 }}>
            <Line type="monotone" dataKey="v" stroke={s.color} strokeWidth={2} dot={false} isAnimationActive={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function Sparklines() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {SPARKS.map((s) => (
        <Card key={s.label} s={s} />
      ))}
    </div>
  );
}
