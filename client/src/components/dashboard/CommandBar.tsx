/*
 * CommandBar — the dashboard's single navy header. Adds a cosmetic athlete
 * switcher + date-range segmented control on top of the existing welcome chrome.
 * Light theme starts below this section.
 */
import { useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import { Logo } from "@/components/Logo";

const ATHLETES = ["Maya Samaritano", "Leo Samaritano"];
const RANGES = ["This week", "Month", "Season"];

export function CommandBar() {
  const [athlete, setAthlete] = useState(ATHLETES[0]);
  const [open, setOpen] = useState(false);
  const [range, setRange] = useState(RANGES[2]);

  return (
    <section className="hero-navy text-white">
      <div className="container py-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Logo className="h-12 w-12" tone="navy" />
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold-light">Family dashboard</div>
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Welcome back, Samaritano family</h1>
              <p className="text-sm text-white/60">Spring 2026 season · 2 athletes · everything on track</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-2 self-start rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/80 ring-1 ring-white/10">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Live · synced just now
          </span>
        </div>

        {/* Athlete switcher + date-range tabs */}
        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-haspopup="listbox"
              aria-expanded={open}
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/10"
            >
              <span className="grid h-6 w-6 place-items-center rounded-full bg-gold text-[11px] font-extrabold text-navy">
                {athlete.charAt(0)}
              </span>
              {athlete}
              <ChevronDown className={`h-4 w-4 text-white/60 transition-transform ${open ? "rotate-180" : ""}`} />
            </button>
            {open && (
              <ul
                role="listbox"
                className="absolute z-20 mt-2 w-56 overflow-hidden rounded-xl border border-border bg-card p-1 text-foreground shadow-lg"
              >
                {ATHLETES.map((a) => (
                  <li key={a}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={a === athlete}
                      onClick={() => { setAthlete(a); setOpen(false); }}
                      className="flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium hover:bg-secondary"
                    >
                      {a}
                      {a === athlete && <Check className="h-4 w-4 text-gold-text" />}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div
            role="tablist"
            aria-label="Date range"
            className="inline-flex rounded-xl border border-white/15 bg-white/5 p-1 backdrop-blur"
          >
            {RANGES.map((r) => (
              <button
                key={r}
                type="button"
                role="tab"
                aria-selected={r === range}
                onClick={() => setRange(r)}
                className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                  r === range ? "bg-gold text-navy" : "text-white/70 hover:text-white"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
