/*
 * Pure presentation helpers for the Records page. No data fetching here — these
 * only derive display values from the live TeamRecord/GameRecord shapes.
 */
import type { GameRecord, TeamRecord } from "@/lib/aster";

export type SortKey = "pct" | "name" | "games";

/** Win rate as a fraction of decided games (ties excluded), 0 when none. */
export function winRate(team: TeamRecord): number {
  const decided = team.wins + team.losses;
  return decided > 0 ? team.wins / decided : 0;
}

/** A copy of the records sorted by the chosen key — never mutates the source. */
export function sortRecords(records: TeamRecord[], key: SortKey): TeamRecord[] {
  const copy = [...records];
  switch (key) {
    case "name":
      return copy.sort((a, b) => a.name.localeCompare(b.name));
    case "games":
      return copy.sort(
        (a, b) => b.games.length - a.games.length || a.name.localeCompare(b.name),
      );
    case "pct":
    default:
      return copy.sort(
        (a, b) =>
          winRate(b) - winRate(a) ||
          b.wins - a.wins ||
          a.name.localeCompare(b.name),
      );
  }
}

/** The most recent N results, oldest→newest, for a form strip. games are sorted newest-first. */
export function lastResults(team: TeamRecord, n = 5): GameRecord["result"][] {
  return team.games
    .slice(0, n)
    .map((g) => g.result)
    .reverse();
}

/** Longest current win streak (counting back from the most recent decided game). */
export function bestWinStreak(team: TeamRecord): number {
  let streak = 0;
  for (const g of team.games) {
    if (g.result === "W") streak++;
    else if (g.result === "L") break;
    // ties don't break the streak but don't extend it
  }
  return streak;
}

/** The team with the highest win rate (decided games), tie-broken by wins. */
export function topTeam(records: TeamRecord[]): TeamRecord | null {
  const sorted = sortRecords(records, "pct");
  return sorted.length > 0 ? sorted[0] : null;
}

/** The team with the longest active win streak (must be ≥ 2 to be worth a callout). */
export function hottestTeam(
  records: TeamRecord[],
): { team: TeamRecord; streak: number } | null {
  let best: { team: TeamRecord; streak: number } | null = null;
  for (const team of records) {
    const streak = bestWinStreak(team);
    if (streak >= 2 && (!best || streak > best.streak)) best = { team, streak };
  }
  return best;
}
