/*
 * Per-page agent-scan configs for <AgentScanConsole>. Each page gets its own
 * agent that scans that page's domain — the same "live, animated agent that
 * lights up trends" language across the whole site. Cosmetic copy only.
 *
 * Contract: every step.tag must exist in `tags` (the pill that lights up on that
 * step), and there should be one step per tag so each pill lights in turn.
 */
export type ScanStep = { item: string; tag: string };
export type AgentScan = {
  label: string; // header suffix: "ASTER-AGENT · <label>"
  noun: string; // "identifying <noun> N / M"
  steps: ScanStep[];
  tags: string[];
};

// Home / landing — the AI/ML frontier scan (the original astersports.io console).
export const FRONTIER_SCAN: AgentScan = {
  label: "FRONTIER-SCAN",
  noun: "trend",
  tags: ["AGENTIC AI", "SEGMENTATION", "DIFFUSION", "MULTIMODAL", "REASONING", "EDGE AI"],
  steps: [
    { item: "Agentic workflows", tag: "AGENTIC AI" },
    { item: "Promptable segmentation", tag: "SEGMENTATION" },
    { item: "Diffusion synthesis", tag: "DIFFUSION" },
    { item: "Multimodal understanding", tag: "MULTIMODAL" },
    { item: "Test-time compute", tag: "REASONING" },
    { item: "On-device inference", tag: "EDGE AI" },
  ],
};

export const PROGRAMS_SCAN: AgentScan = {
  label: "FIT-SCAN",
  noun: "lane",
  tags: ["CAMPS", "CLINICS", "AAU TEAMS", "1:1", "SMALL GROUP", "ACADEMY"],
  steps: [
    { item: "Multi-day skills camp", tag: "CAMPS" },
    { item: "Weekly shooting clinic", tag: "CLINICS" },
    { item: "Zero Gravity travel team", tag: "AAU TEAMS" },
    { item: "Private 1:1 development", tag: "1:1" },
    { item: "2 to 4 player small group", tag: "SMALL GROUP" },
    { item: "Invite-only Elite Academy", tag: "ACADEMY" },
  ],
};

export const SCHEDULE_SCAN: AgentScan = {
  label: "GAME-DAY-SCAN",
  noun: "signal",
  tags: ["RSVPS", "ARRIVAL", "WEATHER", "TRAVEL", "LINEUP", "VENUE"],
  steps: [
    { item: "Confirmed RSVPs", tag: "RSVPS" },
    { item: "Arrival window", tag: "ARRIVAL" },
    { item: "Game-day forecast", tag: "WEATHER" },
    { item: "Travel ETA", tag: "TRAVEL" },
    { item: "Probable lineup", tag: "LINEUP" },
    { item: "Gym and directions", tag: "VENUE" },
  ],
};

export const RECORDS_SCAN: AgentScan = {
  label: "SEASON-SCAN",
  noun: "metric",
  tags: ["RECORD", "STREAK", "MARGIN", "OPPONENTS", "TRAJECTORY", "RANKING"],
  steps: [
    { item: "Win-loss record", tag: "RECORD" },
    { item: "Current streak", tag: "STREAK" },
    { item: "Point differential", tag: "MARGIN" },
    { item: "Strength of schedule", tag: "OPPONENTS" },
    { item: "Season trajectory", tag: "TRAJECTORY" },
    { item: "Circuit ranking", tag: "RANKING" },
  ],
};

export const HIGHLIGHTS_SCAN: AgentScan = {
  label: "FILM-SCAN",
  noun: "clip",
  tags: ["SHOTS", "FINISHES", "DEFENSE", "ASSISTS", "HUSTLE", "REELS"],
  steps: [
    { item: "Made jumpers", tag: "SHOTS" },
    { item: "Rim finishes", tag: "FINISHES" },
    { item: "Defensive stops", tag: "DEFENSE" },
    { item: "Assist sequences", tag: "ASSISTS" },
    { item: "Hustle plays", tag: "HUSTLE" },
    { item: "Auto-generated reels", tag: "REELS" },
  ],
};

export const DASHBOARD_SCAN: AgentScan = {
  label: "ATHLETE-SCAN",
  noun: "signal",
  tags: ["ATTENDANCE", "REPS", "GROWTH", "LOAD", "STREAK", "NEXT SKILL"],
  steps: [
    { item: "Attendance trend", tag: "ATTENDANCE" },
    { item: "Reps completed", tag: "REPS" },
    { item: "Skill growth", tag: "GROWTH" },
    { item: "Training load", tag: "LOAD" },
    { item: "Engagement streak", tag: "STREAK" },
    { item: "Next skill to unlock", tag: "NEXT SKILL" },
  ],
};

export const MISSION_SCAN: AgentScan = {
  label: "MISSION-SCAN",
  noun: "pillar",
  tags: ["TEACHING", "COMPETITION", "DEVELOPMENT", "FAMILY", "CHARACTER", "COMMUNITY"],
  steps: [
    { item: "Teaching-first coaching", tag: "TEACHING" },
    { item: "Real competition", tag: "COMPETITION" },
    { item: "Tracked development", tag: "DEVELOPMENT" },
    { item: "Family partnership", tag: "FAMILY" },
    { item: "Character and effort", tag: "CHARACTER" },
    { item: "Westchester community", tag: "COMMUNITY" },
  ],
};

export const COACH_SCAN: AgentScan = {
  label: "STAFF-SCAN",
  noun: "credential",
  tags: ["MASTER-TRAINED", "SAFESPORT", "PEDAGOGY", "FILM", "MENTORSHIP", "AAU"],
  steps: [
    { item: "Master's-level educator", tag: "MASTER-TRAINED" },
    { item: "SafeSport certified", tag: "SAFESPORT" },
    { item: "Intentional pedagogy", tag: "PEDAGOGY" },
    { item: "Film breakdowns", tag: "FILM" },
    { item: "Player mentorship", tag: "MENTORSHIP" },
    { item: "Zero Gravity circuit", tag: "AAU" },
  ],
};
