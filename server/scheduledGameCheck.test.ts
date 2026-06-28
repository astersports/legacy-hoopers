/**
 * Tests for the scheduled game check handler
 */
import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock the dependencies
vi.mock("./_core/sdk", () => ({
  sdk: {
    authenticateRequest: vi.fn(),
  },
}));

vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn(),
}));

vi.mock("./tournament", () => ({
  fetchLiveTournamentData: vi.fn(),
}));

import { sdk } from "./_core/sdk";
import { notifyOwner } from "./_core/notification";
import { fetchLiveTournamentData } from "./tournament";
import { handleGameCheck } from "./scheduledGameCheck";

function mockReq(overrides = {}): any {
  return { headers: { cookie: "" }, url: "/api/scheduled/game-check", ...overrides };
}

function mockRes(): any {
  const res: any = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
}

describe("scheduledGameCheck", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("rejects non-cron requests with 403", async () => {
    (sdk.authenticateRequest as any).mockResolvedValue({ isCron: false });
    const req = mockReq();
    const res = mockRes();
    await handleGameCheck(req, res);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ error: "cron-only" });
  });

  it("returns skipped when no live tournament", async () => {
    (sdk.authenticateRequest as any).mockResolvedValue({ isCron: true, taskUid: "test-uid" });
    (fetchLiveTournamentData as any).mockResolvedValue(null);
    const req = mockReq();
    const res = mockRes();
    await handleGameCheck(req, res);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ ok: true, skipped: "no-live-tournament" })
    );
  });

  it("sends notification for new game results", async () => {
    (sdk.authenticateRequest as any).mockResolvedValue({ isCron: true, taskUid: "test-uid" });
    (fetchLiveTournamentData as any).mockResolvedValue({
      tournament: { name: "Test Tournament" },
      games: [
        {
          gameId: "P101",
          legacyTeam: "Legacy Hoopers 10U Black",
          opponent: "Other Team",
          legacyScore: 32,
          opponentScore: 20,
          result: "W",
          date: "Jun 14",
          location: "Court 1",
          team1: "Legacy Hoopers 10U Black",
          team2: "Other Team",
          score1: 32,
          score2: 20,
        },
      ],
      lastFetched: new Date().toISOString(),
    });
    (notifyOwner as any).mockResolvedValue(true);
    const req = mockReq();
    const res = mockRes();
    await handleGameCheck(req, res);
    expect(notifyOwner).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ ok: true, newResults: 1, delivered: true })
    );
  });

  it("does not re-notify for already-notified games", async () => {
    // Self-contained: a unique gameId so this test doesn't depend on the
    // in-module notifiedGames cache being populated by a prior test. First
    // call notifies (cache miss); second call must not (cache hit).
    (sdk.authenticateRequest as any).mockResolvedValue({ isCron: true, taskUid: "test-uid" });
    (fetchLiveTournamentData as any).mockResolvedValue({
      tournament: { name: "Test Tournament" },
      games: [
        {
          gameId: "P777",
          legacyTeam: "Legacy Hoopers 10U Black",
          opponent: "Other Team",
          legacyScore: 32,
          opponentScore: 20,
          result: "W",
          date: "Jun 14",
          location: "Court 1",
          team1: "Legacy Hoopers 10U Black",
          team2: "Other Team",
          score1: 32,
          score2: 20,
        },
      ],
      lastFetched: new Date().toISOString(),
    });
    (notifyOwner as any).mockResolvedValue(true);

    // First call — new game, should notify.
    await handleGameCheck(mockReq(), mockRes());
    expect(notifyOwner).toHaveBeenCalledTimes(1);

    // Second call — same game should not re-notify.
    (notifyOwner as any).mockClear();
    const res = mockRes();
    await handleGameCheck(mockReq(), res);
    expect(notifyOwner).not.toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ ok: true, newResults: 0 })
    );
  });

  it("handles errors gracefully with 500", async () => {
    (sdk.authenticateRequest as any).mockRejectedValue(new Error("Auth failed"));
    const req = mockReq();
    const res = mockRes();
    await handleGameCheck(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ error: expect.stringContaining("Auth failed") })
    );
  });
});
