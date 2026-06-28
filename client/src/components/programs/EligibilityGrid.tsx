/*
 * EligibilityGrid — age/grade quick-reference of which programs fit each band. (#9)
 */
import { ELIGIBILITY } from "./programsMeta";

export function EligibilityGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {ELIGIBILITY.map((row) => (
        <div
          key={row.band}
          className="rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
        >
          <span className="inline-flex rounded-full bg-gold-soft px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-gold-text ring-1 ring-gold/20">
            {row.band}
          </span>
          <div className="mt-3 text-lg font-extrabold tracking-tight text-foreground">
            {row.grades}
          </div>
          <div className="mt-1 text-sm text-muted-foreground">{row.fits}</div>
        </div>
      ))}
    </div>
  );
}
