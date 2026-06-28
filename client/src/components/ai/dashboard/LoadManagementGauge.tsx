/*
 * LoadManagementGauge — an AI load-management / injury-risk read. A half-circle
 * recharts RadialBar gauge shows the current risk score (low here), with a short
 * advisory and the three signals feeding it. Cosmetic data only. Animation off
 * for reduced-motion safety (dashboard convention).
 */
import { RadialBar, RadialBarChart, ResponsiveContainer, PolarAngleAxis } from "recharts";
import { Activity, AlertTriangle, Sparkles, Moon, Gauge, CalendarRange } from "lucide-react";
import { AiCard } from "./AiCard";

// Risk score 0-100 (lower is safer). 28 = low/green.
const RISK = 28;
const RISK_DATA = [{ name: "risk", value: RISK, fill: "#16a34a" }];

const SIGNALS = [
  { icon: CalendarRange, label: "Weekly load", value: "Balanced", tone: "ok" as const },
  { icon: Moon, label: "Recovery days", value: "2 of 2", tone: "ok" as const },
  { icon: Gauge, label: "Intensity spike", value: "None", tone: "ok" as const },
];

function band(score: number) {
  if (score < 34) return { label: "Low risk", text: "text-emerald-600", soft: "bg-emerald-50" };
  if (score < 67) return { label: "Watch", text: "text-gold-text", soft: "bg-gold-soft" };
  return { label: "Elevated", text: "text-rose-600", soft: "bg-rose-50" };
}

export function LoadManagementGauge() {
  const b = band(RISK);
  return (
    <AiCard
      icon={Activity}
      pillIcon={Sparkles}
      title="Load & injury-risk watch"
      subtitle="AI monitors workload to keep Maya healthy"
    >
      <div className="mt-4 flex flex-col items-center gap-5 sm:flex-row sm:items-center">
        {/* Half-circle gauge */}
        <div className="relative h-28 w-44 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              innerRadius="78%"
              outerRadius="100%"
              barSize={12}
              data={RISK_DATA}
              startAngle={180}
              endAngle={0}
              cy="100%"
            >
              <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
              <RadialBar
                background={{ fill: "#eef1f5" }}
                dataKey="value"
                cornerRadius={8}
                isAnimationActive={false}
              />
            </RadialBarChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-center">
            <span className={`text-3xl font-extrabold tabular-nums ${b.text}`}>{RISK}</span>
            <span className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
              risk score
            </span>
          </div>
        </div>

        {/* Advisory */}
        <div className="min-w-0 flex-1">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${b.soft} ${b.text}`}
          >
            <AlertTriangle className="h-3.5 w-3.5" /> {b.label}
          </span>
          <p className="mt-2 text-sm leading-relaxed text-foreground">
            Maya's training load is well-balanced this week. Recovery is on track — clear to
            keep the current plan. The model will flag early if intensity spikes.
          </p>
        </div>
      </div>

      {/* Signals */}
      <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
        {SIGNALS.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className="flex items-center gap-2.5 rounded-xl border border-border bg-card p-3"
            >
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-emerald-50 text-emerald-600">
                <Icon className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <div className="text-[11px] text-muted-foreground">{s.label}</div>
                <div className="text-sm font-bold text-foreground">{s.value}</div>
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-5 border-t border-border pt-4 text-[11px] text-muted-foreground">
        Aster AI screening — not medical advice. Always consult a trainer for injury concerns.
      </p>
    </AiCard>
  );
}
