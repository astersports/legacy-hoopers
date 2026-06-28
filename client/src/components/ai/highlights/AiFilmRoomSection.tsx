/*
 * AiFilmRoomSection — the cosmetic-AI showcase for the film room. A labeled
 * "AI Film Lab" header, the hero computer-vision auto-clip demo, then the reel
 * generator, shot-form analysis, and natural-language clip search. Every
 * surface is clearly badged AI and presentation-only — a preview of the model
 * layer, not wired to a live model.
 */
import { Sparkles, Cpu, ScanLine, Eye } from "lucide-react";
import { Pill } from "@/components/kit";
import { AiAutoClip } from "./AiAutoClip";
import { AiReelGenerator } from "./AiReelGenerator";
import { AiShotForm } from "./AiShotForm";
import { AiClipSearch } from "./AiClipSearch";

export function AiFilmRoomSection() {
  return (
    <section aria-label="AI film lab">
      {/* Labeled header */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-2">
          <Pill icon={Sparkles}>AI Film Lab</Pill>
          <Pill icon={Cpu}>Preview</Pill>
        </div>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Computer vision, reading the game
        </h2>
        <p className="mt-2 max-w-2xl text-base text-muted-foreground">
          The film room watches every possession — tracking players, recognizing plays,
          breaking down shot mechanics, and cutting reels on command. A preview of the vision
          model layer; not yet wired to a live model.
        </p>
      </div>

      {/* Hero CV demo + supporting feature */}
      <div className="grid gap-4 lg:grid-cols-[1.3fr_1fr] lg:items-start">
        <div className="rounded-2xl bg-gradient-to-br from-gold/40 via-gold/10 to-transparent p-px shadow-sm">
          <div className="rounded-2xl bg-card p-4 sm:p-5">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-sm font-bold text-foreground">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-gold-soft ring-1 ring-gold/20">
                  <ScanLine className="h-5 w-5 text-gold-text" aria-hidden />
                </span>
                Auto-clip · CV tracking
              </div>
              <Pill icon={Eye}>Live demo</Pill>
            </div>
            <AiAutoClip />
            <p className="mt-3 text-xs text-muted-foreground">
              Cosmetic demo — bounding boxes + play tags illustrate the model. Real footage is
              processed once the vision layer is connected.
            </p>
          </div>
        </div>
        <AiReelGenerator />
      </div>

      {/* Mechanics + search */}
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <AiShotForm />
        <AiClipSearch />
      </div>
    </section>
  );
}
