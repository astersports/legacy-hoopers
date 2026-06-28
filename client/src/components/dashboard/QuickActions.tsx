/*
 * QuickActions — 6 tappable tiles for the most common family actions.
 */
import { CalendarCheck, MessageSquare, Dumbbell, Video, CreditCard, MapPin, type LucideIcon } from "lucide-react";

type Action = { icon: LucideIcon; label: string };

const ACTIONS: Action[] = [
  { icon: CalendarCheck, label: "RSVP" },
  { icon: MessageSquare, label: "Message coach" },
  { icon: Dumbbell, label: "Book 1:1" },
  { icon: Video, label: "View film" },
  { icon: CreditCard, label: "Pay" },
  { icon: MapPin, label: "Directions" },
];

export function QuickActions() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {ACTIONS.map((a) => (
        <button
          key={a.label}
          type="button"
          className="group flex flex-col items-center gap-2 rounded-2xl border border-border bg-card p-4 text-center shadow-sm transition-transform duration-200 hover:-translate-y-0.5 hover:border-gold/40"
        >
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-gold-soft text-gold-text transition-colors group-hover:bg-gold group-hover:text-navy">
            <a.icon className="h-5 w-5" />
          </span>
          <span className="text-xs font-semibold text-foreground">{a.label}</span>
        </button>
      ))}
    </div>
  );
}
