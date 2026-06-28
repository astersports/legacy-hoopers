/*
 * Subscribe / Add-to-calendar CTA card — reuses the existing downloadSchedule
 * + shareSchedule handlers (passed in, never modified). Cosmetic surface only.
 */
import { CalendarPlus, Share2, Bell } from "lucide-react";
import { Logo } from "@/components/Logo";

export function SubscribeCTA({
  onAdd, onShare, count,
}: { onAdd: () => void; onShare: () => void; count: number }) {
  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Logo tone="soft" className="h-9 w-9" />
          <div>
            <div className="text-base font-extrabold tracking-tight text-foreground">Never miss a tip-off</div>
            <div className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
              <Bell className="h-3 w-3 text-gold-text" />
              Add {count > 0 ? `all ${count} upcoming` : "the"} games to your calendar — they update automatically.
            </div>
          </div>
        </div>
        <div className="flex shrink-0 gap-2">
          <button
            onClick={onAdd}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-gold px-4 py-2.5 text-sm font-semibold text-navy shadow-sm transition-colors hover:bg-gold-light"
          >
            <CalendarPlus className="h-4 w-4" /> Add to calendar
          </button>
          <button
            onClick={onShare}
            aria-label="Share schedule"
            className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground shadow-sm transition-colors hover:bg-secondary"
          >
            <Share2 className="h-4 w-4" /> Share
          </button>
        </div>
      </div>
    </div>
  );
}
