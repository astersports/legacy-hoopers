/*
 * AiProgramMatcher — a short guided flow (age, goals, commitment, experience)
 * that runs a faux "AI analysis" (stepped progress) and recommends a best-fit
 * SERVICES program with a match % and reasoning. NO network / NO model: the
 * recommendation is a pure deterministic function (scoreMatch). Motion-safe and
 * keyboard accessible; the analysis resolves instantly under reduced-motion.
 */
import { useEffect, useRef, useState } from "react";
import {
  Wand2, Sparkles, ArrowRight, ArrowLeft, RotateCcw, CheckCircle2, Cpu, Target,
} from "lucide-react";
import { REGISTER_URL } from "@/lib/brand";
import { btnGold, btnGhostLight } from "@/components/kit";
import { AiCard } from "./AiCard";
import {
  MATCHER_QUESTIONS,
  scoreMatch,
  type MatcherAnswers,
  type MatchResult,
} from "./aiProgramsMeta";

const ANALYSIS_STEPS = [
  "Reading the athlete profile",
  "Weighing age, goals & commitment",
  "Scoring all six programs",
  "Locking the best-fit match",
] as const;

type Phase = "quiz" | "analyzing" | "result";

export function AiProgramMatcher() {
  const [phase, setPhase] = useState<Phase>("quiz");
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState<Partial<MatcherAnswers>>({});
  const [analysisStep, setAnalysisStep] = useState(0);
  const [result, setResult] = useState<MatchResult | null>(null);
  const liveRef = useRef<HTMLParagraphElement>(null);

  const question = MATCHER_QUESTIONS[qIndex];
  const total = MATCHER_QUESTIONS.length;
  const answered = answers[question.key];

  function choose(value: string) {
    const next = { ...answers, [question.key]: value } as Partial<MatcherAnswers>;
    setAnswers(next);
    if (qIndex < total - 1) {
      setQIndex((i) => i + 1);
    } else {
      runAnalysis(next as MatcherAnswers);
    }
  }

  function runAnalysis(full: MatcherAnswers) {
    setResult(scoreMatch(full));
    setPhase("analyzing");
    setAnalysisStep(0);
  }

  // Drive the stepped "analysis" animation, then reveal the result.
  useEffect(() => {
    if (phase !== "analyzing") return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setPhase("result");
      return;
    }
    let s = 0;
    const id = window.setInterval(() => {
      s += 1;
      setAnalysisStep(s);
      if (s >= ANALYSIS_STEPS.length) {
        window.clearInterval(id);
        window.setTimeout(() => setPhase("result"), 350);
      }
    }, 620);
    return () => window.clearInterval(id);
  }, [phase]);

  function reset() {
    setPhase("quiz");
    setQIndex(0);
    setAnswers({});
    setResult(null);
    setAnalysisStep(0);
  }

  return (
    <AiCard
      icon={Wand2}
      pillIcon={Sparkles}
      title="AI Program Matcher"
      subtitle="Answer four quick questions — Aster scores every program and recommends your best fit"
    >
      {/* ---------------------------- Quiz phase ---------------------------- */}
      {phase === "quiz" && (
        <div className="mt-6">
          <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            <span>Question {qIndex + 1} of {total}</span>
            <span className="text-gold-text">{Math.round((qIndex / total) * 100)}% there</span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-gold transition-all duration-500"
              style={{ width: `${((qIndex + (answered ? 1 : 0)) / total) * 100}%` }}
            />
          </div>

          <h4 className="mt-5 text-base font-extrabold text-foreground sm:text-lg">{question.label}</h4>
          <p className="mt-1 text-sm text-muted-foreground">{question.help}</p>

          <div
            className="mt-4 grid gap-2.5 sm:grid-cols-2"
            role="group"
            aria-label={question.label}
          >
            {question.options.map((opt) => {
              const active = answered === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => choose(opt.value)}
                  aria-pressed={active}
                  className={`flex min-h-[52px] items-center justify-between gap-2 rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition-all ${
                    active
                      ? "border-gold bg-gold-soft text-gold-text"
                      : "border-border bg-card text-foreground hover:-translate-y-0.5 hover:border-gold/40 hover:bg-gold-soft/50"
                  }`}
                >
                  {opt.label}
                  <ArrowRight className="h-4 w-4 shrink-0 opacity-50" />
                </button>
              );
            })}
          </div>

          {qIndex > 0 && (
            <button
              type="button"
              onClick={() => setQIndex((i) => Math.max(0, i - 1))}
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back
            </button>
          )}
        </div>
      )}

      {/* -------------------------- Analyzing phase ------------------------- */}
      {phase === "analyzing" && (
        <div className="mt-6">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-gold-text">
            <Cpu className="h-3.5 w-3.5 motion-safe:animate-pulse" /> Aster match engine running
          </div>
          <ul className="mt-4 space-y-2.5" aria-live="polite">
            {ANALYSIS_STEPS.map((label, i) => {
              const complete = analysisStep > i;
              const active = analysisStep === i;
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
                  <span className={`text-sm ${complete || active ? "font-semibold text-foreground" : "text-muted-foreground"}`}>
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
        </div>
      )}

      {/* --------------------------- Result phase --------------------------- */}
      {phase === "result" && result && (
        <div className="mt-6">
          <div className="rounded-2xl border border-gold/30 bg-gold-soft p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <span
                  className="grid h-12 w-12 shrink-0 place-items-center rounded-xl text-white shadow-sm"
                  style={{ backgroundColor: result.service.accent }}
                >
                  <result.service.icon className="h-6 w-6" />
                </span>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-gold-text">
                    Best-fit match
                  </div>
                  <div className="text-xl font-extrabold leading-tight text-navy">{result.service.name}</div>
                  <p className="mt-0.5 text-xs text-gold-text">{result.service.cadence} · {result.service.price}</p>
                </div>
              </div>
              <div className="shrink-0 text-right">
                <div className="text-3xl font-extrabold tabular-nums text-navy">{result.percent}%</div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-gold-text">match</div>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-gold-text">
                <Target className="h-3.5 w-3.5" /> Why this fits
              </div>
              <ul className="mt-2 space-y-1.5">
                {result.reasons.map((r) => (
                  <li key={r} className="flex items-start gap-2 text-sm text-navy/90">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-text" />
                    <span className="first-letter:uppercase">{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Alternatives */}
          <div className="mt-4">
            <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              Also worth a look
            </div>
            <div className="mt-2 grid gap-2.5 sm:grid-cols-2">
              {result.alternatives.map((alt) => (
                <div
                  key={alt.service.key}
                  className="flex items-center gap-3 rounded-xl border border-border bg-card p-3"
                >
                  <span
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-white"
                    style={{ backgroundColor: alt.service.accent }}
                  >
                    <alt.service.icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-bold text-foreground">{alt.service.name}</div>
                    <div className="text-xs text-muted-foreground">{alt.percent}% match</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <a
              href={REGISTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`${btnGold} w-full sm:w-auto`}
            >
              Start with {result.service.name} <ArrowRight className="h-4 w-4" />
            </a>
            <button type="button" onClick={reset} className={`${btnGhostLight} w-full sm:w-auto`}>
              <RotateCcw className="h-4 w-4" /> Retake
            </button>
          </div>

          <p className="mt-4 text-[11px] text-muted-foreground">
            Aster AI is a preview. Recommendations are illustrative — your coach confirms final placement.
          </p>
        </div>
      )}
    </AiCard>
  );
}
