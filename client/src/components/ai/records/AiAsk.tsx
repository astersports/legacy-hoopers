/*
 * AiAsk — COSMETIC AI feature. A natural-language "Ask about the season" box
 * with suggested questions and a streamed faux answer. No model, no network —
 * the answer is derived from the live records by aiMock and labeled "AI · cosmetic".
 */
import { useMemo, useState } from "react";
import { FileText, Sparkles, ArrowRight } from "lucide-react";
import type { TeamRecord } from "@/lib/aster";
import { AiCard } from "./AiCard";
import { useTypewriter } from "./useTypewriter";
import { aiAnswer, SUGGESTED_QUESTIONS } from "./aiMock";

export function AiAsk({ records }: { records: TeamRecord[] }) {
  const [input, setInput] = useState("");
  const [asked, setAsked] = useState<string | null>(null);

  const answer = useMemo(
    () => (asked ? aiAnswer(asked, records) : ""),
    [asked, records],
  );
  const { out, done } = useTypewriter(answer, asked != null, 110);

  if (records.length === 0) return null;

  const submit = (q: string) => {
    const trimmed = q.trim();
    if (!trimmed) return;
    setInput(trimmed);
    setAsked(trimmed);
  };

  return (
    <AiCard
      icon={FileText}
      badgeIcon={Sparkles}
      title="Ask About the Season"
      subtitle="Type a question about the program — the model answers from live records."
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit(input);
        }}
        className="flex items-center gap-2"
      >
        <label htmlFor="ai-ask-input" className="sr-only">
          Ask a question about the season
        </label>
        <input
          id="ai-ask-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g. Which team is trending up the fastest?"
          className="min-w-0 flex-1 rounded-xl border border-border bg-secondary/60 px-4 py-2.5 text-sm text-foreground shadow-sm outline-none ring-gold/40 transition placeholder:text-muted-foreground focus:bg-card focus:ring-2"
        />
        <button
          type="submit"
          aria-label="Ask"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-navy text-white shadow-sm transition-opacity hover:opacity-90"
        >
          <ArrowRight className="h-4 w-4" aria-hidden />
        </button>
      </form>

      {/* Suggested questions */}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {SUGGESTED_QUESTIONS.map((q) => (
          <button
            key={q}
            type="button"
            onClick={() => submit(q)}
            className="rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm transition-colors hover:bg-secondary hover:text-foreground"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Streamed answer */}
      {asked && (
        <div className="mt-4 rounded-xl border border-gold/30 bg-gold-soft/50 p-4">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-gold-text">
            <Sparkles className="h-3.5 w-3.5" aria-hidden /> AI answer
          </div>
          <p className="mt-1.5 min-h-[2.5rem] text-sm leading-relaxed text-foreground" aria-live="polite">
            {out}
            {!done && <span className="ml-0.5 inline-block h-4 w-[2px] animate-pulse bg-gold align-middle" aria-hidden />}
          </p>
        </div>
      )}

      <p className="mt-3 text-[11px] text-muted-foreground">
        Cosmetic preview — answers are generated from live records, not yet a real model.
      </p>
    </AiCard>
  );
}
