/*
 * Records — live team records for Aster Sports, read from the Aster Sports
 * platform's public API (get_public_team_records). Navy hero on top, everything
 * else light. Presentation is enhanced here; the live data (useProgramRecords /
 * programTotals) is passed straight through and never mutated.
 */
import { useMemo, useState } from "react";
import { Trophy, Sparkles } from "lucide-react";
import { useProgramRecords } from "@/hooks/useProgramRecords";
import { programTotals } from "@/lib/aster";
import { StatTile, Pill } from "@/components/kit";
import { Logo } from "@/components/Logo";
import { TeamCard } from "@/components/records/TeamCard";
import { RecordsControls } from "@/components/records/RecordsControls";
import { HighlightCallout } from "@/components/records/HighlightCallout";
import { WinRateChart } from "@/components/records/WinRateChart";
import { sortRecords, topTeam, hottestTeam, type SortKey } from "@/components/records/recordsUtils";

export default function Records() {
  const { records, loading, error } = useProgramRecords();
  const totals = programTotals(records);
  const [sort, setSort] = useState<SortKey>("pct");

  const ready = !loading && !error && records.length > 0;

  // A SORTED COPY — the source `records` array is never mutated.
  const sorted = useMemo(() => sortRecords(records, sort), [records, sort]);
  const top = useMemo(() => topTeam(records), [records]);
  const hottest = useMemo(() => hottestTeam(records), [records]);

  return (
    <div>
      {/* ── Navy hero with program-wide totals ── */}
      <section className="hero-navy relative overflow-hidden text-white">
        <div className="absolute -right-16 -top-16 h-72 w-72 rounded-full bg-gold/10 blur-3xl" aria-hidden />
        <div className="container relative py-12 sm:py-16">
          <div className="flex flex-wrap items-center gap-3">
            <Pill icon={Trophy} onDark>Program records</Pill>
            <Pill icon={Sparkles} onDark>Live from the platform</Pill>
          </div>
          <h1 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-5xl">Team Records</h1>
          <p className="mt-3 max-w-2xl text-base text-white/70">
            Every published game across the program, updated straight from the live Aster Sports platform.
          </p>

          {ready && (
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <StatTile value={totals.wins} label="Wins" onDark />
              <StatTile value={totals.losses} label="Losses" onDark />
              <StatTile value={Math.round(totals.pct * 100)} suffix="%" label="Win %" onDark />
              <StatTile value={totals.teams} label="Teams" onDark />
            </div>
          )}
        </div>
      </section>

      {/* ── Light body ── */}
      <div className="container py-10">
        {loading && (
          <div className="space-y-3">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="h-20 animate-pulse rounded-2xl border border-border bg-secondary/60" />
            ))}
          </div>
        )}

        {error && (
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-10 text-center shadow-sm">
            <Logo className="pointer-events-none absolute -right-6 -top-6 h-32 w-32 opacity-[0.06]" tone="plain" />
            <p className="text-lg font-bold text-foreground">Couldn't load records right now.</p>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
              Give it a moment and refresh — the scoreboard will be back before the next tip-off.
            </p>
          </div>
        )}

        {!loading && !error && records.length === 0 && (
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-12 text-center shadow-sm">
            <Logo className="pointer-events-none absolute -right-8 -bottom-8 h-40 w-40 opacity-[0.06]" tone="plain" />
            <p className="text-lg font-bold text-foreground">No published games yet.</p>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
              The board is empty for now — but Coach Kenny is plotting something good. Check back after the next slate.
            </p>
          </div>
        )}

        {ready && (
          <>
            <HighlightCallout top={top} hottest={hottest} />
            <div className="mb-6">
              <WinRateChart records={sorted} />
            </div>
            <RecordsControls sort={sort} onSort={setSort} />
            <div className="space-y-3">
              {sorted.map((team, i) => (
                <TeamCard key={team.name} team={team} rank={i + 1} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
