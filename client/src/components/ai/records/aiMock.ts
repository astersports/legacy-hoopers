/*
 * aiMock — COSMETIC AI helpers for the Records page. None of this calls a real
 * model or API. It deterministically derives plausible-looking "AI" output from
 * the live TeamRecord shapes so the showcase feels alive without any inference
 * or network. Wired-later by design: swap these pure fns for real model calls.
 *
 * Everything here is presentation-grade fabrication clearly labeled "AI" in the
 * UI. The live data (useProgramRecords) is read-only and never mutated.
 */
import type { TeamRecord } from "@/lib/aster";
import { winRate, bestWinStreak, lastResults } from "@/components/records/recordsUtils";

/** A tiny deterministic hash → 0..1, so "AI" numbers are stable per team. */
function seed(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  // map to a 0..1 float
  return ((h >>> 0) % 100000) / 100000;
}

/** A confidence % that looks model-like (78–96), stable per team. */
export function aiConfidence(team: TeamRecord): number {
  const decided = team.wins + team.losses;
  const base = 78 + Math.round(seed(team.name) * 14); // 78..92
  const lift = Math.min(4, Math.floor(decided / 4)); // more games → more "confident"
  return Math.min(96, base + lift);
}

/**
 * A cosmetic next-matchup win probability (0..100). Anchored on the real win
 * rate, nudged by current form + a stable per-team jitter. Labeled "projected".
 */
export function aiWinProbability(team: TeamRecord): number {
  const rate = winRate(team); // 0..1 from live data
  const form = lastResults(team, 5);
  const formLift =
    form.reduce((s, r) => s + (r === "W" ? 1 : r === "L" ? -1 : 0), 0) * 0.03;
  const jitter = (seed(team.name + "wp") - 0.5) * 0.08;
  const p = rate * 0.7 + 0.3 + formLift + jitter; // regress toward 0.5-ish baseline
  return Math.round(Math.min(0.94, Math.max(0.18, p)) * 100);
}

export interface ScoutingReport {
  summary: string;
  strengths: string[];
  tendencies: string[];
  xFactor: string;
}

/** A faux generated scouting report, deterministic per team. Cosmetic only. */
export function aiScoutingReport(team: TeamRecord): ScoutingReport {
  const decided = team.wins + team.losses;
  const pct = Math.round(winRate(team) * 100);
  const streak = bestWinStreak(team);
  const s = seed(team.name + "scout");

  const tempo = s > 0.5 ? "an up-tempo, transition-first" : "a patient, half-court";
  const edge = pct >= 60 ? "a clear scoreboard edge" : pct >= 45 ? "a competitive, coin-flip" : "an underdog's";
  const closer = streak >= 2 ? "closing games out late" : "staying within striking distance";

  const summary =
    `${team.name} profiles as ${tempo} group carrying ${edge} record across ` +
    `${decided} decided games this season. The model reads them as strongest when ` +
    `${closer}, with shot quality trending up over their recent slate.`;

  const strengths = [
    pct >= 55 ? "Efficient scoring on early-clock looks" : "Disciplined, low-turnover possessions",
    streak >= 2 ? `Momentum — ${streak} straight in the win column` : "Resilience in close finishes",
    s > 0.5 ? "Defensive activity in passing lanes" : "Glass control on the defensive board",
  ];
  const tendencies = [
    s > 0.4 ? "Pushes pace off live rebounds" : "Slows tempo to shorten games",
    "Hunts mismatches in the second quarter",
    pct < 50 ? "Streaky from the perimeter — variance is high" : "Reliable from the line under pressure",
  ];
  const xFactor =
    streak >= 3
      ? "Confidence. A hot streak this long compounds — the model flags a self-reinforcing edge."
      : s > 0.5
        ? "Bench depth. Second-unit minutes swing the projected margin more than any starter."
        : "Half-court execution late. Tight games tip on their final-possession efficiency.";

  return { summary, strengths, tendencies, xFactor };
}

export interface SmartInsight {
  label: string;
  tone: "hot" | "info" | "watch";
}

/** AI-flavored insight chips derived from live results. Cosmetic labeling. */
export function aiInsights(team: TeamRecord): SmartInsight[] {
  const out: SmartInsight[] = [];
  const streak = bestWinStreak(team);
  const pct = Math.round(winRate(team) * 100);
  const form = lastResults(team, 5);
  const recentWins = form.filter((r) => r === "W").length;

  if (streak >= 3) out.push({ label: `${streak}-game win streak`, tone: "hot" });
  else if (streak === 2) out.push({ label: "Back-to-back wins", tone: "hot" });

  if (pct >= 65) out.push({ label: "Top-tier win rate", tone: "info" });
  if (recentWins >= 4) out.push({ label: "Peaking late in the season", tone: "hot" });
  if (recentWins <= 1 && form.length >= 3) out.push({ label: "Cooling off — watch the trend", tone: "watch" });

  // a couple of stable, model-flavored tags so every team shows something
  const s = seed(team.name + "insight");
  out.push({ label: s > 0.5 ? "Strongest in 2nd half" : "Fast starts out of the gate", tone: "info" });
  if (out.length < 3) out.push({ label: "Steady, balanced scoring profile", tone: "info" });

  return out.slice(0, 4);
}

export interface ForecastPoint {
  game: number;
  actual: number | null; // cumulative win % through this game (live-derived)
  projected: number | null; // AI dashed projection
  lo: number | null; // confidence band low
  hi: number | null; // confidence band high
}

/**
 * A season trend forecast series: cumulative actual win% from live games, then
 * a cosmetic AI projection extending forward with a widening confidence band.
 */
export function aiSeasonForecast(team: TeamRecord): ForecastPoint[] {
  // oldest → newest decided games
  const decided = [...team.games].reverse().filter((g) => g.result === "W" || g.result === "L");
  const pts: ForecastPoint[] = [];
  let w = 0;
  decided.forEach((g, i) => {
    if (g.result === "W") w++;
    const pct = Math.round((w / (i + 1)) * 100);
    pts.push({ game: i + 1, actual: pct, projected: i === decided.length - 1 ? pct : null, lo: null, hi: null });
  });

  if (pts.length === 0) return pts;

  // project 4 games forward from the last actual point, drifting toward the
  // model's win-probability "true talent" estimate, with a widening band.
  const lastPct = pts[pts.length - 1].actual ?? 50;
  const target = aiWinProbability(team);
  const startGame = pts.length;
  for (let k = 1; k <= 4; k++) {
    const t = k / 4;
    const proj = Math.round(lastPct + (target - lastPct) * t);
    const band = 4 + k * 3; // widens with horizon
    pts.push({
      game: startGame + k,
      actual: null,
      projected: proj,
      lo: Math.max(0, proj - band),
      hi: Math.min(100, proj + band),
    });
  }
  return pts;
}

/** Suggested natural-language questions for the cosmetic "Ask" box. */
export const SUGGESTED_QUESTIONS = [
  "Which team is trending up the fastest?",
  "Who has the toughest remaining schedule?",
  "Where is the program strongest this season?",
  "Which matchup is the biggest coin-flip?",
] as const;

/** A faux NL answer, deterministic from the program + question. Cosmetic only. */
export function aiAnswer(question: string, records: TeamRecord[]): string {
  const ranked = [...records].sort((a, b) => winRate(b) - winRate(a));
  const top = ranked[0];
  const hot = [...records].sort((a, b) => bestWinStreak(b) - bestWinStreak(a))[0];
  const q = question.toLowerCase();

  if (!top) return "There aren't enough published games yet for the model to weigh in.";

  if (q.includes("trend") || q.includes("up")) {
    return `${hot.name} is the program's fastest riser — the model reads their recent form as the steepest positive slope, with a ${bestWinStreak(hot)}-game run anchoring the trend.`;
  }
  if (q.includes("strong") || q.includes("best")) {
    return `Across the program, ${top.name} grades out strongest right now at a ${Math.round(winRate(top) * 100)}% win rate, ${top.wins}–${top.losses}. The model gives them the highest projected edge in a neutral matchup.`;
  }
  if (q.includes("coin") || q.includes("flip") || q.includes("close")) {
    const mid = ranked[Math.floor(ranked.length / 2)] ?? top;
    return `The tightest projected matchup centers on ${mid.name} — the model lands them closest to a 50/50 split, so any small edge in form or rest could tip it.`;
  }
  if (q.includes("schedule") || q.includes("tough")) {
    return `Strength-of-schedule is a directional read here, but the model flags ${ranked[ranked.length - 1]?.name ?? top.name} as facing the steepest climb based on opponent quality so far.`;
  }
  return `Based on every published game, ${top.name} leads the program at ${Math.round(winRate(top) * 100)}%, and ${hot.name} carries the hottest current form. Ask about trends, matchups, or where the program is strongest.`;
}
