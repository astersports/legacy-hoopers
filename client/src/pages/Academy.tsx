/*
 * DESIGN: Court Noir — Academy Standards
 * Program policies, player journey, 90-minute lab structure
 */
import { Link } from "wouter";
import { Shield, Clock, BookOpen, Users, ChevronRight, AlertTriangle, CheckCircle } from "lucide-react";

const HERO_IMG = "/manus-storage/knight-full-light_2dd8fe4f.jpeg";

const policies = [
  { icon: <Clock className="w-5 h-5" />, title: "Attendance", desc: "2+ unexcused absences per month triggers roster review. Commitment is non-negotiable.", accent: "border-cobalt" },
  { icon: <Shield className="w-5 h-5" />, title: "Conduct", desc: "Zero tolerance for disrespect — to coaches, teammates, opponents, or officials.", accent: "border-gold" },
  { icon: <AlertTriangle className="w-5 h-5" />, title: "Punctuality", desc: "Players must arrive 10 minutes before start time, dressed and ready to work.", accent: "border-destructive" },
];

const labBlocks = [
  { time: "0–20 min", title: "Skill Development", desc: "Individual fundamentals — ball handling, footwork, shooting mechanics. Differentiated by skill level." },
  { time: "20–40 min", title: "Game Concepts", desc: "Team offense/defense installation. Spacing, reads, rotations. Whiteboard to court." },
  { time: "40–70 min", title: "Live Competition", desc: "5v5 and situational scrimmages with coaching stoppages. Game-speed reps with real feedback." },
  { time: "70–90 min", title: "Film & Review", desc: "Breakdown of practice performance. What worked, what didn't. Accountability in real-time." },
];

const journey = [
  { step: "1", title: "Tryout", desc: "Open evaluation for skill, coachability, and competitive drive." },
  { step: "2", title: "Placement", desc: "Assigned to the right team based on age, skill, and development stage." },
  { step: "3", title: "Development", desc: "90-minute labs, tournament play, and individualized coaching plans." },
  { step: "4", title: "Compete", desc: "AAU circuits, league games, and championship-level tournaments." },
];

export default function Academy() {
  return (
    <div>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <img src={HERO_IMG} alt="" className="absolute inset-0 w-full h-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-b from-arena/50 to-arena" />
        <span className="watermark top-1/2 -translate-y-1/2 right-[-3%] opacity-[0.04]">STANDARDS</span>
        <div className="container relative z-10">
          <span className="font-display font-700 text-xs uppercase tracking-[0.2em] text-cobalt mb-2 block">
            Program Framework
          </span>
          <h1 className="font-display font-800 text-5xl md:text-7xl uppercase text-white leading-[0.9]">
            Academy<br /><span className="text-cobalt">Standards</span>
          </h1>
          <p className="text-white/60 text-base mt-4 max-w-lg">
            The expectations, structure, and development system that define every Legacy Hooper.
          </p>
        </div>
      </section>

      {/* Stat Bar */}
      <div className="bg-navy-light border-y border-cobalt/15">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {[
              { value: "90", label: "Min Sessions" },
              { value: "10", label: "Max Roster" },
              { value: "4", label: "Lab Blocks" },
              { value: "100%", label: "Accountability" },
            ].map((stat, i) => (
              <div key={i} className="text-center py-5 border-r border-white/5 last:border-r-0">
                <span className="block font-display font-800 text-3xl text-white stat-glow">{stat.value}</span>
                <span className="block font-display font-700 text-[10px] uppercase tracking-[0.12em] text-cobalt-light mt-1">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Policies */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="text-center mb-14">
            <span className="font-display font-700 text-xs uppercase tracking-[0.2em] text-cobalt mb-3 block">Core Policies</span>
            <h2 className="font-display font-800 text-4xl md:text-5xl uppercase text-white">
              Non-Negotiable <span className="text-cobalt">Standards</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {policies.map((p, i) => (
              <div key={i} className={`bg-navy-light border border-white/5 border-l-4 ${p.accent} rounded-xl p-6 card-hover`}>
                <div className="p-2.5 bg-cobalt/10 rounded-lg text-cobalt inline-flex mb-4">{p.icon}</div>
                <h3 className="font-display font-800 text-base uppercase text-white mb-2">{p.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Player Journey */}
      <section className="py-20 md:py-28 bg-navy border-y border-cobalt/10">
        <div className="container">
          <div className="text-center mb-14">
            <span className="font-display font-700 text-xs uppercase tracking-[0.2em] text-cobalt mb-3 block">Player Path</span>
            <h2 className="font-display font-800 text-4xl md:text-5xl uppercase text-white">
              The <span className="text-cobalt">Journey</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {journey.map((j, i) => (
              <div key={i} className="text-center relative">
                <div className="w-12 h-12 rounded-full bg-cobalt text-white font-display font-800 text-lg flex items-center justify-center mx-auto mb-4 shadow-lg shadow-cobalt/30">
                  {j.step}
                </div>
                <h3 className="font-display font-800 text-base uppercase text-white mb-2">{j.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{j.desc}</p>
                {i < journey.length - 1 && (
                  <ChevronRight className="hidden md:block absolute top-5 -right-3 w-6 h-6 text-cobalt/40" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 90-Minute Lab */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="text-center mb-14">
            <span className="font-display font-700 text-xs uppercase tracking-[0.2em] text-cobalt mb-3 block">Practice Structure</span>
            <h2 className="font-display font-800 text-4xl md:text-5xl uppercase text-white">
              The 90-Minute <span className="text-gold">Lab</span>
            </h2>
            <p className="text-white/50 text-base mt-4 max-w-lg mx-auto">
              Every practice follows this exact structure. No wasted time. No unstructured scrimmaging.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {labBlocks.map((block, i) => (
              <div key={i} className="bg-navy-light border border-white/5 rounded-xl p-6 card-hover">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-display font-800 text-xs uppercase tracking-wider text-white/80">{block.title}</span>
                  <span className="font-display font-700 text-xs text-cobalt">{block.time}</span>
                </div>
                <div className="h-0.5 bg-cobalt/30 rounded-full mb-3" />
                <p className="text-white/50 text-sm leading-relaxed">{block.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Code of Conduct */}
      <section className="py-20 md:py-28 bg-navy border-y border-cobalt/10">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Users className="w-5 h-5 text-cobalt" />
                <h3 className="font-display font-800 text-xl uppercase text-white">Player Expectations</h3>
              </div>
              <ul className="space-y-3">
                {["Arrive on time, ready to compete", "Respect all coaches, teammates, and opponents", "Give maximum effort in every drill and rep", "Accept coaching without excuses", "Represent Legacy Hoopers with class — on and off the court"].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-cobalt flex-shrink-0 mt-0.5" />
                    <span className="text-white/70 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="w-5 h-5 text-gold" />
                <h3 className="font-display font-800 text-xl uppercase text-white">Parent Expectations</h3>
              </div>
              <ul className="space-y-3">
                {["Support the coaching staff's decisions", "Communicate absences in advance via the app", "Keep sideline behavior positive and encouraging", "Trust the development process — results take time", "Model the accountability we teach your child"].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                    <span className="text-white/70 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="container text-center">
          <h2 className="font-display font-800 text-3xl md:text-5xl uppercase text-white mb-4">
            Meet the <span className="text-cobalt">Standard?</span>
          </h2>
          <p className="text-white/50 text-sm max-w-md mx-auto mb-8">
            If this resonates with your family's values, we'd love to have you.
          </p>
          <a
            href="https://legacyhoopers.leagueapps.com/camps/4945182-legacy-hoopers-prospective-player-interest-list"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-cobalt text-white font-display font-800 text-sm uppercase tracking-wider rounded-lg shadow-xl shadow-cobalt/30 hover:bg-cobalt-light transition-all duration-200 hover:-translate-y-0.5"
          >
            Register Now <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </div>
  );
}
