/*
 * WinRateBar — a slim horizontal win-rate meter tinted with the team color.
 * Pure presentation: takes a 0..1 rate.
 */
export function WinRateBar({ rate, color }: { rate: number; color: string }) {
  const pct = Math.round(rate * 100);
  return (
    <div className="flex items-center gap-2">
      <div
        className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Win rate ${pct}%`}
      >
        <div
          className="h-full rounded-full transition-[width] duration-700 ease-out"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
      <span className="w-10 shrink-0 text-right text-xs font-bold tabular-nums text-foreground">
        {pct}%
      </span>
    </div>
  );
}
