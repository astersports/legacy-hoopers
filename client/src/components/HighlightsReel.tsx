import { Play } from "lucide-react";
import { Logo } from "@/components/Logo";
import { HIGHLIGHTS, type Highlight } from "@/lib/content";

function HighlightCard({ h, featured = false }: { h: Highlight; featured?: boolean }) {
  return (
    <button
      type="button"
      className={`group relative flex flex-col justify-end overflow-hidden rounded-2xl border border-border text-left shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg ${
        featured ? "min-h-[280px]" : "min-h-[200px]"
      }`}
    >
      {/* Cosmetic film thumbnail — navy + watermark logo (no photos yet) */}
      <div className="hero-navy absolute inset-0">
        <span className="absolute inset-0 grid place-items-center opacity-15">
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
      <div className="relative z-10 bg-gradient-to-t from-black/70 to-transparent p-4 pt-10">
        <div className={`font-bold leading-tight text-white ${featured ? "text-lg" : "text-sm"}`}>{h.title}</div>
        <div className="mt-0.5 text-xs text-white/60">{h.meta}</div>
      </div>
    </button>
  );
}

/** Bento reel: first item featured, rest in a grid. `limit` trims for previews. */
export function HighlightsReel({ limit }: { limit?: number }) {
  const items = limit ? HIGHLIGHTS.slice(0, limit) : HIGHLIGHTS;
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((h, i) => (
        <div key={h.title} className={i === 0 ? "sm:col-span-2" : ""}>
          <HighlightCard h={h} featured={i === 0} />
        </div>
      ))}
    </div>
  );
}
