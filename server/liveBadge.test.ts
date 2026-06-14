import { describe, it, expect } from "vitest";
import { parseGameDate, isGameLive, GAME_DURATION_MIN } from "../shared/gameTime";

/**
 * Tests for the LIVE badge logic — imports the actual shared implementation
 * used by the ThisWeekend component.
 */

type GameTimeInfo = { date: string; result: "W" | "L" | "T" | "upcoming" };

function makeGame(overrides: Partial<GameTimeInfo> = {}): GameTimeInfo {
  return {
    date: "Sun 06/14/26 12:00 PM",
    result: "upcoming",
    ...overrides,
  };
}

describe("parseGameDate", () => {
  it("parses standard Tourney Machine date format (EDT)", () => {
    // "Sun 06/14/26 12:00 PM" in Eastern = 12:00 PM EDT = 16:00 UTC
    const result = parseGameDate("Sun 06/14/26 12:00 PM");
    expect(result).not.toBeNull();
    expect(result!.getUTCHours()).toBe(16);
    expect(result!.getUTCMinutes()).toBe(0);
    expect(result!.getUTCFullYear()).toBe(2026);
    expect(result!.getUTCMonth()).toBe(5); // June = 5 (0-indexed)
    expect(result!.getUTCDate()).toBe(14);
  });

  it("handles AM times correctly", () => {
    // "Sat 06/13/26 8:00 AM" in Eastern = 8:00 AM EDT = 12:00 UTC
    const result = parseGameDate("Sat 06/13/26 8:00 AM");
    expect(result).not.toBeNull();
    expect(result!.getUTCHours()).toBe(12);
    expect(result!.getUTCMinutes()).toBe(0);
  });

  it("handles 12:00 PM correctly (noon)", () => {
    // 12:00 PM EDT = 16:00 UTC
    const result = parseGameDate("Sun 06/14/26 12:00 PM");
    expect(result).not.toBeNull();
    expect(result!.getUTCHours()).toBe(16);
  });

  it("handles 12:00 AM correctly (midnight)", () => {
    // 12:00 AM EDT = 04:00 UTC
    const result = parseGameDate("Sun 06/14/26 12:00 AM");
    expect(result).not.toBeNull();
    expect(result!.getUTCHours()).toBe(4);
  });

  it("uses EST offset for winter months (Jan/Feb/Dec)", () => {
    // "Sat 01/15/26 2:00 PM" in Eastern = 2:00 PM EST = 19:00 UTC (UTC-5)
    const result = parseGameDate("Sat 01/15/26 2:00 PM");
    expect(result).not.toBeNull();
    expect(result!.getUTCHours()).toBe(19);
  });

  it("returns null for invalid format", () => {
    expect(parseGameDate("invalid")).toBeNull();
    expect(parseGameDate("")).toBeNull();
    expect(parseGameDate("2026-06-14T12:00:00")).toBeNull();
  });
});

describe("isGameLive", () => {
  it("returns true when current time is within game window", () => {
    // Game at 12:00 PM EDT = 16:00 UTC, duration 75 min
    // At 16:30 UTC (30 min into game) → should be live
    const game = makeGame({ date: "Sun 06/14/26 12:00 PM" });
    const now = new Date("2026-06-14T16:30:00Z");
    expect(isGameLive(game, now)).toBe(true);
  });

  it("returns true at exact start time", () => {
    const game = makeGame({ date: "Sun 06/14/26 12:00 PM" });
    const now = new Date("2026-06-14T16:00:00Z");
    expect(isGameLive(game, now)).toBe(true);
  });

  it("returns false before game starts", () => {
    const game = makeGame({ date: "Sun 06/14/26 2:00 PM" });
    // 2:00 PM EDT = 18:00 UTC, check at 17:59 UTC
    const now = new Date("2026-06-14T17:59:00Z");
    expect(isGameLive(game, now)).toBe(false);
  });

  it("returns false after game duration ends", () => {
    // Game at 12:00 PM EDT = 16:00 UTC, ends at 17:15 UTC (75 min later)
    const game = makeGame({ date: "Sun 06/14/26 12:00 PM" });
    const now = new Date("2026-06-14T17:16:00Z");
    expect(isGameLive(game, now)).toBe(false);
  });

  it("returns false for games with final result (W/L)", () => {
    const game = makeGame({ date: "Sun 06/14/26 12:00 PM", result: "W" });
    const now = new Date("2026-06-14T16:30:00Z");
    expect(isGameLive(game, now)).toBe(false);
  });

  it("returns false for games with loss result", () => {
    const game = makeGame({ date: "Sun 06/14/26 12:00 PM", result: "L" });
    const now = new Date("2026-06-14T16:30:00Z");
    expect(isGameLive(game, now)).toBe(false);
  });

  it("returns false at exact end time (exclusive)", () => {
    // Game at 12:00 PM EDT = 16:00 UTC, ends at exactly 17:15 UTC
    const game = makeGame({ date: "Sun 06/14/26 12:00 PM" });
    const now = new Date("2026-06-14T17:15:00Z");
    expect(isGameLive(game, now)).toBe(false);
  });

  it("confirms game duration constant is 75 minutes", () => {
    expect(GAME_DURATION_MIN).toBe(75);
  });
});

describe("getCountdown (via parseGameDate)", () => {
  // Test the countdown logic by computing it the same way the component does
  function getCountdown(dateStr: string, result: "upcoming" | "W" | "L", now: Date): string | null {
    if (result !== "upcoming") return null;
    const startTime = parseGameDate(dateStr);
    if (!startTime) return null;
    const diffMs = startTime.getTime() - now.getTime();
    if (diffMs <= 0) return null;
    if (diffMs > 24 * 60 * 60 * 1000) return null;
    const diffMin = Math.floor(diffMs / 60000);
    if (diffMin < 60) return `Starts in ${diffMin}m`;
    const hours = Math.floor(diffMin / 60);
    const mins = diffMin % 60;
    if (mins === 0) return `Starts in ${hours}h`;
    return `Starts in ${hours}h ${mins}m`;
  }

  it("shows minutes for games starting within the hour", () => {
    // Game at 2:00 PM EDT = 18:00 UTC, now is 17:45 UTC (15 min before)
    const result = getCountdown("Sun 06/14/26 2:00 PM", "upcoming", new Date("2026-06-14T17:45:00Z"));
    expect(result).toBe("Starts in 15m");
  });

  it("shows hours and minutes for games starting in 1-24h", () => {
    // Game at 2:00 PM EDT = 18:00 UTC, now is 16:30 UTC (1h 30m before)
    const result = getCountdown("Sun 06/14/26 2:00 PM", "upcoming", new Date("2026-06-14T16:30:00Z"));
    expect(result).toBe("Starts in 1h 30m");
  });

  it("shows just hours when minutes are 0", () => {
    // Game at 2:00 PM EDT = 18:00 UTC, now is 16:00 UTC (exactly 2h before)
    const result = getCountdown("Sun 06/14/26 2:00 PM", "upcoming", new Date("2026-06-14T16:00:00Z"));
    expect(result).toBe("Starts in 2h");
  });

  it("returns null for games already started", () => {
    // Game at 12:00 PM EDT = 16:00 UTC, now is 16:30 UTC
    const result = getCountdown("Sun 06/14/26 12:00 PM", "upcoming", new Date("2026-06-14T16:30:00Z"));
    expect(result).toBeNull();
  });

  it("returns null for games more than 24h away", () => {
    // Game at 2:00 PM EDT tomorrow = 18:00 UTC Jun 15, now is 17:00 UTC Jun 14 (25h away)
    const result = getCountdown("Mon 06/15/26 2:00 PM", "upcoming", new Date("2026-06-14T17:00:00Z"));
    expect(result).toBeNull();
  });

  it("returns null for completed games", () => {
    const result = getCountdown("Sun 06/14/26 2:00 PM", "W", new Date("2026-06-14T17:45:00Z"));
    expect(result).toBeNull();
  });
});
