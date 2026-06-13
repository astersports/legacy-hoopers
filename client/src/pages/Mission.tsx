/*
 * DESIGN: Court Noir — Mission & History
 * Dark canvas, cinematic editorial, cobalt accents
 */
import { Heart, Award, BookOpen, Users } from "lucide-react";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663756289268/nRxkftmdkigy3rgqBRonRk/hero-mission-MmroeaNZoUEVjqzZwKTkHB.webp";

const values = [
  { icon: <Award className="w-6 h-6" />, title: "Excellence Over Participation", desc: "We don't hand out trophies for showing up. Every accolade is earned through effort, improvement, and competitive results." },
  { icon: <BookOpen className="w-6 h-6" />, title: "Teaching-First Philosophy", desc: "Founded by a Master's-level educator, every session is designed with intentional pedagogy — not just basketball drills." },
  { icon: <Heart className="w-6 h-6" />, title: "Character Development", desc: "Basketball is the vehicle. Discipline, accountability, teamwork, and resilience are the destination." },
  { icon: <Users className="w-6 h-6" />, title: "Family Partnership", desc: "Parents aren't spectators — they're partners. Open communication, shared expectations, and mutual accountability." },
];

const timeline = [
  { year: "2022", title: "Founded", desc: "Coach Kenny launches Legacy Hoopers with a single 10U team in Westchester County." },
  { year: "2023", title: "Expansion", desc: "Program grows to three teams (8U, 9U, 10U). First AAU tournament appearances." },
  { year: "2024", title: "Girls Program", desc: "11U Girls team added. Five total teams competing across multiple circuits." },
  { year: "2025", title: "Academy Model", desc: "Full academy structure with 90-minute development labs, film review, and the Aster Sports platform." },
];

export default function Mission() {
  return (
    <div>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <img src={HERO_IMG} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-arena/50 to-arena" />
        <span className="watermark top-1/2 -translate-y-1/2 left-[-3%] opacity-[0.04]">MISSION</span>
        <div className="container relative z-10">
          <span className="font-display font-700 text-xs uppercase tracking-[0.2em] text-cobalt mb-2 block">
            Our Purpose
          </span>
          <h1 className="font-display font-800 text-5xl md:text-7xl uppercase text-white leading-[0.9]">
            Our Mission<br /><span className="text-cobalt">& History</span>
          </h1>
          <p className="text-white/60 text-base mt-4 max-w-lg">
            Building complete basketball players and complete young people — one rep, one lesson, one season at a time.
          </p>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 md:py-28 bg-navy border-y border-cobalt/10">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="glow-line mb-10 mx-auto w-24" />
            <blockquote className="font-display font-800 text-2xl md:text-3xl uppercase text-white leading-snug mb-6">
              "We exist to develop elite basketball players through
              <span className="text-cobalt"> teaching-first coaching</span>,
              structured competition, and
              <span className="text-gold"> uncompromising standards</span>
              — preparing young athletes for the next level of the game and life."
            </blockquote>
            <p className="text-white/50 text-sm">— Coach Kenny, Founder</p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="text-center mb-14">
            <span className="font-display font-700 text-xs uppercase tracking-[0.2em] text-cobalt mb-3 block">Foundation</span>
            <h2 className="font-display font-800 text-4xl md:text-5xl uppercase text-white">
              Core <span className="text-cobalt">Values</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {values.map((v, i) => (
              <div key={i} className="bg-navy-light border border-white/5 border-l-4 border-l-cobalt rounded-xl p-6 card-hover">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-cobalt/10 rounded-lg text-cobalt flex-shrink-0">{v.icon}</div>
                  <div>
                    <h3 className="font-display font-800 text-base uppercase text-white mb-2">{v.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 md:py-28 bg-navy border-y border-cobalt/10 relative overflow-hidden">
        <span className="watermark top-10 right-[-5%] opacity-[0.03]">HISTORY</span>
        <div className="container relative z-10">
          <div className="text-center mb-14">
            <span className="font-display font-700 text-xs uppercase tracking-[0.2em] text-cobalt mb-3 block">Growth</span>
            <h2 className="font-display font-800 text-4xl md:text-5xl uppercase text-white">
              Our <span className="text-gold">Timeline</span>
            </h2>
          </div>
          <div className="max-w-2xl mx-auto relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-cobalt/50 via-cobalt/20 to-transparent" />
            <div className="space-y-8">
              {timeline.map((t, i) => (
                <div key={i} className="flex gap-6 items-start">
                  <div className="w-12 h-12 rounded-full bg-cobalt/20 border-2 border-cobalt flex items-center justify-center flex-shrink-0 font-display font-800 text-xs text-cobalt">
                    {t.year.slice(2)}
                  </div>
                  <div className="pt-2">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-display font-800 text-cobalt text-sm">{t.year}</span>
                      <span className="font-display font-800 text-lg uppercase text-white">{t.title}</span>
                    </div>
                    <p className="text-white/50 text-sm leading-relaxed">{t.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What Sets Us Apart */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <span className="font-display font-700 text-xs uppercase tracking-[0.2em] text-cobalt mb-3 block">The Difference</span>
              <h2 className="font-display font-800 text-4xl md:text-5xl uppercase text-white">
                Why <span className="text-cobalt">Legacy?</span>
              </h2>
            </div>
            <div className="bg-navy-light border border-white/5 rounded-2xl p-8 md:p-10">
              <div className="space-y-6 text-white/70 text-base leading-relaxed">
                <p>
                  Most youth basketball programs are glorified rec leagues with matching jerseys. They prioritize participation over development, equal playing time over earned minutes, and parent satisfaction over player growth.
                </p>
                <p>
                  <span className="text-white font-600">Legacy Hoopers is different.</span> We operate as an academy — with standards, structure, and accountability that mirror the best high school and college programs in the country.
                </p>
                <p>
                  Our founder is a <span className="text-cobalt font-600">Master's-level educator</span> who designs every practice session with intentional pedagogy. Our coaching staff doesn't just run drills — they teach concepts, develop basketball IQ, and build complete players who can think the game.
                </p>
                <p>
                  The result? Players who don't just win games — they understand <span className="text-gold font-600">why</span> they win. And when they move on to middle school, high school, and beyond, they carry a foundation that separates them from everyone else.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
