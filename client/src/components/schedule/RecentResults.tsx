import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Link } from "wouter";
import { EventRow } from "./EventRow";
import { recentRecord } from "@/lib/scheduleView";
import type { ScheduleEvent } from "@/lib/schedule";

export function RecentResults({ recent, now }: { recent: ScheduleEvent[]; now: number }) {
  const [open, setOpen] = useState(false);
  if (!recent.length) return null;
  return (
    <div className="mt-2 overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <button onClick={() => setOpen((o) => !o)} className="flex w-full items-center gap-3 px-4 py-3 text-left" aria-expanded={open}>
        <div>
          <div className="text-base font-bold tracking-tight text-foreground">Recent results</div>
          <div className="text-xs text-muted-foreground">Last 14 days · {recentRecord(recent)}</div>
        </div>
        <Link href="/records" onClick={(ev) => ev.stopPropagation()} className="ml-auto text-xs font-semibold text-primary hover:underline">
          Full records →
        </Link>
        <ChevronDown className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="border-t border-border px-3 pb-2">
          {recent.map((e) => (
            <div key={e.event_id} className="border-b border-border/60 last:border-0">
              <EventRow e={e} now={now} showTeam />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
