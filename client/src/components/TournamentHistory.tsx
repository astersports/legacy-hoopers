/**
 * TournamentHistory — Shows full game log synced from all Tourney Machine tournaments
 * Displays on the Records page as an expandable section
 * Includes per-team win/loss record breakdown in the header
 */
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { ChevronDown, ChevronUp, ExternalLink, Loader2, Trophy, Users } from "lucide-react";

interface TeamRecord {
  team: string;
  wins: number;
  losses: number;
  ties: number;
}

function aggregateTeamRecords(
  data: { games: { legacyTeam: string; result: string }[] }[]
): TeamRecord[] {
  const map = new Map<string, TeamRecord>();

  for (const tournament of data) {
    for (const game of tournament.games) {
      if (game.result === "upcoming") continue;

      // Normalize team name
      let teamName = game.legacyTeam
        .replace(/\[\d+\]\s*/, "")
        .replace("Legacy Hoopers (NY)", "Legacy")
        .replace("Legacy Hoopers", "Legacy")
        .trim();
      if (!teamName || teamName === "Legacy") teamName = "Legacy";

      if (!map.has(teamName)) {
        map.set(teamName, { team: teamName, wins: 0, losses: 0, ties: 0 });
      }
      const rec = map.get(teamName)!;
      if (game.result === "W") rec.wins++;
      else if (game.result === "L") rec.losses++;
      else if (game.result === "T") rec.ties++;
    }
  }

  // Sort by total games descending
  return Array.from(map.values()).sort(
    (a, b) => b.wins + b.losses + b.ties - (a.wins + a.losses + a.ties)
  );
}

export default function TournamentHistory() {
  const { data, isLoading } = trpc.tournament.all.useQuery(undefined, {
    staleTime: 5 * 60 * 1000, // Cache for 5 min
  });
  const [expanded, setExpanded] = useState(false);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="w-5 h-5 text-cobalt animate-spin" />
        <span className="ml-2 text-white/50 text-sm">Syncing tournament data...</span>
      </div>
    );
  }

  if (!data || data.length === 0) return null;

  // Flatten all games across tournaments and sort by date
  const allGames = data.flatMap((t) =>
    t.games.map((g) => ({ ...g, tournamentName: t.tournament.name }))
  );

  const totalWins = allGames.filter((g) => g.result === "W").length;
  const totalLosses = allGames.filter((g) => g.result === "L").length;
  const totalGames = allGames.filter((g) => g.result !== "upcoming").length;

  // Per-team records
  const teamRecords = aggregateTeamRecords(data);

  return (
    <div className="mt-8">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full bg-navy-light border border-cobalt/20 rounded-xl px-5 py-4 flex items-center justify-between hover:bg-cobalt/[0.04] transition-colors"
      >
        <div className="flex items-center gap-3">
          <Trophy className="w-5 h-5 text-gold" />
          <div className="text-left">
            <span className="block font-display font-800 text-sm uppercase tracking-wider text-cobalt">
              AAU Tournament Game Log
            </span>
            <span className="block text-[11px] text-white/40 mt-0.5">
              Synced from Tourney Machine · {data.length} tournaments · {totalGames} games
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden sm:block text-sm font-display font-700 text-white">
            {totalWins}–{totalLosses}
          </span>
          {expanded ? (
            <ChevronUp className="w-4 h-4 text-white/50" />
          ) : (
            <ChevronDown className="w-4 h-4 text-white/50" />
          )}
        </div>
      </button>

      {/* Per-Team Records Summary — always visible */}
      {teamRecords.length > 1 && (
        <div className="mt-3 bg-navy-light border border-cobalt/10 rounded-xl p-3 md:p-4">
          <div className="flex items-center gap-2 mb-2 md:mb-3">
            <Users className="w-4 h-4 text-cobalt" />
            <span className="font-display font-800 text-xs uppercase tracking-wider text-white/60">
              Record by Team
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1.5 md:gap-2">
            {teamRecords.map((rec, i) => {
              const total = rec.wins + rec.losses + rec.ties;
              const winPct = total > 0 ? Math.round((rec.wins / total) * 100) : 0;
              return (
                <div
                  key={i}
                  className="flex items-center justify-between px-2.5 py-1.5 md:px-3 md:py-2 bg-arena/50 rounded-lg border border-white/5"
                >
                  <span className="text-[10px] md:text-xs font-700 text-white/80 truncate mr-1.5">
                    {rec.team}
                  </span>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <span className="font-display font-800 text-xs md:text-sm text-white">
                      {rec.wins}–{rec.losses}
                      {rec.ties > 0 ? `–${rec.ties}` : ""}
                    </span>
                    <span
                      className={`text-[9px] md:text-[10px] font-700 px-1 md:px-1.5 py-0.5 rounded ${
                        winPct >= 70
                          ? "bg-green-500/20 text-green-400"
                          : winPct >= 50
                          ? "bg-cobalt/20 text-cobalt"
                          : "bg-white/10 text-white/50"
                      }`}
                    >
                      {winPct}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {expanded && (
        <div className="mt-3 space-y-4">
          {/* Tournament Game Logs */}
          {data.map((tournament, tIdx) => {
            if (tournament.games.length === 0) return null;

            const wins = tournament.games.filter((g) => g.result === "W").length;
            const losses = tournament.games.filter((g) => g.result === "L").length;

            return (
              <div key={tIdx} className="bg-navy-light border border-white/5 rounded-xl overflow-hidden">
                {/* Tournament Header */}
                <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between">
                  <div>
                    <span className="font-display font-800 text-sm uppercase text-white">
                      {tournament.tournament.name}
                    </span>
                    <span className="block text-[10px] text-white/40 mt-0.5">
                      {tournament.tournament.dates} · {wins}W–{losses}L
                    </span>
                  </div>
                  <a
                    href={`https://tourneymachine.com/Public/Results/Tournament.aspx?IDTournament=${tournament.tournament.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cobalt hover:text-cobalt-light transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                {/* Games */}
                {tournament.games.map((game, gIdx) => (
                  <div
                    key={gIdx}
                    className={`flex items-center gap-3 px-4 py-2.5 border-b border-white/5 last:border-b-0 ${
                      game.result === "W"
                        ? "bg-green-500/[0.03]"
                        : game.result === "L"
                        ? "bg-red-500/[0.03]"
                        : ""
                    }`}
                  >
                    <span
                      className={`font-display font-800 text-sm w-5 text-center ${
                        game.result === "W" ? "text-green-400" : game.result === "L" ? "text-red-400" : "text-white/30"
                      }`}
                    >
                      {game.result === "upcoming" ? "–" : game.result}
                    </span>
                    <span className="text-white/80 text-sm flex-1 truncate">
                      vs {game.opponent}
                    </span>
                    <span className="font-display font-700 text-sm text-white w-16 text-right">
                      {game.legacyScore !== null && game.opponentScore !== null
                        ? `${game.legacyScore}–${game.opponentScore}`
                        : "TBD"}
                    </span>
                    <span className="text-[10px] text-white/30 w-20 text-right hidden sm:block truncate">
                      {game.legacyTeam.replace("Legacy Hoopers", "").replace("Legacy Hoopers (NY)", "").trim() || "Legacy"}
                    </span>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
