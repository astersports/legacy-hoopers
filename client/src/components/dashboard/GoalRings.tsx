/*
 * GoalRings — three progress rings for season goals/milestones using recharts
 * RadialBarChart (animation off for reduced-motion safety).
 */
import { RadialBar, RadialBarChart, ResponsiveContainer, PolarAngleAxis } from "recharts";

type Goal = { label: string; sub: string; pct: number; color: string };

const GOALS: Goal[] = [
  { label: "Free-throw goal", sub: "Target 85%", pct: 78, color: "#c9952e" },
  { label: "Attendance", sub: "Season-long", pct: 94, color: "#16a34a" },
  { label: "Strength plan", sub: "12-week block", pct: 60, color: "#3b82f6" },
];

function Ring({ goal }: { goal: Goal }) {
  const data = [{ name: goal.label, value: goal.pct, fill: goal.color }];
  return (
    <div className="flex flex-col items-center rounded-2xl border border-border bg-card p-5 shadow-sm transition-transform duration-200 hover:-translate-y-0.5">
      <div className="relative h-32 w-32">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            innerRadius="72%"
            outerRadius="100%"
            barSize={10}
            data={data}
            startAngle={90}
            endAngle={-270}
          >
            <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
            <RadialBar background={{ fill: "#eef1f5" }} dataKey="value" cornerRadius={8} isAnimationActive={false} />
          </RadialBarChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-extrabold tabular-nums text-foreground">{goal.pct}%</span>
        </div>
      </div>
      <div className="mt-3 text-center">
        <div className="text-sm font-bold text-foreground">{goal.label}</div>
        <div className="text-xs text-muted-foreground">{goal.sub}</div>
      </div>
    </div>
  );
}

export function GoalRings() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {GOALS.map((g) => (
        <Ring key={g.label} goal={g} />
      ))}
    </div>
  );
}
