/*
 * Highlights — the film room. Cosmetic reel (navy + logo thumbnails) until
 * live stream/film is wired. One navy hero up top; every other section light.
 * Category chips filter the reel live; cards open an accessible lightbox player.
 */
import { useMemo, useState } from "react";
import { ArrowRight, Film, Radio } from "lucide-react";
import { REGISTER_URL } from "@/lib/brand";
import { Section, SectionHeading, Pill, btnGold, btnGhostDark } from "@/components/kit";
import {
  CATEGORIES,
  filterHighlights,
  FEATURED,
  type EnrichedHighlight,
} from "@/components/highlights/data";
import { HighlightCard } from "@/components/highlights/HighlightCard";
import { PlayerPanel } from "@/components/highlights/PlayerPanel";
import { HighlightLightbox } from "@/components/highlights/HighlightLightbox";
import {
  StatsStrip,
  LiveNowBanner,
  PlaylistsRow,
  SubmitCta,
  EmptyReel,
  ReelMeta,
} from "@/components/highlights/sections";
import { AiFilmRoomSection } from "@/components/ai/highlights/AiFilmRoomSection";

export default function Highlights() {
  const [active, setActive] = useState("All");
  const [clip, setClip] = useState<EnrichedHighlight | null>(null);

  const items = useMemo(() => filterHighlights(active), [active]);

  return (
    <div>
      {/* Navy hero (the only navy page chrome at the top) */}
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

      {/* 1 — Featured "now playing" + stats strip */}
      <Section>
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          <PlayerPanel h={FEATURED} />
          <div className="flex flex-col gap-6">
            <SectionHeading
              eyebrow="Featured"
              title="This week's top reel"
              subtitle="Auto-clipped from the latest game and saved to the family film room."
            />
            <StatsStrip />
          </div>
        </div>
      </Section>

      {/* 4 — Live now */}
      <Section tone="muted" className="!py-10">
        <LiveNowBanner />
      </Section>

      {/* 2 + 5 + 10 — Filterable reel with view counts, share, hover/active states */}
      <Section>
        <SectionHeading
          eyebrow="The reel"
          title="Browse the film room"
          subtitle={<ReelMeta count={items.length} />}
        />
        <div className="mb-8 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => {
            const on = c.label === active;
            return (
              <button
                key={c.label}
                type="button"
                aria-pressed={on}
                onClick={() => setActive(c.label)}
                className={`min-h-[44px] rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
                  on
                    ? "border-gold bg-gold text-navy"
                    : "border-border bg-card text-muted-foreground hover:bg-secondary"
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>

        {items.length === 0 ? (
          <EmptyReel category={active} />
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((h, i) => (
              <div key={h.title} className={i === 0 ? "sm:col-span-2" : ""}>
                <HighlightCard h={h} featured={i === 0} onOpen={setClip} />
              </div>
            ))}
          </div>
        )}

        <p className="mt-6 text-center text-sm text-muted-foreground">
          This reel is a template preview — clips wire to live stream + film once connected.
        </p>
      </Section>

      {/* AI Film Lab — cosmetic computer-vision showcase (the star of the film room) */}
      <Section tone="muted">
        <AiFilmRoomSection />
      </Section>

      {/* 6 — Playlists / channels */}
      <Section tone="muted">
        <SectionHeading
          eyebrow="Channels"
          title="Playlists & channels"
          subtitle="Jump straight to the cuts you care about."
        />
        <PlaylistsRow />
      </Section>

      {/* 8 — Submit your highlight */}
      <Section className="!py-12">
        <SubmitCta />
      </Section>

      {/* Closing CTA (light gold band) */}
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

      {/* 7 — Lightbox player modal */}
      <HighlightLightbox clip={clip} onClose={() => setClip(null)} />
    </div>
  );
}
