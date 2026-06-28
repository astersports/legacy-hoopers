/*
 * FormDots — a "last 5" form strip of colored W/L/T dots, oldest → newest.
 * Presentation only; consumes already-derived results.
 */
import type { GameRecord } from "@/lib/aster";

const DOT: Record<"W" | "L" | "T", string> = {
  W: "bg-emerald-500",
  L: "bg-rose-500",
  T: "bg-slate-400",
};

export function FormDots({ results }: { results: GameRecord["result"][] }) {
  if (results.length === 0) return null;
  return (
    <div className="flex items-center gap-1" aria-label={`Recent form: ${results.map((r) => r ?? "·").join(" ")}`}>
      <span className="mr-1 hidden text-[10px] font-semibold uppercase tracking-wider text-muted-foreground sm:inline">
        Last {results.length}
      </span>
      {results.map((r, i) => (
        <span
          key={i}
          title={r ?? "Unrecorded"}
          className={`h-2.5 w-2.5 rounded-full ring-1 ring-inset ring-black/5 ${r ? DOT[r] : "bg-slate-200"}`}
        />
      ))}
    </div>
  );
}
