/*
 * Highlights — the film room. Cosmetic reel (navy + logo thumbnails) until
 * live stream/film is wired. Replaces the legacy prototype highlights page.
 */
import { ArrowRight, Film, Radio } from "lucide-react";
import { REGISTER_URL } from "@/lib/brand";
import { Section, SectionHeading, Pill, btnGold, btnGhostDark } from "@/components/kit";
import { HighlightsReel } from "@/components/HighlightsReel";

const CATS = ["All", "Game winners", "Top plays", "Training", "Defense", "Features"];

export default function Highlights() {
  return (
    <div>
      <section className="hero-navy text-white">
        <div className="container py-16 sm:py-20">
          <Pill icon={Film} onDark>The film room</Pill>
          <h1 className="mt-4 max-w-3xl text-4xl font-extrabold tracking-tight sm:text-6xl">
            Every big moment, on demand.
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white/70">
            Games streamed live, clipped automatically, and saved to your family film room —
            shareable in a tap.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button type="button" className={btnGold}>
              <Radio className="h-4 w-4" /> Watch live
            </button>
            <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer" className={btnGhostDark}>
              Get film access
            </a>
          </div>
        </div>
      </section>

      <Section>
        <div className="mb-8 flex flex-wrap gap-2">
          {CATS.map((c, i) => (
            <button
              key={c}
              type="button"
              className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors ${
                i === 0
                  ? "border-gold bg-gold text-navy"
                  : "border-border bg-card text-muted-foreground hover:bg-secondary"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <HighlightsReel />
        <p className="mt-6 text-center text-sm text-muted-foreground">
          This reel is a template preview — clips wire to live stream + film once connected.
        </p>
      </Section>

      <section className="border-t border-gold/20 bg-gradient-to-b from-gold-soft to-background">
        <div className="container grid place-items-center py-16 text-center sm:py-20">
          <h2 className="max-w-2xl text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Your athlete's season, captured.
          </h2>
          <p className="mt-3 max-w-lg text-muted-foreground">
            Every Aster program includes live streaming and an auto-clipped film room.
          </p>
          <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer" className={`${btnGold} mt-7`}>
            Join the program <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </div>
  );
}
