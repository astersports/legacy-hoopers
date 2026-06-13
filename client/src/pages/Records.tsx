/*
 * DESIGN: Court Noir — Records page
 * Dark mode with team-colored tabs, stat cards, game logs
 */
import { useState } from "react";
import { Trophy, TrendingUp, Flame } from "lucide-react";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663756289268/nRxkftmdkigy3rgqBRonRk/hero-records-YxhsaSP2JmNcdvnL5U8ShT.webp";

const teams = [
  { id: "8u", name: "8U", color: "#f59e0b", record: "12-3", winPct: ".800", streak: "W4", pts: "+8.2" },
  { id: "9u", name: "9U", color: "#06b6d4", record: "10-4", winPct: ".714", streak: "W2", pts: "+6.5" },
  { id: "10ub", name: "10U Black", color: "#4a8fd4", record: "14-2", winPct: ".875", streak: "W7", pts: "+12.1" },
  { id: "10ubl", name: "10U Blue", color: "#94a3b8", record: "8-6", winPct: ".571", streak: "L1", pts: "+3.4" },
  { id: "11ug", name: "11U Girls", color: "#a78bfa", record: "11-3", winPct: ".786", streak: "W3", pts: "+9.8" },
];

const programStats = [
  { value: "55", label: "Wins", color: "text-success" },
  { value: "18", label: "Losses", color: "text-white" },
  { value: "7", label: "Tourneys", color: "text-gold" },
  { value: ".753", label: "Win %", color: "text-cobalt" },
];

export default function Records() {
  const [activeTeam, setActiveTeam] = useState("10ub");
  const team = teams.find((t) => t.id === activeTeam)!;

  return (
    <div>
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <img src={HERO_IMG} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-arena/60 to-arena" />
        <span className="watermark top-1/2 -translate-y-1/2 right-[-3%] opacity-[0.04]">RECORDS</span>
        <div className="container relative z-10">
          <span className="font-display font-700 text-xs uppercase tracking-[0.2em] text-cobalt mb-2 block">
            Season Records
          </span>
          <h1 className="font-display font-800 text-5xl md:text-7xl uppercase text-white leading-[0.9]">
            Team <span className="text-cobalt">Records</span>
          </h1>
          <p className="text-white/60 text-base mt-4 max-w-md">
            Spring/Summer 2025 season results across all five Legacy Hoopers teams.
          </p>
        </div>
      </section>

      {/* Program Stat Bar */}
      <div className="bg-navy-light border-y border-cobalt/15">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {programStats.map((stat, i) => (
              <div key={i} className="text-center py-5 border-r border-white/5 last:border-r-0">
                <span className={`block font-display font-800 text-3xl md:text-4xl ${stat.color} stat-glow`}>
                  {stat.value}
                </span>
                <span className="block font-display font-700 text-[10px] uppercase tracking-[0.12em] text-white/50 mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Tabs */}
      <section className="py-12 md:py-20">
        <div className="container">
          {/* Tab Buttons */}
          <div className="flex flex-wrap gap-2 mb-10">
            {teams.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTeam(t.id)}
                className={`px-5 py-3 font-display font-700 text-sm uppercase tracking-wider rounded-lg border transition-all duration-200 ${
                  activeTeam === t.id
                    ? "text-white shadow-lg"
                    : "text-white/60 border-white/10 bg-white/[0.03] hover:bg-white/[0.06]"
                }`}
                style={
                  activeTeam === t.id
                    ? { backgroundColor: t.color, borderColor: t.color, boxShadow: `0 4px 20px ${t.color}40` }
                    : { borderBottomColor: `${t.color}60` }
                }
              >
                {t.name}
              </button>
            ))}
          </div>

          {/* Active Team Display */}
          <div className="bg-gradient-to-br from-navy-light to-navy rounded-2xl border border-white/5 p-8 md:p-10">
            {/* Team Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div className="flex items-center gap-5">
                <div
                  className="w-14 h-14 rounded-full border-2 flex items-center justify-center font-display font-900 text-xl"
                  style={{ borderColor: team.color, color: team.color, backgroundColor: `${team.color}15` }}
                >
                  {team.name.charAt(0)}
                </div>
                <div>
                  <h2 className="font-display font-800 text-3xl md:text-5xl uppercase text-white">
                    {team.name}
                  </h2>
                  <p className="text-white/50 text-sm mt-1">Spring/Summer 2025 · AAU Circuit</p>
                </div>
              </div>
              <div className="text-right">
                <span
                  className="font-display font-800 text-5xl md:text-6xl"
                  style={{ color: team.color, textShadow: `0 0 20px ${team.color}40` }}
                >
                  {team.record}
                </span>
                <span className="block font-display font-700 text-xs uppercase tracking-[0.12em] text-white/50 mt-1">
                  Record
                </span>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {[
                { label: "Win %", value: team.winPct, icon: <TrendingUp className="w-4 h-4" /> },
                { label: "Streak", value: team.streak, icon: <Flame className="w-4 h-4" /> },
                { label: "Pt Diff", value: team.pts, icon: <Trophy className="w-4 h-4" /> },
                { label: "Games", value: String(parseInt(team.record.split("-")[0]) + parseInt(team.record.split("-")[1])), icon: null },
                { label: "Wins", value: team.record.split("-")[0], icon: null },
              ].map((stat, i) => (
                <div key={i} className="bg-white/[0.04] border border-white/5 rounded-xl p-4 text-center">
                  <span className="font-display font-800 text-2xl text-white">{stat.value}</span>
                  <span className="block text-white/40 text-xs uppercase tracking-wider mt-1 font-600">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Glow Line */}
            <div className="glow-line mt-8 rounded-full" style={{ background: `linear-gradient(90deg, transparent, ${team.color}, transparent)`, boxShadow: `0 0 12px ${team.color}40` }} />

            {/* Note */}
            <div className="mt-8 flex items-center gap-3 bg-cobalt/8 border border-cobalt/20 rounded-lg p-4">
              <Trophy className="w-5 h-5 text-cobalt flex-shrink-0" />
              <p className="text-cobalt text-sm font-600">
                Full game-by-game logs, scoring leaders, and tournament brackets available in the Aster Sports app.
              </p>
            </div>
          </div>

          {/* All Teams Summary */}
          <div className="mt-10">
            <h3 className="font-display font-800 text-xl uppercase text-white mb-6">
              All Teams — Season Snapshot
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {teams.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActiveTeam(t.id)}
                  className="bg-navy-light border border-white/5 rounded-xl p-5 text-center card-hover"
                  style={{ borderLeftWidth: "4px", borderLeftColor: t.color }}
                >
                  <span className="font-display font-800 text-lg uppercase text-white block">{t.name}</span>
                  <span className="font-display font-800 text-2xl block mt-2" style={{ color: t.color }}>
                    {t.record}
                  </span>
                  <span className="text-white/40 text-xs uppercase tracking-wider mt-1 block">{t.winPct} Win%</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
