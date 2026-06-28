/*
 * Home — flagship Aster AAU landing. Aspirational, dynamic, every service in
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
            <Pill icon={Sparkles} onDark>{BRAND.region}</Pill>
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

          <div className="relative mx-auto grid w-full max-w-md place-items-center">
            <div className="absolute h-72 w-72 rounded-full bg-gold/20 blur-3xl" aria-hidden />
            <Logo className="relative h-60 w-60 drop-shadow-[0_8px_40px_rgba(201,149,46,0.4)] sm:h-72 sm:w-72" />
          </div>
        </div>

        {/* Metrics band */}
        <div className="container pb-16">
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
          {JOURNEY.map((step) => (
            <div key={step.n} className="relative rounded-2xl border border-border bg-card p-6 shadow-sm">
              <span className="font-display text-5xl font-extrabold text-gold/30">{step.n}</span>
              <h3 className="mt-2 font-bold text-foreground">{step.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Testimonials ── */}
      <Section>
        <SectionHeading eyebrow="Families & partners" title="Trusted across Westchester." />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="flex gap-0.5 text-gold">
                {[0, 1, 2, 3, 4].map((i) => <Star key={i} className="h-4 w-4 fill-gold text-gold" />)}
              </div>
              <blockquote className="mt-3 flex-1 text-[15px] leading-relaxed text-foreground">"{t.quote}"</blockquote>
              <figcaption className="mt-4 text-sm">
                <span className="font-bold text-foreground">{t.name}</span>
                <span className="block text-muted-foreground">{t.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
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
