/*
 * aiProgramsMeta — page-local data + deterministic "faux AI" logic for the
 * Programs page AI surfaces. NO model calls, NO network: every "analysis" here
 * is a pure function over canned weights so the demo is stable and repeatable.
 * Keyed off the canonical SERVICES list (lib/content.ts) so the matcher only
 * ever recommends a real program shown on the page.
 */
import { SERVICES, type Service } from "@/lib/content";

/* ----------------------------- Program Matcher ---------------------------- */

export type AgeBand = "rookie" | "developing" | "competitive" | "prospect";
export type Goal = "fundamentals" | "compete" | "elite" | "fun";
export type Commitment = "drop-in" | "weekly" | "all-in";
export type Experience = "new" | "some" | "experienced";

export type MatcherAnswers = {
  age: AgeBand;
  goal: Goal;
  commitment: Commitment;
  experience: Experience;
};

export const MATCHER_QUESTIONS: {
  key: keyof MatcherAnswers;
  label: string;
  help: string;
  options: { value: string; label: string }[];
}[] = [
  {
    key: "age",
    label: "How old is your athlete?",
    help: "We place by skill and goals — age just sets the starting lane.",
    options: [
      { value: "rookie", label: "Grades 2–3" },
      { value: "developing", label: "Grades 4–5" },
      { value: "competitive", label: "Grades 6–8" },
      { value: "prospect", label: "Grades 9–11" },
    ],
  },
  {
    key: "goal",
    label: "What's the main goal right now?",
    help: "There are no wrong answers — every path develops complete players.",
    options: [
      { value: "fundamentals", label: "Build fundamentals" },
      { value: "fun", label: "Stay active & have fun" },
      { value: "compete", label: "Compete & travel" },
      { value: "elite", label: "Chase the next level" },
    ],
  },
  {
    key: "commitment",
    label: "How much time can you commit?",
    help: "Flexible plans mean you can always step up or down later.",
    options: [
      { value: "drop-in", label: "Drop in here and there" },
      { value: "weekly", label: "A weekly rhythm" },
      { value: "all-in", label: "All-in, year-round" },
    ],
  },
  {
    key: "experience",
    label: "How much basketball experience?",
    help: "This calibrates the pace, not the ceiling.",
    options: [
      { value: "new", label: "Brand new" },
      { value: "some", label: "Some seasons in" },
      { value: "experienced", label: "Experienced" },
    ],
  },
];

// Per-service affinity weights for each answer value. Pure cosmetic tuning so
// the recommendation feels considered. Values roughly 0–4. Shape:
// question key -> answer value -> service key -> weight.
type Weights = Partial<
  Record<keyof MatcherAnswers, Record<string, Record<string, number>>>
>;

const WEIGHTS: Weights = {
  age: {
    rookie: { camps: 4, clinics: 3, "small-group": 2, training: 1, aau: 0, elite: 0 },
    developing: { clinics: 4, "small-group": 3, camps: 3, aau: 2, training: 2, elite: 0 },
    competitive: { aau: 4, "small-group": 3, training: 3, clinics: 2, elite: 1, camps: 1 },
    prospect: { aau: 4, elite: 4, training: 3, "small-group": 2, clinics: 1, camps: 0 },
  },
  goal: {
    fundamentals: { clinics: 4, camps: 3, "small-group": 3, training: 2, aau: 1, elite: 0 },
    fun: { camps: 4, clinics: 3, "small-group": 2, aau: 1, training: 1, elite: 0 },
    compete: { aau: 4, "small-group": 3, training: 2, clinics: 1, elite: 2, camps: 1 },
    elite: { elite: 4, aau: 3, training: 4, "small-group": 1, clinics: 0, camps: 0 },
  },
  commitment: {
    "drop-in": { camps: 4, clinics: 3, training: 2, "small-group": 1, aau: 0, elite: 0 },
    weekly: { clinics: 4, "small-group": 4, training: 3, aau: 2, camps: 1, elite: 1 },
    "all-in": { aau: 4, elite: 4, training: 3, "small-group": 2, clinics: 1, camps: 0 },
  },
  experience: {
    new: { camps: 4, clinics: 4, "small-group": 2, training: 2, aau: 0, elite: 0 },
    some: { clinics: 3, "small-group": 4, camps: 2, aau: 3, training: 3, elite: 1 },
    experienced: { aau: 4, training: 4, elite: 3, "small-group": 2, clinics: 1, camps: 0 },
  },
};

const MAX_PER_Q = 4;

export type MatchResult = {
  service: Service;
  /** 0–100 match percentage. */
  percent: number;
  /** Short reasons referencing the athlete's answers. */
  reasons: string[];
  /** The two next-best programs as alternatives. */
  alternatives: { service: Service; percent: number }[];
};

const REASON_BITS: Record<keyof MatcherAnswers, Record<string, string>> = {
  age: {
    rookie: "right age-appropriate pace for grades 2–3",
    developing: "built for the grades 4–5 development window",
    competitive: "matches a grades 6–8 competitive load",
    prospect: "a recruiting-aware track for grades 9–11",
  },
  goal: {
    fundamentals: "leads with the fundamentals you want to build",
    fun: "keeps it high-energy and fun",
    compete: "geared toward competing and travel play",
    elite: "a clear runway toward the next level",
  },
  commitment: {
    "drop-in": "flexes around a drop-in schedule",
    weekly: "fits a steady weekly rhythm",
    "all-in": "rewards an all-in, year-round commitment",
  },
  experience: {
    new: "welcoming for a brand-new player",
    some: "calibrated for a few seasons of experience",
    experienced: "challenges an experienced athlete",
  },
};

/** Deterministic faux-AI scorer. Returns the best-fit program + reasoning. */
export function scoreMatch(answers: MatcherAnswers): MatchResult {
  const totals = SERVICES.map((service) => {
    let raw = 0;
    (Object.keys(answers) as (keyof MatcherAnswers)[]).forEach((q) => {
      const val = answers[q];
      raw += WEIGHTS[q]?.[val]?.[service.key] ?? 0;
    });
    const max = MAX_PER_Q * 4;
    // Compress to a confident-feeling 62–98 range so nothing reads as a "bad" fit.
    const percent = Math.round(62 + (raw / max) * 36);
    return { service, percent, raw };
  });

  // Highest raw score wins; ties break toward the "popular" flagship program.
  totals.sort((a, b) => b.raw - a.raw || Number(!!b.service.popular) - Number(!!a.service.popular));

  const top = totals[0];
  const reasons = (Object.keys(answers) as (keyof MatcherAnswers)[])
    .map((q) => REASON_BITS[q][answers[q]])
    .filter(Boolean);

  return {
    service: top.service,
    percent: Math.min(98, Math.max(70, top.percent)),
    reasons,
    alternatives: totals.slice(1, 3).map((t) => ({ service: t.service, percent: t.percent })),
  };
}

/* ----------------------- Skill-gap / development path ---------------------- */

export type SkillBar = { skill: string; current: number; potential: number };

export type DevelopmentPath = {
  bars: SkillBar[];
  /** Recommended program sequence over time. */
  timeline: { phase: string; program: string; focus: string; serviceKey: string }[];
  headline: string;
};

/** Faux skill-gap analysis per starting age band. Cosmetic, deterministic. */
export const DEV_PATHS: Record<AgeBand, DevelopmentPath> = {
  rookie: {
    headline: "Lots of runway — start with reps and confidence.",
    bars: [
      { skill: "Ball handling", current: 28, potential: 82 },
      { skill: "Shooting form", current: 22, potential: 86 },
      { skill: "Footwork", current: 31, potential: 80 },
      { skill: "Game IQ", current: 18, potential: 78 },
    ],
    timeline: [
      { phase: "Now", program: "Skills Camps", focus: "Fundamentals & fun", serviceKey: "camps" },
      { phase: "Next", program: "Skill Clinics", focus: "Weekly themed reps", serviceKey: "clinics" },
      { phase: "Then", program: "Small Groups", focus: "Competitive blocks", serviceKey: "small-group" },
    ],
  },
  developing: {
    headline: "Strong base — time to add competition and structure.",
    bars: [
      { skill: "Ball handling", current: 48, potential: 88 },
      { skill: "Finishing", current: 41, potential: 84 },
      { skill: "Defense", current: 37, potential: 82 },
      { skill: "Game IQ", current: 44, potential: 86 },
    ],
    timeline: [
      { phase: "Now", program: "Skill Clinics", focus: "Sharpen the toolkit", serviceKey: "clinics" },
      { phase: "Next", program: "Small Groups", focus: "Competitive reps", serviceKey: "small-group" },
      { phase: "Then", program: "AAU Travel Teams", focus: "Real game film", serviceKey: "aau" },
    ],
  },
  competitive: {
    headline: "Competitive profile — close the gaps with targeted work.",
    bars: [
      { skill: "Shot creation", current: 58, potential: 90 },
      { skill: "On-ball defense", current: 52, potential: 88 },
      { skill: "Conditioning", current: 61, potential: 92 },
      { skill: "Decision speed", current: 55, potential: 89 },
    ],
    timeline: [
      { phase: "Now", program: "AAU Travel Teams", focus: "Compete & film", serviceKey: "aau" },
      { phase: "Add", program: "1:1 Training", focus: "Target weak spots", serviceKey: "training" },
      { phase: "Then", program: "Elite Academy", focus: "Periodized plan", serviceKey: "elite" },
    ],
  },
  prospect: {
    headline: "Prospect track — refine, project, and get seen.",
    bars: [
      { skill: "Shooting range", current: 66, potential: 94 },
      { skill: "Strength", current: 59, potential: 91 },
      { skill: "Versatility", current: 64, potential: 93 },
      { skill: "Recruiting profile", current: 48, potential: 90 },
    ],
    timeline: [
      { phase: "Now", program: "Elite Academy", focus: "Year-round plan", serviceKey: "elite" },
      { phase: "With", program: "1:1 Training", focus: "Skill refinement", serviceKey: "training" },
      { phase: "Showcase", program: "AAU Travel Teams", focus: "Exposure & film", serviceKey: "aau" },
    ],
  },
};

/* --------------------------- Custom plan builder --------------------------- */

export type PlanBlock = {
  key: string;
  label: string;
  desc: string;
  /** Cosmetic monthly estimate added to the plan. */
  monthly: number;
};

export const PLAN_BLOCKS: PlanBlock[] = [
  { key: "clinics", label: "Weekly skill clinic", desc: "Themed group reps", monthly: 140 },
  { key: "training", label: "Bi-weekly 1:1 session", desc: "Private coaching", monthly: 180 },
  { key: "small-group", label: "Small-group block", desc: "2–4 players, matched", monthly: 160 },
  { key: "aau", label: "AAU travel team", desc: "Tournaments & film", monthly: 220 },
  { key: "strength", label: "Strength & mobility", desc: "Injury-smart conditioning", monthly: 90 },
  { key: "film", label: "Film & analytics", desc: "Breakdown after sessions", monthly: 45 },
];

export type PlanEstimate = {
  monthly: number;
  /** Cosmetic AI-applied bundle discount, in dollars. */
  discount: number;
  intensity: "Light" | "Balanced" | "Intensive";
  note: string;
};

/** Faux pricing engine: sums selected blocks, applies a cosmetic bundle
 *  discount that scales with how many blocks are chosen. Deterministic. */
export function estimatePlan(selected: string[]): PlanEstimate {
  const blocks = PLAN_BLOCKS.filter((b) => selected.includes(b.key));
  const base = blocks.reduce((sum, b) => sum + b.monthly, 0);
  const rate = selected.length >= 4 ? 0.15 : selected.length === 3 ? 0.1 : selected.length === 2 ? 0.05 : 0;
  const discount = Math.round(base * rate);
  const intensity = selected.length >= 4 ? "Intensive" : selected.length >= 2 ? "Balanced" : "Light";
  const note =
    selected.length === 0
      ? "Pick a few building blocks and the AI will compose a plan."
      : selected.length >= 4
        ? "A full year-round development stack — biggest bundle savings applied."
        : selected.length >= 2
          ? "A balanced plan with room to scale up as goals grow."
          : "A light, flexible starting point — easy to build on later.";
  return { monthly: base - discount, discount, intensity, note };
}

/* ------------------------------ AI advisor chat ---------------------------- */

export const ADVISOR_SUGGESTIONS = [
  "Which program is best for a beginner?",
  "What's the difference between clinics and small groups?",
  "How do AAU tryouts work?",
  "Can we start with one session and add more?",
] as const;

export const ADVISOR_ANSWERS: Record<string, string> = {
  "Which program is best for a beginner?":
    "For a brand-new player, Skills Camps and weekly Skill Clinics are the best on-ramp — they build fundamentals in a fun, high-energy setting with no tryout required. Once the basics click, Small Groups add competition at a comfortable pace.",
  "What's the difference between clinics and small groups?":
    "Clinics are themed weekly sessions in a larger group — great for steady reps on shooting, handling and defense. Small Groups are 2–4 players matched by age and skill, so there's more individual attention and competitive drill time. Many families do both.",
  "How do AAU tryouts work?":
    "Travel teams hold open tryouts before each season. You register your interest, attend an evaluation, and hear back within a few days. Camps, clinics, 1:1 and small groups never require a tryout — you can jump in anytime.",
  "Can we start with one session and add more?":
    "Absolutely — that's the whole idea. Start with a single clinic or 1:1 session, and the plan flexes up or down from there. The custom-plan builder above estimates bundle savings automatically as you add blocks.",
};

export const ADVISOR_DEFAULT =
  "Great question. Aster weighs age, goals and commitment across all six programs — Camps, Clinics, 1:1 Training, Small Groups, AAU Travel and the Elite Academy. Tell me your athlete's age and what you're hoping to get out of it, and I'll point you to the clearest first step.";

export function advisorAnswer(prompt: string): string {
  return ADVISOR_ANSWERS[prompt] ?? ADVISOR_DEFAULT;
}
