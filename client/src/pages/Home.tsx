/*
 * DESIGN: Court Noir — Cinematic Sports Editorial
 * Dark canvas, electric cobalt accents, Barlow Condensed display type
 * Scroll-triggered reveals, watermark typography, glow-line accents
 */
import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Trophy, Target, Users, Zap, ChevronRight, MapPin, Star } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663756289268/nRxkftmdkigy3rgqBRonRk/hero-main-haWcuXqCFTmVn83zSjde9V.webp";
const ACADEMY_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663756289268/nRxkftmdkigy3rgqBRonRk/hero-academy-NCSGX238WLGJTTJZgPTK9y.webp";

const stats = [
  { value: "5", label: "Teams", color: "text-cobalt" },
  { value: "60+", label: "Players", color: "text-white" },
  { value: "7", label: "Tournaments", color: "text-gold" },
  { value: "85%", label: "Win Rate", color: "text-success" },
];

const differentiators = [
  {
    icon: <Target className="w-6 h-6" />,
    title: "Teaching-First Coaching",
    description: "Every session is structured by a Master's-level educator who differentiates instruction based on each player's learning style.",
    accent: "border-cobalt",
  },
  {
    icon: <Trophy className="w-6 h-6" />,
    title: "Competitive Excellence",
    description: "AAU circuits and league play provide real competition. Our 85% win rate proves the system works at the highest level.",
    accent: "border-gold",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Small Rosters, Big Impact",
    description: "Maximum 10 players per team ensures every athlete gets meaningful reps, personal attention, and game minutes.",
    accent: "border-success",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "90-Minute Development Labs",
    description: "Structured practice blocks covering skill work, game concepts, live play, and film review — not just scrimmages.",
    accent: "border-cobalt-light",
  },
];

const testimonials = [
  {
    quote: "My son has grown more in 6 months with Legacy Hoopers than 3 years in rec leagues. The coaching is on another level.",
    author: "Parent — 10U Black",
  },
  {
    quote: "Coach Kenny doesn't just teach basketball. He teaches discipline, accountability, and how to compete with class.",
    author: "Parent — 11U Girls",
  },
  {
    quote: "The communication, organization, and development plan for each kid is unlike anything we've experienced in youth sports.",
    author: "Parent — 9U",
  },
];

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const diffRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance
      gsap.from(".hero-tag", { opacity: 0, y: 20, duration: 0.6, delay: 0.2 });
      gsap.from(".hero-title", { opacity: 0, y: 30, duration: 0.8, delay: 0.4 });
      gsap.from(".hero-desc", { opacity: 0, y: 20, duration: 0.6, delay: 0.7 });
      gsap.from(".hero-cta", { opacity: 0, y: 20, duration: 0.6, delay: 0.9 });

      // Stats count-up
      gsap.from(".stat-item", {
        scrollTrigger: { trigger: statsRef.current, start: "top 85%" },
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.5,
      });

      // Differentiators
      gsap.from(".diff-card", {
        scrollTrigger: { trigger: diffRef.current, start: "top 80%" },
        opacity: 0,
        y: 30,
        stagger: 0.12,
        duration: 0.6,
      });

      // Testimonials
      gsap.from(".test-card", {
        scrollTrigger: { trigger: testimonialsRef.current, start: "top 80%" },
        opacity: 0,
        y: 30,
        stagger: 0.15,
        duration: 0.6,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[100vh] flex items-end overflow-hidden pb-20">
        {/* Background Image */}
        <img
          src={HERO_IMG}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-arena/40 via-arena/70 to-arena" />

        {/* Watermark */}
        <span className="watermark top-1/2 -translate-y-1/2 right-[-5%]">LEGACY</span>

        {/* Content */}
        <div className="relative z-10 container pt-24">
          <div className="max-w-3xl">
            <div className="hero-tag inline-block px-4 py-1.5 bg-cobalt/20 border border-cobalt/40 rounded-full mb-6">
              <span className="font-display font-700 text-xs uppercase tracking-widest text-cobalt">
                Spring / Summer 2025
              </span>
            </div>

            <h1 className="hero-title font-display font-800 text-5xl md:text-7xl lg:text-8xl uppercase leading-[0.9] text-white mb-6">
              Five Teams.<br />
              <span className="text-cobalt">One Standard.</span><br />
              Zero Shortcuts.
            </h1>

            <p className="hero-desc text-lg md:text-xl text-white/70 max-w-xl mb-8 leading-relaxed">
              Westchester's elite youth basketball development program.
              Built by educators. Proven by results. Defined by standards no one else will hold.
            </p>

            <div className="hero-cta flex flex-wrap gap-4">
              <a
                href="https://www.legacyhoopers.org/register"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-cobalt text-white font-display font-800 text-sm uppercase tracking-wider rounded-lg shadow-xl shadow-cobalt/30 hover:bg-cobalt-light hover:shadow-cobalt/50 transition-all duration-200 hover:-translate-y-0.5"
              >
                See the Program <ChevronRight className="w-4 h-4" />
              </a>
              <Link
                href="/records"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/20 text-white font-display font-800 text-sm uppercase tracking-wider rounded-lg hover:bg-white/5 hover:border-white/40 transition-all duration-200"
              >
                View Records
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stat Bar */}
      <div ref={statsRef} className="relative bg-navy border-b-[3px] border-cobalt">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="stat-item text-center py-5 md:py-6 border-r border-white/5 last:border-r-0"
              >
                <span className={`block font-display font-800 text-3xl md:text-4xl ${stat.color} stat-glow`}>
                  {stat.value}
                </span>
                <span className="block font-display font-700 text-[10px] uppercase tracking-[0.15em] text-cobalt-light mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* What Makes Us Different */}
      <section ref={diffRef} className="py-24 md:py-32 relative overflow-hidden">
        <span className="watermark top-10 left-[-5%]">ELITE</span>
        <div className="container relative z-10">
          <div className="text-center mb-16">
            <span className="font-display font-700 text-xs uppercase tracking-[0.2em] text-cobalt mb-3 block">
              The Difference
            </span>
            <h2 className="font-display font-800 text-4xl md:text-5xl uppercase text-white">
              Not a Rec League.<br /><span className="text-cobalt">An Academy.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {differentiators.map((item, i) => (
              <div
                key={i}
                className={`diff-card bg-navy-light border border-white/5 border-l-4 ${item.accent} rounded-xl p-6 md:p-8 card-hover`}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-cobalt/10 rounded-lg text-cobalt flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-display font-800 text-lg uppercase text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Academy Preview Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <img
          src={ACADEMY_IMG}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-arena via-arena/90 to-arena/60" />
        <div className="container relative z-10">
          <div className="max-w-xl">
            <span className="font-display font-700 text-xs uppercase tracking-[0.2em] text-cobalt mb-3 block">
              Development System
            </span>
            <h2 className="font-display font-800 text-4xl md:text-5xl uppercase text-white mb-6">
              The 90-Minute<br /><span className="text-gold">Development Lab</span>
            </h2>
            <p className="text-white/60 text-base leading-relaxed mb-8">
              Every practice follows a structured 90-minute format designed by educators — not
              just coaches. Skill development, game concepts, live competition, and film review
              in every single session.
            </p>
            <Link
              href="/academy"
              className="inline-flex items-center gap-2 px-6 py-3 bg-cobalt/10 border border-cobalt/30 text-cobalt font-display font-700 text-sm uppercase tracking-wider rounded-lg hover:bg-cobalt/20 transition-all duration-200"
            >
              Academy Standards <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section ref={testimonialsRef} className="py-24 md:py-32 bg-navy relative overflow-hidden">
        <span className="watermark bottom-10 right-[-5%]">TRUST</span>
        <div className="container relative z-10">
          <div className="text-center mb-16">
            <span className="font-display font-700 text-xs uppercase tracking-[0.2em] text-cobalt mb-3 block">
              From Our Families
            </span>
            <h2 className="font-display font-800 text-4xl md:text-5xl uppercase text-white">
              Earned Trust.<br /><span className="text-cobalt">Real Results.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {testimonials.map((item, i) => (
              <div
                key={i}
                className="test-card bg-white/[0.03] border border-white/10 border-t-[3px] border-t-cobalt rounded-xl p-6 md:p-8 flex flex-col justify-between"
              >
                <div>
                  <div className="flex gap-1 text-gold mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="text-white/80 text-sm italic leading-relaxed mb-6">
                    "{item.quote}"
                  </p>
                </div>
                <span className="font-display font-800 text-xs uppercase tracking-wider text-cobalt">
                  {item.author}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Locations Preview */}
      <section className="py-24 md:py-32">
        <div className="container">
          <div className="text-center mb-12">
            <span className="font-display font-700 text-xs uppercase tracking-[0.2em] text-cobalt mb-3 block">
              Where We Train
            </span>
            <h2 className="font-display font-800 text-4xl md:text-5xl uppercase text-white">
              Three Home Courts
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: "Westchester Community Center", teams: "10U Black · 11U Girls", city: "White Plains, NY" },
              { name: "New Rochelle YMCA", teams: "9U · 8U", city: "New Rochelle, NY" },
              { name: "Ardsley Middle School", teams: "10U Blue", city: "Ardsley, NY" },
            ].map((loc, i) => (
              <Link
                key={i}
                href="/locations"
                className="group bg-navy-light border border-white/5 border-l-4 border-l-cobalt rounded-xl p-6 card-hover"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-cobalt/10 rounded-lg text-cobalt flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-800 text-base uppercase text-white group-hover:text-cobalt transition-colors">
                      {loc.name}
                    </h3>
                    <p className="text-white/40 text-xs mt-1">{loc.city}</p>
                    <p className="text-cobalt-light text-xs mt-2 font-600">{loc.teams}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-navy to-arena border-t border-cobalt/10">
        <div className="container text-center">
          <h2 className="font-display font-800 text-4xl md:text-6xl uppercase text-white mb-4">
            Ready to <span className="text-cobalt">Compete?</span>
          </h2>
          <p className="text-white/50 text-base max-w-md mx-auto mb-8">
            Registration is open for Spring/Summer 2025. Limited roster spots available.
          </p>
          <a
            href="https://www.legacyhoopers.org/register"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-10 py-5 bg-cobalt text-white font-display font-800 text-base uppercase tracking-wider rounded-lg shadow-2xl shadow-cobalt/30 hover:bg-cobalt-light hover:shadow-cobalt/50 transition-all duration-200 hover:-translate-y-1"
          >
            Register Now <ChevronRight className="w-5 h-5" />
          </a>
        </div>
      </section>
    </div>
  );
}
