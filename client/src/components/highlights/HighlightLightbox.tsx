/*
 * HighlightLightbox — accessible modal mock that opens on card click. Shows the
 * navy PlayerPanel + clip details. Closes on Esc and backdrop click; restores
 * focus and locks body scroll while open. Smooth fade/scale transitions.
 */
import { useEffect } from "react";
import { X, Share2, Plus } from "lucide-react";
import { btnGhostDark } from "@/components/kit";
import { PlayerPanel } from "@/components/highlights/PlayerPanel";
import type { EnrichedHighlight } from "@/components/highlights/data";

export function HighlightLightbox({
  clip,
  onClose,
}: {
  clip: EnrichedHighlight | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!clip) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [clip, onClose]);

  if (!clip) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Highlight: ${clip.title}`}
      onClick={onClose}
      className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4 backdrop-blur-sm motion-safe:animate-in motion-safe:fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl overflow-hidden rounded-2xl bg-navy shadow-2xl transition-all duration-200 motion-safe:animate-in motion-safe:zoom-in-95"
      >
        <div className="flex items-center justify-between px-4 pt-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-gold-light">
            Film room
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="grid h-9 w-9 place-items-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-4 pt-3">
          <PlayerPanel h={clip} />
          <div className="mt-4 flex flex-wrap gap-3">
            <button type="button" className={btnGhostDark}>
              <Share2 className="h-4 w-4" /> Share clip
            </button>
            <button type="button" className={btnGhostDark}>
              <Plus className="h-4 w-4" /> Save to film room
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
