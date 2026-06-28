/*
 * Brand constants — single source of truth for the site's identity chrome.
 * Tenant *data* (team names, records, schedule) still comes live from the Aster
 * Sports platform (see lib/aster.ts ORG_ID); this file only governs presentation.
 */
export const BRAND = {
  name: "Aster AAU",
  region: "Westchester AAU",
  tagline: "Five teams. One standard. Zero shortcuts.",
  logo: "/aster-logo.png",
} as const;

/** External LeagueApps interest-list registration. */
export const REGISTER_URL =
  "https://legacyhoopers.leagueapps.com/camps/4945182-legacy-hoopers-prospective-player-interest-list";
