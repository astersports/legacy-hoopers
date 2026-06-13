/*
 * DESIGN: Court Noir — Coach Kenny Profile
 * Dark canvas, editorial layout, cobalt accents
 */
import { GraduationCap, Award, Heart, Target, ChevronRight } from "lucide-react";
import { Link } from "wouter";

const credentials = [
  { icon: <GraduationCap className="w-5 h-5" />, title: "Master's in Education", desc: "Differentiated instruction and learning theory applied to basketball development." },
  { icon: <Award className="w-5 h-5" />, title: "AAU Coaching Experience", desc: "Multiple seasons coaching competitive travel basketball at the highest youth levels." },
  { icon: <Heart className="w-5 h-5" />, title: "Teaching-First Approach", desc: "Every drill, every concept, every correction is rooted in educational best practices." },
  { icon: <Target className="w-5 h-5" />, title: "Player Development Focus", desc: "Individual growth plans for every athlete, tracking skill progression across seasons." },
];

const philosophy = [
  "Basketball is a vehicle for teaching life skills — discipline, accountability, and resilience.",
  "Every player deserves coaching that meets them where they are and pushes them forward.",
  "Competition reveals character. How you respond to adversity defines who you become.",
  "Parents are partners, not spectators. Alignment between home and court accelerates growth.",
  "There are no shortcuts. Development takes time, repetition, and intentional practice.",
];

export default function CoachKenny() {
  return (
    <div>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-navy via-arena to-arena" />
        <span className="watermark top-1/2 -translate-y-1/2 right-[-3%] opacity-[0.04]">COACH</span>
        <div className="container relative z-10">
          <span className="font-display font-700 text-xs uppercase tracking-[0.2em] text-cobalt mb-2 block">
            Program Leadership
          </span>
          <h1 className="font-display font-800 text-5xl md:text-7xl uppercase text-white leading-[0.9]">
            Coach<br /><span className="text-cobalt">Kenny</span>
          </h1>
          <p className="text-white/60 text-base mt-4 max-w-lg">
            Founder, Head Coach, and the driving force behind Legacy Hoopers' teaching-first philosophy.
          </p>
        </div>
      </section>

      {/* Bio Section */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Main Bio */}
            <div className="lg:col-span-3">
              <div className="bg-navy-light border border-white/5 rounded-2xl p-8 md:p-10">
                <h2 className="font-display font-800 text-2xl uppercase text-white mb-6">
                  The <span className="text-cobalt">Educator-Coach</span>
                </h2>
                <div className="space-y-5 text-white/70 text-base leading-relaxed">
                  <p>
                    Coach Kenny founded Legacy Hoopers with a simple conviction: youth basketball coaching should be held to the same standard as classroom teaching. With a <span className="text-white font-600">Master's degree in Education</span>, he brings pedagogical expertise that most youth coaches simply don't have.
                  </p>
                  <p>
                    His approach is rooted in <span className="text-cobalt font-600">differentiated instruction</span> — the same methodology used by the best teachers in the country. Every player receives coaching tailored to their learning style, skill level, and developmental stage.
                  </p>
                  <p>
                    Before founding Legacy Hoopers, Coach Kenny spent years studying what separates elite development programs from recreational leagues. The answer wasn't talent — it was <span className="text-gold font-600">structure, accountability, and intentional teaching</span>.
                  </p>
                  <p>
                    That's what Legacy Hoopers delivers. Not a rec league with better jerseys. A genuine academy where every minute of practice time is designed, every player's growth is tracked, and every family is held to the same standard of commitment.
                  </p>
                </div>
              </div>
            </div>

            {/* Credentials Sidebar */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="font-display font-800 text-sm uppercase tracking-wider text-cobalt mb-4">
                Credentials
              </h3>
              {credentials.map((c, i) => (
                <div key={i} className="bg-navy-light border border-white/5 rounded-xl p-5 card-hover">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-cobalt/10 rounded-lg text-cobalt flex-shrink-0">{c.icon}</div>
                    <div>
                      <h4 className="font-display font-800 text-sm uppercase text-white mb-1">{c.title}</h4>
                      <p className="text-white/50 text-xs leading-relaxed">{c.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Coaching Philosophy */}
      <section className="py-20 md:py-28 bg-navy border-y border-cobalt/10 relative overflow-hidden">
        <span className="watermark bottom-10 left-[-5%] opacity-[0.03]">PHILOSOPHY</span>
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <span className="font-display font-700 text-xs uppercase tracking-[0.2em] text-cobalt mb-3 block">Beliefs</span>
              <h2 className="font-display font-800 text-4xl md:text-5xl uppercase text-white">
                Coaching <span className="text-cobalt">Philosophy</span>
              </h2>
            </div>
            <div className="space-y-4">
              {philosophy.map((p, i) => (
                <div key={i} className="flex items-start gap-4 bg-white/[0.03] border border-white/5 rounded-xl p-5">
                  <span className="font-display font-800 text-cobalt text-lg flex-shrink-0 w-8">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-white/70 text-sm leading-relaxed pt-0.5">{p}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="container text-center">
          <h2 className="font-display font-800 text-3xl md:text-5xl uppercase text-white mb-4">
            Experience the <span className="text-cobalt">Difference</span>
          </h2>
          <p className="text-white/50 text-sm max-w-md mx-auto mb-8">
            See firsthand how teaching-first coaching transforms young athletes.
          </p>
          <a
            href="https://www.legacyhoopers.org/register"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-cobalt text-white font-display font-800 text-sm uppercase tracking-wider rounded-lg shadow-xl shadow-cobalt/30 hover:bg-cobalt-light transition-all duration-200 hover:-translate-y-0.5"
          >
            Join the Program <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </div>
  );
}
