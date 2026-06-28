/*
 * Cosmetic mock data for the AI film room. NO real API calls — every value here
 * is static/derived for presentation only, wired to a real model layer later.
 * Kept tiny + typed so the showcase components stay presentation-only.
 */

/** A computer-vision detection drawn over the film frame (percent coords). */
export type CvBox = {
  id: string;
  label: string;
  conf: number; // 0..1 detection confidence
  /** Box geometry as percentages of the frame (x/y = top-left). */
  x: number;
  y: number;
  w: number;
  h: number;
  tone: "gold" | "cyan" | "green";
};

export const CV_BOXES: CvBox[] = [
  { id: "b1", label: "Ball handler", conf: 0.97, x: 16, y: 38, w: 20, h: 40, tone: "gold" },
  { id: "b2", label: "Screen", conf: 0.91, x: 44, y: 30, w: 18, h: 44, tone: "cyan" },
  { id: "b3", label: "Roll man", conf: 0.84, x: 66, y: 34, w: 19, h: 42, tone: "green" },
];

/** Play tags the CV layer "recognizes" as it scans the clip. */
export type PlayTag = { label: string; conf: number };

export const PLAY_TAGS: PlayTag[] = [
  { label: "Pick & roll", conf: 0.96 },
  { label: "Fast break", conf: 0.89 },
  { label: "Drive & kick", conf: 0.82 },
  { label: "Help defense", conf: 0.77 },
];

/** Moments the reel generator can stitch together. */
export type Moment = { id: string; label: string; clips: number; tone: string };

export const MOMENTS: Moment[] = [
  { id: "m1", label: "Buckets", clips: 14, tone: "gold" },
  { id: "m2", label: "Assists", clips: 9, tone: "cyan" },
  { id: "m3", label: "Defense", clips: 7, tone: "green" },
  { id: "m4", label: "Hustle", clips: 11, tone: "violet" },
  { id: "m5", label: "Threes", clips: 6, tone: "gold" },
];

/** Shot-form / mechanics breakdown metrics (score out of 100). */
export type FormMetric = { label: string; value: number; ideal: string };

export const FORM_METRICS: FormMetric[] = [
  { label: "Release angle", value: 88, ideal: "52°" },
  { label: "Arc height", value: 81, ideal: "45°+" },
  { label: "Balance", value: 76, ideal: "Square" },
  { label: "Follow-through", value: 92, ideal: "Held" },
];

export const FORM_TIP =
  "Release is clean — your follow-through holds beautifully. Set your feet a touch wider on the catch to square the base and lift the arc another couple of degrees.";

/** Natural-language clip-search suggestions + faux results. */
export const SEARCH_SUGGESTIONS = [
  "Find all my 3-pointers",
  "Show fast-break finishes",
  "Every assist last game",
  "Buzzer-beaters this season",
];

export type SearchResult = { title: string; meta: string; conf: number };

export const SEARCH_RESULTS: SearchResult[] = [
  { title: "Corner three vs. Rivertown Elite", meta: "League Play · Feb 2026 · 0:09", conf: 0.97 },
  { title: "Top-of-key three off the screen", meta: "Tournament · Feb 2026 · 0:07", conf: 0.93 },
  { title: "Transition pull-up three", meta: "Zero Gravity · Mar 2026 · 0:11", conf: 0.9 },
];
