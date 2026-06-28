/*
 * Highlights page — cosmetic enrichment data + helpers.
 * Augments the base HIGHLIGHTS content (lib/content.ts) with mock view counts
 * and relative dates so the film-room UI reads like a real video product.
 * All cosmetic; clips wire to real video later.
 */
import { HIGHLIGHTS, type Highlight } from "@/lib/content";

export type EnrichedHighlight = Highlight & {
  views: string;
  posted: string;
};

/* Deterministic mock view/date enrichment keyed by index — stable across renders. */
const ENRICH: { views: string; posted: string }[] = [
  { views: "12.4k", posted: "2 days ago" },
  { views: "8.1k", posted: "5 days ago" },
  { views: "3.6k", posted: "1 week ago" },
  { views: "5.9k", posted: "1 week ago" },
  { views: "2.2k", posted: "2 weeks ago" },
  { views: "21.7k", posted: "3 weeks ago" },
];

export const ENRICHED_HIGHLIGHTS: EnrichedHighlight[] = HIGHLIGHTS.map((h, i) => ({
  ...h,
  ...(ENRICH[i % ENRICH.length]),
}));

/* The featured "now playing" clip — the season hype reel reads best up top. */
export const FEATURED =
  ENRICHED_HIGHLIGHTS.find((h) => h.tag === "Feature") ?? ENRICHED_HIGHLIGHTS[0];

/* Filter chips → the singular content tags they match. "All" matches everything. */
export const CATEGORIES: { label: string; tags: string[] }[] = [
  { label: "All", tags: [] },
  { label: "Game winners", tags: ["Game winner"] },
  { label: "Top plays", tags: ["Top play"] },
  { label: "Training", tags: ["Training", "Skills"] },
  { label: "Defense", tags: ["Defense"] },
  { label: "Features", tags: ["Feature"] },
];

export function filterHighlights(label: string): EnrichedHighlight[] {
  const cat = CATEGORIES.find((c) => c.label === label);
  if (!cat || cat.tags.length === 0) return ENRICHED_HIGHLIGHTS;
  return ENRICHED_HIGHLIGHTS.filter((h) => cat.tags.includes(h.tag));
}

export type Playlist = { title: string; desc: string; count: number };

export const PLAYLISTS: Playlist[] = [
  { title: "Team reels", desc: "Season cut-ups, by squad", count: 14 },
  { title: "Skills & drills", desc: "Training-room breakdowns", count: 28 },
  { title: "Game film", desc: "Full games, tagged & clipped", count: 9 },
];
