/*
 * Home — Aster AAU. Live program record from the Aster Sports platform.
 * Dark-highlight hero anchored by the constellation-arrow mark (no photos).
 */
import { Link } from "wouter";
import { ArrowRight, Trophy, Target, BookOpen, Users } from "lucide-react";
import { useProgramRecords } from "@/hooks/useProgramRecords";
import { programTotals } from "@/lib/aster";
import { BRAND, REGISTER_URL } from "@/lib/brand";
import { Logo } from "@/components/Logo";

const PILLARS = [
  { icon: BookOpen, title: "Teaching-first", desc: "Every session designed with intentional pedagogy." },
  { icon: Target, title: "Player development", desc: "Individual growth plans, tracked across seasons." },
  { icon: Trophy, title: "Real competition", desc: "AAU + league play, every game on the record." },
  { icon: Users, title: "Family partnership", desc: "Parents are partners, not spectators." },
];

export default function Home() {
  const { records, loading, error } = useProgramRecords();
  const totals = programTotals(records);
  const ready = !loading && !error && records.length > 0;

  return (
    <div>
      {/* Hero — dark highlight band, anchored by the logo */}
      <section className="hero-navy relative overflow-hidden text-white">
        <div className="container grid items-center gap-10 py-16 lg:grid-cols-2 lg:py-24">
          <div className="min-w-0">
            <span className="inline-flex max-w-full items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold-light ring-1 ring-white/10">
              <Trophy className="h-3.5 w-3.5" /> {BRAND.region} · Zero Gravity
            </span>
            <h1 className="mt-4 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl xl:text-6xl">
              {BRAND.tagline}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-white/70">
              Westchester County youth basketball development — elite coaching, real competition,
              and every game on the record.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/records"
                className="inline-flex items-center gap-2 rounded-lg bg-gold px-5 py-3 text-sm font-semibold text-navy shadow-sm transition-colors hover:bg-gold-light"
              >
                See the records <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={REGISTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Register your player
              </a>
            </div>
          </div>

          {/* Logo medallion replaces the hero photo */}
          <div className="relative mx-auto grid w-full max-w-sm place-items-center">
            <div className="absolute h-64 w-64 rounded-full bg-gold/20 blur-3xl" aria-hidden />
            <Logo className="relative h-56 w-56 drop-shadow-[0_8px_40px_rgba(201,149,46,0.35)] sm:h-64 sm:w-64" />
          </div>
        </div>

        {/* Live program stat line */}
        <div className="container pb-16">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: "Wins", value: ready ? totals.wins : "—" },
              { label: "Losses", value: ready ? totals.losses : "—" },
              { label: "Win %", value: ready ? `${Math.round(totals.pct * 100)}%` : "—" },
              { label: "Games", value: ready ? totals.games : "—" },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                <div className="text-3xl font-extrabold tabular-nums text-white">{s.value}</div>
                <div className="text-xs uppercase tracking-wider text-white/60">{s.label}</div>
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
          <Link href="/records" className="text-sm font-semibold text-gold-text hover:underline">
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

      {/* What we stand for — replaces the photo gallery */}
      <section className="relative overflow-hidden border-t border-border bg-secondary/30">
        <span className="watermark left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">ASTER</span>
        <div className="container relative py-14">
          <div className="mb-6 flex items-center gap-3">
            <Logo className="h-8 w-8" />
            <h2 className="text-2xl font-extrabold tracking-tight text-foreground">What we stand for</h2>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((p) => (
              <div key={p.title} className="rounded-xl border border-border bg-card p-6 shadow-sm">
                <span className="grid h-11 w-11 place-items-center rounded-lg bg-gold-soft text-gold-text">
                  <p.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-bold text-foreground">{p.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <Link
              href="/mission"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground shadow-sm transition-colors hover:bg-secondary"
            >
              Read our mission <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
