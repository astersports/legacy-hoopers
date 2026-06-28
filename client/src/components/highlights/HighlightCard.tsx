/*
 * HighlightCard — a single film-room clip card. Navy "video" thumbnail with a
 * watermark logo (cosmetic — no real footage yet), plus view count, relative
 * date, and a share affordance. Clicking opens the lightbox player.
 */
import { Play, Eye, Share2 } from "lucide-react";
import { Logo } from "@/components/Logo";
import type { EnrichedHighlight } from "@/components/highlights/data";

export function HighlightCard({
  h,
  featured = false,
  onOpen,
}: {
  h: EnrichedHighlight;
  featured?: boolean;
  onOpen: (h: EnrichedHighlight) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(h)}
      aria-label={`Play highlight: ${h.title}`}
      className={`group relative flex w-full flex-col justify-end overflow-hidden rounded-2xl border border-border text-left shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
        featured ? "min-h-[280px]" : "min-h-[200px]"
      }`}
    >
      {/* Cosmetic film thumbnail — navy + watermark logo (no photos yet) */}
      <div className="hero-navy absolute inset-0 overflow-hidden">
        <span className="absolute inset-0 grid place-items-center opacity-15 transition-transform duration-300 group-hover:scale-110">
          <Logo className={featured ? "h-32 w-32" : "h-20 w-20"} />
        </span>
      </div>

      <span className="absolute left-4 top-4 z-10 rounded-full bg-gold px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-navy">
        {h.tag}
      </span>
      <span className="absolute right-4 top-4 z-10 rounded-md bg-black/40 px-2 py-0.5 font-mono text-[11px] font-semibold text-white">
        {h.duration}
      </span>

      <span className="absolute left-1/2 top-1/2 z-10 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/15 ring-1 ring-white/30 backdrop-blur transition-transform group-hover:scale-110">
        <Play className="h-6 w-6 translate-x-0.5 fill-white text-white" />
      </span>

      <div className="relative z-10 bg-gradient-to-t from-black/75 to-transparent p-4 pt-10">
        <div className={`font-bold leading-tight text-white ${featured ? "text-lg" : "text-sm"}`}>
          {h.title}
        </div>
        <div className="mt-0.5 text-xs text-white/60">{h.meta}</div>
        <div className="mt-2 flex items-center justify-between text-[11px] text-white/70">
          <span className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1">
              <Eye className="h-3.5 w-3.5" /> {h.views}
            </span>
            <span>{h.posted}</span>
          </span>
          <span
            role="button"
            tabIndex={-1}
            aria-label="Share clip"
            onClick={(e) => e.stopPropagation()}
            className="grid h-7 w-7 place-items-center rounded-full bg-white/10 ring-1 ring-white/20 transition-colors hover:bg-white/20"
          >
            <Share2 className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </button>
  );
}
