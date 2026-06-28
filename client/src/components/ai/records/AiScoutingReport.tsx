/*
 * AiScoutingReport — COSMETIC AI feature. Pick a live team and "generate" a
 * scouting summary (strengths, tendencies, X-factor) revealed with a streamed
 * typewriter effect. No model call, no network — output is deterministically
 * derived from the live record by aiMock and clearly labeled "AI · cosmetic".
 */
import { useMemo, useState } from "react";
import { Brain, Sparkles, Target, TrendingUp, Zap } from "lucide-react";
import type { TeamRecord } from "@/lib/aster";
import { AiCard } from "./AiCard";
import { TeamPicker } from "./TeamPicker";
import { useTypewriter } from "./useTypewriter";
import { aiScoutingReport, aiConfidence } from "./aiMock";

function ChipList({ icon: Icon, title, items }: { icon: typeof Target; title: string; items: string[] }) {
  return (
    <div className="rounded-xl border border-border bg-secondary/40 p-4">
      <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-gold-text">
        <Icon className="h-3.5 w-3.5" aria-hidden /> {title}
      </div>
      <ul className="mt-2 space-y-1.5">
        {items.map((it) => (
          <li key={it} className="flex gap-2 text-sm text-foreground">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" aria-hidden />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function AiScoutingReport({ records }: { records: TeamRecord[] }) {
  const [selected, setSelected] = useState(records[0]?.name ?? "");
  const [runId, setRunId] = useState(0); // bump to re-stream the same team

  const team = useMemo(
    () => records.find((t) => t.name === selected) ?? records[0] ?? null,
    [records, selected],
  );

  const report = useMemo(() => (team ? aiScoutingReport(team) : null), [team]);
  // keying the typewriter on team + runId restarts the reveal on change/regenerate
  const streamKey = `${selected}:${runId}`;
  const { out, done } = useTypewriter(report?.summary ?? "", true, 95);

  if (!team || !report) return null;

  return (
    <AiCard
      icon={Brain}
      badgeIcon={Sparkles}
      title="AI Scouting Report"
      subtitle="Pick a team — the model drafts a scouting brief from their published games."
      action={
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <TeamPicker
            id="ai-scout-team"
            label="Team"
            records={records}
            value={selected}
            onChange={(name) => {
              setSelected(name);
              setRunId((n) => n + 1);
            }}
          />
          <button
            onClick={() => setRunId((n) => n + 1)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-navy px-4 py-2 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
          >
            <Zap className="h-4 w-4" aria-hidden /> Regenerate
          </button>
        </div>
      }
    >
      <div key={streamKey}>
        {/* Streamed summary with a blinking caret while typing */}
        <p className="min-h-[4.5rem] text-sm leading-relaxed text-foreground" aria-live="polite">
          <span className="inline-flex items-center gap-2 align-middle text-[11px] font-bold uppercase tracking-wider text-gold-text">
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: team.color }} aria-hidden />
            {team.name}
          </span>
          <br />
          {out}
          {!done && (
            <span className="ml-0.5 inline-block h-4 w-[2px] animate-pulse bg-gold align-middle" aria-hidden />
          )}
        </p>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <ChipList icon={Target} title="Strengths" items={report.strengths} />
          <ChipList icon={TrendingUp} title="Tendencies" items={report.tendencies} />
        </div>

        <div className="mt-3 rounded-xl border border-gold/30 bg-gold-soft/60 p-4">
          <div className="text-[11px] font-bold uppercase tracking-wider text-gold-text">X-Factor</div>
          <p className="mt-1 text-sm text-foreground">{report.xFactor}</p>
        </div>

        <p className="mt-3 text-[11px] text-muted-foreground">
          Model confidence {aiConfidence(team)}% · AI preview — generated from live records, not yet a real model.
        </p>
      </div>
    </AiCard>
  );
}
