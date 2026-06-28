/*
 * AI travel / leave-by ETA for the next venue.
 *
 * COSMETIC / MOCK: a cosmetic traffic curve (recharts, animation OFF) plus a
 * computed "leave by" time = tip-off − (drive + 45m pregame buffer). The drive
 * minutes are seeded from the event id for stability. No maps/traffic API call.
 */
import { useMemo } from "react";
import { Route, Navigation, AlertTriangle, Clock } from "lucide-react";
import { AreaChart, Area, XAxis, ResponsiveContainer, Tooltip } from "recharts";
import { type ScheduleEvent, fmtTime } from "@/lib/schedule";
import { GAMEDAY_WEATHER } from "@/lib/content";
import { AICard } from "./aiKit";

function seeded(id: string, salt: number, min: number, max: number): number {
  let h = salt;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return min + (h % (max - min + 1));
}

function timeStr(ms: number): string {
  return new Date(ms).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "America/New_York",
  });
}

export function AITravelETA({ next }: { next: ScheduleEvent | null }) {
  const model = useMemo(() => {
    if (!next) return null;
    const id = next.event_id;
    const drive = seeded(id, 17, 12, 28); // base drive minutes
    const buffer = 45; // pregame buffer
    const start = Date.parse(next.start_at);
    const leaveBy = start - (drive + buffer) * 60_000;
    const congested = seeded(id, 23, 0, 2) === 0; // ~1/3 cosmetic congestion flag
    const extra = congested ? seeded(id, 31, 6, 12) : 0;

    // cosmetic 6-point traffic curve (mins of delay over the drive window)
    const base = [2, 4, 7, 9, 6, 3];
    const curve = base.map((v, i) => ({
      t: `${i * 10}m`,
      delay: v + (congested ? Math.round(extra * (i / 5)) : 0),
    }));

    return { drive: drive + extra, leaveBy, congested, extra, curve, venue: next.location_name ?? GAMEDAY_WEATHER.venue };
  }, [next]);

  if (!next || !model) return null;

  return (
    <AICard icon={Route} title="Travel & leave-by" caption={model.venue}>
      <div className="flex flex-wrap items-end gap-x-5 gap-y-2">
        <div>
          <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-gold-text">
            <Clock className="h-3 w-3" aria-hidden="true" /> Leave by
          </div>
          <div className="text-3xl font-extrabold tabular-nums leading-none text-foreground">
            {timeStr(model.leaveBy)}
          </div>
        </div>
        <div className="pb-0.5">
          <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
            <Navigation className="h-3 w-3" aria-hidden="true" /> Drive
          </div>
          <div className="text-sm font-semibold text-foreground">~{model.drive} min · tip-off {fmtTime(next.start_at)}</div>
        </div>
      </div>

      {model.congested && (
        <div className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-amber-50 px-2.5 py-1.5 text-xs font-semibold text-amber-700 ring-1 ring-amber-100">
          <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />
          Heavier traffic predicted — +{model.extra} min. Leave a little earlier.
        </div>
      )}

      <div className="mt-3 h-20 w-full" aria-hidden="true">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={model.curve} margin={{ top: 4, right: 4, bottom: 0, left: 4 }}>
            <defs>
              <linearGradient id="ai-traffic" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#c9952e" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#c9952e" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="t" tick={{ fontSize: 9, fill: "#8896AB" }} axisLine={false} tickLine={false} />
            <Tooltip
              cursor={false}
              contentStyle={{ fontSize: 11, borderRadius: 8, border: "1px solid var(--border)" }}
              formatter={(v: number) => [`${v} min delay`, ""]}
            />
            <Area
              type="monotone"
              dataKey="delay"
              stroke="#c9952e"
              strokeWidth={2}
              fill="url(#ai-traffic)"
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <p className="text-[11px] leading-relaxed text-muted-foreground">
        Predicted drive time with live-traffic modeling. Preview — not a live route.
      </p>
    </AICard>
  );
}
