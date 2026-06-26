import { useState } from "react";
import { ChevronDown, Repeat } from "lucide-react";
import { EventRow } from "./EventRow";
import type { Group, TournamentGroup } from "@/lib/scheduleView";
import type { ScheduleEvent } from "@/lib/schedule";

function TournamentBlock({ t, now }: { t: TournamentGroup; now: number }) {
  const [open, setOpen] = useState(false);
  const first = t.games[0], last = t.games[t.games.length - 1];
  const span = new Date(first.start_at).toLocaleDateString("en-US", { weekday: "short", timeZone: "America/New_York" });
  const spanEnd = new Date(last.start_at).toLocaleDateString("en-US", { weekday: "short", timeZone: "America/New_York" });
  return (
    <div className="my-2 rounded-lg border border-dashed border-border bg-secondary/40">
      <button onClick={() => setOpen((o) => !o)} className="flex w-full items-center gap-2 px-3 py-2.5 text-left" aria-expanded={open}>
        <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-amber-700">Tournament</span>
        <div className="min-w-0">
          <div className="truncate text-[13px] font-bold text-foreground">{t.name}</div>
          <div className="text-[11px] text-muted-foreground">
            {span === spanEnd ? span : `${span}–${spanEnd}`} · {t.games.length} games{t.record ? ` · ${t.record}` : ""}
          </div>
        </div>
        {t.hasLive && <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" title="live" />}
        <ChevronDown className={`ml-auto h-4 w-4 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="border-t border-border/60 px-3 pb-1">
          {t.games.map((g) => <EventRow key={g.event_id} e={g} now={now} />)}
        </div>
      )}
    </div>
  );
}

export function GroupAccordion({ group, now, defaultOpen }: { group: Group; now: number; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="mb-3 overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <button onClick={() => setOpen((o) => !o)} className="flex w-full items-center gap-3 px-4 py-3 text-left" aria-expanded={open}>
        <span className="h-9 w-1.5 shrink-0 self-stretch rounded-full" style={{ backgroundColor: group.color }} />
        <div className="min-w-0">
          <div className="text-lg font-bold tracking-tight text-foreground">{group.label}</div>
          <div className="text-xs text-muted-foreground">{group.sublabel}</div>
        </div>
        <ChevronDown className={`ml-auto h-5 w-5 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="border-t border-border px-3 pb-2">
          {group.tournaments.map((t) => <TournamentBlock key={t.name} t={t} now={now} />)}
          {group.standalone.map((e: ScheduleEvent) => (
            <div key={e.event_id} className="border-b border-border/60 last:border-0">
              <EventRow e={e} now={now} />
            </div>
          ))}
          {group.practices && (
            <div className="flex items-center gap-3 py-3">
              <span className="grid w-12 shrink-0 place-items-center text-muted-foreground"><Repeat className="h-4 w-4" /></span>
              <div>
                <div className="text-[13px] font-semibold text-foreground">
                  Practices <span className="ml-1 rounded bg-slate-100 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-slate-500">Recurring</span>
                </div>
                <div className="font-mono text-[11px] text-muted-foreground">
                  {group.practices.pattern}{group.practices.location ? ` · ${group.practices.location}` : ""}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
