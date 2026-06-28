/*
 * AiDevelopmentPath — a cosmetic "AI skill-gap assessment" that, for a chosen
 * starting band, shows current-vs-potential skill bars (recharts, animation off)
 * and a personalized development-path timeline of recommended programs. NO data
 * fetching — every value is canned in DEV_PATHS. Accessible band selector +
 * motion-safe. Each timeline node references a real SERVICES program.
 */
import { useState } from "react";
import {
  Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import { Brain, Sparkles, ClipboardList, ArrowRight } from "lucide-react";
import { AiCard } from "./AiCard";
import { DEV_PATHS, type AgeBand } from "./aiProgramsMeta";

const BANDS: { value: AgeBand; label: string }[] = [
  { value: "rookie", label: "Grades 2–3" },
  { value: "developing", label: "Grades 4–5" },
  { value: "competitive", label: "Grades 6–8" },
  { value: "prospect", label: "Grades 9–11" },
];

export function AiDevelopmentPath() {
  const [band, setBand] = useState<AgeBand>("developing");
  const path = DEV_PATHS[band];
  const chartData = path.bars.map((b) => ({
    skill: b.skill,
    current: b.current,
    gap: b.potential - b.current,
    potential: b.potential,
  }));

  return (
    <AiCard
      icon={Brain}
      pillIcon={Sparkles}
      title="AI Skill-Gap Assessment"
      subtitle="See the gap between today and the ceiling — and the program path that closes it"
    >
      {/* Band selector */}
      <div className="mt-5">
        <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
          Starting point
        </div>
        <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label="Choose a starting age band">
          {BANDS.map((b) => {
            const active = band === b.value;
            return (
              <button
                key={b.value}
                type="button"
                onClick={() => setBand(b.value)}
                aria-pressed={active}
                className={`min-h-[36px] rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                  active
                    ? "border-gold bg-gold-soft text-gold-text"
                    : "border-border bg-card text-foreground hover:border-gold/40 hover:bg-gold-soft/50"
                }`}
              >
                {b.label}
              </button>
            );
          })}
        </div>
      </div>

      <p className="mt-4 text-sm font-semibold text-foreground">{path.headline}</p>

      {/* Skill-gap bars */}
      <div className="mb-2 mt-4 flex flex-wrap items-center gap-4 text-[11px] font-semibold">
        <span className="inline-flex items-center gap-1.5 text-foreground">
          <span className="h-2 w-3 rounded-sm bg-navy" /> Today
        </span>
        <span className="inline-flex items-center gap-1.5 text-gold-text">
          <span className="h-2 w-3 rounded-sm bg-gold/40" /> AI-projected potential
        </span>
      </div>
      <div className="h-56" aria-hidden>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} layout="vertical" margin={{ top: 4, right: 12, left: 8, bottom: 0 }}>
            <XAxis type="number" domain={[0, 100]} hide />
            <YAxis
              type="category"
              dataKey="skill"
              width={92}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11, fill: "#5a6472" }}
            />
            <Tooltip
              cursor={{ fill: "rgba(201,149,46,0.06)" }}
              contentStyle={{ borderRadius: 12, border: "1px solid #e4e8ee", fontSize: 12 }}
              formatter={(v, name) => {
                if (name === "current") return [`${v}`, "Today"];
                if (name === "gap") return [null, null] as unknown as [string, string];
                return [`${v}`, name];
              }}
            />
            {/* Stacked: solid navy current + translucent gold gap up to potential */}
            <Bar dataKey="current" stackId="s" radius={[6, 0, 0, 6]} isAnimationActive={false}>
              {chartData.map((d) => (
                <Cell key={d.skill} fill="#151525" />
              ))}
            </Bar>
            <Bar dataKey="gap" stackId="s" radius={[0, 6, 6, 0]} isAnimationActive={false}>
              {chartData.map((d) => (
                <Cell key={d.skill} fill="rgba(201,149,46,0.4)" />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Development-path timeline */}
      <div className="mt-5 border-t border-border pt-5">
        <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-gold-text">
          <ClipboardList className="h-3.5 w-3.5" /> Recommended development path
        </div>
        <ol className="mt-3 grid gap-3 sm:grid-cols-3">
          {path.timeline.map((node, i) => (
            <li key={node.phase} className="relative">
              <div className="h-full rounded-2xl border border-border bg-secondary/30 p-4">
                <span className="inline-flex items-center gap-1 rounded-full bg-navy px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gold-light">
                  {node.phase}
                </span>
                <div className="mt-2 text-sm font-extrabold text-foreground">{node.program}</div>
                <div className="mt-0.5 text-xs text-muted-foreground">{node.focus}</div>
              </div>
              {i < path.timeline.length - 1 && (
                <ArrowRight
                  className="absolute -right-2.5 top-1/2 hidden h-4 w-4 -translate-y-1/2 text-gold/60 sm:block"
                  aria-hidden
                />
              )}
            </li>
          ))}
        </ol>
      </div>

      <p className="mt-4 text-[11px] text-muted-foreground">
        Aster AI is a preview. Skill estimates are illustrative — a coach evaluation sets the real baseline.
      </p>
    </AiCard>
  );
}
