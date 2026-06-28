/*
 * Event-type color legend — small chips mirroring the EventRow badge palette
 * (Game / Practice / Tournament). Cosmetic key for the sticky filter bar.
 */
const LEGEND: { label: string; dot: string }[] = [
  { label: "Game", dot: "bg-primary" },
  { label: "Practice", dot: "bg-slate-400" },
  { label: "Tournament", dot: "bg-amber-500" },
];

export function TypeLegend() {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1" aria-label="Event type legend">
      {LEGEND.map((l) => (
        <span key={l.label} className="inline-flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground">
          <span className={`h-2 w-2 rounded-full ${l.dot}`} />
          {l.label}
        </span>
      ))}
    </div>
  );
}
