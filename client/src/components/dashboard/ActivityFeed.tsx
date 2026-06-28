/*
 * ActivityFeed — recent-activity timeline of 5 events with icons + timestamps.
 */
import { CalendarCheck, Dumbbell, Film, MessageSquare, CreditCard, type LucideIcon } from "lucide-react";

type Activity = { icon: LucideIcon; text: string; when: string; tone: string };

const FEED: Activity[] = [
  { icon: CalendarCheck, text: "RSVP'd “Going” to vs. Rivertown Elite", when: "2h ago", tone: "bg-emerald-50 text-emerald-600" },
  { icon: Dumbbell, text: "Attended finishing skills clinic", when: "Yesterday", tone: "bg-blue-50 text-blue-600" },
  { icon: Film, text: "New film added — counter moves off the catch", when: "2 days ago", tone: "bg-gold-soft text-gold-text" },
  { icon: MessageSquare, text: "Coach Darien left a note on your shooting form", when: "3 days ago", tone: "bg-primary/10 text-primary" },
  { icon: CreditCard, text: "Autopay processed — Spring season installment", when: "5 days ago", tone: "bg-violet-50 text-violet-600" },
];

export function ActivityFeed() {
  return (
    <ol className="relative space-y-4 pl-2">
      {FEED.map((a, i) => (
        <li key={i} className="relative flex items-start gap-3 pl-6">
          {i < FEED.length - 1 && (
            <span className="absolute left-[15px] top-9 h-[calc(100%-1rem)] w-px bg-border" aria-hidden />
          )}
          <span className={`relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full ${a.tone}`}>
            <a.icon className="h-4 w-4" />
          </span>
          <div className="min-w-0 flex-1 pt-1">
            <p className="text-sm font-medium text-foreground">{a.text}</p>
            <p className="text-xs text-muted-foreground">{a.when}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
