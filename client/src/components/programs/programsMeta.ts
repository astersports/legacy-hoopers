/*
 * programsMeta — page-local metadata for the Programs enhancements.
 * Cosmetic/derived data keyed off the canonical SERVICES list. Lives here (not
 * in lib/content.ts) because these are Programs-page presentation concerns.
 */
import type { Service } from "@/lib/content";

export type FilterKey = "all" | "recurring" | "one-time" | "teams";

export const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "recurring", label: "Recurring" },
  { key: "one-time", label: "One-time" },
  { key: "teams", label: "Teams" },
];

/** Map each service key to its filter group. */
export const SERVICE_GROUP: Record<string, Exclude<FilterKey, "all">> = {
  clinics: "recurring",
  training: "recurring",
  "small-group": "recurring",
  camps: "one-time",
  aau: "teams",
  elite: "teams",
};

export function matchesFilter(s: Service, filter: FilterKey): boolean {
  return filter === "all" || SERVICE_GROUP[s.key] === filter;
}

/** Per-program comparison facts, keyed by service key. Cosmetic. */
export type CompareRow = {
  age: string;
  group: string;
  film: boolean;
  tryout: boolean;
};

export const COMPARE: Record<string, CompareRow> = {
  aau: { age: "Grades 2–11", group: "10–12 / team", film: true, tryout: true },
  camps: { age: "Ages 6–14", group: "Large group", film: false, tryout: false },
  clinics: { age: "Ages 7–14", group: "Small ratio", film: false, tryout: false },
  training: { age: "All ages", group: "1:1", film: true, tryout: false },
  "small-group": { age: "Ages 8–14", group: "2–4 players", film: true, tryout: false },
  elite: { age: "Invite only", group: "Hand-picked", film: true, tryout: true },
};

/** Age / grade eligibility quick-reference rows. */
export type EligibilityRow = { band: string; grades: string; fits: string };

export const ELIGIBILITY: EligibilityRow[] = [
  { band: "Rookies", grades: "Grades 2–3", fits: "Camps · Clinics" },
  { band: "Developing", grades: "Grades 4–5", fits: "Clinics · Small Groups · AAU" },
  { band: "Competitive", grades: "Grades 6–8", fits: "AAU · 1:1 · Small Groups" },
  { band: "Prospect", grades: "Grades 9–11", fits: "AAU · Elite Academy · 1:1" },
];

/** Season timeline band. */
export type SeasonBlock = { season: string; program: string; note: string };

export const SEASON_TIMELINE: SeasonBlock[] = [
  { season: "Spring", program: "AAU Travel", note: "Tournament season" },
  { season: "Summer", program: "Skills Camps", note: "School-break intensives" },
  { season: "Fall", program: "Skill Clinics", note: "Weekly development" },
  { season: "Year-round", program: "Elite Academy", note: "Invite-only track" },
];

/** Registration steps. */
export type RegStep = { n: string; title: string; desc: string };

export const REG_STEPS: RegStep[] = [
  { n: "1", title: "Pick your program", desc: "Choose a camp, clinic, 1:1, small group, or travel team that fits your athlete." },
  { n: "2", title: "Create one profile", desc: "Register in minutes — one family profile powers every program and flexible plans." },
  { n: "3", title: "Show up & train", desc: "Get your schedule, reminders, and development plan in the Aster app from day one." },
];

/** Programs-specific FAQ. */
export type FaqItem = { q: string; a: string };

export const PROGRAM_FAQ: FaqItem[] = [
  { q: "How do AAU tryouts work?", a: "Travel teams hold open tryouts before each season. You'll register your interest, attend an evaluation, and hear back within a few days. No tryout is needed for camps, clinics, 1:1, or small groups." },
  { q: "What's your refund policy?", a: "Camps and clinics are fully refundable up to 7 days before the start date. Season-long programs are pro-rated. Reach out anytime and we'll make it right." },
  { q: "What should my athlete bring?", a: "A basketball, a water bottle, court shoes, and a labeled bag. Everything else — including the development plan and film — is handled in the app." },
  { q: "How flexible is scheduling?", a: "1:1 and small-group sessions book around your week. Clinics run in weekly blocks with drop-in options, and camps follow the school-break calendar." },
  { q: "Is financial aid available?", a: "Yes. We never want cost to be the reason a kid can't play. Ask about need-based scholarships and payment plans when you register." },
];

/** Trust badges. */
export type Badge = { label: string; sub: string };

export const TRUST_BADGES: Badge[] = [
  { label: "SafeSport Certified", sub: "Every coach, every season" },
  { label: "Background-Checked", sub: "Screened staff" },
  { label: "Master-Trained", sub: "Credentialed coaches" },
  { label: "Fully Insured", sub: "Covered programs" },
];
