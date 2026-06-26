/*
 * Mission & History — clean & light. Copy carried over from the prior site
 * (operator to confirm the historical specifics).
 */
import { Award, BookOpen, Heart, Users } from "lucide-react";

const values = [
  { icon: Award, title: "Excellence over participation", desc: "We don't hand out trophies for showing up. Every accolade is earned through effort, improvement, and competitive results." },
  { icon: BookOpen, title: "Teaching-first philosophy", desc: "Founded by a Master's-level educator, every session is designed with intentional pedagogy — not just basketball drills." },
  { icon: Heart, title: "Character development", desc: "Basketball is the vehicle. Discipline, accountability, teamwork, and resilience are the destination." },
  { icon: Users, title: "Family partnership", desc: "Parents aren't spectators — they're partners. Open communication, shared expectations, mutual accountability." },
];

const timeline = [
  { year: "2022", title: "Founded", desc: "Legacy Hoopers launches with a single 10U team in Westchester County." },
  { year: "2023", title: "Expansion", desc: "Program grows to three teams (8U, 9U, 10U). First AAU tournament appearances." },
  { year: "2024", title: "Girls program", desc: "11U Girls team added — five teams competing across multiple circuits." },
  { year: "2025", title: "Academy model", desc: "Full academy structure: development labs, film review, and the Aster Sports platform." },
];

export default function Mission() {
  return (
    <div>
      <section className="border-b border-border bg-gradient-to-b from-secondary/50 to-background">
        <div className="container py-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">Our purpose</span>
          <h1 className="mt-3 max-w-3xl text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Our mission &amp; history
          </h1>
          <p className="mt-4 max-w-xl text-lg text-muted-foreground">
            Building complete basketball players and complete young people — one rep, one lesson, one season at a time.
          </p>
        </div>
      </section>

      <section className="container py-14">
        <blockquote className="mx-auto max-w-3xl border-l-4 border-primary pl-6 text-xl font-semibold leading-snug text-foreground sm:text-2xl">
          "We exist to develop elite basketball players through teaching-first coaching, structured
          competition, and uncompromising standards — preparing young athletes for the next level of the
          game and life."
          <footer className="mt-3 text-sm font-normal text-muted-foreground">— Coach Kenny, Founder</footer>
        </blockquote>
      </section>

      <section className="container pb-14">
        <h2 className="mb-6 text-2xl font-extrabold tracking-tight text-foreground">Core values</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {values.map((v) => (
            <div key={v.title} className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                  <v.icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-bold text-foreground">{v.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{v.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-secondary/30">
        <div className="container py-14">
          <h2 className="mb-8 text-2xl font-extrabold tracking-tight text-foreground">Our timeline</h2>
          <div className="mx-auto max-w-2xl space-y-6">
            {timeline.map((t) => (
              <div key={t.year} className="flex gap-5">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 border-primary text-sm font-extrabold text-primary">
                  '{t.year.slice(2)}
                </div>
                <div className="pt-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-extrabold text-primary">{t.year}</span>
                    <span className="font-bold text-foreground">{t.title}</span>
                  </div>
                  <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-14">
        <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-8 shadow-sm">
          <h2 className="text-2xl font-extrabold tracking-tight text-foreground">Why Legacy?</h2>
          <div className="mt-5 space-y-4 leading-relaxed text-muted-foreground">
            <p>
              Most youth basketball programs are glorified rec leagues with matching jerseys — participation
              over development, equal time over earned minutes, parent satisfaction over player growth.
            </p>
            <p>
              <span className="font-semibold text-foreground">Legacy Hoopers is different.</span> We operate as
              an academy — with standards, structure, and accountability that mirror the best high school and
              college programs in the country.
            </p>
            <p>
              Our founder is a Master's-level educator who designs every practice with intentional pedagogy. Our
              staff don't just run drills — they teach concepts, develop basketball IQ, and build complete
              players who can think the game.
            </p>
            <p>
              The result? Players who don't just win games — they understand <span className="font-semibold text-foreground">why</span> they
              win, and carry a foundation that separates them long after they move on.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
