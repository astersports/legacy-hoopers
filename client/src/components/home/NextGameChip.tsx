/*
 * NextGameChip — live countdown to the next scheduled game.
 * Computes the delta from a hardcoded near-future ISO date and ticks every minute.
 */
import { useEffect, useState } from "react";
import { CalendarClock } from "lucide-react";

function diff(target: number) {
  const ms = Math.max(0, target - Date.now());
  const d = Math.floor(ms / 86_400_000);
  const h = Math.floor((ms % 86_400_000) / 3_600_000);
  const m = Math.floor((ms % 3_600_000) / 60_000);
  return { d, h, m, done: ms === 0 };
}

export function NextGameChip({ date }: { date: string }) {
  const target = new Date(date).getTime();
  const [t, setT] = useState(() => diff(target));

  useEffect(() => {
    setT(diff(target));
    const id = setInterval(() => setT(diff(target)), 30_000);
    return () => clearInterval(id);
  }, [target]);

  return (
    <span
      className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-sm font-semibold text-gold-light ring-1 ring-white/10 backdrop-blur"
      aria-label={
        t.done
          ? "Next game is live"
          : `Next game in ${t.d} days, ${t.h} hours and ${t.m} minutes`
      }
    >
      <CalendarClock className="h-4 w-4" aria-hidden />
      <span className="text-white/60">Next game</span>
      {t.done ? (
        <span className="tabular-nums text-gold-light">Live now</span>
      ) : (
        <span className="tabular-nums text-white">
          {t.d}d {t.h}h {t.m}m
        </span>
      )}
    </span>
  );
}
