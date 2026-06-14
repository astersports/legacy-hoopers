/**
 * Tournament data fetcher for Tourney Machine / SE Tourney
 * Scrapes public division pages to get Legacy Hoopers game data
 */

export interface TournamentConfig {
  id: string;
  name: string;
  dates: string;
  divisions: { name: string; id: string }[];
  status: "completed" | "live" | "upcoming";
  results?: string; // e.g. "10U Black: Champions"
}

export interface GameResult {
  gameId: string;
  date: string;
  location: string;
  team1: string;
  team2: string;
  score1: number | null;
  score2: number | null;
  legacyTeam: string;
  legacyScore: number | null;
  opponentScore: number | null;
  opponent: string;
  result: "W" | "L" | "T" | "upcoming";
  division?: string; // e.g. "Boys - 2nd/3rd", "Boys - 4th", "Girls - 5th"
}

export interface TournamentData {
  tournament: TournamentConfig;
  games: GameResult[];
  lastFetched: string;
  error?: string;
}

// All tracked tournaments for Legacy Hoopers Spring 2026
export const TOURNAMENTS: TournamentConfig[] = [
  {
    id: "h202602231534241950edcf7493d244b",
    name: "Zero Gravity NY Hoop Festival",
    dates: "Jun 13–14, 2026",
    status: "live",
    divisions: [
      { name: "Boys - 2nd/3rd", id: "h20260610161826244ca7d9ca0b09944" },
      { name: "Boys - 4th", id: "h202606101618262456762a8e072d441" },
      { name: "Girls - 5th", id: "h202606101618262527126b329099740" },
    ],
  },
  {
    id: "h20260601165854714a03b263be76d4d",
    name: "ZG Boys National Finals",
    dates: "Jun 5–7, 2026",
    status: "completed",
    results: "10U Black: 1–2",
    divisions: [
      { name: "Boys - 4th", id: "h20260602045011927f8ad52708bf140" },
    ],
  },
  {
    id: "h20260526140601851c836df307c9e44",
    name: "ZG Girls National Finals",
    dates: "May 30–31, 2026",
    status: "completed",
    results: "11U Girls: Final Four (3–0 pool, lost SF)",
    divisions: [
      { name: "Girls - 5th", id: "h202605270300452052df7ec3ccbdc47" },
    ],
  },
  {
    id: "h202602201707185454debbe82de994b",
    name: "ZG Rumble for the Ring CT",
    dates: "May 16–17, 2026",
    status: "completed",
    results: "10U Black: Champions · 11U Girls: Finalists",
    divisions: [
      { name: "Boys - 2nd/3rd", id: "h202605131815185371c51321f748f4e" },
      { name: "Boys - 4th", id: "h20260513181519251cdb18b359bf545" },
      { name: "Girls - 5th", id: "h2026051318153444911a7018c855a44" },
    ],
  },
  {
    id: "h2026021919164101401c8a60f40584c",
    name: "ZG NY Metro Showdown",
    dates: "Apr 18–19, 2026",
    status: "completed",
    divisions: [
      { name: "Boys - 2nd", id: "h202604151436449214aaf6bc4bb4a49" },
      { name: "Boys - 4th", id: "h2026041514364671133b4a58249e34f" },
      { name: "Girls - 5th", id: "h202604151437169228f774d0fba4a4f" },
    ],
  },
  {
    id: "h202602191530320243ffdc849100c4d",
    name: "ZG Chase for the Chain NY",
    dates: "Apr 11–12, 2026",
    status: "completed",
    results: "10U Black: Champions · 11U Girls: Champions",
    divisions: [
      { name: "Boys - 2nd", id: "h20260408001858762c1bf171ed53f40" },
      { name: "Boys - 4th", id: "h202604080019018324311a54241eb4c" },
      { name: "Girls - 5th", id: "h20260408001936980835160e0489147" },
    ],
  },
  {
    id: "h202602081915372045b7bbc1a392349",
    name: "BBallshootout Hoops Jam Classic",
    dates: "Jun 6–7, 2026",
    status: "completed",
    divisions: [], // Cloudflare blocked - no division IDs available
  },
  {
    id: "h20260310030216021314008cde09f4b",
    name: "WPCYO Spring League",
    dates: "Mar 23 – Jun 14, 2026",
    status: "completed",
    divisions: [
      { name: "Boys Divisions", id: "h20260310030216022b924e2f93e1d45" },
    ],
  },
];

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

/**
 * Fetch and parse a Tourney Machine division page for Legacy Hoopers data
 */
export async function fetchTournamentData(config: TournamentConfig): Promise<TournamentData> {
  if (config.divisions.length === 0) {
    return {
      tournament: config,
      games: [],
      lastFetched: new Date().toISOString(),
      error: "No division IDs available",
    };
  }

  const allGames: GameResult[] = [];

  for (const division of config.divisions) {
    const url = `https://tourneymachine.com/Public/Results/Division.aspx?IDTournament=${config.id}&IDDivision=${division.id}`;

    try {
      const response = await fetch(url, {
        headers: { "User-Agent": USER_AGENT },
        signal: AbortSignal.timeout(10000),
      });

      if (!response.ok) continue;

      const html = await response.text();
      const games = parseGames(html, "Legacy");
      // Tag each game with its division
      for (const game of games) {
        game.division = division.name;
      }
      allGames.push(...games);
    } catch {
      // Skip failed divisions
    }
  }

  return {
    tournament: config,
    games: allGames,
    lastFetched: new Date().toISOString(),
  };
}

/**
 * Parse game results from HTML - looks for table rows with game data
 */
function parseGames(html: string, teamFilter: string): GameResult[] {
  const games: GameResult[] = [];

  // Match table rows containing Legacy teams
  const tableRowRegex = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
  let match;

  while ((match = tableRowRegex.exec(html)) !== null) {
    const row = match[1];
    if (!row.includes(teamFilter)) continue;

    // Extract cells
    const cellRegex = /<td[^>]*>([\s\S]*?)<\/td>/gi;
    const cells: string[] = [];
    let cellMatch;
    while ((cellMatch = cellRegex.exec(row)) !== null) {
      cells.push(cellMatch[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim());
    }

    // Look for game pattern: ID, DateTime, Location, Team1, Score1, Score2, Team2
    if (cells.length >= 7) {
      const gameId = cells[0];
      const dateTime = cells[1];
      const location = cells[2];
      const team1 = cells[3];
      const score1Raw = cells[4];
      const score2Raw = cells[5];
      const team2 = cells[6];

      // Only include if it looks like a game (has game ID pattern)
      if (/^[PBG]\d+/.test(gameId) && (team1.includes(teamFilter) || team2.includes(teamFilter))) {
        const score1 = parseInt(score1Raw);
        const score2 = parseInt(score2Raw);
        const isLegacyTeam1 = team1.includes(teamFilter);
        const legacyTeam = isLegacyTeam1 ? team1 : team2;
        const opponent = isLegacyTeam1 ? team2 : team1;
        const legacyScore = isLegacyTeam1 ? score1 : score2;
        const opponentScore = isLegacyTeam1 ? score2 : score1;

        let result: "W" | "L" | "T" | "upcoming" = "upcoming";
        if (!isNaN(legacyScore) && !isNaN(opponentScore)) {
          result = legacyScore > opponentScore ? "W" : legacyScore < opponentScore ? "L" : "T";
        }

        games.push({
          gameId,
          date: dateTime.replace(/\r\n/g, " ").replace(/\s+/g, " ").trim(),
          location,
          team1,
          team2,
          score1: isNaN(score1) ? null : score1,
          score2: isNaN(score2) ? null : score2,
          legacyTeam: legacyTeam.replace(/\[\d+\]\s*/, ""),
          legacyScore: isNaN(legacyScore) ? null : legacyScore,
          opponentScore: isNaN(opponentScore) ? null : opponentScore,
          opponent: opponent.replace(/\[\d+\]\s*/, ""),
          result,
        });
      }
    }
  }

  return games;
}

/**
 * Get direct links to Tourney Machine for each tournament
 */
export function getTournamentLinks() {
  return TOURNAMENTS.map((t) => ({
    name: t.name,
    dates: t.dates,
    status: t.status,
    results: t.results,
    url: `https://tourneymachine.com/Public/Results/Tournament.aspx?IDTournament=${t.id}`,
  }));
}

/**
 * Get only the currently live/active tournament
 */
export function getLiveTournament() {
  return TOURNAMENTS.find((t) => t.status === "live") || null;
}

// In-memory cache for live tournament data (avoids scraping on every request)
let liveCache: { data: TournamentData; fetchedAt: number } | null = null;
const LIVE_CACHE_TTL_MS = 45_000; // 45 seconds — fresh enough for game day

/**
 * Fetch live tournament data with server-side caching.
 * Returns cached data if fresh, otherwise scrapes Tourney Machine.
 * If a fresh scrape returns 0 games (e.g. Cloudflare 403), retains stale cache.
 */
export async function fetchLiveTournamentData(): Promise<TournamentData | null> {
  const live = getLiveTournament();
  if (!live) return null;

  const now = Date.now();
  if (liveCache && now - liveCache.fetchedAt < LIVE_CACHE_TTL_MS) {
    return liveCache.data;
  }

  const data = await fetchTournamentData(live);

  // Only update cache if we actually got games, or if there's no existing cache
  if (data.games.length > 0 || !liveCache) {
    liveCache = { data, fetchedAt: now };
  } else {
    // Scrape failed (likely Cloudflare 403) — serve stale cache but update timestamp
    // so we don't hammer the server every request
    liveCache = { data: liveCache.data, fetchedAt: now };
  }

  return liveCache.data;
}

/**
 * Fetch all tournament data (for full game log sync)
 */
export async function fetchAllTournamentData(): Promise<TournamentData[]> {
  const results = await Promise.all(
    TOURNAMENTS.filter((t) => t.divisions.length > 0).map(fetchTournamentData)
  );
  return results;
}
