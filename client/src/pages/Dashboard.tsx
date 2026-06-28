/*
 * Dashboard — aspirational player/family command center. Cosmetic data; wires
 * to live Aster metrics later. Shows what "next-level dynamic" feels like.
 */
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { ArrowUpRight, Flame, Target, CalendarCheck, TrendingUp, Clock, MapPin } from "lucide-react";
import { Logo } from "@/components/Logo";
import { WeatherStrip } from "@/components/WeatherStrip";
import { HighlightsReel } from "@/components/HighlightsReel";
import { AppHub } from "@/components/AppHub";
import { Section, SectionHeading } from "@/components/kit";

const SHOOTING = [
  { wk: "W1", pct: 38 }, { wk: "W2", pct: 41 }, { wk: "W3", pct: 44 },
  { wk: "W4", pct: 43 }, { wk: "W5", pct: 49 }, { wk: "W6", pct: 52 },
  { wk: "W7", pct: 55 }, { wk: "W8", pct: 58 },
];
const ATTENDANCE = [100, 100, 80, 100, 100, 60, 100, 100];
const SKILLS = [
  { label: "Ball handling", pct: 82 },
  { label: "Shooting form", pct: 74 },
  { label: "Defense", pct: 68 },
  { label: "Basketball IQ", pct: 79 },
];
const UPCOMING = [
  { when: "Sat · 9:00 AM", what: "vs. Rivertown Elite", where: "County Center", kind: "Game" },
  { when: "Tue · 6:00 PM", what: "Skills clinic — finishing", where: "WCC Gym B", kind: "Clinic" },
  { when: "Thu · 5:00 PM", what: "1:1 with Coach Darien", where: "Player Lab", kind: "Training" },
];
const KPIS = [
  { icon: CalendarCheck, label: "Sessions this month", value: "12", sub: "+3 vs last", tone: "bg-blue-50 text-blue-600" },
  { icon: Target, label: "Attendance", value: "94%", sub: "Top 10% of team", tone: "bg-emerald-50 text-emerald-600" },
  { icon: TrendingUp, label: "Shooting %", value: "58%", sub: "+20 since W1", tone: "bg-gold-soft text-gold-text" },
  { icon: Flame, label: "Streak", value: "7", sub: "weeks on track", tone: "bg-primary/10 text-primary" },
];

export default function Dashboard() {
  return (
    <div>
      {/* Navy command bar */}
      <section className="hero-navy text-white">
        <div className="container py-12">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <Logo className="h-12 w-12" tone="navy" />
              <div>
                <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold-light">Family dashboard</div>
                <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Welcome back, Samaritano family</h1>
                <p className="text-sm text-white/60">Spring 2026 season · 2 athletes · everything on track</p>
              </div>
            </div>
            <span className="inline-flex items-center gap-2 self-start rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/80 ring-1 ring-white/10">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" /> Live · synced just now
            </span>
          </div>

          {/* KPI cards */}
          <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {KPIS.map((k) => (
              <div key={k.label} className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                <span className={`grid h-9 w-9 place-items-center rounded-lg ${k.tone}`}>
                  <k.icon className="h-5 w-5" />
                </span>
                <div className="mt-3 text-3xl font-extrabold tabular-nums text-white">{k.value}</div>
                <div className="text-xs text-white/60">{k.label}</div>
                <div className="mt-1 text-[11px] font-semibold text-gold-light">{k.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trend + skills */}
      <Section>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-foreground">Shooting % trend</h3>
                <p className="text-xs text-muted-foreground">Last 8 weeks · field goal %</p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-600">
                <ArrowUpRight className="h-3.5 w-3.5" /> +20%
              </span>
            </div>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={SHOOTING} margin={{ top: 6, right: 6, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#c9952e" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="#c9952e" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="wk" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#5a6472" }} />
                  <Tooltip
                    cursor={{ stroke: "#c9952e", strokeWidth: 1 }}
                    contentStyle={{ borderRadius: 12, border: "1px solid #e4e8ee", fontSize: 12 }}
                    formatter={(v: number) => [`${v}%`, "FG%"]}
                  />
                  <Area type="monotone" dataKey="pct" stroke="#c9952e" strokeWidth={2.5} fill="url(#g)" isAnimationActive={false} dot={{ r: 3, fill: "#c9952e" }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h3 className="font-bold text-foreground">Skill development</h3>
            <p className="text-xs text-muted-foreground">Coach-assessed · this season</p>
            <div className="mt-5 space-y-4">
              {SKILLS.map((s) => (
                <div key={s.label}>
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-foreground">{s.label}</span>
                    <span className="font-bold tabular-nums text-gold-text">{s.pct}%</span>
                  </div>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-secondary">
                    <div className="h-full rounded-full bg-gold" style={{ width: `${s.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 border-t border-border pt-4">
              <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Attendance · last 8</div>
              <div className="flex items-end gap-1.5">
                {ATTENDANCE.map((a, i) => (
                  <div key={i} className="flex-1 rounded-t bg-secondary" style={{ height: 40 }}>
                    <div
                      className={`w-full rounded-t ${a === 100 ? "bg-emerald-500" : "bg-gold"}`}
                      style={{ height: `${(a / 100) * 40}px`, marginTop: `${40 - (a / 100) * 40}px` }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Next game + weather */}
      <Section tone="muted" className="!py-14">
        <SectionHeading eyebrow="Next up" title="Saturday · vs. Rivertown Elite" subtitle="Westchester County Center · 9:00 AM tip-off" />
        <WeatherStrip />
      </Section>

      {/* Upcoming */}
      <Section className="!py-14">
        <SectionHeading eyebrow="Your week" title="Upcoming sessions" action={{ href: "/schedule", label: "Full schedule" }} />
        <div className="space-y-3">
          {UPCOMING.map((u) => (
            <div key={u.what} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-sm">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gold-soft text-gold-text">
                <Clock className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="font-bold text-foreground">{u.what}</div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" /> {u.where}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-foreground">{u.when}</div>
                <span className="text-[11px] font-bold uppercase tracking-wide text-gold-text">{u.kind}</span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Highlights + hub */}
      <Section tone="muted" className="!py-14">
        <SectionHeading eyebrow="Your film room" title="Latest highlights" action={{ href: "/highlights", label: "All clips" }} />
        <HighlightsReel limit={3} />
        <div className="mt-12">
          <SectionHeading eyebrow="Quick actions" title="Jump back in" />
          <AppHub />
        </div>
      </Section>
    </div>
  );
}
