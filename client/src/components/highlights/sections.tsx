/*
 * Highlights page sections — light-surface building blocks (stats strip, live-now
 * banner, playlists row, submit-CTA band, empty state). All cosmetic; the film
 * room wires to live stream + saved clips later.
 */
import { Film, Clock, Eye, Radio, ListVideo, Dumbbell, Video, Upload, ArrowRight } from "lucide-react";
import { StatTile, btnGold } from "@/components/kit";
import { Logo } from "@/components/Logo";
import { PLAYLISTS } from "@/components/highlights/data";

/* 3 — Stats strip */
export function StatsStrip() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      <StatTile value={248} suffix="+" label="Clips" />
      <StatTile value={64} suffix="h" label="Hours of film" />
      <StatTile value={182} suffix="k" label="Total views" />
      <StatTile value={12} label="Live games" />
    </div>
  );
}

/* 4 — Live now band */
export function LiveNowBanner() {
  return (
    <div className="hero-navy flex flex-col items-start gap-4 rounded-2xl border border-white/10 p-6 text-white sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <span className="relative grid h-10 w-10 place-items-center rounded-full bg-red-600/20">
          <span className="absolute h-3 w-3 animate-ping rounded-full bg-red-500" />
          <span className="h-3 w-3 rounded-full bg-red-500" />
        </span>
        <div>
          <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-red-300">
            <Radio className="h-4 w-4" /> Live now
          </div>
          <div className="mt-0.5 text-base font-semibold">11U Girls vs. Rivertown Elite</div>
          <div className="text-xs text-white/60">Westchester County Center · Court 2 · 2nd Quarter</div>
        </div>
      </div>
      <button type="button" className={btnGold}>
        <Radio className="h-4 w-4" /> Watch live
      </button>
    </div>
  );
}

/* 6 — Playlists / Channels row */
const PLAYLIST_ICONS = [ListVideo, Dumbbell, Video];

export function PlaylistsRow() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {PLAYLISTS.map((p, i) => {
        const Icon = PLAYLIST_ICONS[i % PLAYLIST_ICONS.length];
        return (
          <button
            key={p.title}
            type="button"
            className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-5 text-left shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gold-soft text-gold-text ring-1 ring-gold/20">
              <Icon className="h-6 w-6" />
            </span>
            <span className="min-w-0">
              <span className="flex items-center gap-1.5 font-bold text-foreground">
                {p.title}
                <ArrowRight className="h-4 w-4 text-gold-text opacity-0 transition-opacity group-hover:opacity-100" />
              </span>
              <span className="block text-sm text-muted-foreground">{p.desc}</span>
              <span className="mt-1 block text-xs font-semibold uppercase tracking-wider text-gold-text">
                {p.count} clips
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* 8 — Submit your highlight CTA */
export function SubmitCta() {
  return (
    <div className="flex flex-col items-start gap-5 rounded-2xl border border-gold/20 bg-gold-soft p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
      <div className="flex items-start gap-4">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gold text-navy">
          <Upload className="h-6 w-6" />
        </span>
        <div>
          <h3 className="text-xl font-extrabold tracking-tight text-foreground">Got a clip we missed?</h3>
          <p className="mt-1 max-w-md text-sm text-muted-foreground">
            Send us your game footage and our team will tag, clip, and add it to your family film room.
          </p>
        </div>
      </div>
      <button type="button" className={`${btnGold} shrink-0`}>
        <Upload className="h-4 w-4" /> Submit your highlight
      </button>
    </div>
  );
}

/* 9 — Empty / no-results state */
export function EmptyReel({ category }: { category: string }) {
  return (
    <div className="grid place-items-center rounded-2xl border border-dashed border-border bg-card px-6 py-16 text-center">
      <span className="grid h-20 w-20 place-items-center rounded-2xl bg-gold-soft opacity-80 ring-1 ring-gold/20">
        <Logo className="h-12 w-12" />
      </span>
      <h3 className="mt-5 text-xl font-extrabold tracking-tight text-foreground">
        No {category.toLowerCase()} clips — yet.
      </h3>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        Coach Kenny is plotting something good. Check back after the next game, or browse another category.
      </p>
      <div className="mt-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold-text">
        <Film className="h-4 w-4" /> The film room is always rolling
      </div>
    </div>
  );
}

/* Tiny shared meta row used in the page subhead — kept here to avoid prop drilling. */
export function ReelMeta({ count }: { count: number }) {
  return (
    <span className="inline-flex items-center gap-4 text-sm text-muted-foreground">
      <span className="inline-flex items-center gap-1.5">
        <Film className="h-4 w-4" /> {count} clips
      </span>
      <span className="inline-flex items-center gap-1.5">
        <Clock className="h-4 w-4" /> Auto-clipped
      </span>
      <span className="inline-flex items-center gap-1.5">
        <Eye className="h-4 w-4" /> HD film room
      </span>
    </span>
  );
}
