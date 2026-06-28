/*
 * Dashboard — aspirational player/family command center. Cosmetic data; wires
 * to live Aster metrics later. Shows what "next-level dynamic" feels like.
 *
 * Theme: ONE navy command bar (+ KPI band) at the top; everything below stays
 * light (light cards on cool-gray). New surfaces live in components/dashboard/.
 */
import { Clock, MapPin } from "lucide-react";
import { WeatherStrip } from "@/components/WeatherStrip";
import { HighlightsReel } from "@/components/HighlightsReel";
import { AppHub } from "@/components/AppHub";
import { Section, SectionHeading } from "@/components/kit";
import { CommandBar } from "@/components/dashboard/CommandBar";
import { KpiCards } from "@/components/dashboard/KpiCards";
import { GoalRings } from "@/components/dashboard/GoalRings";
import { Badges } from "@/components/dashboard/Badges";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { CoachNote } from "@/components/dashboard/CoachNote";
import { PaymentsCard } from "@/components/dashboard/PaymentsCard";
import { ShootingChart } from "@/components/dashboard/ShootingChart";
import { Sparklines } from "@/components/dashboard/Sparklines";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { AiDevelopmentInsights } from "@/components/ai/dashboard/AiDevelopmentInsights";
import { GrowthProjectionChart } from "@/components/ai/dashboard/GrowthProjectionChart";
import { AiTrainingPlan } from "@/components/ai/dashboard/AiTrainingPlan";
import { LoadManagementGauge } from "@/components/ai/dashboard/LoadManagementGauge";
import { AskAboutAthlete } from "@/components/ai/dashboard/AskAboutAthlete";
import { AgentScanConsole } from "@/components/agent/AgentScanConsole";
import { DASHBOARD_SCAN } from "@/lib/agentScans";

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

export default function Dashboard() {
  return (
    <div>
      {/* Navy command bar — athlete switcher + date-range tabs (#1) */}
      <CommandBar />
      {/* KPI band (still navy) — AnimatedCounter (#10) */}
      <KpiCards />

      {/* Live athlete agent — the ASTER-AGENT scan console */}
      <div className="container mt-8">
        <AgentScanConsole scan={DASHBOARD_SCAN} className="max-w-2xl" />
      </div>

      {/* Goals & milestones + achievements (#2, #3) */}
      <Section className="!py-12">
        <SectionHeading eyebrow="Season goals" title="Milestones in motion" subtitle="Where each athlete stands against the plan." />
        <GoalRings />
        <div className="mt-8">
          <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Achievements</div>
          <Badges />
        </div>
      </Section>

      {/* Trend (vs team avg, #7) + skills */}
      <Section tone="muted" className="!py-12">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ShootingChart />
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-transform duration-200 hover:-translate-y-0.5">
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

        {/* Mini KPI sparklines (#9) */}
        <div className="mt-5">
          <Sparklines />
        </div>
      </Section>

      {/* Aster Intelligence — premium AI/ML showcase (cosmetic, labeled AI) */}
      <Section className="!py-12">
        <SectionHeading
          eyebrow="Aster Intelligence"
          title="Your athlete, understood by AI"
          subtitle="Premium AI features — a generated read on Maya's trajectory, what's next, and how to keep her healthy. Illustrative previews, reviewed by a coach."
        />
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <AiDevelopmentInsights />
          <GrowthProjectionChart />
          <AiTrainingPlan />
          <LoadManagementGauge />
        </div>
        <div className="mt-5">
          <AskAboutAthlete />
        </div>
      </Section>

      {/* Quick actions grid (#8) */}
      <Section className="!py-12">
        <SectionHeading eyebrow="Do it now" title="Quick actions" />
        <QuickActions />
      </Section>

      {/* Activity feed + coach note + payments (#4, #5, #6) */}
      <Section tone="muted" className="!py-12">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-transform duration-200 hover:-translate-y-0.5">
            <h3 className="mb-5 font-bold text-foreground">Recent activity</h3>
            <ActivityFeed />
          </div>
          <CoachNote />
          <PaymentsCard />
        </div>
      </Section>

      {/* Next game + weather */}
      <Section className="!py-14">
        <SectionHeading eyebrow="Next up" title="Saturday · vs. Rivertown Elite" subtitle="Westchester County Center · 9:00 AM tip-off" />
        <WeatherStrip />
      </Section>

      {/* Upcoming */}
      <Section tone="muted" className="!py-14">
        <SectionHeading eyebrow="Your week" title="Upcoming sessions" action={{ href: "/schedule", label: "Full schedule" }} />
        <div className="space-y-3">
          {UPCOMING.map((u) => (
            <div key={u.what} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-sm transition-transform duration-200 hover:-translate-y-0.5">
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
      <Section className="!py-14">
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
