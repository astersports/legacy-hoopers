/*
 * "Next game" countdown card — a cosmetic surface above the schedule body.
 * Reads the first upcoming event's start_at (passed in) and ticks a live
 * days/hrs/min readout via setInterval. Hides gracefully when there's no
 * upcoming event. Presentation only — no data fetching.
 */
import { useEffect, useState } from "react";
import { CalendarClock, MapPin } from "lucide-react";
import { type ScheduleEvent, fmtDateHeader, fmtTime } from "@/lib/schedule";

function parts(diffMs: number) {
  const total = Math.max(0, Math.floor(diffMs / 1000));
  const days = Math.floor(total / 86400);
  const hrs = Math.floor((total % 86400) / 3600);
  const mins = Math.floor((total % 3600) / 60);
  return { days, hrs, mins };
}

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="font-mono text-2xl font-extrabold tabular-nums text-foreground sm:text-3xl">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
    </div>
  );
}

export function CountdownCard({ next, now }: { next: ScheduleEvent | null; now: number }) {
  const [tick, setTick] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setTick(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!next) return null;
  const start = Date.parse(next.start_at);
  const diff = start - tick;
  if (diff <= 0) return null; // tipped off — let the live spine take over

  const { days, hrs, mins } = parts(diff);
  const title = next.kind === "practice"
    ? (next.title || "Practice")
    : `${next.team_name}${next.opponent ? ` vs. ${next.opponent}` : ""}`;

  return (
    <div className="mb-5 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-gold-text">
            <CalendarClock className="h-3.5 w-3.5" /> Next game
          </div>
          <div className="mt-1.5 truncate text-lg font-extrabold tracking-tight text-foreground">{title}</div>
          <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-muted-foreground">
            <span>{fmtDateHeader(next.start_at, now)} · {fmtTime(next.start_at)}</span>
            {next.location_name && (
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-3 w-3" /> {next.location_name}
              </span>
            )}
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-3 rounded-xl border border-border bg-secondary/50 px-4 py-3 transition-colors">
          <Unit value={days} label="days" />
          <span className="text-2xl font-light text-border">:</span>
          <Unit value={hrs} label="hrs" />
          <span className="text-2xl font-light text-border">:</span>
          <Unit value={mins} label="min" />
        </div>
      </div>
    </div>
  );
}
