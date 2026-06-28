/**
 * Public schedule — data + helpers for the Aster Sports AAU schedule page.
 * Reads get_public_team_schedule (org-gated SECDEF) fanned across the org's teams,
 * per the architect-locked spec (SCHEDULE_PAGE_SPEC_2026-06-26).
 *
 * Three slicers (Team / Age-Grade / Date) + two compose-anywhere filters (Type,
 * Gender). Time-state spine ported from the app (eventWindows.js). NY-tz throughout.
 */
import { aster, getTeams, type Team } from "./aster";

export type EventKind = "game" | "tournament" | "practice";
export type TimeState = "upcoming" | "happening_now" | "completed";

export interface ScheduleEvent {
  event_id: string;
  kind: EventKind | string;
  title: string | null;
  start_at: string;
  end_at: string | null;
  status: "scheduled" | "cancelled" | string;
  opponent: string | null;
  home_away: string | null;
  tournament_name: string | null;
  our_score: number | null;
  opponent_score: number | null;
  result: "W" | "L" | "T" | null;
  location_name: string | null;
  location_address: string | null;
  location_lat: number | null;
  location_lon: number | null;
  location_maps_url: string | null;
  // attached client-side from the team it was fetched for:
  team_id: string;
  team_name: string;
  team_color: string;
  age_group: string | null;
  gender: string | null;
}

const DEFAULT_ACCENT = "#4a8fd4";
const TZ = "America/New_York";
export const DEFAULT_DURATION_MS = 2 * 60 * 60 * 1000; // app parity: 2h

/** 8U=2nd, 9U=3rd, 10U=4th, 11U=5th (locked grade key). */
export function gradeLabel(ageGroup: string | null): string | null {
  const n = ageGroup ? parseInt(ageGroup, 10) : NaN;
  if (Number.isNaN(n)) return null;
  const grade = n - 6; // 8U→2 … 11U→5
  if (grade < 1 || grade > 12) return null;
  const suffix = grade === 1 ? "st" : grade === 2 ? "nd" : grade === 3 ? "rd" : "th";
  return `${grade}${suffix} grade`;
}

export async function getTeamSchedule(team: Team): Promise<ScheduleEvent[]> {
  const { data, error } = await aster.rpc("get_public_team_schedule", { p_team_id: team.id });
  if (error) throw error;
  return ((data ?? []) as ScheduleEvent[]).map((e) => ({
    ...e,
    team_id: team.id,
    team_name: team.name,
    team_color: team.team_color || DEFAULT_ACCENT,
    age_group: team.age_group,
    gender: team.gender,
  }));
}

/** Every competitive team's live/upcoming/recent events, flattened. */
export async function getProgramSchedule(): Promise<{ teams: Team[]; events: ScheduleEvent[] }> {
  const teams = await getTeams();
  const lists = await Promise.all(teams.map((t) => getTeamSchedule(t).catch(() => [])));
  const events = lists.flat();
  return { teams, events };
}

// ─── time-state (eventWindows parity) ───
export function eventEnd(e: ScheduleEvent): number {
  if (e.end_at) return Date.parse(e.end_at);
  return Date.parse(e.start_at) + DEFAULT_DURATION_MS;
}
export function timeState(e: ScheduleEvent, now: number): TimeState {
  const start = Date.parse(e.start_at);
  if (now < start) return "upcoming";
  if (now <= eventEnd(e)) return "happening_now";
  return "completed";
}
export const isLive = (e: ScheduleEvent, now: number) =>
  e.status !== "cancelled" && timeState(e, now) === "happening_now";

// ─── NY-tz formatters ───
export function fmtTime(iso: string): string {
  return new Date(iso)
    .toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZone: TZ })
    .replace(" ", "")
    .replace(":00", "")
    .toLowerCase();
}
export function fmtDayNum(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { day: "numeric", timeZone: TZ });
}
export function fmtMonth(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", timeZone: TZ }).toUpperCase();
}
export function fmtDateHeader(iso: string, now: number): string {
  const d = new Date(iso);
  const label = d.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric", timeZone: TZ });
  const today = new Date(now).toLocaleDateString("en-US", { timeZone: TZ });
  return d.toLocaleDateString("en-US", { timeZone: TZ }) === today ? `${label} · TODAY` : label;
}
export function dateKey(iso: string): string {
  return new Date(iso).toLocaleDateString("en-CA", { timeZone: TZ }); // YYYY-MM-DD
}
export function countdown(iso: string, now: number): string {
  const diff = Date.parse(iso) - now;
  if (diff <= 0) return "now";
  const mins = Math.round(diff / 60000);
  if (mins < 60) return `in ${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `in ${hrs}h ${mins % 60}m`;
  const d = new Date(iso);
  const days = Math.round(hrs / 24);
  if (days === 1) return `Tomorrow ${fmtTime(iso)}`;
  if (days < 7) return d.toLocaleDateString("en-US", { weekday: "short", timeZone: TZ });
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: TZ });
}
