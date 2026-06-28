/*
 * AiClipSearch — natural-language clip search. Type (or tap a suggestion) like
 * "Find all my 3-pointers" and the model surfaces matching moments with a match
 * confidence each. Cosmetic: results are static mocks revealed after a short
 * faux "searching" beat. No real search/index behind it.
 */
import { useEffect, useRef, useState } from "react";
import { Search, Eye, Sparkles } from "lucide-react";
import { AiFilmCard } from "./AiFilmCard";
import { SEARCH_SUGGESTIONS, SEARCH_RESULTS } from "./aiMock";

export function AiClipSearch() {
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const run = (q: string) => {
    const text = q.trim();
    if (!text) return;
    setQuery(text);
    setShowResults(false);
    setSearching(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setSearching(false);
      setShowResults(true);
    }, 850);
  };

  return (
    <AiFilmCard
      icon={Search}
      title="Ask the film room"
      subtitle="Search every clip in plain English — the model finds the moments."
      badge="AI search"
      badgeIcon={Sparkles}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          run(query);
        }}
        className="flex items-center gap-2 rounded-xl border border-border bg-secondary/60 p-1.5 focus-within:ring-2 focus-within:ring-gold"
      >
        <Search className="ml-1.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Find all my 3-pointers…"
          aria-label="Search clips in plain English"
          className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
        />
        <button
          type="submit"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-gold px-3 py-2 text-xs font-semibold text-navy transition-colors hover:bg-gold-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        >
          Search
        </button>
      </form>

      {/* Suggestions */}
      <div className="mt-3 flex flex-wrap gap-2">
        {SEARCH_SUGGESTIONS.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => run(s)}
            className="rounded-full border border-gold/20 bg-gold-soft px-3 py-1 text-xs font-semibold text-gold-text transition-colors hover:bg-gold/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            {s}
          </button>
        ))}
      </div>

      {/* Results */}
      <div className="mt-4 min-h-[2.5rem]" aria-live="polite">
        {searching && (
          <p className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4 animate-pulse text-gold-text" /> Searching the film room…
          </p>
        )}
        {showResults && (
          <ul className="space-y-2">
            <li className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {SEARCH_RESULTS.length} matches for “{query}”
            </li>
            {SEARCH_RESULTS.map((r) => (
              <li
                key={r.title}
                className="flex items-center gap-3 rounded-xl border border-border bg-card p-3 transition-colors hover:bg-secondary"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-navy text-gold">
                  <Eye className="h-4 w-4" aria-hidden />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold text-foreground">{r.title}</span>
                  <span className="block text-xs text-muted-foreground">{r.meta}</span>
                </span>
                <span className="shrink-0 rounded-full bg-gold-soft px-2 py-0.5 font-mono text-[10px] font-bold text-gold-text ring-1 ring-gold/20">
                  {Math.round(r.conf * 100)}% match
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </AiFilmCard>
  );
}
