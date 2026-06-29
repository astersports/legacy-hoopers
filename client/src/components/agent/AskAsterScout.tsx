/*
 * AskAsterScout — the live "Aster Scout" concierge chat on the AAU site, wired
 * to the real scout agent on astersports.io (VITE_SCOUT_ENDPOINT). Streams
 * Claude-generated replies over SSE; styled as a dark "live terminal" to sit
 * directly under the FRONTIER-SCAN console (same visual language as #25).
 *
 * Dark-until-configured: renders nothing unless VITE_SCOUT_ENDPOINT is set. A
 * non-OK / unreachable response degrades to a kind contact-form notice. The
 * server verifies Turnstile + fails closed, so the gate can never be bypassed
 * client-side.
 */
import { useEffect, useRef, useState } from "react";
import { Send, Sparkles, CheckCircle2, ArrowUpRight } from "lucide-react";
import { useScoutChat } from "@/hooks/useScoutChat";
import { useTurnstile } from "@/hooks/useTurnstile";

const DISPLAY = { fontFamily: "var(--font-space)" } as const;

export function AskAsterScout({ className }: { className?: string }) {
  const { configured, bubbles, streaming, cta, leadAck, notice, send } = useScoutChat();
  const { configured: turnstileOn, containerRef, token, reset: resetTurnstile } = useTurnstile();
  const [draft, setDraft] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [bubbles, cta, leadAck, notice]);

  // The whole surface stays dark until the scout endpoint is wired.
  if (!configured) return null;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = draft;
    setDraft("");
    void send(text, token ?? undefined);
    if (turnstileOn) resetTurnstile();
  };

  return (
    <div
      className={`rounded-2xl border border-white/10 bg-gradient-to-b from-[#11192b] to-[#0b111e] p-5 shadow-[0_24px_70px_-34px_rgba(224,99,28,0.5)] ${className ?? ""}`}
    >
      <div className="mb-3 flex items-center gap-2">
        <Sparkles className="h-3.5 w-3.5 text-[#F6CC55]" />
        <span className="aster-mono text-[11px] uppercase tracking-[0.18em] text-slate-400">
          ask aster scout
        </span>
        <span className="agent-live-dot ml-auto" aria-hidden />
      </div>

      <div ref={scrollRef} className="mb-3 max-h-72 space-y-2.5 overflow-y-auto" aria-live="polite">
        {bubbles.length === 0 && (
          <p className="text-[13px] leading-relaxed text-slate-400">
            Ask about programs, schedule, tryouts, or how the platform works — the scout will point
            you the right way.
          </p>
        )}
        {bubbles.map((b, i) => (
          <div key={i} className={b.role === "user" ? "text-right" : "text-left"}>
            <span
              className={`inline-block max-w-[88%] rounded-2xl px-3 py-2 text-[13px] leading-snug ${
                b.role === "user"
                  ? "rounded-br-sm bg-white/[0.06] text-slate-200"
                  : "rounded-bl-sm bg-[#F6CC55]/[0.08] text-slate-100"
              }`}
            >
              {b.text || (streaming && i === bubbles.length - 1 ? "…" : "")}
            </span>
          </div>
        ))}

        {/* The scout emits only a serviceId; services live on Aster Sports, so the
            AAU CTA links there generically rather than fabricating a local card. */}
        {cta && (
          <a
            href="https://astersports.io"
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-1 flex items-center gap-3 rounded-xl border border-white/10 bg-black/25 p-3 no-underline"
          >
            <span className="aster-grad-bg grid h-8 w-8 flex-none place-items-center rounded-lg text-[#1a0e05]">
              <Sparkles className="h-4 w-4" />
            </span>
            <span className="min-w-0 flex-1 text-[13px] font-semibold text-white" style={DISPLAY}>
              Explore it on Aster Sports
            </span>
            <ArrowUpRight className="h-4 w-4 flex-none text-slate-500 transition-colors group-hover:text-[#F6CC55]" />
          </a>
        )}

        {leadAck && (
          <div className="mt-1 flex items-center gap-2 text-[12.5px] text-[#34d399]">
            <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
            <span>Thanks{leadAck ? `, ${leadAck}` : ""} — we'll be in touch shortly.</span>
          </div>
        )}

        {notice && <p className="mt-1 text-[12.5px] leading-snug text-slate-400">{notice}</p>}
      </div>

      {/* Cloudflare Turnstile bot gate — only when VITE_TURNSTILE_SITE_KEY is set */}
      {turnstileOn && <div ref={containerRef} className="mb-2.5" aria-label="Human verification" />}

      <form onSubmit={submit} className="flex items-center gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          maxLength={2000}
          disabled={streaming}
          placeholder="Type a question…"
          aria-label="Ask Aster Scout a question"
          className="flex-1 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5 text-[13px] text-white placeholder-slate-500 transition-all focus:border-[#F6CC55]/40 focus:outline-none focus:ring-1 focus:ring-[#F6CC55]/20 disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={streaming || draft.trim().length === 0}
          aria-label="Send"
          className="aster-grad-bg inline-flex h-10 w-10 items-center justify-center rounded-lg text-[#1a0e05] transition-transform duration-150 hover:scale-[1.04] active:scale-[0.96] disabled:opacity-50 disabled:hover:scale-100"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>

      <p className="mt-2 text-[10.5px] leading-snug text-slate-500">
        Replies are generated by Claude (Anthropic). Don't share sensitive info; for anything
        specific we'll follow up by email.
      </p>
    </div>
  );
}
