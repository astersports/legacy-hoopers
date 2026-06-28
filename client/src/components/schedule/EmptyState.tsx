/*
 * Empty state — logo-watermarked card with brand-voice copy for when the
 * board has no live / upcoming / recent events. Cosmetic.
 */
import { CalendarRange } from "lucide-react";
import { Logo } from "@/components/Logo";

export function EmptyState() {
  return (
    <div className="relative mt-4 overflow-hidden rounded-2xl border border-border bg-card p-10 text-center shadow-sm">
      {/* watermark */}
      <Logo
        tone="plain"
        className="pointer-events-none absolute -right-6 -bottom-6 h-40 w-40 opacity-[0.04]"
      />
      <div className="relative">
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-gold-soft text-gold-text">
          <CalendarRange className="h-6 w-6" />
        </span>
        <h3 className="mt-4 text-lg font-extrabold tracking-tight text-foreground">No games on the board yet</h3>
        <p className="mx-auto mt-1.5 max-w-sm text-sm text-muted-foreground">
          Coach Kenny's cooking something up. Check back soon — or add the schedule to your
          calendar so you're the first to know when it drops.
        </p>
      </div>
    </div>
  );
}
