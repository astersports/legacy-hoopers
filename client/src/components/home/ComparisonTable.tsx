/*
 * ComparisonTable — "Why Aster vs. a typical rec league". Two-column
 * check/cross table: Aster gets gold checks, the typical league gets gray dashes.
 */
import { Check, Minus } from "lucide-react";

const ROWS = [
  "Individual development plan per athlete",
  "Live game film & shareable highlights",
  "One app for schedule, weather & payments",
  "SafeSport-certified, background-checked staff",
  "College-prep & recruiting pathway",
  "Live stats and progress tracking",
];

export function ComparisonTable() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="grid grid-cols-[1fr_auto_auto] items-center gap-x-4 border-b border-border bg-secondary/40 px-5 py-4 sm:px-7">
        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
          What you get
        </span>
        <span className="w-16 text-center text-xs font-bold uppercase tracking-wide text-gold-text sm:w-24">
          Aster
        </span>
        <span className="w-16 text-center text-xs font-bold uppercase tracking-wide text-muted-foreground sm:w-24">
          Typical
        </span>
      </div>
      <ul>
        {ROWS.map((row, i) => (
          <li
            key={row}
            className={`grid grid-cols-[1fr_auto_auto] items-center gap-x-4 px-5 py-4 sm:px-7 ${
              i !== ROWS.length - 1 ? "border-b border-border" : ""
            }`}
          >
            <span className="text-sm font-medium text-foreground">{row}</span>
            <span className="flex w-16 justify-center sm:w-24">
              <span
                className="grid h-7 w-7 place-items-center rounded-full bg-gold-soft"
                aria-label="Included with Aster"
              >
                <Check className="h-4 w-4 text-gold-text" />
              </span>
            </span>
            <span className="flex w-16 justify-center sm:w-24">
              <span
                className="grid h-7 w-7 place-items-center rounded-full bg-secondary"
                aria-label="Not included at a typical league"
              >
                <Minus className="h-4 w-4 text-muted-foreground" />
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
