/*
 * AgentScanConsole — the live "ASTER-AGENT" scanning terminal. A dark, glowing
 * console that visibly works: it cycles through a page's domain signals, fills a
 * gradient progress bar, and lights up one tag pill per step. Ported from the
 * astersports.io FRONTIER-SCAN aesthetic and generalized so every page gets its
 * own agent (config lives in src/lib/agentScans.ts).
 *
 * Cosmetic + self-contained: no data fetching. Reads as a dark "live terminal"
 * surface that punctuates the (light) inner pages, sitting inside each page's
 * existing navy hero band. Honors prefers-reduced-motion (freezes on the final,
 * "scan complete" step instead of cycling).
 */
import { useEffect, useRef, useState } from "react";
import type { AgentScan } from "@/lib/agentScans";

const DISPLAY = { fontFamily: "var(--font-space)" } as const;

export function AgentScanConsole({ scan, className }: { scan: AgentScan; className?: string }) {
  const [i, setI] = useState(0);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    setI(0);
    if (reduced.current) {
      setI(scan.steps.length - 1); // show a representative "complete" frame, no motion
      return;
    }
    const id = window.setInterval(() => {
      setI((p) => (p + 1) % scan.steps.length);
    }, 2200);
    return () => window.clearInterval(id);
  }, [scan]);

  const step = scan.steps[i];
  const n = i + 1;
  const m = scan.steps.length;
  const progress = Math.round((n / m) * 100);

  return (
    <div
      className={`rounded-2xl border border-white/10 bg-gradient-to-b from-[#11192b] to-[#0b111e] p-5 shadow-[0_24px_70px_-34px_rgba(224,99,28,0.5)] ${className ?? ""}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="agent-live-dot" aria-hidden />
          <span className="aster-mono text-[11px] uppercase tracking-[0.18em] text-slate-400">
            ASTER-AGENT · {scan.label}
          </span>
        </div>
        <span className="aster-mono text-[11px] lowercase tracking-wide text-emerald-400">live</span>
      </div>

      <div className="mt-4 rounded-xl border border-white/10 bg-black/25 p-4">
        <p className="aster-mono text-[13px] leading-relaxed text-slate-300" aria-live="polite">
          <span className="text-slate-500">▸ </span>
          identifying {scan.noun} <span className="text-[#F6CC55]">{n}</span>
          <span className="text-slate-600"> / {m}</span>
          <span className="text-slate-500"> — </span>
          <span className="aster-grad-text font-bold" style={DISPLAY}>{step.item}</span>
        </p>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="aster-grad-bg h-full rounded-full transition-[width] duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {scan.tags.map((t) => {
          const on = t === step.tag;
          return (
            <span
              key={t}
              className={
                on
                  ? "aster-grad-bg aster-mono rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-[#1a0e05] transition-all"
                  : "aster-mono rounded-full border border-white/15 px-3 py-1.5 text-[11px] uppercase tracking-wide text-slate-400 transition-all"
              }
            >
              {t}
            </span>
          );
        })}
      </div>
    </div>
  );
}
