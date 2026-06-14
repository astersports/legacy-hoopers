/**
 * Season Leaderboard — Compact cumulative stats table
 * Shows total wins, avg point differential, longest win streak per team
 * Clickable rows open a modal with recent game history
 */
import { useMemo, useState } from "react";
import { Trophy, TrendingUp, Flame, X, ChevronRight } from "lucide-react";

interface Game {
  date: string;
  opponent: string;
  score: string;
  result: "W" | "L";
  tag?: string;
}

interface TeamData {
  id: string;
  name: string;
  shortName: string;
  grade: string;
  color: string;
  record: string;
  games: Game[];
  stats: { diff: string };
  circuit?: string;
  streak?: string;
  runOfPlay?: string[];
}

interface LeaderboardEntry {
  id: string;
  name: string;
  shortName: string;
  color: string;
  grade: string;
  wins: number;
  losses: number;
  winPct: number;
  avgDiff: number;
  longestStreak: number;
  totalGames: number;
}

function computeLeaderboard(teams: TeamData[]): LeaderboardEntry[] {
  return teams
    .map((team) => {
      // Parse authoritative record string (e.g. "11–5") as fallback
      const recordParts = team.record?.match(/(\d+)\s*[–-]\s*(\d+)/);
      const authWins = recordParts ? parseInt(recordParts[1]) : 0;
      const authLosses = recordParts ? parseInt(recordParts[2]) : 0;

      // Use game log if it has data, otherwise fall back to authoritative stats
      const hasGameLog = team.games.length > 0;
      const wins = hasGameLog ? team.games.filter((g) => g.result === "W").length : authWins;
      const losses = hasGameLog ? team.games.filter((g) => g.result === "L").length : authLosses;
      const totalGames = wins + losses;
      const winPct = totalGames > 0 ? (wins / totalGames) * 100 : 0;

      // Compute average point differential from scores, or fall back to stats.diff
      let avgDiff = 0;
      if (hasGameLog) {
        let totalDiff = 0;
        let scoredGames = 0;
        for (const g of team.games) {
          const parts = g.score.split("\u2013").length > 1
            ? g.score.split("\u2013").map((s) => parseInt(s.trim()))
            : g.score.split("-").map((s) => parseInt(s.trim()));
          if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
            totalDiff += parts[0] - parts[1];
            scoredGames++;
          }
        }
        avgDiff = scoredGames > 0 ? totalDiff / scoredGames : 0;
      } else {
        // Fall back to authoritative diff from team stats
        avgDiff = parseFloat(team.stats.diff) || 0;
      }

      // Compute longest win streak from game log
      let longestStreak = 0;
      if (hasGameLog) {
        let currentStreak = 0;
        for (const g of team.games) {
          if (g.result === "W") {
            currentStreak++;
            longestStreak = Math.max(longestStreak, currentStreak);
          } else {
            currentStreak = 0;
          }
        }
      } else {
        // Estimate from record — can't determine exact streak without game log
        longestStreak = wins > 0 ? Math.min(wins, 5) : 0; // conservative estimate
      }

      return {
        id: team.id,
        name: team.name,
        shortName: team.shortName,
        color: team.color,
        grade: team.grade,
        wins,
        losses,
        winPct,
        avgDiff,
        longestStreak,
        totalGames,
      };
    })
    .sort((a, b) => b.winPct - a.winPct || b.avgDiff - a.avgDiff);
}

interface SeasonLeaderboardProps {
  teams: TeamData[];
  seasonLabel: string;
}

export default function SeasonLeaderboard({ teams, seasonLabel }: SeasonLeaderboardProps) {
  const leaderboard = useMemo(() => computeLeaderboard(teams), [teams]);
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);

  if (leaderboard.length === 0) return null;

  // Find leaders for each category
  const bestWinPct = leaderboard[0];
  const bestDiff = [...leaderboard].sort((a, b) => b.avgDiff - a.avgDiff)[0];
  const bestStreak = [...leaderboard].sort((a, b) => b.longestStreak - a.longestStreak)[0];

  const selectedTeam = selectedTeamId ? teams.find((t) => t.id === selectedTeamId) : null;
  const selectedEntry = selectedTeamId ? leaderboard.find((e) => e.id === selectedTeamId) : null;

  return (
    <div className="mb-8">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-gold" />
          <h3 className="font-display font-800 text-sm uppercase tracking-wider text-white">
            Season Leaderboard
          </h3>
        </div>
        <span className="text-white/30 text-xs font-display font-700 uppercase tracking-wider">
          {seasonLabel}
        </span>
      </div>

      {/* Compact Table */}
      <div className="bg-navy-light border border-white/10 rounded-xl overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-[1fr_60px_60px_70px_50px] md:grid-cols-[1fr_80px_80px_90px_70px] px-3 md:px-4 py-2.5 border-b border-white/10 bg-white/[0.02]">
          <span className="font-display font-700 text-[9px] md:text-[10px] uppercase tracking-wider text-white/40">Team</span>
          <span className="font-display font-700 text-[9px] md:text-[10px] uppercase tracking-wider text-white/40 text-center">Record</span>
          <span className="font-display font-700 text-[9px] md:text-[10px] uppercase tracking-wider text-white/40 text-center">Win %</span>
          <span className="font-display font-700 text-[9px] md:text-[10px] uppercase tracking-wider text-white/40 text-center">Avg Diff</span>
          <span className="font-display font-700 text-[9px] md:text-[10px] uppercase tracking-wider text-white/40 text-center">Streak</span>
        </div>

        {/* Table Rows */}
        {leaderboard.map((entry, i) => {
          const isTopWinPct = entry === bestWinPct;
          const isTopDiff = entry === bestDiff;
          const isTopStreak = entry === bestStreak;

          return (
            <button
              key={entry.id}
              onClick={() => setSelectedTeamId(entry.id)}
              className={`w-full grid grid-cols-[1fr_60px_60px_70px_50px] md:grid-cols-[1fr_80px_80px_90px_70px] px-3 md:px-4 py-2.5 md:py-3 items-center border-b border-white/5 last:border-b-0 cursor-pointer hover:bg-white/[0.04] transition-colors duration-150 ${
                i === 0 ? "bg-gold/[0.03]" : ""
              }`}
            >
              {/* Team Name */}
              <div className="flex items-center gap-2 md:gap-3 min-w-0">
                <span
                  className="font-display font-800 text-xs md:text-sm w-5 text-center flex-shrink-0"
                  style={{ color: i === 0 ? "#f5a623" : "rgba(255,255,255,0.3)" }}
                >
                  {i + 1}
                </span>
                <div
                  className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: entry.color }}
                />
                <div className="min-w-0 text-left">
                  <span className="font-display font-700 text-xs md:text-sm text-white truncate block">
                    {entry.shortName}
                  </span>
                  <span className="text-white/40 text-[9px] md:text-[10px] hidden md:block">{entry.grade}</span>
                </div>
                <ChevronRight className="w-3 h-3 text-white/20 flex-shrink-0 ml-auto md:hidden" />
              </div>

              {/* Record */}
              <span className="font-display font-800 text-xs md:text-sm text-white text-center">
                {entry.wins}–{entry.losses}
              </span>

              {/* Win % */}
              <div className="text-center">
                <span
                  className="font-display font-800 text-xs md:text-sm"
                  style={{ color: isTopWinPct ? "#f5a623" : entry.winPct >= 50 ? "#22c55e" : "rgba(255,255,255,0.7)" }}
                >
                  {entry.winPct.toFixed(0)}%
                </span>
                {isTopWinPct && <Trophy className="w-2.5 h-2.5 text-gold inline-block ml-0.5 -mt-0.5" />}
              </div>

              {/* Avg Diff */}
              <div className="text-center">
                <span
                  className="font-display font-800 text-xs md:text-sm"
                  style={{ color: isTopDiff ? "#f5a623" : entry.avgDiff >= 0 ? "#22c55e" : "#ef4444" }}
                >
                  {entry.avgDiff >= 0 ? "+" : ""}{entry.avgDiff.toFixed(1)}
                </span>
                {isTopDiff && <TrendingUp className="w-2.5 h-2.5 text-gold inline-block ml-0.5 -mt-0.5" />}
              </div>

              {/* Longest Streak */}
              <div className="text-center">
                <span
                  className="font-display font-800 text-xs md:text-sm"
                  style={{ color: isTopStreak ? "#f5a623" : "rgba(255,255,255,0.7)" }}
                >
                  {entry.longestStreak}W
                </span>
                {isTopStreak && <Flame className="w-2.5 h-2.5 text-gold inline-block ml-0.5 -mt-0.5" />}
              </div>
            </button>
          );
        })}
      </div>

      {/* Category Leaders (compact pills below table) */}
      <div className="flex flex-wrap gap-2 mt-3">
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gold/10 border border-gold/20 rounded-full">
          <Trophy className="w-3 h-3 text-gold" />
          <span className="text-[10px] md:text-[11px] font-display font-700 text-gold">
            Best Record: {bestWinPct.shortName} ({bestWinPct.winPct.toFixed(0)}%)
          </span>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
          <TrendingUp className="w-3 h-3 text-green-400" />
          <span className="text-[10px] md:text-[11px] font-display font-700 text-green-400">
            Best Margin: {bestDiff.shortName} ({bestDiff.avgDiff >= 0 ? "+" : ""}{bestDiff.avgDiff.toFixed(1)})
          </span>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-orange-500/10 border border-orange-500/20 rounded-full">
          <Flame className="w-3 h-3 text-orange-400" />
          <span className="text-[10px] md:text-[11px] font-display font-700 text-orange-400">
            Hot Streak: {bestStreak.shortName} ({bestStreak.longestStreak}W)
          </span>
        </div>
      </div>

      {/* Team Detail Modal */}
      {selectedTeam && selectedEntry && (
        <div
          className="fixed inset-0 z-50 flex items-end md:items-center justify-center"
          onClick={() => setSelectedTeamId(null)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          {/* Modal Content */}
          <div
            className="relative w-full md:max-w-lg max-h-[85vh] bg-arena border border-white/10 rounded-t-2xl md:rounded-2xl overflow-hidden flex flex-col animate-in slide-in-from-bottom duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              className="flex items-center justify-between px-5 py-4 border-b border-white/10"
              style={{ background: `linear-gradient(135deg, ${selectedTeam.color}15, transparent)` }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-display font-900 text-sm border-2"
                  style={{ color: selectedTeam.color, borderColor: selectedTeam.color, background: `${selectedTeam.color}15` }}
                >
                  {selectedTeam.name.match(/\d+/)?.[0] || "?"}
                </div>
                <div>
                  <h3 className="font-display font-800 text-lg uppercase text-white leading-none">
                    {selectedTeam.shortName}
                  </h3>
                  <p className="text-white/50 text-xs mt-0.5">{selectedTeam.grade}{selectedTeam.circuit ? ` · ${selectedTeam.circuit}` : ""}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedTeamId(null)}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <X className="w-4 h-4 text-white/70" />
              </button>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-4 border-b border-white/10">
              {[
                { val: `${selectedEntry.wins}–${selectedEntry.losses}`, label: "Record", color: selectedTeam.color },
                { val: `${selectedEntry.winPct.toFixed(0)}%`, label: "Win %", color: selectedEntry.winPct >= 50 ? "#22c55e" : "#ef4444" },
                { val: `${selectedEntry.avgDiff >= 0 ? "+" : ""}${selectedEntry.avgDiff.toFixed(1)}`, label: "Avg Diff", color: selectedEntry.avgDiff >= 0 ? "#22c55e" : "#ef4444" },
                { val: `${selectedEntry.longestStreak}W`, label: "Best Streak", color: "#f5a623" },
              ].map((s, i) => (
                <div key={i} className="text-center py-3 border-r border-white/5 last:border-r-0">
                  <span className="block font-display font-800 text-base md:text-lg" style={{ color: s.color }}>{s.val}</span>
                  <span className="block text-white/40 text-[9px] uppercase tracking-wider mt-0.5">{s.label}</span>
                </div>
              ))}
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto flex-1 px-5 py-4">
              {/* Run of Play */}
              {selectedTeam.runOfPlay && selectedTeam.runOfPlay.length > 0 && (
                <div className="mb-5">
                  <h4 className="font-display font-700 text-[10px] uppercase tracking-wider text-white/40 mb-2">Highlights</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedTeam.runOfPlay.map((pill, i) => (
                      <span
                        key={i}
                        className={`px-2.5 py-1 rounded-full text-[11px] font-700 border ${
                          pill.includes("🏆") || pill.includes("Champions")
                            ? "bg-green-500/10 border-green-500/30 text-green-400"
                            : pill.includes("🥈") || pill.includes("Finalists")
                            ? "bg-gold/10 border-gold/30 text-gold"
                            : "bg-white/[0.04] border-white/10 text-white/70"
                        }`}
                      >
                        {pill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Recent Game History */}
              <div>
                <h4 className="font-display font-700 text-[10px] uppercase tracking-wider text-white/40 mb-2">
                  Game Log ({selectedTeam.games.length} games)
                </h4>
                {selectedTeam.games.length > 0 ? (
                  <div className="bg-navy-light border border-white/5 rounded-xl overflow-hidden">
                    {selectedTeam.games.map((g, i) => {
                      // Parse score for point diff
                      const parts = g.score.split(/[–-]/).map((s) => parseInt(s.trim()));
                      const diff = parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1]) ? parts[0] - parts[1] : null;

                      return (
                        <div
                          key={i}
                          className={`flex items-center gap-2 px-3 py-2 border-b border-white/5 last:border-b-0 ${
                            g.result === "W" ? "bg-green-500/[0.03]" : "bg-red-500/[0.03]"
                          }`}
                        >
                          {/* Result badge */}
                          <span className={`font-display font-800 text-[11px] w-5 text-center flex-shrink-0 ${
                            g.result === "W" ? "text-green-400" : "text-red-400"
                          }`}>
                            {g.result}
                          </span>

                          {/* Date */}
                          <span className="text-white/40 text-[11px] w-12 flex-shrink-0 font-600">{g.date}</span>

                          {/* Opponent */}
                          <span className="text-white/80 text-xs flex-1 truncate">
                            {g.opponent.replace(/^vs\s+/, "")}
                            {g.tag && (
                              <span className="ml-1.5 px-1.5 py-0.5 bg-white/10 rounded text-[9px] text-white/50 font-600">{g.tag}</span>
                            )}
                          </span>

                          {/* Score */}
                          <span className="text-white font-display font-700 text-[11px] flex-shrink-0">{g.score}</span>

                          {/* Diff */}
                          {diff !== null && (
                            <span className={`font-display font-800 text-[10px] w-8 text-right flex-shrink-0 ${
                              diff > 0 ? "text-green-400" : "text-red-400"
                            }`}>
                              {diff > 0 ? "+" : ""}{diff}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="bg-navy-light border border-white/5 rounded-xl p-4 text-center">
                    <p className="text-white/40 text-xs">Detailed game log not yet available for this team.</p>
                    <p className="text-white/30 text-[10px] mt-1">Season record: {selectedTeam.record}</p>
                  </div>
                )}
              </div>

              {/* Current Streak */}
              {selectedTeam.streak && (
                <div className="mt-4 flex items-center gap-2">
                  <span className="text-white/40 text-[10px] uppercase tracking-wider font-display font-700">Current:</span>
                  <span className={`px-2 py-0.5 rounded text-xs font-700 ${
                    selectedTeam.streak.startsWith("W") ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                  }`}>
                    {selectedTeam.streak}
                  </span>
                </div>
              )}

              {/* Upcoming Schedule */}
              <div className="mt-5">
                <h4 className="font-display font-700 text-[10px] uppercase tracking-wider text-white/40 mb-2">Upcoming Schedule</h4>
                <div className="bg-navy-light border border-white/5 rounded-xl p-4 text-center">
                  <p className="text-white/40 text-xs">No upcoming games scheduled.</p>
                  <p className="text-white/30 text-[10px] mt-1">Check back when the next tournament is announced.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
