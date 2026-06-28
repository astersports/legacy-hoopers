/*
 * QuizCta — cosmetic "30-second quiz" recommendation card in a gold-soft band. (#6)
 */
import { Sparkles, ArrowRight, Clock } from "lucide-react";
import { REGISTER_URL } from "@/lib/brand";
import { btnGold } from "@/components/kit";

export function QuizCta() {
  return (
    <div className="rounded-2xl border border-gold/20 bg-gold-soft p-7 shadow-sm sm:p-10">
      <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gold text-navy">
            <Sparkles className="h-6 w-6" />
          </span>
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gold-text">
              <Clock className="h-3.5 w-3.5" /> 30 seconds
            </span>
            <h3 className="mt-1 text-xl font-extrabold tracking-tight text-foreground sm:text-2xl">
              Not sure which program fits?
            </h3>
            <p className="mt-1 max-w-md text-sm text-muted-foreground">
              Answer a few quick questions about your athlete's age and goals — we'll
              recommend the perfect first step.
            </p>
          </div>
        </div>
        <a
          href={REGISTER_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`${btnGold} w-full shrink-0 sm:w-auto`}
        >
          Take the quiz <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
