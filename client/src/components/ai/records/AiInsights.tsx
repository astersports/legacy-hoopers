/*
 * AiInsights — COSMETIC AI feature. A strip of "AI-detected" smart-tag chips
 * per team (win streaks, hot/cold form, profile notes) derived from the live
 * records by aiMock. No model, no network — clearly labeled "AI insights".
 */
import { Brain, Flame, Info, Eye, Sparkles } from "lucide-react";
import type { TeamRecord } from "@/lib/aster";
import { AiCard } from "./AiCard";
import { aiInsights, type SmartInsight } from "./aiMock";

function toneClass(tone: SmartInsight["tone"]): string {
  switch (tone) {
    case "hot":
      return "bg-gold-soft text-gold-text ring-gold/30";
    case "watch":
      return "bg-rose-50 text-rose-700 ring-rose-600/20";
    case "info":
    default:
      return "bg-secondary text-foreground ring-border";
  }
}

function toneIcon(tone: SmartInsight["tone"]) {
  switch (tone) {
    case "hot":
      return Flame;
    case "watch":
      return Eye;
    default:
      return Info;
  }
}

export function AiInsights({ records }: { records: TeamRecord[] }) {
  if (records.length === 0) return null;

  return (
    <AiCard
      icon={Brain}
      badgeIcon={Sparkles}
      title="AI-Detected Insights"
      subtitle="The model scans every team's published games and flags what stands out."
    >
      <ul className="space-y-3">
        {records.map((team) => {
          const insights = aiInsights(team);
          return (
            <li key={team.name} className="flex flex-col gap-2 border-b border-border/60 pb-3 last:border-0 last:pb-0 sm:flex-row sm:items-center">
              <div className="flex shrink-0 items-center gap-2 sm:w-40">
                <span className="h-3 w-1.5 rounded-full" style={{ backgroundColor: team.color }} aria-hidden />
                <span className="truncate text-sm font-bold tracking-tight text-foreground">{team.name}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {insights.map((ins) => {
                  const Icon = toneIcon(ins.tone);
                  return (
                    <span
                      key={ins.label}
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${toneClass(ins.tone)}`}
                    >
                      <Icon className="h-3 w-3" aria-hidden />
                      {ins.label}
                    </span>
                  );
                })}
              </div>
            </li>
          );
        })}
      </ul>
      <p className="mt-3 text-[11px] text-muted-foreground">
        AI insights — pattern flags derived from live records. Cosmetic preview; not yet wired to a model.
      </p>
    </AiCard>
  );
}
