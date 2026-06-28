/*
 * AiProgramMatchTeaser — split panel: a short cosmetic "AI scan" animation that
 * resolves to a recommended program, with a CTA to the full /programs finder.
 * The scan plays on mount (motion-safe) then reveals a sample match. No data
 * fetching — illustrative only.
 */
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Wand2, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { Pill, btnGold } from "@/components/kit";

const STEPS = ["Reading athlete profile", "Weighing age & goals", "Matching best-fit program"] as const;

export function AiProgramMatchTeaser() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setStep(STEPS.length);
      setDone(true);
      return;
    }
    let s = 0;
    const id = window.setInterval(() => {
      s += 1;
      setStep(s);
      if (s >= STEPS.length) {
        window.clearInterval(id);
        setDone(true);
      }
    }, 700);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="grid items-center gap-8 lg:grid-cols-2">
      {/* Copy + CTA */}
      <div>
        <div className="flex items-center gap-2">
          <Pill icon={Wand2}>AI</Pill>
        </div>
        <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
          Tell us your athlete. Our AI finds the fit.
        </h3>
        <p className="mt-3 max-w-md text-base text-muted-foreground">
          Aster weighs age, skill and goals against every camp, clinic and team — then
          recommends the path with the clearest runway to the next level.
        </p>
        <Link href="/programs" className={`mt-6 ${btnGold}`}>
          Find your match <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Cosmetic AI scan panel */}
      <div className="relative overflow-hidden rounded-3xl border border-gold/30 bg-card p-[1.5px] shadow-lg">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-gold/20 via-transparent to-gold/10" aria-hidden />
        <div className="relative rounded-[calc(1.5rem-1.5px)] bg-card p-6 sm:p-7">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-gold-text">
            <Sparkles className="h-3.5 w-3.5" /> Aster match engine
          </div>

          {/* Scan steps */}
          <ul className="mt-4 space-y-2.5" aria-live="polite">
            {STEPS.map((label, i) => {
              const complete = step > i;
              const active = step === i;
              return (
                <li key={label} className="flex items-center gap-3">
                  <span
                    className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-[11px] transition-colors ${
                      complete
                        ? "bg-gold text-navy"
                        : active
                          ? "bg-gold-soft text-gold-text ring-1 ring-gold/30"
                          : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    {complete ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
                  </span>
                  <span
                    className={`text-sm ${complete || active ? "font-semibold text-foreground" : "text-muted-foreground"}`}
                  >
                    {label}
                    {active && (
                      <span className="ml-1 inline-flex gap-0.5 align-middle" aria-hidden>
                        <span className="h-1 w-1 rounded-full bg-gold motion-safe:animate-pulse" />
                        <span className="h-1 w-1 rounded-full bg-gold motion-safe:animate-pulse [animation-delay:150ms]" />
                        <span className="h-1 w-1 rounded-full bg-gold motion-safe:animate-pulse [animation-delay:300ms]" />
                      </span>
                    )}
                  </span>
                </li>
              );
            })}
          </ul>

          {/* Result */}
          <div
            className={`mt-5 rounded-2xl border border-gold/30 bg-gold-soft p-4 transition-opacity duration-500 ${
              done ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={!done}
          >
            <div className="text-[10px] font-bold uppercase tracking-wider text-gold-text">Best-fit match</div>
            <div className="mt-1 text-lg font-extrabold text-navy">AAU Travel Teams</div>
            <p className="mt-1 text-xs text-gold-text">
              97% fit · competitive runway with film & college-prep development.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
