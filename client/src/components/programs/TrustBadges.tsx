/*
 * TrustBadges — safety/credential reassurance row. (#5)
 */
import { ShieldCheck, UserCheck, GraduationCap, BadgeCheck, type LucideIcon } from "lucide-react";
import { TRUST_BADGES } from "./programsMeta";

const ICONS: LucideIcon[] = [ShieldCheck, UserCheck, GraduationCap, BadgeCheck];

export function TrustBadges() {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {TRUST_BADGES.map((b, i) => {
        const Icon = ICONS[i];
        return (
          <div
            key={b.label}
            className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gold-soft text-gold-text">
              <Icon className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <div className="truncate text-sm font-bold text-foreground">{b.label}</div>
              <div className="truncate text-xs text-muted-foreground">{b.sub}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
