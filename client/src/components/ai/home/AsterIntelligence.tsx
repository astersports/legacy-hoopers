/*
 * AsterIntelligence — showcase grid of the AI platform pillars. Cosmetic; each
 * card describes a forthcoming AI capability with a premium gold-accented
 * treatment. No data fetching.
 */
import { Brain, ScanLine, TrendingUp, CalendarClock, type LucideIcon } from "lucide-react";

type Pillar = {
  icon: LucideIcon;
  title: string;
  blurb: string;
  tag: string;
};

const PILLARS: Pillar[] = [
  {
    icon: Brain,
    title: "Smart program matching",
    blurb: "AI weighs age, skill and goals to recommend the best-fit camp, clinic or team — no guesswork.",
    tag: "Matching",
  },
  {
    icon: TrendingUp,
    title: "Predictive development",
    blurb: "Models each athlete's trajectory from attendance and reps, flagging the next skill to unlock.",
    tag: "Forecasting",
  },
  {
    icon: ScanLine,
    title: "Computer-vision film",
    blurb: "Auto-tags every clip — shots, finishes, defense — so your film room is searchable in seconds.",
    tag: "Vision",
  },
  {
    icon: CalendarClock,
    title: "Auto-scheduling",
    blurb: "Balances gyms, coaches and travel to build conflict-free schedules the moment a season opens.",
    tag: "Planning",
  },
];

export function AsterIntelligence() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {PILLARS.map((p) => {
        const Icon = p.icon;
        return (
          <article
            key={p.title}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-gold/40 hover:shadow-lg"
          >
            <span
              className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gold/10 blur-2xl transition-opacity group-hover:opacity-100 motion-safe:opacity-60"
              aria-hidden
            />
            <span className="relative grid h-12 w-12 place-items-center rounded-2xl bg-gold-soft text-gold-text ring-1 ring-gold/20">
              <Icon className="h-6 w-6" />
            </span>
            <div className="relative mt-4 flex items-center gap-2">
              <h3 className="font-bold text-foreground">{p.title}</h3>
            </div>
            <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">{p.blurb}</p>
            <span className="relative mt-4 inline-block rounded-full bg-secondary px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              {p.tag}
            </span>
          </article>
        );
      })}
    </div>
  );
}
