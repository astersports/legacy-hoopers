/*
 * AiFilmCard — shared shell for every cosmetic-AI surface in the film room.
 * A light card wrapped in a subtle gold gradient border, with a lead icon, a
 * title, and an "AI" Pill so the feature is unmistakably labeled as AI.
 * Presentation only — wraps children, holds no data logic. (Local to the
 * Highlights AI showcase so this page's AI surfaces stay self-contained.)
 */
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { Pill } from "@/components/kit";

export function AiFilmCard({
  icon: Icon,
  title,
  subtitle,
  badge = "AI",
  badgeIcon,
  children,
  className = "",
}: {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  badge?: string;
  badgeIcon?: LucideIcon;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl bg-gradient-to-br from-gold/40 via-gold/10 to-transparent p-px shadow-sm ${className}`}
    >
      <div className="flex h-full flex-col rounded-2xl bg-card p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gold-soft ring-1 ring-gold/20">
              <Icon className="h-5 w-5 text-gold-text" aria-hidden />
            </span>
            <div className="min-w-0">
              <h3 className="text-base font-bold tracking-tight text-foreground sm:text-lg">{title}</h3>
              {subtitle && <p className="mt-0.5 text-sm text-muted-foreground">{subtitle}</p>}
            </div>
          </div>
          <Pill icon={badgeIcon}>{badge}</Pill>
        </div>
        <div className="mt-4 flex-1">{children}</div>
      </div>
    </div>
  );
}
