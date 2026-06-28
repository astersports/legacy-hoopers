/*
 * Programs — the services hub: camps, clinics, 1:1, AAU teams, small groups,
 * elite academy. Aspirational/cosmetic; checkout wires to Aster later.
 */
import { ArrowRight, Check, Users, Calendar, ClipboardCheck, Sparkles } from "lucide-react";
import { REGISTER_URL } from "@/lib/brand";
import { COACHES } from "@/lib/content";
import { Section, SectionHeading, Pill, btnGold, btnGhostDark } from "@/components/kit";
import ScrollReveal from "@/components/ScrollReveal";
import { ProgramFilterGrid } from "@/components/programs/ProgramFilterGrid";
import { ProgramComparison } from "@/components/programs/ProgramComparison";
import { RegistrationSteps } from "@/components/programs/RegistrationSteps";
import { SeasonTimeline } from "@/components/programs/SeasonTimeline";
import { TrustBadges } from "@/components/programs/TrustBadges";
import { QuizCta } from "@/components/programs/QuizCta";
import { ProgramTestimonials } from "@/components/programs/ProgramTestimonials";
import { ProgramFaq } from "@/components/programs/ProgramFaq";
import { EligibilityGrid } from "@/components/programs/EligibilityGrid";
import { AiProgramMatcher } from "@/components/ai/programs/AiProgramMatcher";
import { AiDevelopmentPath } from "@/components/ai/programs/AiDevelopmentPath";
import { AiPlanBuilder } from "@/components/ai/programs/AiPlanBuilder";
import { AiProgramAdvisor } from "@/components/ai/programs/AiProgramAdvisor";

const INCLUDED = [
  { icon: ClipboardCheck, title: "A real development plan", desc: "Every athlete gets a tracked plan — not a one-size-fits-all practice." },
  { icon: Calendar, title: "One schedule for everything", desc: "Camps, clinics, sessions and games — synced to your family calendar." },
  { icon: Users, title: "Coaches who teach", desc: "Master-trained, SafeSport-certified staff who explain the why." },
];

export default function Programs() {
  return (
    <div>
      <section className="hero-navy text-white">
        <div className="container py-16 sm:py-20">
          <Pill onDark>Programs</Pill>
          <h1 className="mt-4 max-w-3xl text-4xl font-extrabold tracking-tight sm:text-6xl">
            Find the right lane for your athlete.
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white/70">
            Six ways to train, one platform behind all of them. Drop in for a clinic or commit to a
            travel team — every path is built to develop complete players.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer" className={btnGold}>
              Start now <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#programs" className={btnGhostDark}>Compare programs</a>
          </div>
        </div>
      </section>

      {/* #5 — trust badges */}
      <Section className="!py-10">
        <ScrollReveal>
          <TrustBadges />
        </ScrollReveal>
      </Section>

      {/* #1 / #10 — filterable programs grid */}
      <Section tone="muted" className="scroll-mt-20">
        <div id="programs" />
        <SectionHeading
          eyebrow="Choose your program"
          title="Six programs. One standard."
          subtitle="Pricing shown is illustrative for this template — final plans configure per program. Filter to find your fit."
        />
        <ProgramFilterGrid />
      </Section>

      {/* #2 — side-by-side comparison */}
      <Section>
        <SectionHeading
          eyebrow="Compare side by side"
          title="Every program, line by line."
          subtitle="The facts that matter most, all in one view."
        />
        <ScrollReveal>
          <ProgramComparison />
        </ScrollReveal>
      </Section>

      {/* AI / ML — premium, clearly-labeled AI surfaces (cosmetic; wired later) */}
      <Section tone="muted" className="scroll-mt-20">
        <div id="ai" />
        <SectionHeading
          eyebrow="Powered by Aster AI"
          title={
            <span className="inline-flex flex-wrap items-center gap-2">
              <Sparkles className="h-7 w-7 text-gold-text" /> Let AI find the perfect path.
            </span>
          }
          subtitle="Answer a few questions and Aster's match engine recommends a program, maps the development path, and drafts a custom plan — a preview of the intelligence behind every Aster program."
        />
        <div className="grid items-start gap-6 lg:grid-cols-2">
          <ScrollReveal>
            <AiProgramMatcher />
          </ScrollReveal>
          <ScrollReveal delay={60}>
            <AiDevelopmentPath />
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <AiPlanBuilder />
          </ScrollReveal>
          <ScrollReveal delay={180}>
            <AiProgramAdvisor />
          </ScrollReveal>
        </div>
        <p className="mt-6 flex items-center justify-center gap-2 text-center text-xs text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5 text-gold-text" />
          AI features shown are an illustrative preview. No athlete data leaves your device — recommendations confirm with a coach.
        </p>
      </Section>

      {/* #9 — age / grade eligibility quick reference */}
      <Section tone="muted">
        <SectionHeading
          eyebrow="Who fits where"
          title="Age & grade quick reference."
          subtitle="A starting point — every athlete is placed by skill and goals, not just birthday."
        />
        <ScrollReveal>
          <EligibilityGrid />
        </ScrollReveal>
      </Section>

      {/* #4 — season timeline strip */}
      <Section>
        <SectionHeading
          eyebrow="Year at a glance"
          title="There's always a way to play."
          subtitle="Programs run season to season so development never stops."
        />
        <ScrollReveal>
          <SeasonTimeline />
        </ScrollReveal>
      </Section>

      {/* #6 — quiz recommendation CTA */}
      <Section tone="muted" className="!py-12">
        <ScrollReveal>
          <QuizCta />
        </ScrollReveal>
      </Section>

      {/* #3 — how registration works */}
      <Section>
        <SectionHeading
          eyebrow="Getting started"
          title="How registration works."
          subtitle="Three steps from interested to in the gym."
        />
        <ScrollReveal>
          <RegistrationSteps />
        </ScrollReveal>
      </Section>

      <Section tone="muted">
        <SectionHeading eyebrow="Always included" title="What every Aster athlete gets." />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {INCLUDED.map((it, i) => (
            <ScrollReveal key={it.title} delay={i * 60}>
              <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-gold-soft text-gold-text">
                  <it.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-bold text-foreground">{it.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{it.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Section>

      {/* #7 — program testimonials */}
      <Section>
        <SectionHeading
          eyebrow="From our families"
          title="What parents and partners say."
        />
        <ProgramTestimonials />
      </Section>

      <Section tone="muted">
        <SectionHeading eyebrow="The staff" title="Coaching that meets athletes where they are." />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {COACHES.map((c, i) => (
            <ScrollReveal key={c.name} delay={i * 60}>
              <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-primary text-lg font-extrabold text-primary-foreground">
                  {c.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                </span>
                <div>
                  <div className="font-bold text-foreground">{c.name}</div>
                  <div className="text-sm text-muted-foreground">{c.role}</div>
                  <div className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-gold-text">
                    <Check className="h-3 w-3" /> {c.cred}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Section>

      {/* #8 — programs FAQ accordion */}
      <Section>
        <SectionHeading
          eyebrow="Good to know"
          title="Programs FAQ."
          subtitle="The questions families ask most before they sign up."
        />
        <ProgramFaq />
      </Section>

      <section className="border-t border-gold/20 bg-gradient-to-b from-gold-soft to-background">
        <div className="container grid place-items-center py-16 text-center sm:py-20">
          <h2 className="max-w-2xl text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Not sure where to start?
          </h2>
          <p className="mt-3 max-w-lg text-muted-foreground">
            Tell us your athlete's age and goals — we'll recommend the perfect first step.
          </p>
          <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer" className={`${btnGold} mt-7`}>
            Get a recommendation <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </div>
  );
}
