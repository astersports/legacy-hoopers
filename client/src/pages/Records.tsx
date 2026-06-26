/*
 * Records — live team records for Legacy Hoopers, read from the Aster Sports
 * platform's public API (get_public_team_records). Clean & light.
 */
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useProgramRecords } from "@/hooks/useProgramRecords";
import { programTotals, type GameRecord, type TeamRecord } from "@/lib/aster";

function fmtDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "America/New_York" });
}

function ResultChip({ result }: { result: GameRecord["result"] }) {
  const map = {
    W: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
    L: "bg-rose-50 text-rose-700 ring-rose-600/20",
    T: "bg-slate-100 text-slate-600 ring-slate-500/20",
  } as const;
  const cls = result ? map[result] : "bg-slate-100 text-slate-500 ring-slate-500/20";
  return (
    <span className={`inline-flex h-6 w-6 items-center justify-center rounded-md text-xs font-bold ring-1 ring-inset ${cls}`}>
      {result ?? "·"}
    </span>
  );
}

function TeamCard({ team }: { team: TeamRecord }) {
  const [open, setOpen] = useState(false);
  const total = team.wins + team.losses + team.ties;
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-secondary/50"
        aria-expanded={open}
      >
        <div className="flex items-center gap-3">
          <span className="h-9 w-1.5 rounded-full" style={{ backgroundColor: team.color }} />
          <div>
            <div className="text-base font-bold tracking-tight text-foreground">{team.name}</div>
            <div className="text-xs text-muted-foreground">{total} games played</div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-lg font-extrabold tabular-nums text-foreground">
              {team.wins}<span className="text-muted-foreground">–</span>{team.losses}
              {team.ties > 0 && <span className="text-muted-foreground">–{team.ties}</span>}
            </div>
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground">W–L</div>
          </div>
          <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
        </div>
      </button>

      {open && (
        <div className="border-t border-border">
          {team.games.map((g) => (
            <div key={g.game_id} className="flex items-center gap-3 border-b border-border/60 px-5 py-2.5 last:border-0">
              <ResultChip result={g.result} />
              <span className="w-12 shrink-0 text-xs text-muted-foreground">{fmtDate(g.played_at)}</span>
              <span className="min-w-0 flex-1 truncate text-sm text-foreground">{g.opponent}</span>
              {g.our_score != null && g.opponent_score != null ? (
                <span className="shrink-0 text-sm font-semibold tabular-nums text-foreground">
                  {g.our_score}–{g.opponent_score}
                </span>
              ) : (
                <span className="shrink-0 text-xs text-muted-foreground">—</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Records() {
  const { records, loading, error } = useProgramRecords();
  const totals = programTotals(records);

  return (
    <div className="container py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">Team Records</h1>
        <p className="mt-1 text-muted-foreground">Every published game across the program — updated from the live platform.</p>
      </header>

      {!loading && !error && records.length > 0 && (
        <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: "Wins", value: totals.wins },
            { label: "Losses", value: totals.losses },
            { label: "Win %", value: `${Math.round(totals.pct * 100)}%` },
            { label: "Teams", value: totals.teams },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border border-border bg-card p-4 shadow-sm">
              <div className="text-2xl font-extrabold tabular-nums text-foreground">{s.value}</div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      )}

      {loading && (
        <div className="space-y-3">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-16 animate-pulse rounded-xl border border-border bg-secondary/60" />
          ))}
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-border bg-card p-8 text-center">
          <p className="font-medium text-foreground">Couldn't load records right now.</p>
          <p className="mt-1 text-sm text-muted-foreground">Give it a moment and refresh — the scoreboard will be back.</p>
        </div>
      )}

      {!loading && !error && records.length === 0 && (
        <div className="rounded-xl border border-border bg-card p-8 text-center text-muted-foreground">
          No published games yet — but Coach Kenny is plotting something good.
        </div>
      )}

      <div className="space-y-3">
        {records.map((team) => (
          <TeamCard key={team.name} team={team} />
        ))}
      </div>
    </div>
  );
}
