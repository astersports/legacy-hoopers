/*
 * AiProgramAdvisor — a cosmetic "Ask the AI advisor" chat for program questions.
 * Suggested prompts + a faux answer typed word-by-word. NO API calls — answers
 * are canned and deterministic (advisorAnswer). Respects prefers-reduced-motion
 * (full answer rendered instantly). Clearly labeled AI.
 */
import { useEffect, useRef, useState } from "react";
import { MessageSquare, Sparkles, ArrowUp } from "lucide-react";
import { AiCard } from "./AiCard";
import { ADVISOR_SUGGESTIONS, advisorAnswer } from "./aiProgramsMeta";

export function AiProgramAdvisor() {
  const [value, setValue] = useState("");
  const [question, setQuestion] = useState<string | null>(null);
  const [shown, setShown] = useState("");
  const [streaming, setStreaming] = useState(false);
  const liveRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (question === null) return;
    const full = advisorAnswer(question);
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
    }, 32);
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
      icon={MessageSquare}
      pillIcon={Sparkles}
      title="Ask the AI Program Advisor"
      subtitle="Questions about camps, clinics, tryouts or plans? Ask and get a straight answer"
    >
      <form
        className="mt-5"
        onSubmit={(e) => {
          e.preventDefault();
          ask(value);
        }}
      >
        <div className="flex items-center gap-2 rounded-2xl border border-border bg-secondary/40 p-1.5 focus-within:ring-2 focus-within:ring-gold">
          <label htmlFor="ai-advisor-input" className="sr-only">
            Ask the AI program advisor a question
          </label>
          <input
            id="ai-advisor-input"
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Ask about programs, tryouts, pricing…"
            className="min-h-[44px] flex-1 bg-transparent px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
          <button
            type="submit"
            aria-label="Send question to the AI advisor"
            disabled={!value.trim()}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gold text-navy shadow-sm transition-colors hover:bg-gold-light disabled:opacity-40"
          >
            <ArrowUp className="h-5 w-5" />
          </button>
        </div>
      </form>

      <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Suggested questions">
        {ADVISOR_SUGGESTIONS.map((s) => (
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
            Aster AI advisor
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
            Aster AI is a preview. Answers are illustrative — confirm specifics with our staff.
          </p>
        </div>
      )}
    </AiCard>
  );
}
