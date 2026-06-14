/**
 * Scheduled Game Check Handler
 * Called by Heartbeat cron every 10 minutes on game days.
 * Compares current Tourney Machine data against a cache of previously-notified games.
 * Sends push notification to owner when new game results are detected.
 */
import type { Request, Response } from "express";
import { sdk } from "./_core/sdk";
import { notifyOwner } from "./_core/notification";
import { fetchLiveTournamentData, type GameResult } from "./tournament";

// In-memory cache of already-notified game results
// Key: "gameId-legacyTeam" → Value: result string ("W" or "L")
const notifiedGames = new Map<string, string>();

function gameKey(game: GameResult): string {
  return `${game.gameId}-${game.legacyTeam}`;
}

function formatScore(game: GameResult): string {
  if (game.legacyScore === null || game.opponentScore === null) return "TBD";
  return `${game.legacyScore}–${game.opponentScore}`;
}

function formatNotification(newResults: GameResult[]): { title: string; content: string } {
  if (newResults.length === 1) {
    const g = newResults[0];
    const emoji = g.result === "W" ? "🏆" : "📊";
    const resultWord = g.result === "W" ? "WIN" : "LOSS";
    return {
      title: `${emoji} Legacy ${resultWord}: ${g.legacyTeam.replace("Legacy Hoopers", "Legacy").replace("(NY)", "").trim()}`,
      content: `${g.legacyTeam.replace("[", "").replace("]", "").trim()} ${g.result === "W" ? "defeated" : "lost to"} ${g.opponent.replace("[", "").replace("]", "").trim()} ${formatScore(g)} (Game ${g.gameId})`,
    };
  }

  // Multiple results
  const wins = newResults.filter((g) => g.result === "W").length;
  const losses = newResults.filter((g) => g.result === "L").length;
  const lines = newResults.map((g) => {
    const emoji = g.result === "W" ? "W" : "L";
    return `[${emoji}] ${g.legacyTeam.replace("Legacy Hoopers", "Legacy").replace("(NY)", "").trim()} vs ${g.opponent.replace("[", "").replace("]", "").trim()} — ${formatScore(g)}`;
  });

  return {
    title: `📊 ${newResults.length} New Game Results (${wins}W–${losses}L)`,
    content: lines.join("\n"),
  };
}

export async function handleGameCheck(req: Request, res: Response) {
  try {
    // Authenticate the cron request
    const user = await sdk.authenticateRequest(req);
    if (!user.isCron || !user.taskUid) {
      return res.status(403).json({ error: "cron-only" });
    }

    // Fetch live tournament data
    const liveData = await fetchLiveTournamentData();
    if (!liveData || liveData.games.length === 0) {
      return res.json({ ok: true, skipped: "no-live-tournament", notifiedGamesCount: notifiedGames.size });
    }

    // Find games that have completed (have a W/L result) but haven't been notified yet
    const newResults: GameResult[] = [];
    for (const game of liveData.games) {
      if (game.result === "W" || game.result === "L") {
        const key = gameKey(game);
        if (!notifiedGames.has(key)) {
          newResults.push(game);
          notifiedGames.set(key, game.result);
        }
      }
    }

    if (newResults.length === 0) {
      return res.json({ ok: true, newResults: 0, totalTracked: notifiedGames.size });
    }

    // Send notification
    const { title, content } = formatNotification(newResults);
    const delivered = await notifyOwner({ title, content });

    return res.json({
      ok: true,
      newResults: newResults.length,
      delivered,
      totalTracked: notifiedGames.size,
      games: newResults.map((g) => ({
        gameId: g.gameId,
        team: g.legacyTeam,
        result: g.result,
        score: formatScore(g),
      })),
    });
  } catch (error) {
    console.error("[GameCheck] Error:", error);
    return res.status(500).json({
      error: String(error),
      stack: error instanceof Error ? error.stack : undefined,
      context: { url: req.url, taskUid: "unknown" },
      timestamp: new Date().toISOString(),
    });
  }
}
