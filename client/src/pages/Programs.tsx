/*
 * Programs — the services hub: camps, clinics, 1:1, AAU teams, small groups,
 * elite academy. Aspirational/cosmetic; checkout wires to Aster later.
 */
import { ArrowRight, Check, Users, Calendar, ClipboardCheck } from "lucide-react";
import { REGISTER_URL } from "@/lib/brand";
import { SERVICES, COACHES } from "@/lib/content";
import { Section, SectionHeading, Pill, btnGold, btnGhostDark } from "@/components/kit";
import { ServiceCard } from "@/components/ServiceCard";
import ScrollReveal from "@/components/ScrollReveal";

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

      <Section className="scroll-mt-20" >
        <div id="programs" />
        <SectionHeading
          eyebrow="Choose your program"
          title="Six programs. One standard."
          subtitle="Pricing shown is illustrative for this template — final plans configure per program."
        />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <ScrollReveal key={s.key} delay={i * 60}>
              <ServiceCard s={s} />
            </ScrollReveal>
          ))}
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading eyebrow="Always included" title="What every Aster athlete gets." />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {INCLUDED.map((it) => (
            <div key={it.title} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-gold-soft text-gold-text">
                <it.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-bold text-foreground">{it.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{it.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="The staff" title="Coaching that meets athletes where they are." />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {COACHES.map((c) => (
            <div key={c.name} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm">
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
          ))}
        </div>
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
