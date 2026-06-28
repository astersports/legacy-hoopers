/*
 * Design kit — small composable primitives that give every page the same
 * Aster visual language (navy ink, gold accent, cool-gray surfaces).
 */
import type { ReactNode } from "react";
import { Link } from "wouter";
import { ArrowRight, type LucideIcon } from "lucide-react";
import AnimatedCounter from "@/components/AnimatedCounter";

type Tone = "light" | "muted" | "navy";

export function Section({
  tone = "light",
  className = "",
  children,
}: {
  tone?: Tone;
  className?: string;
  children: ReactNode;
}) {
  const bg =
    tone === "navy"
      ? "hero-navy text-white"
      : tone === "muted"
        ? "bg-secondary/30 border-y border-border"
        : "bg-background";
  return (
    <section className={`${bg} ${className}`}>
      <div className="container py-16 sm:py-20">{children}</div>
    </section>
  );
}

export function Eyebrow({ children, onDark = false }: { children: ReactNode; onDark?: boolean }) {
  return (
    <span
      className={`text-[11px] font-bold uppercase tracking-[0.2em] ${
        onDark ? "text-gold-light" : "text-gold-text"
      }`}
    >
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  onDark = false,
  action,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  onDark?: boolean;
  action?: { href: string; label: string };
}) {
  return (
    <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        {eyebrow && <Eyebrow onDark={onDark}>{eyebrow}</Eyebrow>}
        <h2
          className={`mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl ${
            onDark ? "text-white" : "text-foreground"
          }`}
        >
          {title}
        </h2>
        {subtitle && (
          <p className={`mt-3 text-base ${onDark ? "text-white/70" : "text-muted-foreground"}`}>
            {subtitle}
          </p>
        )}
      </div>
      {action && (
        <Link
          href={action.href}
          className={`inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold hover:underline ${
            onDark ? "text-gold-light" : "text-gold-text"
          }`}
        >
          {action.label} <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}

export function Pill({
  icon: Icon,
  children,
  onDark = false,
}: {
  icon?: LucideIcon;
  children: ReactNode;
  onDark?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${
        onDark
          ? "bg-white/10 text-gold-light ring-1 ring-white/10"
          : "bg-gold-soft text-gold-text ring-1 ring-gold/20"
      }`}
    >
      {Icon && <Icon className="h-3.5 w-3.5" />}
      {children}
    </span>
  );
}

export function StatTile({
  value,
  label,
  suffix,
  prefix,
  decimals,
  onDark = false,
}: {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  onDark?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-5 ${
        onDark ? "border-white/10 bg-white/5 backdrop-blur" : "border-border bg-card shadow-sm"
      }`}
    >
      <div
        className={`stat-glow text-3xl font-extrabold tabular-nums sm:text-4xl ${
          onDark ? "text-white" : "text-foreground"
        }`}
      >
        <AnimatedCounter end={value} prefix={prefix} suffix={suffix} decimals={decimals} />
      </div>
      <div className={`mt-1 text-xs uppercase tracking-wider ${onDark ? "text-white/60" : "text-muted-foreground"}`}>
        {label}
      </div>
    </div>
  );
}

/** Primary (gold) and ghost button styles as className helpers. */
export const btnGold =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-gold px-5 py-3 text-sm font-semibold text-navy shadow-sm transition-colors hover:bg-gold-light";
export const btnNavy =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-opacity hover:opacity-90";
export const btnGhostLight =
  "inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground shadow-sm transition-colors hover:bg-secondary";
export const btnGhostDark =
  "inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10";
