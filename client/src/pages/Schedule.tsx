import { useMemo, useState, type ReactNode } from "react";
import { CalendarPlus, Share2 } from "lucide-react";
import { useSchedule } from "@/hooks/useSchedule";
import {
  applyFilters, partition, groupByTeam, groupByAge, groupByDate, nextEvent,
  type Slicer, type TypeFilter, type GenderFilter,
} from "@/lib/scheduleView";
import { fmtDateHeader, fmtTime, countdown, dateKey } from "@/lib/schedule";
import { downloadSchedule, shareSchedule } from "@/lib/ics";
import { LiveHero } from "@/components/schedule/LiveHero";
import { GroupAccordion } from "@/components/schedule/GroupAccordion";
import { RecentResults } from "@/components/schedule/RecentResults";
import { EventRow } from "@/components/schedule/EventRow";

const SLICERS: { key: Slicer; label: string }[] = [
  { key: "team", label: "By Team" }, { key: "age", label: "Age / Grade" }, { key: "date", label: "By Date" },
];
const TYPES: { key: TypeFilter; label: string }[] = [
  { key: "all", label: "All types" }, { key: "game", label: "Games" }, { key: "practice", label: "Practices" }, { key: "tournament", label: "Tournaments" },
];
const GENDERS: { key: GenderFilter; label: string }[] = [
  { key: "all", label: "All" }, { key: "male", label: "Boys" }, { key: "female", label: "Girls" },
];

function Chip({ on, children, onClick }: { on: boolean; children: ReactNode; onClick: () => void }) {
  return (
    <button onClick={onClick}
      className={`rounded-full border px-3 py-1 text-xs font-semibold transition-colors ${
        on ? "border-primary bg-primary/10 text-primary" : "border-border bg-card text-muted-foreground hover:bg-secondary"}`}>
      {children}
    </button>
  );
}

export default function Schedule() {
  const { events, loading, error, now, updatedAt } = useSchedule();
  const [slicer, setSlicer] = useState<Slicer>("team");
  const [type, setType] = useState<TypeFilter>("all");
  const [gender, setGender] = useState<GenderFilter>("all");

  const { live, upcoming, recent, groups, next, dateGroups } = useMemo(() => {
    const filtered = applyFilters(events, type, gender);
    const p = partition(filtered, now);
    return {
      live: p.live, upcoming: p.upcoming, recent: p.recent, next: nextEvent(p.upcoming),
      groups: slicer === "team" ? groupByTeam(p.upcoming, now) : slicer === "age" ? groupByAge(p.upcoming, now) : [],
      dateGroups: slicer === "date" ? groupByDate(p.upcoming) : [],
    };
  }, [events, type, gender, slicer, now]);

  const ready = !loading && !error;

  return (
    <div>
      <section className="bg-gradient-to-br from-[#1d2430] to-[#27406e] text-white">
        <div className="container py-8">
          <div className="font-mono text-[11px] uppercase tracking-wider text-white/60">Legacy Hoopers · AAU + League</div>
          <h1 className="mt-1 text-4xl font-extrabold tracking-tight">Schedule</h1>
          <div className="mt-4 flex gap-2">
            <button onClick={() => downloadSchedule(upcoming)} className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-xs font-semibold text-white/90 hover:bg-white/15">
              <CalendarPlus className="h-3.5 w-3.5" /> Add to calendar
            </button>
            <button onClick={shareSchedule} className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-xs font-semibold text-white/90 hover:bg-white/15">
              <Share2 className="h-3.5 w-3.5" /> Share
            </button>
          </div>
        </div>
      </section>

      <div className="container py-6">
        <LiveHero live={live} updatedAt={updatedAt} />

        {/* slicer + filters */}
        <div className="sticky top-16 z-10 -mx-1 bg-background/90 px-1 pb-3 pt-1 backdrop-blur">
          <div className="flex gap-1 rounded-xl border border-border bg-card p-1">
            {SLICERS.map((s) => (
              <button key={s.key} onClick={() => setSlicer(s.key)}
                className={`flex-1 rounded-lg px-2 py-2 text-xs font-semibold transition-colors ${
                  slicer === s.key ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:bg-secondary"}`}>
                {s.label}
              </button>
            ))}
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            {TYPES.map((t) => <Chip key={t.key} on={type === t.key} onClick={() => setType(t.key)}>{t.label}</Chip>)}
            <span className="mx-1 h-4 w-px bg-border" />
            {GENDERS.map((g) => <Chip key={g.key} on={gender === g.key} onClick={() => setGender(g.key)}>{g.label}</Chip>)}
          </div>
        </div>

        {loading && (
          <div className="mt-4 space-y-3">{[0, 1, 2].map((i) => <div key={i} className="h-20 animate-pulse rounded-xl border border-border bg-secondary/60" />)}</div>
        )}
        {error && <div className="mt-4 rounded-xl border border-border bg-card p-8 text-center text-muted-foreground">Couldn't reach the schedule. Try again in a moment.</div>}
        {ready && !live.length && !upcoming.length && !recent.length && (
          <div className="mt-4 rounded-xl border border-border bg-card p-8 text-center text-muted-foreground">No games on the board yet — Coach Kenny's cooking something up.</div>
        )}

        {ready && upcoming.length > 0 && (
          <div className="mt-3">
            {/* NOW slot */}
            {next && slicer !== "date" && (
              <div className="relative mb-5 rounded-xl border border-primary bg-primary/5 px-2">
                <span className="absolute -top-2.5 left-4 rounded bg-primary px-2 py-0.5 font-mono text-[10px] font-bold text-primary-foreground">
                  NEXT UP · {countdown(next.start_at, now)}
                </span>
                <EventRow e={next} now={now} showTeam />
              </div>
            )}

            {/* slicer body */}
            {slicer === "date" ? (
              dateGroups.map((dg) => (
                <div key={dg.key}>
                  <div className="mb-1 mt-4 border-b-2 border-border pb-1 text-base font-bold tracking-tight text-foreground">
                    {fmtDateHeader(dg.events[0].start_at, now)}
                  </div>
                  {dg.events.map((e) => (
                    <div key={e.event_id} className="rounded-xl border border-border bg-card px-3 shadow-sm mb-2"><EventRow e={e} now={now} showTeam /></div>
                  ))}
                </div>
              ))
            ) : (
              groups.map((g, i) => <GroupAccordion key={g.key} group={g} now={now} defaultOpen={i === 0} />)
            )}
          </div>
        )}

        {ready && <RecentResults recent={recent} now={now} />}
      </div>
    </div>
  );
}
