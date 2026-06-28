/*
 * TeamCard — one team's standings row with a win-rate bar + last-5 form strip in
 * the header and a smoothly-expanding game log. Presentation only: the team data
 * is passed straight through from the live useProgramRecords() source.
 */
import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { GameRecord, TeamRecord } from "@/lib/aster";
import { WinRateBar } from "./WinRateBar";
import { FormDots } from "./FormDots";
import { lastResults, winRate } from "./recordsUtils";

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

export function TeamCard({ team, rank }: { team: TeamRecord; rank: number }) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const total = team.wins + team.losses + team.ties;

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-4 px-4 py-4 text-left transition-colors hover:bg-secondary/50 sm:px-5"
        aria-expanded={open}
      >
        {/* Rank */}
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-secondary text-sm font-extrabold tabular-nums text-muted-foreground">
          {rank}
        </span>

        {/* Team color + name + win-rate bar */}
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <span className="h-9 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: team.color }} />
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-3">
              <div className="truncate text-base font-bold tracking-tight text-foreground">{team.name}</div>
              <FormDots results={lastResults(team)} />
            </div>
            <div className="mt-1.5 flex items-center gap-3">
              <div className="hidden w-40 sm:block">
                <WinRateBar rate={winRate(team)} color={team.color} />
              </div>
              <div className="text-xs text-muted-foreground">{total} games played</div>
            </div>
          </div>
        </div>

        {/* W–L line + chevron */}
        <div className="flex shrink-0 items-center gap-3 sm:gap-4">
          <div className="text-right">
            <div className="text-lg font-extrabold tabular-nums text-foreground">
              {team.wins}<span className="text-muted-foreground">–</span>{team.losses}
              {team.ties > 0 && <span className="text-muted-foreground">–{team.ties}</span>}
            </div>
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground">W–L</div>
          </div>
          <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
        </div>
      </button>

      {/* Mobile win-rate bar (header is tight on small screens) */}
      <div className="px-4 pb-3 sm:hidden">
        <WinRateBar rate={winRate(team)} color={team.color} />
      </div>

      {/* Smooth grid-row expand/collapse */}
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div ref={panelRef} className="overflow-hidden">
          <div className="border-t border-border">
            {team.games.map((g) => (
              <div key={g.game_id} className="flex items-center gap-3 border-b border-border/60 px-4 py-2.5 last:border-0 sm:px-5">
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
        </div>
      </div>
    </div>
  );
}
