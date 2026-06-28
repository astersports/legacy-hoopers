/**
 * Aster Sports platform — public read client for the Aster Sports site.
 *
 * The Aster Sports website is a THIN PUBLIC CONSUMER of the Aster Sports
 * platform (charter Q4/Q5): it reads org-gated public data straight from the
 * platform's Supabase via the publishable anon key. No server, no data clone,
 * no tenant facts hardcoded beyond the org id below.
 *
 * The URL + anon key are PUBLISHABLE (designed to ship in the browser) and the
 * data is gated server-side by `org_is_public_listed` + RLS — anon can only read
 * what the platform has explicitly published. Hardcoded (not VITE_ env) on
 * purpose: a public read key has no secret to protect, and baking it in avoids
 * the build-time-env failure mode that white-screens the app when a var is unset.
 */
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://vrwwpsbfbnveawqwbdmj.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_8semOyZSkr_QGr2hwmjDdQ_-U8KRtw4";

/** Aster Sports org on the Aster Sports platform. */
export const ORG_ID = "e3e95e21-3571-4e9a-985a-d5d01480d4a6";

export const aster = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});

export interface Team {
  id: string;
  name: string;
  team_color: string | null;
  age_group: string | null;
  gender: string | null;
  season_id: string | null;
}

/** One played + published game, as returned by `get_public_team_records`. */
export interface GameRecord {
  game_id: string;
  event_id: string;
  played_at: string;
  opponent: string;
  home_away: "home" | "away" | "neutral" | "tbd";
  our_score: number | null;
  opponent_score: number | null;
  result: "W" | "L" | "T" | null;
  point_differential: number | null;
  coach_highlight: string | null;
  published_at: string | null;
}

/** A team aggregated across its season rows, with its full published game log. */
export interface TeamRecord {
  name: string;
  ageGroup: string | null;
  color: string;
  wins: number;
  losses: number;
  ties: number;
  games: GameRecord[];
}

const DEFAULT_ACCENT = "#4a8fd4"; // Aster cobalt (org brand)

// Camp / lab / placeholder teams never appear on the public site.
const NON_COMPETITIVE = /roster lab|day camp|summer/i;

/** Oldest → youngest, the Aster convention; unknown ages sort last. */
function ageRank(ageGroup: string | null): number {
  const n = ageGroup ? parseInt(ageGroup, 10) : NaN;
  return Number.isNaN(n) ? 999 : -n; // higher age first
}

export async function getTeams(): Promise<Team[]> {
  const { data, error } = await aster
    .from("teams")
    .select("id, name, team_color, age_group, gender, season_id")
    .eq("org_id", ORG_ID);
  if (error) throw error;
  return (data ?? []).filter((t) => !NON_COMPETITIVE.test(t.name ?? ""));
}

export async function getTeamRecords(teamId: string): Promise<GameRecord[]> {
  const { data, error } = await aster.rpc("get_public_team_records", { p_team_id: teamId });
  if (error) throw error;
  return (data ?? []) as GameRecord[];
}

/**
 * Program-wide records: every competitive team aggregated by NAME across its
 * season rows, each with its combined win/loss line and full game log. One
 * network round-trip for teams, then the per-team record RPCs in parallel.
 */
export async function getProgramRecords(): Promise<TeamRecord[]> {
  const teams = await getTeams();
  const withGames = await Promise.all(
    teams.map(async (t) => ({ team: t, games: await getTeamRecords(t.id) })),
  );

  const byName = new Map<string, TeamRecord>();
  for (const { team, games } of withGames) {
    if (games.length === 0) continue;
    const key = team.name;
    let rec = byName.get(key);
    if (!rec) {
      rec = {
        name: team.name,
        ageGroup: team.age_group,
        color: team.team_color || DEFAULT_ACCENT,
        wins: 0,
        losses: 0,
        ties: 0,
        games: [],
      };
      byName.set(key, rec);
    }
    for (const g of games) {
      if (g.result === "W") rec.wins++;
      else if (g.result === "L") rec.losses++;
      else if (g.result === "T") rec.ties++;
    }
    rec.games.push(...games);
  }

  const out = Array.from(byName.values());
  for (const rec of out) rec.games.sort((a, b) => (a.played_at < b.played_at ? 1 : -1));
  out.sort((a, b) => ageRank(a.ageGroup) - ageRank(b.ageGroup) || a.name.localeCompare(b.name));
  return out;
}

/** Program totals across all teams — for the home hero stat line. */
export function programTotals(records: TeamRecord[]) {
  const wins = records.reduce((s, r) => s + r.wins, 0);
  const losses = records.reduce((s, r) => s + r.losses, 0);
  const games = records.reduce((s, r) => s + r.games.length, 0);
  const pct = wins + losses > 0 ? wins / (wins + losses) : 0;
  return { wins, losses, games, teams: records.length, pct };
}
