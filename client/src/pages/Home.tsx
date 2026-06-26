/*
 * Home — clean & light. Live program record from the Aster Sports platform.
 */
import { Link } from "wouter";
import { ArrowRight, Trophy } from "lucide-react";
import { useProgramRecords } from "@/hooks/useProgramRecords";
import { programTotals } from "@/lib/aster";

const REGISTER_URL =
  "https://legacyhoopers.leagueapps.com/camps/4945182-legacy-hoopers-prospective-player-interest-list";

export default function Home() {
  const { records, loading, error } = useProgramRecords();
  const totals = programTotals(records);
  const ready = !loading && !error && records.length > 0;

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-border bg-gradient-to-b from-secondary/50 to-background">
        <div className="container grid items-center gap-10 py-14 lg:grid-cols-2 lg:py-20">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
              <Trophy className="h-3.5 w-3.5" /> Westchester AAU · Zero Gravity
            </span>
            <h1 className="mt-4 text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-5xl xl:text-6xl">
              Five teams. One standard. Zero shortcuts.
            </h1>
            <p className="mt-4 max-w-xl text-lg text-muted-foreground">
              Westchester County youth basketball development — elite coaching, real competition,
              and every game on the record.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/records"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:opacity-90"
              >
                See the records <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={REGISTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground shadow-sm transition-colors hover:bg-secondary"
              >
                Register your player
              </a>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-border shadow-md">
            <img
              src="/photos/hero.jpg"
              alt="Legacy Hoopers in action"
              className="aspect-[3/2] w-full object-cover"
              loading="eager"
            />
          </div>
        </div>

        {/* Live program stat line */}
        <div className="container pb-14">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: "Wins", value: ready ? totals.wins : "—" },
              { label: "Losses", value: ready ? totals.losses : "—" },
              { label: "Win %", value: ready ? `${Math.round(totals.pct * 100)}%` : "—" },
              { label: "Games", value: ready ? totals.games : "—" },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border border-border bg-card p-4 shadow-sm">
                <div className="text-3xl font-extrabold tabular-nums text-foreground">{s.value}</div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Teams */}
      <section className="container py-14">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-foreground">Our teams</h2>
            <p className="text-sm text-muted-foreground">Tap a team on the records page for its full game log.</p>
          </div>
          <Link href="/records" className="text-sm font-semibold text-primary hover:underline">
            All records →
          </Link>
        </div>

        {loading && (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="h-24 animate-pulse rounded-xl border border-border bg-secondary/60" />
            ))}
          </div>
        )}

        {error && (
          <div className="rounded-xl border border-border bg-card p-8 text-center text-muted-foreground">
            Couldn't reach the scoreboard. Try again in a moment.
          </div>
        )}

        {ready && (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {records.map((team) => (
              <Link
                key={team.name}
                href="/records"
                className="group flex items-center justify-between rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex items-center gap-3">
                  <span className="h-10 w-1.5 rounded-full" style={{ backgroundColor: team.color }} />
                  <div>
                    <div className="font-bold tracking-tight text-foreground">{team.name}</div>
                    <div className="text-xs text-muted-foreground">{team.games.length} games</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-extrabold tabular-nums text-foreground">
                    {team.wins}<span className="text-muted-foreground">–</span>{team.losses}
                  </div>
                  <div className="text-[11px] uppercase tracking-wider text-muted-foreground">W–L</div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Gallery */}
      <section className="border-t border-border bg-secondary/30">
        <div className="container py-14">
          <h2 className="mb-6 text-2xl font-extrabold tracking-tight text-foreground">On the court</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {["legacy-jersey", "action-1", "action-2", "action-3"].map((name) => (
              <div key={name} className="overflow-hidden rounded-xl border border-border shadow-sm">
                <img
                  src={`/photos/${name}.jpg`}
                  alt="Legacy Hoopers game action"
                  className="aspect-square w-full object-cover transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
