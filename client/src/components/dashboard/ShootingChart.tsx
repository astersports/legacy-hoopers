/*
 * ShootingChart — 8-week FG% trend (gold area) with a muted "team average"
 * comparison line layered on top. Animation off for reduced-motion safety.
 */
import { Area, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { ArrowUpRight } from "lucide-react";

const SHOOTING = [
  { wk: "W1", pct: 38, team: 44 }, { wk: "W2", pct: 41, team: 45 }, { wk: "W3", pct: 44, team: 45 },
  { wk: "W4", pct: 43, team: 46 }, { wk: "W5", pct: 49, team: 47 }, { wk: "W6", pct: 52, team: 48 },
  { wk: "W7", pct: 55, team: 49 }, { wk: "W8", pct: 58, team: 50 },
];

export function ShootingChart() {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-transform duration-200 hover:-translate-y-0.5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-foreground">Shooting % trend</h3>
          <p className="text-xs text-muted-foreground">Last 8 weeks · field goal %</p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-600">
          <ArrowUpRight className="h-3.5 w-3.5" /> +20%
        </span>
      </div>
      <div className="mb-3 flex items-center gap-4 text-[11px] font-semibold">
        <span className="inline-flex items-center gap-1.5 text-gold-text">
          <span className="h-2 w-2 rounded-full bg-gold" /> You
        </span>
        <span className="inline-flex items-center gap-1.5 text-muted-foreground">
          <span className="h-2 w-3 rounded-full border-t-2 border-dashed border-muted-foreground" /> Team average
        </span>
      </div>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={SHOOTING} margin={{ top: 6, right: 6, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#c9952e" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#c9952e" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="wk" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#5a6472" }} />
            <Tooltip
              cursor={{ stroke: "#c9952e", strokeWidth: 1 }}
              contentStyle={{ borderRadius: 12, border: "1px solid #e4e8ee", fontSize: 12 }}
              formatter={(v: number, name) => [`${v}%`, name === "team" ? "Team avg" : "FG%"]}
            />
            <Area type="monotone" dataKey="pct" stroke="#c9952e" strokeWidth={2.5} fill="url(#g)" isAnimationActive={false} dot={{ r: 3, fill: "#c9952e" }} />
            <Line type="monotone" dataKey="team" stroke="#94a3b8" strokeWidth={2} strokeDasharray="5 4" dot={false} isAnimationActive={false} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
