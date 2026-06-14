/**
 * ThisWeekend — Live tournament scores grouped by division/team
 * Three divisions: 8U Boys (2nd/3rd grade), 10U Black (4th grade), 11U Girls (5th grade)
 * Uses the `division` field from the API to group games correctly
 * Division headers are tappable to collapse/expand game cards
 * Games currently in progress show a pulsing LIVE badge
 */
import { useMemo, useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { ExternalLink, Trophy, Clock, MapPin, Loader2, ChevronDown } from "lucide-react";
import { isGameLive, parseGameDate } from "@shared/gameTime";

/** Division display config — keyed by the division name from Tourney Machine */
const DIVISION_CONFIG: Record<string, { name: string; grade: string; color: string; order: number }> = {
  "Boys - 2nd/3rd": { name: "8U Boys", grade: "2nd/3rd Grade", color: "#f59e0b", order: 1 },
  "Boys - 2nd": { name: "8U Boys", grade: "2nd Grade", color: "#f59e0b", order: 1 },
  "Boys - 4th": { name: "10U Black", grade: "4th Grade Boys", color: "#4a8fd4", order: 2 },
  "Girls - 5th": { name: "11U Girls", grade: "5th Grade Girls", color: "#a78bfa", order: 3 },
};

type GameResult = {
  gameId: string;
  date: string;
  location: string;
  legacyTeam: string;
  legacyScore: number | null;
  opponentScore: number | null;
  opponent: string;
  result: "W" | "L" | "T" | "upcoming";
  division?: string;
};

export default function ThisWeekend() {
  const { data: liveData, isLoading } = trpc.tournament.live.useQuery(undefined, {
    refetchInterval: 60000,
  });
  const { data: links } = trpc.tournament.links.useQuery();

  const liveTournament = links?.find((t) => t.status === "live");

  // Track which divisions are collapsed (all expanded by default)
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  // Current time — updated every 30s to re-evaluate live status
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(interval);
  }, []);

  const toggleDivision = (name: string) => {
    setCollapsed((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  // Group games by division using the division field from the API
  const grouped = useMemo(() => {
    if (!liveData?.games) return [];
    const divMap = new Map<string, { config: typeof DIVISION_CONFIG[string]; games: GameResult[] }>();

    for (const game of liveData.games as GameResult[]) {
      const divKey = game.division || "Unknown";
      const config = DIVISION_CONFIG[divKey];
      if (!config) continue; // Skip unknown divisions

      if (!divMap.has(divKey)) {
        divMap.set(divKey, { config, games: [] });
      }
      divMap.get(divKey)!.games.push(game);
    }

    return Array.from(divMap.values())
      .sort((a, b) => a.config.order - b.config.order)
      .map(({ config, games }) => {
        // Sort: LIVE games first, then upcoming (nearest start), then completed (most recent first)
        const sortedGames = [...games].sort((a, b) => {
          const aLive = isGameLive(a, now) ? 0 : 1;
          const bLive = isGameLive(b, now) ? 0 : 1;
          if (aLive !== bLive) return aLive - bLive;

          const aUpcoming = a.result === "upcoming" ? 0 : 1;
          const bUpcoming = b.result === "upcoming" ? 0 : 1;
          if (aUpcoming !== bUpcoming) return aUpcoming - bUpcoming;

          const aTime = parseGameDate(a.date)?.getTime() ?? 0;
          const bTime = parseGameDate(b.date)?.getTime() ?? 0;

          // Upcoming: nearest start first; Completed: most recent first
          if (a.result === "upcoming" && b.result === "upcoming") return aTime - bTime;
          return bTime - aTime;
        });
        const wins = sortedGames.filter((g) => g.result === "W").length;
        const losses = sortedGames.filter((g) => g.result === "L").length;
        const liveCount = sortedGames.filter((g) => isGameLive(g, now)).length;
        return { ...config, games: sortedGames, wins, losses, liveCount };
      });
  }, [liveData, now]);

  if (!liveTournament) return null;

  return (
    <section className="py-8 md:py-20 relative overflow-hidden">
      <div className="container relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-5 md:mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
              </span>
              <span className="font-display font-800 text-xs uppercase tracking-[0.15em] text-red-400">
                This Weekend
              </span>
            </div>
            <h2 className="font-display font-800 text-xl md:text-4xl uppercase text-white">
              {liveTournament.name}
            </h2>
            <p className="text-white/50 text-[10px] md:text-sm mt-0.5">{liveTournament.dates}</p>
          </div>
          <a
            href={liveTournament.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-red-500/15 border border-red-500/30 rounded-lg text-red-400 font-display font-700 text-xs uppercase tracking-wider hover:bg-red-500/25 transition-colors"
          >
            Full Bracket <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 text-cobalt animate-spin" />
            <span className="ml-3 text-white/50 text-sm">Loading live scores...</span>
          </div>
        ) : grouped.length > 0 ? (
          <div className="space-y-3 md:space-y-6">
            {grouped.map((division) => {
              const isCollapsed = collapsed[division.name] ?? false;
              return (
                <div key={division.name}>
                  {/* Division Header — tappable to collapse/expand */}
                  <button
                    onClick={() => toggleDivision(division.name)}
                    className="w-full flex items-center gap-3 py-2 md:py-3 px-3 md:px-4 rounded-lg bg-white/[0.02] hover:bg-white/[0.04] active:scale-[0.99] transition-all duration-160 cursor-pointer group"
                    aria-expanded={!isCollapsed}
                    aria-controls={`division-${division.name}`}
                  >
                    <div
                      className="w-1 h-8 md:h-10 rounded-full flex-shrink-0"
                      style={{ backgroundColor: division.color }}
                    />
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="text-left">
                        <h3 className="font-display font-800 text-sm md:text-lg uppercase text-white leading-tight">
                          {division.name}
                        </h3>
                        <span className="text-[10px] md:text-xs text-white/40 font-600">
                          {division.grade} · {division.games.length} game{division.games.length !== 1 ? "s" : ""}
                        </span>
                      </div>
                      {/* Live indicator in header when division has active games */}
                      {division.liveCount > 0 && (
                        <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-red-500/15 border border-red-500/30">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                          </span>
                          <span className="font-display font-800 text-[9px] md:text-[10px] uppercase tracking-wider text-red-400">
                            {division.liveCount} Live
                          </span>
                        </span>
                      )}
                      {/* Record badge */}
                      <div
                        className="ml-auto flex items-center gap-1.5 px-2.5 py-1 rounded-lg"
                        style={{ backgroundColor: `${division.color}15`, border: `1px solid ${division.color}30` }}
                      >
                        <span
                          className="font-display font-800 text-sm md:text-base"
                          style={{ color: division.color }}
                        >
                          {division.wins}–{division.losses}
                        </span>
                      </div>
                    </div>
                    {/* Chevron indicator */}
                    <ChevronDown
                      className="w-4 h-4 md:w-5 md:h-5 text-white/30 group-hover:text-white/50 transition-all duration-200 flex-shrink-0"
                      style={{
                        transform: isCollapsed ? "rotate(-90deg)" : "rotate(0deg)",
                      }}
                    />
                  </button>

                  {/* Games for this division — collapsible */}
                  <div
                    id={`division-${division.name}`}
                    className="overflow-hidden transition-all duration-250"
                    style={{
                      maxHeight: isCollapsed ? "0px" : `${division.games.length * 200}px`,
                      opacity: isCollapsed ? 0 : 1,
                      marginTop: isCollapsed ? "0px" : "0.5rem",
                    }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1.5 md:gap-3">
                      {division.games.map((game: GameResult, i: number) => {
                        const gameLive = isGameLive(game, now);
                        return (
                          <div
                            key={i}
                            className={`bg-navy-light border rounded-lg px-3 py-2 md:px-4 md:py-3 relative ${
                              gameLive
                                ? "border-red-500/40 bg-red-500/[0.04] ring-1 ring-red-500/20"
                                : game.result === "W"
                                ? "border-green-500/30 bg-green-500/[0.03]"
                                : game.result === "L"
                                ? "border-red-500/20 bg-red-500/[0.02]"
                                : "border-white/10"
                            }`}
                          >
                            {/* Top row: game ID + result/LIVE badge */}
                            <div className="flex items-center justify-between mb-1 md:mb-2">
                              <span className="text-[9px] md:text-[10px] font-display font-700 uppercase tracking-wider text-white/40">
                                {game.gameId}
                              </span>
                              {gameLive ? (
                                <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-red-500/20 border border-red-500/30">
                                  <span className="relative flex h-1.5 w-1.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500" />
                                  </span>
                                  <span className="font-display font-800 text-[9px] md:text-[10px] uppercase tracking-wider text-red-400">
                                    Live
                                  </span>
                                </span>
                              ) : game.result !== "upcoming" ? (
                                <span
                                  className={`px-1.5 md:px-2 py-0.5 rounded text-[9px] md:text-[10px] font-display font-800 uppercase ${
                                    game.result === "W"
                                      ? "bg-green-500/20 text-green-400"
                                      : "bg-red-500/20 text-red-400"
                                  }`}
                                >
                                  {game.result === "W" ? "Win" : "Loss"}
                                </span>
                              ) : (
                                <span className="px-1.5 md:px-2 py-0.5 rounded bg-cobalt/20 text-cobalt text-[9px] md:text-[10px] font-display font-800 uppercase">
                                  Upcoming
                                </span>
                              )}
                            </div>

                            {/* Matchup: Legacy vs Opponent */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <span className="text-xs md:text-sm font-700 text-cobalt truncate">
                                  Legacy
                                </span>
                                <span className="font-display font-800 text-base md:text-lg text-white ml-2">
                                  {game.legacyScore !== null ? game.legacyScore : "–"}
                                </span>
                              </div>
                              <div className="flex items-center justify-between mt-0.5">
                                <span className="text-[11px] md:text-sm font-600 text-white/60 truncate mr-2">
                                  {game.opponent}
                                </span>
                                <span className="font-display font-800 text-base md:text-lg text-white/50 ml-2">
                                  {game.opponentScore !== null ? game.opponentScore : "–"}
                                </span>
                              </div>
                            </div>

                            {/* Meta: time + location */}
                            <div className="mt-1.5 md:mt-2.5 pt-1.5 md:pt-2 border-t border-white/5 flex items-center gap-2 text-[9px] md:text-[10px] text-white/40 overflow-hidden">
                              <span className="flex items-center gap-1 flex-shrink-0">
                                <Clock className="w-2.5 h-2.5 md:w-3 md:h-3" />
                                {game.date}
                              </span>
                              {game.location && (
                                <span className="flex items-center gap-1 truncate">
                                  <MapPin className="w-2.5 h-2.5 md:w-3 md:h-3 flex-shrink-0" />
                                  <span className="truncate">{game.location}</span>
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-navy-light border border-white/10 rounded-xl p-6 md:p-8 text-center">
            <Trophy className="w-8 h-8 text-cobalt mx-auto mb-3" />
            <p className="text-white/60 text-sm">
              Games are being loaded from Tourney Machine. Check back during game time for live scores.
            </p>
            <a
              href={liveTournament.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-cobalt text-sm font-700 hover:text-cobalt-light transition-colors"
            >
              View on Tourney Machine <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        )}

        {/* Tournament History */}
        <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-white/5">
          <h3 className="font-display font-800 text-xs uppercase tracking-wider text-white/40 mb-3 md:mb-4">
            Spring 2026 Tournament History
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {links?.filter((t) => t.status === "completed" && t.results).map((t, i) => (
              <a
                key={i}
                href={t.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-3 py-2.5 md:px-4 md:py-3 bg-navy-light border border-white/5 rounded-lg hover:border-cobalt/30 hover:bg-cobalt/5 transition-colors group"
              >
                <Trophy className="w-4 h-4 text-gold flex-shrink-0" />
                <div className="min-w-0">
                  <span className="block text-xs font-700 text-white truncate group-hover:text-cobalt transition-colors">
                    {t.name}
                  </span>
                  <span className="block text-[10px] text-white/40 truncate">{t.results}</span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Mobile CTA */}
        <div className="mt-4 md:hidden">
          <a
            href={liveTournament.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-red-500/15 border border-red-500/30 rounded-lg text-red-400 font-display font-700 text-xs uppercase tracking-wider"
          >
            View Full Bracket <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
