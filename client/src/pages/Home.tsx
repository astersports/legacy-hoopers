/*
 * Home — flagship Aster Sports landing. Aspirational, dynamic, every service in
 * one place. Live program record blended with the showcase content model.
 */
import { Link } from "wouter";
import { ArrowRight, Star, ShieldCheck, Sparkles } from "lucide-react";
import { useProgramRecords } from "@/hooks/useProgramRecords";
import { programTotals } from "@/lib/aster";
import { BRAND, REGISTER_URL } from "@/lib/brand";
import { SERVICES, PROGRAM_METRICS, TESTIMONIALS, JOURNEY } from "@/lib/content";
import { Logo } from "@/components/Logo";
import { Section, SectionHeading, Pill, StatTile, btnGold, btnNavy, btnGhostDark, btnGhostLight } from "@/components/kit";
import { ServiceCard } from "@/components/ServiceCard";
import { HighlightsReel } from "@/components/HighlightsReel";
import { AppHub } from "@/components/AppHub";
import { WeatherStrip } from "@/components/WeatherStrip";
import ScrollReveal from "@/components/ScrollReveal";
import { NextGameChip } from "@/components/home/NextGameChip";
import { Starfield } from "@/components/home/Starfield";
import { CredibilityStrip } from "@/components/home/CredibilityStrip";
import { ProgramFinder } from "@/components/home/ProgramFinder";
import { ComparisonTable } from "@/components/home/ComparisonTable";
import { TestimonialCard } from "@/components/home/TestimonialCard";
import { FaqAccordion } from "@/components/home/FaqAccordion";
import { LocationsTeaser } from "@/components/home/LocationsTeaser";
import { InterestCapture } from "@/components/home/InterestCapture";

/** Hardcoded near-future next-game tip-off (drives the live countdown chip). */
const NEXT_GAME = "2026-07-04T18:30:00";

/** Outcome stats for the light outcomes band. */
const OUTCOMES = [
  { value: 92, suffix: "%", label: "Athletes who return" },
  { value: 30, suffix: "+", label: "College commits" },
  { value: 4.9, decimals: 1, suffix: "/5", label: "Family rating" },
  { value: 15, suffix: "+", label: "Seasons coaching" },
];

export default function Home() {
  const { records, loading, error } = useProgramRecords();
  const totals = programTotals(records);
  const liveWinPct = !loading && !error && records.length > 0 ? Math.round(totals.pct * 100) : null;

  return (
    <div>
      {/* ── Hero ── */}
      <section className="hero-navy relative overflow-hidden text-white">
        <div className="container grid items-center gap-12 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-28">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <Pill icon={Sparkles} onDark>{BRAND.region}</Pill>
              <NextGameChip date={NEXT_GAME} />
            </div>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.03] tracking-tight sm:text-6xl xl:text-7xl">
              {BRAND.tagline}
            </h1>
            <p className="mt-5 max-w-xl text-lg text-white/70">{BRAND.subtag}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer" className={btnGold}>
                Join the program <ArrowRight className="h-4 w-4" />
              </a>
              <Link href="/programs" className={btnGhostDark}>Explore programs</Link>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/60">
              <span className="flex items-center gap-1.5"><Star className="h-4 w-4 fill-gold-light text-gold-light" /> 4.9/5 family rating</span>
              <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-gold-light" /> SafeSport certified</span>
              <span className="flex items-center gap-1.5"><Sparkles className="h-4 w-4 text-gold-light" /> Powered by Aster Sports</span>
            </div>
          </div>

          <div className="relative mx-auto flex aspect-[3/4] w-full max-w-sm items-center justify-center overflow-hidden rounded-2xl border border-border bg-[#151525] p-10 shadow-md lg:max-w-md">
            <img
              src="/aster-mark.png"
              alt="Aster Sports AAU"
              className="w-2/3 max-w-[260px]"
              loading="eager"
            />
          </div>
        </div>

        {/* Metrics band */}
        <div className="container pb-10">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {PROGRAM_METRICS.map((m) => (
              <StatTile
                key={m.label}
                value={m.label === "Win rate" && liveWinPct != null ? liveWinPct : m.value}
                label={m.label}
                suffix={m.suffix}
                prefix={m.prefix}
                decimals={m.decimals}
                onDark
              />
            ))}
          </div>
        </div>

        {/* Credibility strip */}
        <div className="container pb-16">
          <CredibilityStrip />
        </div>
      </section>

      {/* ── Services ── */}
      <Section>
        <ScrollReveal>
          <SectionHeading
            eyebrow="Every path to the next level"
            title="One program. Every way to train."
            subtitle="From first-time campers to college-bound prospects — there's a lane for every athlete, all on one platform."
            action={{ href: "/programs", label: "All programs" }}
          />
        </ScrollReveal>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <ScrollReveal key={s.key} delay={i * 60}>
              <ServiceCard s={s} compact />
            </ScrollReveal>
          ))}
        </div>
      </Section>

      {/* ── Find your program ── */}
      <Section tone="muted">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Find your program"
            title="Not sure where to start? Let's match you."
            subtitle="Tell us the athlete's age and what they're chasing — we'll point you to the best-fit program."
          />
        </ScrollReveal>
        <ScrollReveal delay={80}>
          <ProgramFinder />
        </ScrollReveal>
      </Section>

      {/* ── Why Aster vs. a typical rec league ── */}
      <Section>
        <ScrollReveal>
          <SectionHeading
            eyebrow="The difference"
            title="Why Aster, not a typical rec league."
            subtitle="Same court. A completely different standard of development, communication and care."
          />
        </ScrollReveal>
        <ScrollReveal delay={80}>
          <ComparisonTable />
        </ScrollReveal>
      </Section>

      {/* ── Outcomes band ── */}
      <Section tone="muted">
        <ScrollReveal>
          <SectionHeading
            eyebrow="The results"
            title="Development you can measure."
          />
        </ScrollReveal>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {OUTCOMES.map((o, i) => (
            <ScrollReveal key={o.label} delay={i * 60}>
              <StatTile value={o.value} label={o.label} suffix={o.suffix} decimals={o.decimals} />
            </ScrollReveal>
          ))}
        </div>
      </Section>

      {/* ── App + Hub services ── */}
      <Section tone="muted">
        <SectionHeading
          eyebrow="The Aster hub"
          title="Everything your family needs, in one app."
          subtitle="Schedule, weather, messaging, payments, film and live metrics — the tools that make the season effortless."
        />
        <AppHub />
      </Section>

      {/* ── Game-day weather + next game ── */}
      <Section tone="muted">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Game-day, handled"
              title="Never get caught by the weather again."
              subtitle="Live forecasts for every gym and court, pushed to your phone before tip-off — part of the Aster hub."
            />
            <Link href="/dashboard" className={btnNavy}>
              Open the dashboard <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <WeatherStrip />
        </div>
      </Section>

      {/* ── Highlights ── */}
      <Section>
        <SectionHeading
          eyebrow="The film room"
          title="Every big moment, saved & shareable."
          subtitle="Game-winners, top plays and training breakdowns — streamed live and stored in your family film room."
          action={{ href: "/highlights", label: "All highlights" }}
        />
        <HighlightsReel limit={3} />
      </Section>

      {/* ── How it works ── */}
      <Section tone="muted">
        <SectionHeading eyebrow="How it works" title="From sign-up to standout in four steps." />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {JOURNEY.map((step, i) => (
            <ScrollReveal key={step.n} delay={i * 60}>
              <div className="relative rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                <span className="font-display text-5xl font-extrabold text-gold/30">{step.n}</span>
                <h3 className="mt-2 font-bold text-foreground">{step.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Section>

      {/* ── Locations teaser ── */}
      <Section>
        <ScrollReveal>
          <SectionHeading
            eyebrow="Where we play"
            title="Gyms across the tri-state."
            subtitle="Home courts, tournament sites and training facilities — with directions in your pocket."
          />
        </ScrollReveal>
        <ScrollReveal delay={80}>
          <LocationsTeaser />
        </ScrollReveal>
      </Section>

      {/* ── Testimonials ── */}
      <Section tone="muted">
        <SectionHeading eyebrow="Families & partners" title="Trusted across Westchester." />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <ScrollReveal key={t.name} delay={i * 60}>
              <TestimonialCard t={t} />
            </ScrollReveal>
          ))}
        </div>
      </Section>

      {/* ── FAQ ── */}
      <Section>
        <ScrollReveal>
          <SectionHeading
            eyebrow="Good to know"
            title="Questions, answered."
            subtitle="The things families ask us most before their first season."
          />
        </ScrollReveal>
        <ScrollReveal delay={80}>
          <FaqAccordion />
        </ScrollReveal>
      </Section>

      {/* ── Interest capture ── */}
      <Section tone="muted">
        <ScrollReveal>
          <InterestCapture />
        </ScrollReveal>
      </Section>

      {/* ── Final CTA ── */}
      <section className="relative overflow-hidden border-t border-gold/20 bg-gradient-to-b from-gold-soft to-background">
        <span className="watermark left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">ASTER</span>
        <div className="container relative grid place-items-center py-20 text-center">
          <Logo className="h-16 w-16" />
          <h2 className="mt-5 max-w-2xl text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Build your athlete's best season yet.
          </h2>
          <p className="mt-4 max-w-lg text-lg text-muted-foreground">
            Tryouts, camps and 1:1 sessions are filling fast. Claim your spot in minutes.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer" className={btnGold}>
              Register now <ArrowRight className="h-4 w-4" />
            </a>
            <Link href="/programs" className={btnGhostLight}>Compare programs</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
