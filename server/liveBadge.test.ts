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
