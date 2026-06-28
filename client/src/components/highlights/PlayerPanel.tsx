/*
 * PlayerPanel — a cosmetic navy "now playing" video surface: watermark-logo
 * stage, big play button, a fake scrubber bar, and view/date meta. Used both
 * for the featured panel at the top of the body and inside the lightbox modal.
 */
import { Play, Eye, Clock } from "lucide-react";
import { Logo } from "@/components/Logo";
import type { EnrichedHighlight } from "@/components/highlights/data";

export function PlayerPanel({ h, progress = 0.34 }: { h: EnrichedHighlight; progress?: number }) {
  const pct = Math.round(progress * 100);
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10">
      {/* Cosmetic video stage */}
      <div className="hero-navy relative grid min-h-[240px] place-items-center sm:min-h-[320px]">
        <span className="absolute inset-0 grid place-items-center opacity-10">
          <Logo className="h-40 w-40" />
        </span>
        <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-red-600 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
          <span className="h-1.5 w-1.5 animate-ping rounded-full bg-white" />
          Now playing
        </span>
        <button
          type="button"
          aria-label="Play"
          className="relative z-10 grid h-20 w-20 place-items-center rounded-full bg-gold text-navy shadow-lg ring-4 ring-white/10 transition-transform hover:scale-105"
        >
          <Play className="h-9 w-9 translate-x-0.5 fill-navy" />
        </button>
      </div>

      {/* Scrubber + meta */}
      <div className="bg-navy px-5 py-4 text-white">
        <div className="text-base font-bold leading-tight sm:text-lg">{h.title}</div>
        <div className="mt-0.5 text-xs text-white/60">{h.meta}</div>

        <div className="mt-4 flex items-center gap-3">
          <span className="font-mono text-[11px] text-white/70">
            {Math.floor((progress * 120) / 60)}:
            {String(Math.floor((progress * 120) % 60)).padStart(2, "0")}
          </span>
          <span
            className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-white/15"
            role="progressbar"
            aria-valuenow={pct}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Playback progress"
          >
            <span className="absolute inset-y-0 left-0 rounded-full bg-gold" style={{ width: `${pct}%` }} />
            <span
              className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow"
              style={{ left: `${pct}%` }}
            />
          </span>
          <span className="font-mono text-[11px] text-white/70">{h.duration}</span>
        </div>

        <div className="mt-3 flex items-center gap-4 text-[11px] text-white/60">
          <span className="inline-flex items-center gap-1">
            <Eye className="h-3.5 w-3.5" /> {h.views} views
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> {h.posted}
          </span>
        </div>
      </div>
    </div>
  );
}
