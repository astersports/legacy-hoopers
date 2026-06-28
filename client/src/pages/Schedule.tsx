import { useMemo, useState, type ReactNode } from "react";
import { CalendarPlus, Share2, MapPin, CloudSun, Sun, Cloud, CloudRain, type LucideIcon } from "lucide-react";
import { useSchedule } from "@/hooks/useSchedule";
import {
  applyFilters, partition, groupByTeam, groupByAge, groupByDate, nextEvent,
  type Slicer, type TypeFilter, type GenderFilter,
} from "@/lib/scheduleView";
import { fmtDateHeader, countdown } from "@/lib/schedule";
import { downloadSchedule, shareSchedule } from "@/lib/ics";
import { GAMEDAY_WEATHER } from "@/lib/content";
import { LiveHero } from "@/components/schedule/LiveHero";
import { GroupAccordion } from "@/components/schedule/GroupAccordion";
import { RecentResults } from "@/components/schedule/RecentResults";
import { EventRow } from "@/components/schedule/EventRow";
import { CountdownCard } from "@/components/schedule/CountdownCard";
import { SeasonSummary } from "@/components/schedule/SeasonSummary";
import { TypeLegend } from "@/components/schedule/TypeLegend";
import { SubscribeCTA } from "@/components/schedule/SubscribeCTA";
import { EmptyState } from "@/components/schedule/EmptyState";
import { ScheduleSkeleton } from "@/components/schedule/ScheduleSkeleton";
import { AIGameDayBrief } from "@/components/ai/schedule/AIGameDayBrief";
import { AIAttendancePredictor } from "@/components/ai/schedule/AIAttendancePredictor";
import { AITravelETA } from "@/components/ai/schedule/AITravelETA";
import { AIScheduleAsk } from "@/components/ai/schedule/AIScheduleAsk";
import { Sparkles, ChevronDown } from "lucide-react";
import { AgentScanConsole } from "@/components/agent/AgentScanConsole";
import { SCHEDULE_SCAN } from "@/lib/agentScans";

const SLICERS: { key: Slicer; label: string }[] = [
  { key: "team", label: "By Team" }, { key: "age", label: "Age / Grade" }, { key: "date", label: "By Date" },
];
const TYPES: { key: TypeFilter; label: string }[] = [
  { key: "all", label: "All types" }, { key: "game", label: "Games" }, { key: "practice", label: "Practices" }, { key: "tournament", label: "Tournaments" },
];
const GENDERS: { key: GenderFilter; label: string }[] = [
  { key: "all", label: "All" }, { key: "male", label: "Boys" }, { key: "female", label: "Girls" },
];

const WX_ICONS: Record<string, LucideIcon> = { sun: Sun, cloud: Cloud, rain: CloudRain, partly: CloudSun };

function Chip({ on, children, onClick }: { on: boolean; children: ReactNode; onClick: () => void }) {
  return (
    <button onClick={onClick}
      className={`rounded-full border px-3 py-1 text-xs font-semibold transition-all duration-150 ${
        on
          ? "border-gold bg-gold-soft text-gold-text shadow-sm"
          : "border-border bg-card text-muted-foreground hover:border-gold/40 hover:bg-secondary"}`}>
      {children}
    </button>
  );
}

/** Compact cosmetic game-day weather chip for the navy hero (GAMEDAY_WEATHER). */
function HeroWeatherChip() {
  const w = GAMEDAY_WEATHER;
  const Icon = WX_ICONS[w.now.icon] ?? CloudSun;
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/90 ring-1 ring-white/10">
        <Icon className="h-3.5 w-3.5 text-gold-light" />
        {w.now.temp}° {w.now.label}
      </span>
      <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/90 ring-1 ring-white/10">
        <MapPin className="h-3.5 w-3.5 text-gold-light" />
        {w.venue}
      </span>
    </div>
  );
}

export default function Schedule() {
  const { events, loading, error, now, updatedAt } = useSchedule();
  const [slicer, setSlicer] = useState<Slicer>("team");
  const [type, setType] = useState<TypeFilter>("all");
  const [gender, setGender] = useState<GenderFilter>("all");
  const [aiOpen, setAiOpen] = useState(true);

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
  const isEmpty = ready && !live.length && !upcoming.length && !recent.length;

  return (
    <div>
      <section className="hero-navy text-white">
        <div className="container py-10">
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold-light">Aster Sports AAU · Travel + League</div>
          <h1 className="mt-1 text-4xl font-extrabold tracking-tight">Schedule</h1>
          <div className="mt-4">
            <HeroWeatherChip />
          </div>
          <div className="mt-4 flex gap-2">
            <button onClick={() => downloadSchedule(upcoming)} className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-xs font-semibold text-white/90 transition-colors hover:bg-white/15">
              <CalendarPlus className="h-3.5 w-3.5" /> Add to calendar
            </button>
            <button onClick={shareSchedule} className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-xs font-semibold text-white/90 transition-colors hover:bg-white/15">
              <Share2 className="h-3.5 w-3.5" /> Share
            </button>
          </div>
          <AgentScanConsole scan={SCHEDULE_SCAN} className="mt-6 max-w-2xl" />
        </div>
      </section>

      <div className="container py-6">
        <LiveHero live={live} updatedAt={updatedAt} />

        {/* Next-game countdown + season summary (cosmetic, from computed arrays) */}
        {ready && !isEmpty && (
          <>
            <CountdownCard next={next} now={now} />
            <SeasonSummary live={live} upcoming={upcoming} recent={recent} now={now} />

            {/* ── AI Insights band (cosmetic / mock — NO live API calls). ──
                Showcases Aster's next-gen AI surfaces alongside the live
                schedule. Each card is clearly labeled "AI" and wired later. */}
            {next && (
              <section className="mb-5" aria-label="AI insights for your next game">
                <div className="mb-2 flex items-center justify-between">
                  <h2 className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-gold-text">
                    <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> Aster AI · Game-day insights
                  </h2>
                  <button
                    type="button"
                    onClick={() => setAiOpen((o) => !o)}
                    aria-expanded={aiOpen}
                    className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-2.5 py-1 text-xs font-semibold text-muted-foreground transition-colors hover:bg-secondary"
                  >
                    {aiOpen ? "Hide" : "Show"}
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform ${aiOpen ? "rotate-180" : ""}`}
                      aria-hidden="true"
                    />
                  </button>
                </div>
                {aiOpen && (
                  <div className="space-y-3">
                    <AIGameDayBrief next={next} now={now} />
                    <div className="grid gap-3 sm:grid-cols-2">
                      <AIAttendancePredictor next={next} />
                      <AITravelETA next={next} />
                    </div>
                  </div>
                )}
              </section>
            )}
          </>
        )}

        {/* slicer + filters */}
        <div className="sticky top-16 z-10 -mx-1 bg-background/90 px-1 pb-3 pt-1 backdrop-blur">
          <div className="flex gap-1 rounded-xl border border-border bg-card p-1">
            {SLICERS.map((s) => (
              <button key={s.key} onClick={() => setSlicer(s.key)}
                className={`flex-1 rounded-lg px-2 py-2 text-xs font-semibold transition-all duration-150 ${
                  slicer === s.key ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:bg-secondary"}`}>
                {s.label}
              </button>
            ))}
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            {TYPES.map((t) => <Chip key={t.key} on={type === t.key} onClick={() => setType(t.key)}>{t.label}</Chip>)}
            <span className="mx-1 h-4 w-px bg-border" />
            {GENDERS.map((g) => <Chip key={g.key} on={gender === g.key} onClick={() => setGender(g.key)}>{g.label}</Chip>)}
            {ready && (
              <span className="ml-auto font-mono text-[11px] font-semibold text-muted-foreground">
                {upcoming.length} upcoming
              </span>
            )}
          </div>
          {/* event-type color legend */}
          <div className="mt-2">
            <TypeLegend />
          </div>
        </div>

        {/* AI natural-language assistant (cosmetic / mock — answers composed
            locally from already-computed arrays, no model call). */}
        {ready && !isEmpty && (
          <div className="mt-4">
            <AIScheduleAsk upcoming={upcoming} recent={recent} next={next} now={now} />
          </div>
        )}

        {loading && <ScheduleSkeleton />}
        {error && <div className="mt-4 rounded-xl border border-border bg-card p-8 text-center text-muted-foreground">Couldn't reach the schedule. Try again in a moment.</div>}
        {isEmpty && <EmptyState />}

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
                    <div key={e.event_id} className="rounded-xl border border-border bg-card px-3 shadow-sm mb-2 transition-shadow hover:shadow-md"><EventRow e={e} now={now} showTeam /></div>
                  ))}
                </div>
              ))
            ) : (
              groups.map((g, i) => <GroupAccordion key={g.key} group={g} now={now} defaultOpen={i === 0} />)
            )}
          </div>
        )}

        {/* Subscribe / Add-to-calendar CTA (reuses existing handlers) */}
        {ready && !isEmpty && (
          <SubscribeCTA onAdd={() => downloadSchedule(upcoming)} onShare={shareSchedule} count={upcoming.length} />
        )}

        {ready && <RecentResults recent={recent} now={now} />}
      </div>
    </div>
  );
}
