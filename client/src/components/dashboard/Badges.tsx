/*
 * Badges — achievements row. Earned badges glow gold, locked ones are gray.
 */
import { Award, Flame, Target, Trophy, Zap, Lock, Star, type LucideIcon } from "lucide-react";

type Badge = { icon: LucideIcon; label: string; earned: boolean };

const BADGES: Badge[] = [
  { icon: Flame, label: "7-week streak", earned: true },
  { icon: Target, label: "Sharpshooter", earned: true },
  { icon: Trophy, label: "Champion", earned: true },
  { icon: Zap, label: "Hustle award", earned: true },
  { icon: Star, label: "MVP week", earned: false },
  { icon: Award, label: "100 sessions", earned: false },
];

export function Badges() {
  return (
    <div className="flex flex-wrap gap-2.5">
      {BADGES.map((b) => {
        const Icon = b.earned ? b.icon : Lock;
        return (
          <div
            key={b.label}
            className={`inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-semibold ring-1 transition-transform duration-200 hover:-translate-y-0.5 ${
              b.earned
                ? "bg-gold-soft text-gold-text ring-gold/30"
                : "bg-secondary text-muted-foreground ring-border"
            }`}
            aria-label={`${b.label} — ${b.earned ? "earned" : "locked"}`}
          >
            <Icon className="h-4 w-4" />
            {b.label}
          </div>
        );
      })}
    </div>
  );
}
