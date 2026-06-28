/*
 * AiPlanBuilder — a cosmetic "AI custom plan" composer. The family toggles
 * building blocks; a faux pricing engine (estimatePlan) sums them and applies a
 * bundle discount that grows with how many blocks are chosen, plus an intensity
 * read-out. NO billing, NO network — purely illustrative. Checkout wires to
 * Aster later. Accessible toggle buttons + animated (motion-safe) total.
 */
import { useMemo, useState } from "react";
import { Cpu, Sparkles, Check, Plus, ArrowRight } from "lucide-react";
import { REGISTER_URL } from "@/lib/brand";
import { btnGold } from "@/components/kit";
import { AiCard } from "./AiCard";
import { PLAN_BLOCKS, estimatePlan } from "./aiProgramsMeta";

export function AiPlanBuilder() {
  const [selected, setSelected] = useState<string[]>(["clinics", "training"]);
  const estimate = useMemo(() => estimatePlan(selected), [selected]);

  function toggle(key: string) {
    setSelected((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );
  }

  return (
    <AiCard
      icon={Cpu}
      pillIcon={Sparkles}
      title="AI Custom Plan Builder"
      subtitle="Mix the building blocks — Aster composes a plan and estimates bundle savings live"
    >
      <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
        {PLAN_BLOCKS.map((block) => {
          const active = selected.includes(block.key);
          return (
            <button
              key={block.key}
              type="button"
              onClick={() => toggle(block.key)}
              aria-pressed={active}
              className={`flex items-start gap-3 rounded-2xl border p-3.5 text-left transition-all ${
                active
                  ? "border-gold bg-gold-soft"
                  : "border-border bg-card hover:-translate-y-0.5 hover:border-gold/40 hover:bg-gold-soft/50"
              }`}
            >
              <span
                className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-lg transition-colors ${
                  active ? "bg-gold text-navy" : "bg-secondary text-muted-foreground"
                }`}
              >
                {active ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center justify-between gap-2">
                  <span className={`text-sm font-bold ${active ? "text-gold-text" : "text-foreground"}`}>
                    {block.label}
                  </span>
                  <span className="shrink-0 text-xs font-semibold tabular-nums text-muted-foreground">
                    ${block.monthly}/mo
                  </span>
                </span>
                <span className="mt-0.5 block text-xs text-muted-foreground">{block.desc}</span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Live estimate */}
      <div className="mt-5 rounded-2xl border border-gold/30 bg-gold-soft p-5" aria-live="polite">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-gold-text">
              Estimated plan · {estimate.intensity}
            </div>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold tabular-nums text-navy">
                ${estimate.monthly}
              </span>
              <span className="text-sm font-semibold text-gold-text">/ month</span>
            </div>
          </div>
          {estimate.discount > 0 && (
            <span className="rounded-full bg-navy px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-gold-light">
              − ${estimate.discount} AI bundle savings
            </span>
          )}
        </div>
        <p className="mt-3 text-sm text-navy/90">{estimate.note}</p>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <a
          href={REGISTER_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`${btnGold} w-full sm:w-auto`}
        >
          Build this plan with Aster <ArrowRight className="h-4 w-4" />
        </a>
        <p className="text-[11px] text-muted-foreground">
          Estimates are illustrative — final pricing configures per program at checkout.
        </p>
      </div>
    </AiCard>
  );
}
