/**
 * Shared game time utilities for LIVE badge detection.
 * Used by both the ThisWeekend component and server-side tests.
 */

/** Game duration in minutes — youth basketball games typically last ~60-75 min */
export const GAME_DURATION_MIN = 75;

export type GameTimeInfo = {
  date: string;
  result: "W" | "L" | "T" | "upcoming";
};

/**
 * Parse Tourney Machine date format: "Sat 06/14/26 8:00 AM"
 * Returns a UTC timestamp as Date. Tourney Machine times are in US Eastern.
 * We construct the date as if it's Eastern, then convert to UTC for comparison.
 */
export function parseGameDate(dateStr: string): Date | null {
  try {
    // Remove day prefix: "Sat 06/14/26 8:00 AM" -> "06/14/26 8:00 AM"
    const withoutDay = dateStr.replace(/^[A-Za-z]+\s+/, "");
    // Match: MM/DD/YY H:MM AM/PM
    const match = withoutDay.match(/^(\d{2})\/(\d{2})\/(\d{2})\s+(\d{1,2}):(\d{2})\s+(AM|PM)$/i);
    if (!match) return null;

    const [, month, day, year, hourStr, min, ampm] = match;
    let hour = parseInt(hourStr, 10);
    if (ampm.toUpperCase() === "PM" && hour !== 12) hour += 12;
    if (ampm.toUpperCase() === "AM" && hour === 12) hour = 0;

    // Assume 2000s for 2-digit year
    const fullYear = 2000 + parseInt(year, 10);

    // Tourney Machine times are Eastern (EDT = UTC-4, EST = UTC-5)
    // During Mar-Nov it's EDT, otherwise EST
    const monthNum = parseInt(month, 10);
    const edtOffset = (monthNum >= 3 && monthNum <= 11) ? 4 : 5; // hours behind UTC
    return new Date(Date.UTC(fullYear, monthNum - 1, parseInt(day, 10), hour + edtOffset, parseInt(min, 10)));
  } catch {
    return null;
  }
}

/**
 * Determine if a game is currently in progress:
 * - Game has started (current time >= start time in UTC)
 * - Game hasn't ended (current time < start time + GAME_DURATION_MIN)
 * - Game result is "upcoming" (no final score yet)
 */
export function isGameLive(game: GameTimeInfo, now: Date): boolean {
  // If the game already has a final result (W/L/T), it's not live
  if (game.result !== "upcoming") return false;

  const startTime = parseGameDate(game.date);
  if (!startTime) return false;

  const endTime = new Date(startTime.getTime() + GAME_DURATION_MIN * 60 * 1000);
  const nowUtc = now.getTime();
  return nowUtc >= startTime.getTime() && nowUtc < endTime.getTime();
}
