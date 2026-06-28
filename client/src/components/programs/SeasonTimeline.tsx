/*
 * SeasonTimeline — 4-col band showing which program leads each season. (#4)
 */
import { SEASON_TIMELINE } from "./programsMeta";

export function SeasonTimeline() {
  return (
    <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border shadow-sm sm:grid-cols-2 lg:grid-cols-4">
      {SEASON_TIMELINE.map((b) => (
        <div
          key={b.season}
          className="flex flex-col bg-card p-6 transition-colors hover:bg-secondary/40"
        >
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold-text">
            {b.season}
          </span>
          <span className="mt-2 text-lg font-extrabold tracking-tight text-foreground">
            {b.program}
          </span>
          <span className="mt-1 text-sm text-muted-foreground">{b.note}</span>
        </div>
      ))}
    </div>
  );
}
