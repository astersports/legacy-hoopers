/*
 * AskAsterBar — cosmetic "Ask Aster AI" conversational assistant.
 *
 * A premium chat input with suggested prompts. Submitting a prompt plays a
 * faux "streamed" answer (typed out word-by-word) — NO real API call. This is
 * a showcase of the platform's future conversational assistant; the visible
 * "AI · Beta" treatment makes clear it is an AI surface.
 */
import { useEffect, useRef, useState } from "react";
import { Sparkles, ArrowUp, Bot } from "lucide-react";
import { Pill } from "@/components/kit";

/** Suggested prompts a family might ask the assistant. */
const SUGGESTIONS = [
  "Which program fits my 9-year-old?",
  "When's the next tryout?",
  "How does 1:1 training work?",
  "What does a season cost?",
] as const;

/** Canned, deterministic answers keyed by suggestion (cosmetic — no model call). */
const ANSWERS: Record<string, string> = {
  "Which program fits my 9-year-old?":
    "For a 9-year-old just getting started, our Skill Clinics build a complete base with small coach-to-player ratios. If they're already competitive, AAU Travel Teams are the next step — both track progress right in the Aster app.",
  "When's the next tryout?":
    "AAU tryouts run on a rolling basis through the season. Join the interest list and we'll text you the next date for your athlete's age group — usually within two weeks.",
  "How does 1:1 training work?":
    "Private sessions pair your athlete with a master-trained coach who builds a custom growth plan. Each session ends with a video breakdown, and progress is tracked session-over-session in-app.",
  "What does a season cost?":
    "It depends on the path — clinics start at $40/session, camps from $149, and AAU is billed per season with flexible autopay plans. The program finder below can map a plan to your athlete.",
};

const DEFAULT_ANSWER =
  "Great question. Our coaches build a development plan around your athlete's age and goals — share a few details and Aster will point you to the best-fit program, schedule and pricing.";

function answerFor(prompt: string): string {
  return ANSWERS[prompt] ?? DEFAULT_ANSWER;
}

export function AskAsterBar() {
  const [value, setValue] = useState("");
  const [question, setQuestion] = useState<string | null>(null);
  const [shown, setShown] = useState("");
  const [streaming, setStreaming] = useState(false);
  const liveRef = useRef<HTMLDivElement>(null);

  // Faux streaming: reveal the answer word-by-word. Respects reduced motion by
  // rendering the full answer immediately.
  useEffect(() => {
    if (question === null) return;
    const full = answerFor(question);
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setShown(full);
      setStreaming(false);
      return;
    }
    const words = full.split(" ");
    let i = 0;
    setShown("");
    setStreaming(true);
    const id = window.setInterval(() => {
      i += 1;
      setShown(words.slice(0, i).join(" "));
      if (i >= words.length) {
        window.clearInterval(id);
        setStreaming(false);
      }
    }, 38);
    return () => window.clearInterval(id);
  }, [question]);

  function ask(prompt: string) {
    const q = prompt.trim();
    if (!q) return;
    setValue(q);
    setQuestion(q);
  }

  return (
    <div className="relative overflow-hidden rounded-3xl border border-gold/30 bg-card p-[1.5px] shadow-lg">
      {/* subtle gold gradient border */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-gold/30 via-transparent to-gold/10" aria-hidden />
      <div className="relative rounded-[calc(1.5rem-1.5px)] bg-card p-6 sm:p-8">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-navy text-gold-light shadow-sm">
            <Bot className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-extrabold tracking-tight text-foreground">Ask Aster AI</h3>
              <Pill icon={Sparkles}>Beta</Pill>
            </div>
            <p className="text-sm text-muted-foreground">
              Your AI guide to programs, schedules and pricing.
            </p>
          </div>
        </div>

        {/* Input */}
        <form
          className="mt-5"
          onSubmit={(e) => {
            e.preventDefault();
            ask(value);
          }}
        >
          <div className="flex items-center gap-2 rounded-2xl border border-border bg-secondary/40 p-1.5 focus-within:ring-2 focus-within:ring-gold">
            <label htmlFor="ask-aster-input" className="sr-only">
              Ask Aster AI a question
            </label>
            <input
              id="ask-aster-input"
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Ask anything about Aster Sports…"
              className="min-h-[44px] flex-1 bg-transparent px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground"
            />
            <button
              type="submit"
              aria-label="Ask Aster AI"
              disabled={!value.trim()}
              className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gold text-navy shadow-sm transition-colors hover:bg-gold-light disabled:opacity-40"
            >
              <ArrowUp className="h-5 w-5" />
            </button>
          </div>
        </form>

        {/* Suggested prompts */}
        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Suggested questions">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => ask(s)}
              className="min-h-[36px] rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-semibold text-foreground transition-colors hover:border-gold/40 hover:bg-gold-soft hover:text-gold-text"
            >
              {s}
            </button>
          ))}
        </div>

        {/* Faux streamed answer */}
        {question !== null && (
          <div
            ref={liveRef}
            aria-live="polite"
            className="mt-5 rounded-2xl border border-border bg-secondary/30 p-4"
          >
            <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-gold-text">
              <Sparkles className="h-3.5 w-3.5" />
              Aster AI
            </div>
            <p className="mt-2 text-sm leading-relaxed text-foreground">
              {shown}
              {streaming && (
                <span className="ml-0.5 inline-block h-4 w-[2px] animate-pulse bg-gold align-text-bottom" aria-hidden />
              )}
            </p>
            <p className="mt-3 text-[11px] text-muted-foreground">
              Aster AI is a preview. Answers are illustrative — confirm details with a coach.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
