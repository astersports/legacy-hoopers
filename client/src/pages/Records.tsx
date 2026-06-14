/*
 * DESIGN: Court Noir — Team Records
 * Accurate data from Spring 2026 + Winter 2025-26 seasons
 * Last Updated: June 7, 2026
 */
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const HERO_IMG = "/manus-storage/girls-triple-threat_8866dbbd.jpeg";

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
  circuit: string;
  record: string;
  streak: string;
  color: string;
  nationalsQualified?: boolean;
  stats: { ppg: string; allowed: string; diff: string; winPct: string; games: string };
  offensive: { ppg: string; totalPts: string; high: string; low: string; largestW: string };
  defensive: { apg: string; totalAllowed: string; heldUnder20: string; avgDiff: string };
  runOfPlay: string[];
  games: Game[];
}

const springTeams: TeamData[] = [
  {
    id: "sp-11ug", name: "11U Girls", shortName: "11U Girls", grade: "5th Grade Girls", circuit: "AAU Circuit — Nationals Qualifier",
    record: "11–5", streak: "L1", color: "#a78bfa", nationalsQualified: true,
    stats: { ppg: "24.0", allowed: "21.3", diff: "+2.8", winPct: "69%", games: "16" },
    offensive: { ppg: "24.0", totalPts: "384", high: "40 pts", low: "10 pts", largestW: "+31" },
    defensive: { apg: "21.3", totalAllowed: "340", heldUnder20: "8 games", avgDiff: "+2.8" },
    runOfPlay: ["🏆 Chase for the Chain NY — Champions", "🥈 Rumble for the Ring CT — Finalists", "National Finals · 3–0 pool play · SF exit vs NE Storm Black", "1–2 NY Metro Showdown"],
    games: [
      { date: "Apr 11", opponent: "vs Level Up", score: "29 – 12", result: "W" },
      { date: "Apr 12", opponent: "vs Showtime Elite", score: "40 – 9", result: "W" },
      { date: "Apr 12", opponent: "vs NY Extreme Black", score: "26 – 16", result: "W" },
      { date: "Apr 12", opponent: "vs NY Extreme Black", score: "35 – 21", result: "W", tag: "Final" },
      { date: "Apr 18", opponent: "vs Palisades Elite", score: "20 – 43", result: "L" },
      { date: "Apr 18", opponent: "vs NY Gauchos", score: "14 – 24", result: "L" },
      { date: "Apr 19", opponent: "vs Rockland Spartans Maroon", score: "29 – 24", result: "W" },
      { date: "May 16", opponent: "vs CT Northstars", score: "19 – 14", result: "W" },
      { date: "May 16", opponent: "vs PHD Carothers", score: "10 – 41", result: "L" },
      { date: "May 16", opponent: "vs PHD McCurdy", score: "18 – 9", result: "W" },
      { date: "May 16", opponent: "vs Connecticut Elite", score: "17 – 6", result: "W" },
      { date: "May 17", opponent: "vs PHD McCurdy", score: "23 – 26", result: "L", tag: "Final" },
      { date: "May 30", opponent: "vs Team Sims Cape", score: "30 – 27", result: "W" },
      { date: "May 30", opponent: "vs Lady Breakers", score: "29 – 14", result: "W" },
      { date: "May 31", opponent: "vs Mass Premier Blue", score: "23 – 16", result: "W" },
      { date: "May 31", opponent: "vs NE Storm Black", score: "22 – 38", result: "L", tag: "SF" },
    ],
  },
  {
    id: "sp-10ub", name: "10U Boys Black", shortName: "10U Black", grade: "4th Grade Boys", circuit: "AAU Circuit — Nationals Qualifier",
    record: "10–6", streak: "L2", color: "#4a8fd4", nationalsQualified: true,
    stats: { ppg: "31.3", allowed: "26.1", diff: "+5.2", winPct: "63%", games: "16" },
    offensive: { ppg: "31.3", totalPts: "500", high: "43 pts", low: "12 pts", largestW: "+24" },
    defensive: { apg: "26.1", totalAllowed: "417", heldUnder20: "6 games", avgDiff: "+5.2" },
    runOfPlay: ["🏆 Rumble for the Ring CT — Champions", "🏆 Chase for the Chain NY — Champions", "National Finals · 1–2", "0–4 NY Metro Showdown"],
    games: [
      { date: "Apr 11", opponent: "vs 6th Boro Hoops", score: "43 – 19", result: "W" },
      { date: "Apr 11", opponent: "vs Rising Stars", score: "21 – 18", result: "W" },
      { date: "Apr 12", opponent: "vs Bobcats Basketball", score: "40 – 19", result: "W" },
      { date: "Apr 12", opponent: "vs Northeast Elite Red", score: "41 – 18", result: "W" },
      { date: "Apr 12", opponent: "vs Northeast Elite Red", score: "39 – 17", result: "W", tag: "Final" },
      { date: "Apr 18", opponent: "vs Stars Academy", score: "34 – 38", result: "L" },
      { date: "Apr 18", opponent: "vs NY Extreme Red", score: "28 – 31", result: "L" },
      { date: "Apr 19", opponent: "vs Greenwich Stars", score: "28 – 48", result: "L" },
      { date: "Apr 19", opponent: "vs Northeast Elite", score: "12 – 42", result: "L" },
      { date: "May 16", opponent: "vs PHD White", score: "29 – 21", result: "W" },
      { date: "May 16", opponent: "vs PHD Yellow", score: "38 – 20", result: "W" },
      { date: "May 17", opponent: "vs Team Frenji", score: "38 – 22", result: "W", tag: "SF" },
      { date: "May 17", opponent: "vs CT Wolves", score: "37 – 30", result: "W", tag: "Final" },
      { date: "Jun 6", opponent: "vs Team Spartans Academy", score: "20 – 0", result: "W", tag: "Forfeit" },
      { date: "Jun 6", opponent: "vs ASA", score: "30 – 37", result: "L" },
      { date: "Jun 7", opponent: "vs Breakout Basketball Blue", score: "22 – 37", result: "L" },
    ],
  },
  {
    id: "sp-10ubl", name: "10U Boys Blue", shortName: "10U Blue", grade: "4th Grade Boys", circuit: "League Play",
    record: "3–5", streak: "L3", color: "#94a3b8",
    stats: { ppg: "21.8", allowed: "23.4", diff: "-1.6", winPct: "38%", games: "8" },
    offensive: { ppg: "21.8", totalPts: "174", high: "48 pts", low: "2 pts", largestW: "+28" },
    defensive: { apg: "23.4", totalAllowed: "187", heldUnder20: "2 games", avgDiff: "-1.6" },
    runOfPlay: ["#6 seed · Playoff exit vs #3 6th Boro", "25–27 2OT heartbreaker vs Resurrection Blue"],
    games: [
      { date: "Apr 9", opponent: "vs Resurrection Navy", score: "48 – 20", result: "W" },
      { date: "Apr 12", opponent: "vs OLPH-Pelham", score: "10 – 33", result: "L" },
      { date: "May 2", opponent: "vs Resurrection White", score: "2 – 0", result: "W", tag: "Forfeit" },
      { date: "May 3", opponent: "vs St Anthony-Yonkers", score: "18 – 14", result: "W" },
      { date: "May 9", opponent: "vs Resurrection Blue (2OT)", score: "25 – 27", result: "L" },
      { date: "May 17", opponent: "vs 6th Boro", score: "25 – 35", result: "L" },
      { date: "May 20", opponent: "vs Holy Family-NR", score: "24 – 30", result: "L" },
      { date: "Jun 5", opponent: "vs 6th Boro", score: "22 – 28", result: "L", tag: "Playoff" },
    ],
  },
  {
    id: "sp-9u", name: "9U Boys", shortName: "9U Boys", grade: "3rd Grade Boys", circuit: "League Play",
    record: "2–8", streak: "", color: "#06b6d4",
    stats: { ppg: "14.4", allowed: "21.6", diff: "-7.2", winPct: "20%", games: "10" },
    offensive: { ppg: "14.4", totalPts: "144", high: "23 pts", low: "8 pts", largestW: "+11" },
    defensive: { apg: "21.6", totalAllowed: "216", heldUnder20: "5 games", avgDiff: "-7.2" },
    runOfPlay: ["#12 seed upset · W 23–12 vs #5 Resurrection Blue", "Playoff QF exit vs #4 Resurrection White"],
    games: [
      { date: "Apr 17", opponent: "vs OLPH-Pelham", score: "16 – 24", result: "L" },
      { date: "Apr 26", opponent: "vs Riverdale Wolves", score: "14 – 12", result: "W" },
      { date: "Apr 26", opponent: "vs Resurrection Blue", score: "15 – 19", result: "L" },
      { date: "May 2", opponent: "vs St Barnabas", score: "8 – 30", result: "L" },
      { date: "May 3", opponent: "vs St Joseph-Bxville", score: "11 – 19", result: "L" },
      { date: "May 9", opponent: "vs Resurrection White", score: "12 – 30", result: "L" },
      { date: "May 18", opponent: "vs 6th Boro", score: "12 – 13", result: "L" },
      { date: "May 28", opponent: "vs St Matthews", score: "20 – 27", result: "L" },
      { date: "Jun 6", opponent: "vs [5] Resurrection Blue", score: "23 – 12", result: "W", tag: "Playoff" },
      { date: "Jun 7", opponent: "vs [4] Resurrection White", score: "13 – 30", result: "L", tag: "QF" },
    ],
  },
  {
    id: "sp-8u", name: "8U Boys", shortName: "8U Boys", grade: "2nd Grade Boys", circuit: "AAU Circuit",
    record: "3–13", streak: "L11", color: "#f59e0b",
    stats: { ppg: "16.2", allowed: "29.4", diff: "-13.3", winPct: "19%", games: "16" },
    offensive: { ppg: "16.2", totalPts: "259", high: "38 pts", low: "8 pts", largestW: "+24" },
    defensive: { apg: "29.4", totalAllowed: "471", heldUnder20: "2 games", avgDiff: "-13.3" },
    runOfPlay: ["0–4 BB Shootout Bergen Co.", "0–4 Rumble for the Ring CT", "Championship Finalists · Chase for the Chain NY"],
    games: [
      { date: "Apr 11", opponent: "vs Triple Double Blue", score: "12 – 11", result: "W" },
      { date: "Apr 11", opponent: "vs RTG", score: "38 – 14", result: "W" },
      { date: "Apr 12", opponent: "vs Rundown NYC", score: "14 – 28", result: "L" },
      { date: "Apr 12", opponent: "vs Rundown NYC", score: "12 – 45", result: "L", tag: "Final" },
      { date: "Apr 18", opponent: "vs Riverside Hawks", score: "29 – 27", result: "W" },
      { date: "Apr 18", opponent: "vs Westchester Wave", score: "14 – 28", result: "L" },
      { date: "Apr 19", opponent: "vs Westchester Wave", score: "10 – 41", result: "L" },
      { date: "Apr 19", opponent: "vs Atlantic Sharks", score: "9 – 29", result: "L" },
      { date: "May 16", opponent: "vs CT Wolves", score: "15 – 35", result: "L" },
      { date: "May 16", opponent: "vs Stamford Peace", score: "12 – 41", result: "L" },
      { date: "May 16", opponent: "vs Twin Athletics", score: "8 – 34", result: "L" },
      { date: "May 16", opponent: "vs NY Wild", score: "13 – 34", result: "L" },
      { date: "Jun 6", opponent: "vs Wave Basketball", score: "13 – 35", result: "L" },
      { date: "Jun 6", opponent: "vs NJ Do It All 2", score: "19 – 20", result: "L" },
      { date: "Jun 7", opponent: "vs Metro Hoopers 2", score: "19 – 22", result: "L" },
      { date: "Jun 7", opponent: "vs NY Extreme 2/3 Red", score: "22 – 27", result: "L" },
    ],
  },
];

const winterTeams: TeamData[] = [
  {
    id: "w-10ub", name: "10U Boys Black", shortName: "10U Black", grade: "4th Grade Boys", circuit: "ZG Tri-State Winter · #3 Seed → Semi-Finals",
    record: "8–2", streak: "", color: "#4a8fd4",
    stats: { ppg: "26.4", allowed: "14.3", diff: "+12.1", winPct: "80%", games: "12" },
    offensive: { ppg: "26.4", totalPts: "264", high: "46 pts", low: "15 pts", largestW: "+29" },
    defensive: { apg: "14.3", totalAllowed: "143", heldUnder20: "6 games", avgDiff: "+12.1" },
    runOfPlay: ["✦ 4-Game Win Streak to close Regular Season", "⚔ Quarterfinal Win · Semi-Final Exit", "3–0 vs High Rise Red all season"],
    games: [
      { date: "Dec 6", opponent: "vs Faith & Grind", score: "15 – 23", result: "L" },
      { date: "Dec 14", opponent: "vs Backdoorhoops", score: "24 – 13", result: "W" },
      { date: "Dec 21", opponent: "vs Fairfield Fierce", score: "24 – 9", result: "W" },
      { date: "Jan 3", opponent: "vs Atlantic Sharks White", score: "26 – 18", result: "W" },
      { date: "Jan 3", opponent: "vs High Rise Red", score: "33 – 19", result: "W" },
      { date: "Jan 11", opponent: "vs NEE Rec Winter", score: "18 – 23", result: "L" },
      { date: "Jan 17", opponent: "vs NY Lob Yellow", score: "32 – 4", result: "W" },
      { date: "Jan 31", opponent: "vs Greenwich Stars White", score: "46 – 17", result: "W" },
      { date: "Feb 7", opponent: "vs Triple Threat Basketball", score: "26 – 17", result: "W" },
      { date: "Feb 15", opponent: "vs High Rise Red", score: "20 – 0", result: "W", tag: "Forfeit" },
      { date: "Feb 28", opponent: "vs High Rise Red #6", score: "27 – 22", result: "W", tag: "QF" },
      { date: "Mar 1", opponent: "vs Triple Threat #2", score: "11 – 21", result: "L", tag: "SF" },
    ],
  },
  {
    id: "w-11ug", name: "11U Girls", shortName: "11U Girls", grade: "5th Grade Girls", circuit: "ZG Tri-State Winter · #3 Seed → Semi-Finals",
    record: "7–3", streak: "", color: "#a78bfa",
    stats: { ppg: "20.8", allowed: "16.2", diff: "+4.6", winPct: "70%", games: "10" },
    offensive: { ppg: "20.8", totalPts: "208", high: "30 pts", low: "10 pts", largestW: "+18" },
    defensive: { apg: "16.2", totalAllowed: "162", heldUnder20: "7 games", avgDiff: "+4.6" },
    runOfPlay: ["5-Game Win Streak (Dec 21 – Feb 1)", "#2 Defense in league (16.2 allowed)", "Quarterfinal Win · Semi-Final Exit"],
    games: [],
  },
];

type Season = "spring" | "winter";

export default function Records() {
  const [activeSeason, setActiveSeason] = useState<Season>("spring");
  const [activeTeamIdx, setActiveTeamIdx] = useState(0);
  const [showGameLog, setShowGameLog] = useState(false);

  const teams = activeSeason === "spring" ? springTeams : winterTeams;
  const team = teams[activeTeamIdx];

  const handleSeasonChange = (s: Season) => {
    setActiveSeason(s);
    setActiveTeamIdx(0);
    setShowGameLog(false);
  };

  const handleTeamChange = (idx: number) => {
    setActiveTeamIdx(idx);
    setShowGameLog(false);
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <img src={HERO_IMG} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-arena/60 to-arena" />
        <span className="watermark top-1/2 -translate-y-1/2 right-[-5%] opacity-[0.04]">RECORDS</span>
        <div className="container relative z-10">
          <span className="font-display font-700 text-xs uppercase tracking-[0.2em] text-cobalt mb-2 block">
            ⚔ Legacy Hoopers · Westchester, NY
          </span>
          <h1 className="font-display font-800 text-5xl md:text-7xl uppercase text-white leading-[0.9]">
            The Legacy<br /><span className="text-cobalt">Record Book.</span>
          </h1>
          <p className="text-white/60 text-base mt-3 max-w-md">
            Every game. Every score. Every stat. Spring 2026 underway. Winter 2025–26 complete.
          </p>
          <div className="flex flex-wrap gap-2 mt-5">
            {["Westchester, NY", "5 Teams", "AAU Circuit", "League", "2025–2026"].map((tag) => (
              <span key={tag} className="px-3 py-1 bg-cobalt/15 border border-cobalt/30 rounded text-cobalt font-display font-700 text-[11px] uppercase tracking-wider">
                {tag}
              </span>
            ))}
          </div>
          <p className="text-white/40 text-xs italic mt-4">Last Updated: June 7, 2026</p>
        </div>
      </section>

      {/* Program Stat Bar */}
      <div className="bg-navy-light border-y border-cobalt/15">
        <div className="container">
          <div className="grid grid-cols-3">
            <div className="text-center py-5 border-r border-white/5">
              <span className="block font-display font-800 text-2xl md:text-3xl text-gold stat-glow">3 🏆</span>
              <span className="block font-display font-700 text-[10px] uppercase tracking-[0.12em] text-white/50 mt-1">Championships</span>
            </div>
            <div className="text-center py-5 border-r border-white/5">
              <span className="block font-display font-800 text-2xl md:text-3xl text-green-400 stat-glow">2 ✓</span>
              <span className="block font-display font-700 text-[10px] uppercase tracking-[0.12em] text-white/50 mt-1">Nationals Qualified</span>
            </div>
            <div className="text-center py-5">
              <span className="block font-display font-800 text-2xl md:text-3xl text-gold stat-glow">5</span>
              <span className="block font-display font-700 text-[10px] uppercase tracking-[0.12em] text-white/50 mt-1">Teams</span>
            </div>
          </div>
        </div>
      </div>

      {/* Season Selector */}
      <section className="py-8">
        <div className="container">
          <div className="flex gap-3 mb-6">
            <button
              onClick={() => handleSeasonChange("spring")}
              className={`px-5 py-3 rounded-lg font-display font-700 text-sm uppercase tracking-wider transition-all duration-200 ${
                activeSeason === "spring"
                  ? "bg-cobalt text-white shadow-lg shadow-cobalt/30"
                  : "bg-white/[0.04] border border-white/10 text-white/70 hover:bg-white/[0.08]"
              }`}
            >
              Spring 2026
            </button>
            <button
              onClick={() => handleSeasonChange("winter")}
              className={`px-5 py-3 rounded-lg font-display font-700 text-sm uppercase tracking-wider transition-all duration-200 ${
                activeSeason === "winter"
                  ? "bg-cobalt text-white shadow-lg shadow-cobalt/30"
                  : "bg-white/[0.04] border border-white/10 text-white/70 hover:bg-white/[0.08]"
              }`}
            >
              Winter 2025–26
            </button>
          </div>

          {/* Winter Summary Banner */}
          {activeSeason === "winter" && (
            <div className="bg-navy-light border border-cobalt/20 rounded-xl p-5 mb-6">
              <div className="grid grid-cols-3 text-center gap-4">
                <div><span className="block font-display font-800 text-2xl text-green-400">15–5</span><span className="block text-white/50 text-[10px] uppercase tracking-wider mt-1">Combined Record</span></div>
                <div><span className="block font-display font-800 text-2xl"><span className="text-cobalt">#1</span> · <span className="text-purple-400">#2</span></span><span className="block text-white/50 text-[10px] uppercase tracking-wider mt-1">Defense Rankings</span></div>
                <div><span className="block font-display font-800 text-2xl text-white">75%</span><span className="block text-white/50 text-[10px] uppercase tracking-wider mt-1">Win Rate</span></div>
              </div>
            </div>
          )}

          {/* Team Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {teams.map((t, i) => (
              <button
                key={t.id}
                onClick={() => handleTeamChange(i)}
                className={`px-4 py-2.5 rounded-lg font-display font-700 text-sm uppercase tracking-wider transition-all duration-200 border-b-[3px] ${
                  activeTeamIdx === i
                    ? "text-white shadow-lg"
                    : "bg-white/[0.04] border border-white/10 text-white/70 hover:bg-white/[0.08]"
                }`}
                style={
                  activeTeamIdx === i
                    ? { backgroundColor: t.color, borderColor: t.color, borderBottomColor: t.color, boxShadow: `0 4px 16px ${t.color}40` }
                    : { borderBottomColor: `${t.color}60` }
                }
              >
                {t.shortName}
              </button>
            ))}
          </div>

          {/* Team Header Card */}
          <div className="bg-gradient-to-br from-navy-light to-[#142f56] border border-cobalt/15 rounded-xl p-5 md:p-6 flex flex-wrap items-end justify-between gap-4 mb-5">
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center font-display font-900 text-lg border-2"
                style={{ color: team.color, borderColor: team.color, background: `${team.color}15` }}
              >
                {team.name.match(/\d+/)?.[0] || "?"}
              </div>
              <div>
                <h2 className="font-display font-800 text-2xl md:text-4xl uppercase text-white leading-none">
                  {team.name}
                </h2>
                <p className="text-white/50 text-sm mt-1">{team.grade} · {team.circuit}</p>
                {team.nationalsQualified && (
                  <span className="text-green-400 text-xs font-600 mt-1 inline-block">✓ Nationals Qualified</span>
                )}
              </div>
            </div>
            <div className="text-right">
              <span className="font-display font-800 text-4xl md:text-5xl tracking-wide" style={{ color: team.color, textShadow: `0 0 20px ${team.color}40` }}>
                {team.record}
              </span>
              {team.streak && <span className={`ml-2 text-xs font-700 px-2 py-0.5 rounded ${team.streak.startsWith("W") ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>{team.streak}</span>}
              <span className="block text-white/50 text-[11px] uppercase tracking-wider mt-1">
                {activeSeason === "spring" ? "Spring Season" : "Winter Regular Season"}
              </span>
            </div>
          </div>

          {/* Stat Row */}
          <div className="grid grid-cols-5 bg-navy-light border border-white/5 rounded-xl overflow-hidden mb-5">
            {[
              { val: team.stats.ppg, label: "Pts / Game", style: { color: team.color } },
              { val: team.stats.allowed, label: "Allowed", style: { color: "#22c55e" } },
              { val: team.stats.diff, label: "Diff", style: { color: team.stats.diff.startsWith("+") ? "#22c55e" : "#ef4444" } },
              { val: team.stats.winPct, label: "Win Rate", style: { color: "#fff" } },
              { val: team.stats.games, label: "Games", style: { color: team.color } },
            ].map((s, i) => (
              <div key={i} className="text-center py-4 border-r border-white/5 last:border-r-0">
                <span className="block font-display font-800 text-lg md:text-2xl" style={s.style}>{s.val}</span>
                <span className="block text-white/50 text-[9px] md:text-[10px] uppercase tracking-wider mt-1">{s.label}</span>
              </div>
            ))}
          </div>

          {/* Game Log */}
          {team.games.length > 0 && (
            <div className="mb-5">
              <button
                onClick={() => setShowGameLog(!showGameLog)}
                className="w-full bg-navy-light border border-white/10 rounded-xl px-5 py-4 flex items-center justify-between hover:bg-white/[0.04] transition-colors"
              >
                <span className="font-display font-700 text-sm uppercase tracking-wider" style={{ color: team.color }}>
                  Show All Games
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-white/50 text-xs">{team.stats.games} games · {team.record}</span>
                  {showGameLog ? <ChevronUp className="w-4 h-4 text-white/50" /> : <ChevronDown className="w-4 h-4 text-white/50" />}
                </div>
              </button>
              {showGameLog && (
                <div className="mt-2 bg-navy-light border border-white/5 rounded-xl overflow-hidden">
                  {team.games.map((g, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-3 px-4 py-3 border-b border-white/5 last:border-b-0 ${
                        g.result === "W" ? "bg-green-500/[0.03]" : "bg-red-500/[0.03]"
                      }`}
                    >
                      <span className="text-white/40 text-xs w-14 flex-shrink-0 font-600">{g.date}</span>
                      <span className="text-white/80 text-sm flex-1">
                        {g.opponent}
                        {g.tag && <span className="ml-2 px-1.5 py-0.5 bg-white/10 rounded text-[10px] text-white/60 font-600">{g.tag}</span>}
                      </span>
                      <span className="text-white font-display font-700 text-sm w-20 text-right">{g.score}</span>
                      <span className={`font-display font-800 text-sm w-6 text-center ${g.result === "W" ? "text-green-400" : "text-red-400"}`}>
                        {g.result}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Season Splits */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
            <div className="bg-navy-light border border-white/5 rounded-xl p-5">
              <h4 className="font-display font-800 text-xs uppercase tracking-wider mb-4 pb-2 border-b-2" style={{ color: team.color, borderColor: `${team.color}40` }}>Offensive</h4>
              {[
                ["Points Per Game", team.offensive.ppg, true],
                ["Total Points", team.offensive.totalPts, false],
                ["Single-Game High", team.offensive.high, true],
                ["Single-Game Low", team.offensive.low, false],
                ["Largest Victory", team.offensive.largestW, true],
              ].map(([label, val, highlight], i) => (
                <div key={i} className="flex justify-between items-center py-2 border-b border-white/5 last:border-b-0">
                  <span className="text-white/70 text-sm">{label as string}</span>
                  <span className={`font-display font-800 text-base ${highlight ? "" : "text-white"}`} style={highlight ? { color: team.color } : {}}>
                    {val as string}
                  </span>
                </div>
              ))}
            </div>
            <div className="bg-navy-light border border-white/5 rounded-xl p-5">
              <h4 className="font-display font-800 text-xs uppercase tracking-wider text-green-400 mb-4 pb-2 border-b-2 border-green-400/40">Defensive</h4>
              {[
                ["Allowed / Game", team.defensive.apg, true],
                ["Total Allowed", team.defensive.totalAllowed, false],
                ["Held Under 20", team.defensive.heldUnder20, true],
                ["Avg Diff", team.defensive.avgDiff, true],
              ].map(([label, val, highlight], i) => (
                <div key={i} className="flex justify-between items-center py-2 border-b border-white/5 last:border-b-0">
                  <span className="text-white/70 text-sm">{label as string}</span>
                  <span className={`font-display font-800 text-base ${highlight ? "text-green-400" : "text-white"}`}>
                    {val as string}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Run of Play */}
          <div className="mb-8">
            <h4 className="font-display font-800 text-xs uppercase tracking-wider text-white/50 mb-3">Run of Play</h4>
            <div className="flex flex-wrap gap-2">
              {team.runOfPlay.map((pill, i) => (
                <span
                  key={i}
                  className={`px-4 py-2 rounded-full text-sm font-700 border-2 ${
                    pill.includes("🏆") || pill.includes("✦") || pill.includes("Win Streak") || pill.includes("upset")
                      ? "bg-green-500/10 border-green-500/30 text-green-400"
                      : "bg-white/[0.04] border-white/10 text-white/80"
                  }`}
                >
                  {pill}
                </span>
              ))}
            </div>
          </div>

          {/* Tournament Highlights (Spring only, first tab) */}
          {activeSeason === "spring" && activeTeamIdx === 0 && (
            <div className="space-y-3 mt-8">
              <h4 className="font-display font-800 text-xs uppercase tracking-wider text-white/40">Tournament Highlights</h4>
              <div className="bg-gradient-to-br from-navy-light to-[#142f56] border border-gold/30 border-l-4 border-l-gold rounded-xl p-4">
                <h5 className="font-display font-800 text-lg uppercase text-white mb-2">ZG Chase for the Chain NY</h5>
                <div className="space-y-1 text-sm font-600">
                  <p className="text-green-400">🏆 10U Boys Black · Champions</p>
                  <p className="text-green-400">🏆 11U Girls · Champions</p>
                  <p className="text-gold">🥈 8U Boys · Finalists</p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-navy-light to-[#142f56] border border-gold/30 border-l-4 border-l-gold rounded-xl p-4">
                <h5 className="font-display font-800 text-lg uppercase text-white mb-2">ZG Rumble for the Ring CT</h5>
                <div className="space-y-1 text-sm font-600">
                  <p className="text-green-400">🏆 10U Boys Black · Champions</p>
                  <p className="text-gold">🥈 11U Girls · Finalists</p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-navy-light to-[#142f56] border border-purple-400/30 border-l-4 border-l-purple-400 rounded-xl p-4">
                <h5 className="font-display font-800 text-lg uppercase text-white mb-2">ZG National Finals MA</h5>
                <div className="space-y-1 text-sm font-600">
                  <p className="text-purple-400">11U Girls · 3–0 Pool Play · Semifinalists</p>
                </div>
              </div>
            </div>
          )}

          {/* Winter Highlights */}
          {activeSeason === "winter" && activeTeamIdx === 0 && (
            <div className="space-y-3 mt-8">
              <h4 className="font-display font-800 text-xs uppercase tracking-wider text-white/40">Moments That Define the Legacy</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-navy-light border border-cobalt/15 border-l-4 border-l-cobalt rounded-xl p-4">
                  <span className="text-2xl">🏆</span>
                  <p className="font-display font-800 text-xl mt-2" style={{ color: "#4a8fd4" }}>Both</p>
                  <p className="text-white font-700 text-sm mt-1">Both AAU Teams Made the Playoffs</p>
                  <p className="text-white/60 text-xs mt-1">10U Black seeded #3. 11U Girls seeded #3. A first-year program with two teams advancing.</p>
                </div>
                <div className="bg-navy-light border border-green-400/15 border-l-4 border-l-green-400 rounded-xl p-4">
                  <span className="text-2xl">🔒</span>
                  <p className="font-display font-800 text-xl text-green-400 mt-2">#1 & #2</p>
                  <p className="text-white font-700 text-sm mt-1">Top-2 Defense in the Entire League</p>
                  <p className="text-white/60 text-xs mt-1">10U Black: #1 at 14.3 pts allowed. 11U Girls: #2 at 16.2. Same league, same standard.</p>
                </div>
                <div className="bg-navy-light border border-gold/15 border-l-4 border-l-gold rounded-xl p-4">
                  <span className="text-2xl">⚡</span>
                  <p className="font-display font-800 text-xl text-gold mt-2">46–17</p>
                  <p className="text-white font-700 text-sm mt-1">Statement Win of the Season</p>
                  <p className="text-white/60 text-xs mt-1">Jan 31 · 10U Black vs Greenwich Stars White. A +29 margin — the single-game scoring high.</p>
                </div>
                <div className="bg-navy-light border border-cobalt/15 border-l-4 border-l-cobalt rounded-xl p-4">
                  <span className="text-2xl">⚔️</span>
                  <p className="font-display font-800 text-xl" style={{ color: "#4a8fd4" }}>3–0</p>
                  <p className="text-white font-700 text-sm mt-1">10U Boys Black vs High Rise Red — Perfect</p>
                  <p className="text-white/60 text-xs mt-1">W 33–19. W 20–0 (forfeit). W 27–22 (Quarterfinals). Three wins including a playoff elimination.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
