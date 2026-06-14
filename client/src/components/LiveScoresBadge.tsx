/**
 * LiveScoresBadge — Pulsing badge that links to the active tournament on Tourney Machine
 * Shows when there's a live tournament happening
 */
import { trpc } from "@/lib/trpc";
import { ExternalLink, Radio } from "lucide-react";

export default function LiveScoresBadge({ variant = "full" }: { variant?: "full" | "compact" }) {
  const { data: links } = trpc.tournament.links.useQuery();

  const liveTournament = links?.find((t) => t.status === "live");

  if (!liveTournament) return null;

  if (variant === "compact") {
    return (
      <a
        href={liveTournament.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-500/15 border border-red-500/30 rounded-full hover:bg-red-500/25 transition-colors group"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
        </span>
        <span className="font-display font-700 text-[10px] uppercase tracking-wider text-red-400 group-hover:text-red-300">
          Live Scores
        </span>
      </a>
    );
  }

  return (
    <a
      href={liveTournament.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-4 px-5 py-4 bg-gradient-to-r from-red-500/10 via-red-500/5 to-transparent border border-red-500/20 rounded-xl hover:border-red-500/40 hover:bg-red-500/15 transition-all group"
    >
      <div className="flex items-center gap-3 flex-1">
        <div className="relative">
          <Radio className="w-5 h-5 text-red-400" />
          <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
          </span>
        </div>
        <div>
          <span className="block font-display font-800 text-sm uppercase tracking-wide text-white group-hover:text-red-100">
            {liveTournament.name}
          </span>
          <span className="block text-xs text-white/50 mt-0.5">
            {liveTournament.dates} · Live on Tourney Machine
          </span>
        </div>
      </div>
      <div className="flex items-center gap-1.5 text-red-400 group-hover:text-red-300">
        <span className="font-display font-700 text-xs uppercase tracking-wider">View Scores</span>
        <ExternalLink className="w-3.5 h-3.5" />
      </div>
    </a>
  );
}
