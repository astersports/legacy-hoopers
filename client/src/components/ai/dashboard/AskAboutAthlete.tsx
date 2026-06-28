/*
 * AskAboutAthlete — a cosmetic natural-language query box scoped to the family's
 * own athlete ("Ask about Maya"). Suggested questions + a faux streamed answer
 * typed word-by-word. NO API calls — answers are canned and deterministic.
 * Respects prefers-reduced-motion (full answer rendered instantly). Visible
 * "AI" treatment makes the surface clearly an AI feature.
 */
import { useEffect, useRef, useState } from "react";
import { Bot, Sparkles, ArrowUp } from "lucide-react";
import { AiCard } from "./AiCard";

const SUGGESTIONS = [
  "How is Maya progressing this month?",
  "What should she work on next?",
  "Is she ready to move up an age group?",
  "How's her attendance trending?",
] as const;

const ANSWERS: Record<string, string> = {
  "How is Maya progressing this month?":
    "Maya's up across the board — shooting % climbed to 58 (from 49), and her practice minutes are at a season high. The biggest jump was finishing off the catch. She's in the top 12% of her age group for development pace.",
  "What should she work on next?":
    "Free-throw repeatability under fatigue is the clearest unlock — adding 50 reps after each session should lift the number fastest. Defensive closeouts are the one area trailing her overall curve.",
  "Is she ready to move up an age group?":
    "The model puts her readiness at 88%. Her skills and IQ are tracking ahead of her current group; one more strong block of strength work and she'd be a clean fit for the 11U skills clinic.",
  "How's her attendance trending?":
    "Excellent — 94% this season and climbing. Consistent attendance is one of the strongest signals in her growth projection, and it's currently a top-quartile strength.",
};

const DEFAULT_ANSWER =
  "Maya's trajectory looks strong this season — steady skill gains, top-tier attendance and a balanced training load. Ask about a specific skill, her schedule or what to work on next and Aster will break it down.";

function answerFor(prompt: string): string {
  return ANSWERS[prompt] ?? DEFAULT_ANSWER;
}

export function AskAboutAthlete() {
  const [value, setValue] = useState("");
  const [question, setQuestion] = useState<string | null>(null);
  const [shown, setShown] = useState("");
  const [streaming, setStreaming] = useState(false);
  const liveRef = useRef<HTMLDivElement>(null);

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
    <AiCard
      icon={Bot}
      pillIcon={Sparkles}
      title="Ask about Maya"
      subtitle="Natural-language answers about your athlete"
    >
      <form
        className="mt-5"
        onSubmit={(e) => {
          e.preventDefault();
          ask(value);
        }}
      >
        <div className="flex items-center gap-2 rounded-2xl border border-border bg-secondary/40 p-1.5 focus-within:ring-2 focus-within:ring-gold">
          <label htmlFor="ask-athlete-input" className="sr-only">
            Ask about your athlete
          </label>
          <input
            id="ask-athlete-input"
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Ask anything about Maya's development…"
            className="min-h-[44px] flex-1 bg-transparent px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
          <button
            type="submit"
            aria-label="Ask about your athlete"
            disabled={!value.trim()}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gold text-navy shadow-sm transition-colors hover:bg-gold-light disabled:opacity-40"
          >
            <ArrowUp className="h-5 w-5" />
          </button>
        </div>
      </form>

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
              <span
                className="ml-0.5 inline-block h-4 w-[2px] animate-pulse bg-gold align-text-bottom"
                aria-hidden
              />
            )}
          </p>
          <p className="mt-3 text-[11px] text-muted-foreground">
            Aster AI is a preview. Answers are illustrative — confirm details with your coach.
          </p>
        </div>
      )}
    </AiCard>
  );
}
