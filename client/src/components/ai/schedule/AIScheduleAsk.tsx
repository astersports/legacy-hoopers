/*
 * "Ask about the schedule" — natural-language box with suggested prompts and a
 * faux, streamed answer.
 *
 * COSMETIC / MOCK: answers are composed locally from already-computed schedule
 * arrays (upcoming / recent / next) — no model call, no network. It showcases
 * the future conversational schedule assistant. Real Q&A is wired later.
 */
import { useMemo, useState } from "react";
import { Sparkles, Send, CalendarClock, MapPin, Trophy } from "lucide-react";
import { type ScheduleEvent, fmtDateHeader, fmtTime } from "@/lib/schedule";
import { AICard, useTypewriter, ThinkingDots } from "./aiKit";

type Suggestion = { icon: typeof CalendarClock; q: string };

function answerFor(
  q: string,
  data: { upcoming: ScheduleEvent[]; recent: ScheduleEvent[]; next: ScheduleEvent | null; now: number },
): string {
  const ql = q.toLowerCase();
  const { upcoming, recent, next, now } = data;

  if (ql.includes("next") || ql.includes("when")) {
    if (!next) return "There's nothing on the upcoming board right now. I'll surface the next game here the moment it's scheduled.";
    const opp = next.opponent ? ` vs. ${next.opponent}` : "";
    const where = next.location_name ? ` at ${next.location_name}` : "";
    return `Your next game is ${next.team_name}${opp} on ${fmtDateHeader(next.start_at, now)} at ${fmtTime(next.start_at)}${where}. Plan to arrive about 45 minutes early for warm-ups.`;
  }
  if (ql.includes("week") || ql.includes("how many")) {
    const n = upcoming.length;
    return `There ${n === 1 ? "is" : "are"} ${n} upcoming ${n === 1 ? "event" : "events"} on the board. The soonest is ${next ? `${next.team_name} on ${fmtDateHeader(next.start_at, now)}` : "still to be scheduled"}.`;
  }
  if (ql.includes("where") || ql.includes("location") || ql.includes("venue")) {
    if (!next) return "No venue to point you to yet — once the next game is scheduled, I'll give you directions and a leave-by time.";
    return `${next.location_name ?? "The venue"} hosts your next game. Check the Travel & leave-by card above for the recommended departure time.`;
  }
  if (ql.includes("won") || ql.includes("record") || ql.includes("result") || ql.includes("last")) {
    const wins = recent.filter((e) => e.result === "W").length;
    const last = recent[0];
    const lastLine = last && last.result
      ? ` Most recently: ${last.team_name} ${last.result} ${last.our_score ?? ""}–${last.opponent_score ?? ""}.`
      : "";
    return `Across the last ${recent.length} result${recent.length === 1 ? "" : "s"}, your teams have ${wins} win${wins === 1 ? "" : "s"}.${lastLine}`;
  }
  return `I can answer questions about your upcoming games, venues, travel times, and recent results. Try one of the suggestions below — full conversational search is on the way.`;
}

const SUGGESTIONS: Suggestion[] = [
  { icon: CalendarClock, q: "When is my next game?" },
  { icon: MapPin, q: "Where are we playing next?" },
  { icon: Trophy, q: "How did we do recently?" },
];

export function AIScheduleAsk({
  upcoming,
  recent,
  next,
  now,
}: {
  upcoming: ScheduleEvent[];
  recent: ScheduleEvent[];
  next: ScheduleEvent | null;
  now: number;
}) {
  const [draft, setDraft] = useState("");
  const [asked, setAsked] = useState<string | null>(null);

  const answer = useMemo(
    () => (asked ? answerFor(asked, { upcoming, recent, next, now }) : ""),
    [asked, upcoming, recent, next, now],
  );
  const { out, done } = useTypewriter(answer, 12, !!asked);

  function submit(q: string) {
    const trimmed = q.trim();
    if (!trimmed) return;
    setAsked(trimmed);
    setDraft("");
  }

  return (
    <AICard icon={Sparkles} title="Ask about the schedule" badge="AI Beta">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit(draft);
        }}
        className="flex items-center gap-2"
      >
        <label htmlFor="ai-schedule-ask" className="sr-only">
          Ask a question about the schedule
        </label>
        <input
          id="ai-schedule-ask"
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Ask anything about your schedule…"
          className="h-11 min-w-0 flex-1 rounded-xl border border-border bg-secondary/50 px-3.5 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-gold focus:ring-2 focus:ring-gold/30"
        />
        <button
          type="submit"
          aria-label="Ask"
          className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
          disabled={!draft.trim()}
        >
          <Send className="h-4 w-4" aria-hidden="true" />
        </button>
      </form>

      <div className="mt-2.5 flex flex-wrap gap-1.5">
        {SUGGESTIONS.map((s) => (
          <button
            key={s.q}
            type="button"
            onClick={() => submit(s.q)}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold text-muted-foreground transition-colors hover:border-gold/40 hover:bg-secondary hover:text-foreground"
          >
            <s.icon className="h-3 w-3 text-gold-text" aria-hidden="true" /> {s.q}
          </button>
        ))}
      </div>

      {asked && (
        <div className="mt-3.5 rounded-xl border border-border bg-secondary/40 p-3.5" aria-live="polite">
          <div className="text-[11px] font-bold uppercase tracking-wide text-gold-text">You asked</div>
          <div className="mt-0.5 text-sm font-semibold text-foreground">{asked}</div>
          <div className="mt-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
            <Sparkles className="h-3 w-3 text-gold" aria-hidden="true" /> Aster AI
          </div>
          <p className="mt-1 min-h-[2.5rem] text-sm leading-relaxed text-foreground">
            {out}
            {!done && (
              <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 bg-gold motion-safe:animate-pulse" aria-hidden="true" />
            )}
          </p>
          {!done && (
            <div className="mt-1 flex items-center gap-2 text-[11px] font-semibold text-muted-foreground">
              <ThinkingDots /> thinking…
            </div>
          )}
        </div>
      )}
    </AICard>
  );
}
