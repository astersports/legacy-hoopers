import { describe, it, expect } from "vitest";

// Test the leaderboard computation logic directly
// (mirrors the computeLeaderboard function in SeasonLeaderboard.tsx)

interface Game {
  date: string;
  opponent: string;
  score: string;
  result: "W" | "L";
  tag?: string;
}

interface TeamData {
  id: string;
  name: string;
  shortName: string;
  grade: string;
  color: string;
  record: string;
  games: Game[];
  stats: { diff: string };
}

function computeLeaderboard(teams: TeamData[]) {
  return teams
    .map((team) => {
      const recordParts = team.record?.match(/(\d+)\s*[–-]\s*(\d+)/);
      const authWins = recordParts ? parseInt(recordParts[1]) : 0;
      const authLosses = recordParts ? parseInt(recordParts[2]) : 0;

      const hasGameLog = team.games.length > 0;
      const wins = hasGameLog ? team.games.filter((g) => g.result === "W").length : authWins;
      const losses = hasGameLog ? team.games.filter((g) => g.result === "L").length : authLosses;
      const totalGames = wins + losses;
      const winPct = totalGames > 0 ? (wins / totalGames) * 100 : 0;

      let avgDiff = 0;
      if (hasGameLog) {
        let totalDiff = 0;
        let scoredGames = 0;
        for (const g of team.games) {
          const parts = g.score.split("\u2013").length > 1
            ? g.score.split("\u2013").map((s) => parseInt(s.trim()))
            : g.score.split("-").map((s) => parseInt(s.trim()));
          if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
            totalDiff += parts[0] - parts[1];
            scoredGames++;
          }
        }
        avgDiff = scoredGames > 0 ? totalDiff / scoredGames : 0;
      } else {
        avgDiff = parseFloat(team.stats.diff) || 0;
      }

      let longestStreak = 0;
      if (hasGameLog) {
        let currentStreak = 0;
        for (const g of team.games) {
          if (g.result === "W") {
            currentStreak++;
            longestStreak = Math.max(longestStreak, currentStreak);
          } else {
            currentStreak = 0;
          }
        }
      } else {
        longestStreak = wins > 0 ? Math.min(wins, 5) : 0;
      }

      return { name: team.name, shortName: team.shortName, wins, losses, winPct, avgDiff, longestStreak, totalGames };
    })
    .sort((a, b) => b.winPct - a.winPct || b.avgDiff - a.avgDiff);
}

describe("Season Leaderboard Aggregation", () => {
  const mockTeams: TeamData[] = [
    {
      id: "t1", name: "11U Girls", shortName: "11U Girls", grade: "5th Grade", color: "#a78bfa", record: "4–2",
      stats: { diff: "+3.0" },
      games: [
        { date: "Apr 11", opponent: "vs Team A", score: "29 – 12", result: "W" },
        { date: "Apr 12", opponent: "vs Team B", score: "40 – 9", result: "W" },
        { date: "Apr 13", opponent: "vs Team C", score: "20 – 25", result: "L" },
        { date: "Apr 14", opponent: "vs Team D", score: "35 – 21", result: "W" },
        { date: "Apr 15", opponent: "vs Team E", score: "10 – 30", result: "L" },
        { date: "Apr 16", opponent: "vs Team F", score: "28 – 16", result: "W" },
      ],
    },
    {
      id: "t2", name: "10U Black", shortName: "10U Black", grade: "4th Grade", color: "#4a8fd4", record: "7–3",
      stats: { diff: "+4.6" },
      games: [], // No game log — should fall back to record
    },
  ];

  it("computes wins/losses from game log when available", () => {
    const result = computeLeaderboard(mockTeams);
    const girls = result.find((t) => t.shortName === "11U Girls")!;
    expect(girls.wins).toBe(4);
    expect(girls.losses).toBe(2);
    expect(girls.totalGames).toBe(6);
  });

  it("falls back to authoritative record when game log is empty", () => {
    const result = computeLeaderboard(mockTeams);
    const black = result.find((t) => t.shortName === "10U Black")!;
    expect(black.wins).toBe(7);
    expect(black.losses).toBe(3);
    expect(black.totalGames).toBe(10);
    expect(black.winPct).toBeCloseTo(70, 0);
  });

  it("computes average point differential from game scores", () => {
    const result = computeLeaderboard(mockTeams);
    const girls = result.find((t) => t.shortName === "11U Girls")!;
    // (29-12) + (40-9) + (20-25) + (35-21) + (10-30) + (28-16) = 17+31-5+14-20+12 = 49
    // 49 / 6 = 8.17
    expect(girls.avgDiff).toBeCloseTo(8.17, 1);
  });

  it("falls back to stats.diff when no game log", () => {
    const result = computeLeaderboard(mockTeams);
    const black = result.find((t) => t.shortName === "10U Black")!;
    expect(black.avgDiff).toBeCloseTo(4.6, 1);
  });

  it("computes longest win streak correctly", () => {
    const result = computeLeaderboard(mockTeams);
    const girls = result.find((t) => t.shortName === "11U Girls")!;
    // W, W, L, W, L, W → longest streak is 2
    expect(girls.longestStreak).toBe(2);
  });

  it("estimates streak for teams without game log", () => {
    const result = computeLeaderboard(mockTeams);
    const black = result.find((t) => t.shortName === "10U Black")!;
    // 7 wins, capped at 5
    expect(black.longestStreak).toBe(5);
  });

  it("sorts by win percentage descending, then avg diff", () => {
    const result = computeLeaderboard(mockTeams);
    // 10U Black: 70%, 11U Girls: 67% → Black first
    expect(result[0].shortName).toBe("10U Black");
    expect(result[1].shortName).toBe("11U Girls");
  });

  it("handles en-dash score separators", () => {
    const team: TeamData = {
      id: "t3", name: "Test", shortName: "Test", grade: "3rd", color: "#fff", record: "1–0",
      stats: { diff: "+5.0" },
      games: [{ date: "Apr 1", opponent: "vs X", score: "25 \u2013 20", result: "W" }],
    };
    const result = computeLeaderboard([team]);
    expect(result[0].avgDiff).toBe(5);
  });
});
