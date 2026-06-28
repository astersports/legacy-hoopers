/*
 * AiCard — the shared shell for every cosmetic-AI surface on the Records page.
 * A light card wrapped in a subtle gold gradient border, with a Sparkles/Brain
 * lead icon, a title, and an "AI" Pill so the feature is unmistakably labeled
 * as AI. Presentation only — wraps children, holds no data logic.
 */
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { Pill } from "@/components/kit";

export function AiCard({
  icon: Icon,
  title,
  subtitle,
  badge = "AI",
  badgeIcon,
  action,
  children,
  className = "",
}: {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  badge?: string;
  badgeIcon?: LucideIcon;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    // The gradient border is a 1px gold→transparent ring via a padding wrapper.
    <div
      className={`rounded-2xl bg-gradient-to-br from-gold/40 via-gold/10 to-transparent p-px shadow-sm ${className}`}
    >
      <div className="rounded-2xl bg-card p-5 sm:p-6">
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

        {action && <div className="mt-4">{action}</div>}
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}
