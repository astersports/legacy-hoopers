/*
 * RecordsControls — cosmetic control surface for the standings list: a season
 * chip row, a sort toggle (Win % / Name / Games), and a share/export row.
 * All client-side / cosmetic; never touches the live data source.
 */
import { useState } from "react";
import { Check, Link2, Printer, Share2 } from "lucide-react";
import type { SortKey } from "./recordsUtils";

const SORTS: { key: SortKey; label: string }[] = [
  { key: "pct", label: "Win %" },
  { key: "name", label: "Name" },
  { key: "games", label: "Games" },
];

/** Cosmetic season chips — single active. The live API already scopes the data. */
const SEASONS = ["Spring 2026", "Fall 2025", "All-time"];

export function RecordsControls({
  sort,
  onSort,
}: {
  sort: SortKey;
  onSort: (k: SortKey) => void;
}) {
  const [season, setSeason] = useState(SEASONS[0]);
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({ title: "Aster Sports AAU — Team Records", url });
        return;
      }
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      }
    } catch {
      /* user dismissed the share sheet — no-op */
    }
  };

  return (
    <div className="mb-6 flex flex-col gap-4">
      {/* Season chip row (cosmetic) */}
      <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Season">
        {SEASONS.map((s) => {
          const active = s === season;
          return (
            <button
              key={s}
              onClick={() => setSeason(s)}
              aria-pressed={active}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
                active
                  ? "bg-gold-soft text-gold-text ring-1 ring-gold/30"
                  : "bg-card text-muted-foreground ring-1 ring-border hover:bg-secondary"
              }`}
            >
              {s}
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Sort toggle */}
        <div className="inline-flex items-center gap-1 rounded-xl border border-border bg-secondary/60 p-1" role="group" aria-label="Sort teams">
          <span className="px-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Sort</span>
          {SORTS.map((s) => {
            const active = s.key === sort;
            return (
              <button
                key={s.key}
                onClick={() => onSort(s.key)}
                aria-pressed={active}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                  active ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {s.label}
              </button>
            );
          })}
        </div>

        {/* Share / export row */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={share}
            aria-label={copied ? "Link copied" : "Share records"}
            title={copied ? "Link copied" : "Share"}
            className="grid h-9 w-9 place-items-center rounded-xl border border-border bg-card text-muted-foreground shadow-sm transition-colors hover:bg-secondary hover:text-foreground"
          >
            {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Share2 className="h-4 w-4" />}
          </button>
          <button
            onClick={share}
            aria-label="Copy link"
            title="Copy link"
            className="grid h-9 w-9 place-items-center rounded-xl border border-border bg-card text-muted-foreground shadow-sm transition-colors hover:bg-secondary hover:text-foreground"
          >
            <Link2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => typeof window !== "undefined" && window.print()}
            aria-label="Print records"
            title="Print"
            className="grid h-9 w-9 place-items-center rounded-xl border border-border bg-card text-muted-foreground shadow-sm transition-colors hover:bg-secondary hover:text-foreground"
          >
            <Printer className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
