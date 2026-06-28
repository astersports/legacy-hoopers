/*
 * HighlightCallout — a light card spotlighting the program's top team and its
 * hottest current win streak, above the standings list. Presentation only.
 */
import { Crown, Flame } from "lucide-react";
import type { TeamRecord } from "@/lib/aster";
import { winRate } from "./recordsUtils";

function Spotlight({
  icon: Icon,
  eyebrow,
  team,
  detail,
}: {
  icon: typeof Crown;
  eyebrow: string;
  team: TeamRecord;
  detail: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-sm transition-transform hover:-translate-y-0.5">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gold-soft ring-1 ring-gold/20">
        <Icon className="h-5 w-5 text-gold-text" />
      </span>
      <div className="min-w-0">
        <div className="text-[11px] font-bold uppercase tracking-wider text-gold-text">{eyebrow}</div>
        <div className="flex items-center gap-2 truncate">
          <span className="h-3 w-1 rounded-full" style={{ backgroundColor: team.color }} />
          <span className="truncate font-bold tracking-tight text-foreground">{team.name}</span>
        </div>
        <div className="text-xs text-muted-foreground">{detail}</div>
      </div>
    </div>
  );
}

export function HighlightCallout({
  top,
  hottest,
}: {
  top: TeamRecord | null;
  hottest: { team: TeamRecord; streak: number } | null;
}) {
  if (!top) return null;
  return (
    <div className="mb-6 grid gap-3 sm:grid-cols-2">
      <Spotlight
        icon={Crown}
        eyebrow="Top team"
        team={top}
        detail={`${Math.round(winRate(top) * 100)}% win rate · ${top.wins}–${top.losses}${top.ties > 0 ? `–${top.ties}` : ""}`}
      />
      {hottest && (
        <Spotlight
          icon={Flame}
          eyebrow="Best streak"
          team={hottest.team}
          detail={`${hottest.streak} straight wins — and counting`}
        />
      )}
    </div>
  );
}
