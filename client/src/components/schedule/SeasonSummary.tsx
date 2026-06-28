/*
 * Season summary strip — at-a-glance counts derived purely from the
 * already-computed live/upcoming/recent arrays. No new queries; cosmetic.
 */
import { Activity, CalendarDays, Flame } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { type ScheduleEvent, dateKey } from "@/lib/schedule";

function thisWeekCount(upcoming: ScheduleEvent[], now: number): number {
  const today = new Date(now);
  const weekEnd = now + 7 * 24 * 60 * 60 * 1000;
  const todayKey = dateKey(today.toISOString());
  return upcoming.filter((e) => {
    const t = Date.parse(e.start_at);
    return dateKey(e.start_at) >= todayKey && t <= weekEnd;
  }).length;
}

function Stat({ icon: Icon, value, label }: { icon: LucideIcon; value: number; label: string }) {
  return (
    <div className="flex flex-1 items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 shadow-sm transition-colors hover:bg-secondary/40">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gold-soft text-gold-text">
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0">
        <div className="text-xl font-extrabold tabular-nums leading-none text-foreground">{value}</div>
        <div className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{label}</div>
      </div>
    </div>
  );
}

export function SeasonSummary({
  live, upcoming, recent, now,
}: { live: ScheduleEvent[]; upcoming: ScheduleEvent[]; recent: ScheduleEvent[]; now: number }) {
  if (!live.length && !upcoming.length && !recent.length) return null;
  const games = live.length + upcoming.length + recent.length;
  return (
    <div className="mb-5 flex flex-col gap-2 sm:flex-row">
      <Stat icon={Activity} value={games} label="Games on board" />
      <Stat icon={CalendarDays} value={upcoming.length} label="Upcoming" />
      <Stat icon={Flame} value={thisWeekCount(upcoming, now)} label="This week" />
    </div>
  );
}
