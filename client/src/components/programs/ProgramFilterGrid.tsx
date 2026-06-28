/*
 * ProgramFilterGrid — the SERVICES grid with a chip filter (All / Recurring /
 * One-time / Teams). Cards smoothly show/hide; active chip uses gold. (#1, #10)
 */
import { useState } from "react";
import { SERVICES } from "@/lib/content";
import { ServiceCard } from "@/components/ServiceCard";
import ScrollReveal from "@/components/ScrollReveal";
import { FILTERS, type FilterKey, matchesFilter } from "./programsMeta";

export function ProgramFilterGrid() {
  const [filter, setFilter] = useState<FilterKey>("all");

  return (
    <div>
      <div
        role="group"
        aria-label="Filter programs"
        className="mb-8 flex flex-wrap gap-2"
      >
        {FILTERS.map((f) => {
          const active = filter === f.key;
          return (
            <button
              key={f.key}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(f.key)}
              className={`min-h-[44px] rounded-full border px-5 py-2 text-sm font-semibold transition-colors ${
                active
                  ? "border-gold bg-gold text-navy shadow-sm"
                  : "border-border bg-card text-foreground hover:bg-secondary"
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s, i) => {
          const visible = matchesFilter(s, filter);
          return (
            <div
              key={s.key}
              className={`transition-all duration-300 ${
                visible
                  ? "scale-100 opacity-100"
                  : "pointer-events-none hidden scale-95 opacity-0"
              }`}
            >
              <ScrollReveal delay={i * 50}>
                <ServiceCard s={s} />
              </ScrollReveal>
            </div>
          );
        })}
      </div>
    </div>
  );
}
