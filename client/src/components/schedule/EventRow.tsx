import { MapPin } from "lucide-react";
import { type ScheduleEvent, timeState, fmtTime, fmtDayNum, fmtMonth, countdown, dateKey } from "@/lib/schedule";

function mapHref(e: ScheduleEvent): string | null {
  if (e.location_maps_url) return e.location_maps_url;
  if (e.location_lat != null && e.location_lon != null)
    return `https://www.google.com/maps/search/?api=1&query=${e.location_lat},${e.location_lon}`;
  const q = e.location_address || e.location_name;
  return q ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}` : null;
}

const BADGE: Record<string, string> = {
  game: "bg-primary/10 text-primary",
  tournament: "bg-amber-100 text-amber-700",
  practice: "bg-slate-100 text-slate-500",
};

export function EventRow({ e, now, showTeam = false }: { e: ScheduleEvent; now: number; showTeam?: boolean }) {
  const st = timeState(e, now);
  const cancelled = e.status === "cancelled";
  const done = st === "completed";
  const live = st === "happening_now" && !cancelled;
  const venue = e.location_name;
  const href = mapHref(e);
  const isToday = dateKey(e.start_at) === dateKey(new Date(now).toISOString());
  const title = e.kind === "practice"
    ? (e.title || "Practice")
    : `${e.team_name}${e.opponent ? ` vs. ${e.opponent}` : ""}`;

  return (
    <div className={`flex gap-3 py-3 ${done || cancelled ? "opacity-60" : ""}`}>
      <span className="w-1 shrink-0 rounded-full" style={{ backgroundColor: e.team_color }} />
      <div className="w-12 shrink-0 text-center">
        <div className="text-lg font-extrabold leading-none text-foreground">{fmtDayNum(e.start_at)}</div>
        <div className="text-[9px] font-semibold uppercase tracking-wide text-muted-foreground">{fmtMonth(e.start_at)}</div>
        <div className="mt-0.5 font-mono text-[10px] text-muted-foreground">{fmtTime(e.start_at)}</div>
      </div>
      <div className="min-w-0 flex-1">
        <div className={`text-sm font-semibold text-foreground ${cancelled ? "line-through" : ""}`}>{title}</div>
        <div className="mt-1 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
          <span className={`rounded px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide ${BADGE[e.kind] ?? BADGE.game}`}>
            {e.kind === "practice" ? "Practice" : e.tournament_name ? "Tourn" : "Game"}
          </span>
          {showTeam && (
            <span className="inline-flex items-center gap-1">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: e.team_color }} />
              {e.team_name}
            </span>
          )}
          {venue && (
            href ? (
              <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-primary hover:underline">
                <MapPin className="h-3 w-3" /> {venue}
              </a>
            ) : (
              <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" /> {venue}</span>
            )
          )}
        </div>
      </div>
      <div className="shrink-0 self-start text-right font-mono text-xs font-bold">
        {cancelled ? (
          <span className="rounded bg-rose-50 px-1.5 py-0.5 text-rose-600">Cancelled</span>
        ) : done && e.result ? (
          <span className={e.result === "W" ? "text-emerald-600" : e.result === "L" ? "text-rose-600" : "text-slate-500"}>
            {e.result} {e.our_score}–{e.opponent_score}
          </span>
        ) : live ? (
          <span className="inline-flex items-center gap-1 text-emerald-600"><span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />Live</span>
        ) : isToday ? (
          <span className="text-amber-600">Today</span>
        ) : (
          <span className="text-primary">{countdown(e.start_at, now)}</span>
        )}
      </div>
    </div>
  );
}
