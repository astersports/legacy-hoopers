import { MapPin } from "lucide-react";
import { type ScheduleEvent } from "@/lib/schedule";

export function LiveHero({ live, updatedAt }: { live: ScheduleEvent[]; updatedAt: number }) {
  if (!live.length) return null;
  const ago = updatedAt ? Math.max(0, Math.round((Date.now() - updatedAt) / 1000)) : 0;
  return (
    <section className="mb-5">
      <div className="mb-2 flex items-center gap-2">
        <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-500" />
        <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-emerald-600">Happening now</span>
        <span className="ml-auto font-mono text-[10px] text-muted-foreground">
          updated {ago < 5 ? "just now" : `${ago}s ago`}
        </span>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {live.map((e) => (
          <div key={e.event_id} className="rounded-xl border border-border border-l-4 border-l-emerald-500 bg-card p-4 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="text-sm font-bold text-foreground">
                  {e.team_name} <span className="font-normal text-muted-foreground">vs.</span> {e.opponent}
                </div>
                <div className="text-[11px] text-muted-foreground">{e.tournament_name || "Live"}</div>
              </div>
              {e.our_score != null && (
                <div className="shrink-0 font-mono text-2xl font-bold tabular-nums text-foreground">
                  {e.our_score}<span className="mx-1 text-base text-muted-foreground">–</span>{e.opponent_score}
                </div>
              )}
            </div>
            {e.location_name && (
              <div className="mt-2 flex items-center gap-1.5 border-t border-border pt-2 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3 text-primary" /> {e.location_name}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
