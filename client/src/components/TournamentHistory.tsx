/**
 * TournamentHistory — Shows full game log synced from all Tourney Machine tournaments
 * Displays on the Records page as an expandable section
 */
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { ChevronDown, ChevronUp, ExternalLink, Loader2, Trophy } from "lucide-react";

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

      {expanded && (
        <div className="mt-3 space-y-4">
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
