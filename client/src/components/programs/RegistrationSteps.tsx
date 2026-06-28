/*
 * RegistrationSteps — "How registration works" 3-step horizontal stepper. (#3)
 */
import { ArrowRight } from "lucide-react";
import { REG_STEPS } from "./programsMeta";

export function RegistrationSteps() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {REG_STEPS.map((step, i) => (
        <div key={step.n} className="relative">
          <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-navy text-base font-extrabold text-white">
              {step.n}
            </span>
            <h3 className="mt-4 font-bold text-foreground">{step.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
          </div>
          {i < REG_STEPS.length - 1 && (
            <span
              aria-hidden
              className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 sm:block"
            >
              <span className="grid h-6 w-6 place-items-center rounded-full border border-border bg-card text-gold-text shadow-sm">
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
