/*
 * CoachNote — a quoted feedback note from the coach with an avatar initial.
 */
import { Quote } from "lucide-react";

export function CoachNote() {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-transform duration-200 hover:-translate-y-0.5">
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-navy text-base font-extrabold text-gold-light">
          D
        </span>
        <div>
          <div className="text-sm font-bold text-foreground">Coach Darien</div>
          <div className="text-xs text-muted-foreground">Skills &amp; Development</div>
        </div>
      </div>
      <blockquote className="relative mt-4 pl-7 text-sm leading-relaxed text-foreground">
        <Quote className="absolute left-0 top-0 h-5 w-5 text-gold/40" aria-hidden />
        Huge jump in your footwork this week — your finishing off the catch is looking
        college-level. Keep attacking that low shoulder and we&apos;ll get the free-throw number up next.
      </blockquote>
      <div className="mt-4 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
        After 1:1 · Player Lab
      </div>
    </div>
  );
}
