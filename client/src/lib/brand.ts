/*
 * Brand constants — single source of truth for the site's identity chrome.
 * Tenant *data* (team names, records, schedule) still comes live from the Aster
 * Sports platform (see lib/aster.ts ORG_ID); this file only governs presentation.
 *
 * This site is the flagship AAU program template — the showcase other programs
 * see and say "build us that." Most content below is aspirational/cosmetic and
 * gets wired to live services later.
 */
import {
  CalendarDays, Trophy, Film, LayoutDashboard, Dumbbell, Home as HomeIcon,
  type LucideIcon,
} from "lucide-react";

export const BRAND = {
  name: "Aster Sports",
  short: "Aster",
  region: "Every team, every sport",
  tagline: "The most complete youth basketball program in the country.",
  subtag: "Camps. Clinics. 1:1 training. AAU teams. All on one platform.",
  logo: "/aster-logo.png",
} as const;

/** External LeagueApps interest-list registration. */
export const REGISTER_URL =
  "https://legacyhoopers.leagueapps.com/camps/4945182-legacy-hoopers-prospective-player-interest-list";

export type NavItem = { href: string; label: string; icon?: LucideIcon };

export const NAV: NavItem[] = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/programs", label: "Programs", icon: Dumbbell },
  { href: "/schedule", label: "Schedule", icon: CalendarDays },
  { href: "/records", label: "Records", icon: Trophy },
  { href: "/highlights", label: "Highlights", icon: Film },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
];
