/*
 * AiCard — shared premium shell for the Programs page AI surfaces. Mirrors the
 * ai/dashboard/ AiCard language: a Sparkles/Brain icon badge, an "AI" Pill, and
 * a subtle gold gradient border (navy/gold p-[1.5px] wrapper). Cosmetic only —
 * nothing here calls a real model; the surfaces wire to Aster's AI later.
 */
import type { ReactNode } from "react";
import { type LucideIcon } from "lucide-react";
import { Pill } from "@/components/kit";

export function AiCard({
  icon: Icon,
  title,
  subtitle,
  pill = "AI",
  pillIcon,
  className = "",
  children,
}: {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  pill?: string;
  pillIcon?: LucideIcon;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`relative overflow-hidden rounded-3xl border border-gold/30 bg-card p-[1.5px] shadow-lg ${className}`}>
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-gold/30 via-transparent to-gold/10"
        aria-hidden
      />
      <div className="relative rounded-[calc(1.5rem-1.5px)] bg-card p-6 sm:p-7">
        <div className="flex items-start gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-navy text-gold-light shadow-sm">
            <Icon className="h-5 w-5" />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg font-extrabold tracking-tight text-foreground">{title}</h3>
              <Pill icon={pillIcon}>{pill}</Pill>
            </div>
            {subtitle && <p className="mt-0.5 text-sm text-muted-foreground">{subtitle}</p>}
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
