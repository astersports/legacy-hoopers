/**
 * ThisWeekend — Embedded tournament section showing live/upcoming games
 * Fetches real-time data from Tourney Machine via the server-side scraper
 */
import { trpc } from "@/lib/trpc";
import { ExternalLink, Trophy, Clock, MapPin, Loader2 } from "lucide-react";

export default function ThisWeekend() {
  const { data: liveData, isLoading } = trpc.tournament.live.useQuery(undefined, {
    refetchInterval: 60000, // Refresh every 60 seconds
  });
  const { data: links } = trpc.tournament.links.useQuery();

  const liveTournament = links?.find((t) => t.status === "live");

  if (!liveTournament) return null;

  return (
    <section className="py-16 md:py-20 relative overflow-hidden">
      <div className="container relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
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
            <h2 className="font-display font-800 text-3xl md:text-4xl uppercase text-white">
              {liveTournament.name}
            </h2>
            <p className="text-white/50 text-sm mt-1">{liveTournament.dates}</p>
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

        {/* Games Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 text-cobalt animate-spin" />
            <span className="ml-3 text-white/50 text-sm">Loading live scores...</span>
          </div>
        ) : liveData && liveData.games.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {liveData.games.map((game, i) => (
              <div
                key={i}
                className={`bg-navy-light border rounded-xl p-4 ${
                  game.result === "W"
                    ? "border-green-500/30 bg-green-500/[0.03]"
                    : game.result === "L"
                    ? "border-red-500/20 bg-red-500/[0.02]"
                    : "border-white/10"
                }`}
              >
                {/* Game Header */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-display font-700 uppercase tracking-wider text-white/40">
                    {game.gameId}
                  </span>
                  {game.result !== "upcoming" ? (
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-display font-800 uppercase ${
                        game.result === "W"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {game.result === "W" ? "Win" : "Loss"}
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded bg-cobalt/20 text-cobalt text-[10px] font-display font-800 uppercase">
                      Upcoming
                    </span>
                  )}
                </div>

                {/* Teams & Score */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-700 ${game.legacyTeam.includes("Legacy") ? "text-cobalt" : "text-white/80"}`}>
                      {game.legacyTeam}
                    </span>
                    <span className="font-display font-800 text-lg text-white">
                      {game.legacyScore !== null ? game.legacyScore : "–"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-600 text-white/60">
                      {game.opponent}
                    </span>
                    <span className="font-display font-800 text-lg text-white/60">
                      {game.opponentScore !== null ? game.opponentScore : "–"}
                    </span>
                  </div>
                </div>

                {/* Game Meta */}
                <div className="mt-3 pt-3 border-t border-white/5 flex items-center gap-3 text-[10px] text-white/40">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {game.date}
                  </span>
                  {game.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {game.location}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-navy-light border border-white/10 rounded-xl p-8 text-center">
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

        {/* All Tournaments Link */}
        <div className="mt-8 pt-6 border-t border-white/5">
          <h3 className="font-display font-800 text-xs uppercase tracking-wider text-white/40 mb-4">
            Spring 2026 Tournament History
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {links?.filter((t) => t.status === "completed" && t.results).map((t, i) => (
              <a
                key={i}
                href={t.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 bg-navy-light border border-white/5 rounded-lg hover:border-cobalt/30 hover:bg-cobalt/5 transition-colors group"
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
        <div className="mt-6 md:hidden">
          <a
            href={liveTournament.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 bg-red-500/15 border border-red-500/30 rounded-lg text-red-400 font-display font-700 text-xs uppercase tracking-wider"
          >
            View Full Bracket <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
