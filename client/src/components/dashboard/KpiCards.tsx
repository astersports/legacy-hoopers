/*
 * KpiCards — the four headline KPI cards that sit inside the navy command band.
 * Numbers count up via AnimatedCounter for a live-metric feel.
 */
import { Flame, Target, CalendarCheck, TrendingUp, type LucideIcon } from "lucide-react";
import AnimatedCounter from "@/components/AnimatedCounter";

type Kpi = {
  icon: LucideIcon;
  label: string;
  value: number;
  suffix?: string;
  sub: string;
  tone: string;
};

const KPIS: Kpi[] = [
  { icon: CalendarCheck, label: "Sessions this month", value: 12, sub: "+3 vs last", tone: "bg-blue-50 text-blue-600" },
  { icon: Target, label: "Attendance", value: 94, suffix: "%", sub: "Top 10% of team", tone: "bg-emerald-50 text-emerald-600" },
  { icon: TrendingUp, label: "Shooting %", value: 58, suffix: "%", sub: "+20 since W1", tone: "bg-gold-soft text-gold-text" },
  { icon: Flame, label: "Streak", value: 7, sub: "weeks on track", tone: "bg-primary/10 text-primary" },
];

export function KpiCards() {
  return (
    <section className="hero-navy text-white">
      <div className="container pb-12">
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {KPIS.map((k) => (
            <div
              key={k.label}
              className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur transition-transform duration-200 hover:-translate-y-0.5"
            >
              <span className={`grid h-9 w-9 place-items-center rounded-lg ${k.tone}`}>
                <k.icon className="h-5 w-5" />
              </span>
              <div className="mt-3 text-3xl font-extrabold tabular-nums text-white">
                <AnimatedCounter end={k.value} suffix={k.suffix} />
              </div>
              <div className="text-xs text-white/60">{k.label}</div>
              <div className="mt-1 text-[11px] font-semibold text-gold-light">{k.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
