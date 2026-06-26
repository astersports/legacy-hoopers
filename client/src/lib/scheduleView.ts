/**
 * Schedule view model — slicing, filtering, grouping per the locked spec.
 * Slicers: team | age | date. Filters: type, gender (compose with any slicer).
 */
import {
  type ScheduleEvent,
  type TimeState,
  timeState,
  isLive,
  gradeLabel,
  dateKey,
  fmtTime,
} from "./schedule";

export type Slicer = "team" | "age" | "date";
export type TypeFilter = "all" | "game" | "practice" | "tournament";
export type GenderFilter = "all" | "male" | "female";

const FOURTEEN_DAYS = 14 * 24 * 60 * 60 * 1000;

export function applyFilters(events: ScheduleEvent[], type: TypeFilter, gender: GenderFilter): ScheduleEvent[] {
  return events.filter((e) => {
    if (type !== "all") {
      if (type === "tournament" ? !e.tournament_name : e.kind !== type) return false;
    }
    if (gender !== "all" && e.gender && e.gender !== gender) return false;
    return true;
  });
}

export interface Partition {
  live: ScheduleEvent[];
  upcoming: ScheduleEvent[];
  recent: ScheduleEvent[];
}
export function partition(events: ScheduleEvent[], now: number): Partition {
  const live: ScheduleEvent[] = [], upcoming: ScheduleEvent[] = [], recent: ScheduleEvent[] = [];
  for (const e of events) {
    const st: TimeState = timeState(e, now);
    if (isLive(e, now)) live.push(e);
    else if (st === "completed") {
      if (now - Date.parse(e.start_at) <= FOURTEEN_DAYS) recent.push(e);
    } else if (st === "upcoming") upcoming.push(e);
  }
  const asc = (a: ScheduleEvent, b: ScheduleEvent) => a.start_at.localeCompare(b.start_at);
  live.sort(asc); upcoming.sort(asc);
  recent.sort((a, b) => b.start_at.localeCompare(a.start_at));
  return { live, upcoming, recent };
}

/** The single program-wide next event — pinned as the "Next up" NOW slot. */
export function nextEvent(upcoming: ScheduleEvent[]): ScheduleEvent | null {
  return upcoming.length ? upcoming[0] : null;
}

// ─── a team/age group's broken-up contents ───
export interface PracticeSummary {
  pattern: string; // "Tue & Thu · 6:00p"
  location: string | null;
  count: number;
}
export interface TournamentGroup {
  name: string;
  games: ScheduleEvent[];
  hasLive: boolean;
  record: string | null; // "2–0 so far"
}
export interface Group {
  key: string;
  label: string;
  sublabel: string;
  color: string;
  standalone: ScheduleEvent[];
  tournaments: TournamentGroup[];
  practices: PracticeSummary | null;
}

function collapsePractices(events: ScheduleEvent[]): PracticeSummary | null {
  const practices = events.filter((e) => e.kind === "practice");
  if (!practices.length) return null;
  const days = Array.from(new Set(practices.map((p) => new Date(p.start_at).toLocaleDateString("en-US", { weekday: "short", timeZone: "America/New_York" }))));
  const time = fmtTime(practices[0].start_at);
  const loc = practices.find((p) => p.location_name)?.location_name ?? null;
  return { pattern: `${days.join(" & ")} · ${time}`, location: loc, count: practices.length };
}

function tournamentGroups(games: ScheduleEvent[], now: number): { standalone: ScheduleEvent[]; tournaments: TournamentGroup[] } {
  const byT = new Map<string, ScheduleEvent[]>();
  const standalone: ScheduleEvent[] = [];
  for (const g of games) {
    if (g.tournament_name) {
      const arr = byT.get(g.tournament_name) ?? [];
      arr.push(g); byT.set(g.tournament_name, arr);
    } else standalone.push(g);
  }
  const tournaments: TournamentGroup[] = [];
  for (const [name, gs] of Array.from(byT.entries())) {
    if (gs.length === 1) { standalone.push(gs[0]); continue; } // a lone tourney game reads as a game
    let w = 0, l = 0;
    for (const g of gs) { if (g.result === "W") w++; else if (g.result === "L") l++; }
    tournaments.push({
      name, games: gs,
      hasLive: gs.some((g) => isLive(g, now)),
      record: w + l > 0 ? `${w}–${l} so far` : null,
    });
  }
  return { standalone, tournaments };
}

function buildGroup(key: string, label: string, sublabel: string, color: string, events: ScheduleEvent[], now: number): Group {
  const games = events.filter((e) => e.kind !== "practice");
  const { standalone, tournaments } = tournamentGroups(games, now);
  return { key, label, sublabel, color, standalone, tournaments, practices: collapsePractices(events) };
}

function summaryLine(events: ScheduleEvent[]): string {
  const n = events.length;
  const next = events[0] ? new Date(events[0].start_at).toLocaleDateString("en-US", { weekday: "short", timeZone: "America/New_York" }) : null;
  return `${n} upcoming${next ? ` · next ${next} ${fmtTime(events[0].start_at)}` : ""}`;
}

export function groupByTeam(upcoming: ScheduleEvent[], now: number): Group[] {
  const byTeam = new Map<string, ScheduleEvent[]>();
  for (const e of upcoming) { const a = byTeam.get(e.team_id) ?? []; a.push(e); byTeam.set(e.team_id, a); }
  const groups: Group[] = [];
  for (const [tid, evs] of Array.from(byTeam.entries())) {
    const t = evs[0];
    const grade = gradeLabel(t.age_group);
    groups.push(buildGroup(tid, t.team_name, `${grade ? grade + " · " : ""}${summaryLine(evs)}`, t.team_color, evs, now));
  }
  return groups.sort((a, b) => a.label.localeCompare(b.label));
}

export function groupByAge(upcoming: ScheduleEvent[], now: number): Group[] {
  const byAge = new Map<string, ScheduleEvent[]>();
  for (const e of upcoming) { const k = e.age_group ?? "Other"; const a = byAge.get(k) ?? []; a.push(e); byAge.set(k, a); }
  const groups: Group[] = [];
  for (const [age, evs] of Array.from(byAge.entries())) {
    const grade = gradeLabel(age);
    const teams = Array.from(new Set(evs.map((e) => e.team_name)));
    groups.push(buildGroup(age, `${age}${grade ? " · " + grade : ""}`,
      `${teams.length} team${teams.length > 1 ? "s" : ""} · ${summaryLine(evs)}`, evs[0].team_color, evs, now));
  }
  return groups.sort((a, b) => a.label.localeCompare(b.label));
}

export interface DateGroup { key: string; events: ScheduleEvent[]; }
export function groupByDate(upcoming: ScheduleEvent[]): DateGroup[] {
  const byDate = new Map<string, ScheduleEvent[]>();
  for (const e of upcoming) { const k = dateKey(e.start_at); const a = byDate.get(k) ?? []; a.push(e); byDate.set(k, a); }
  return Array.from(byDate.entries()).sort((a, b) => a[0].localeCompare(b[0])).map(([key, events]) => ({ key, events }));
}

export function recentRecord(recent: ScheduleEvent[]): string {
  let w = 0, l = 0, t = 0;
  for (const e of recent) { if (e.result === "W") w++; else if (e.result === "L") l++; else if (e.result === "T") t++; }
  return `${w}–${l}${t ? `–${t}` : ""}`;
}
