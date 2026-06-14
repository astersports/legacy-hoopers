/*
 * DESIGN: Hybrid Dark/Light — Cinematic hero + readable info sections
 * Dark: hero, stat bar, championship wall, photo gallery, CTA
 * Light: differentiators, testimonials, locations, development lab
 */
import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Trophy, Target, Users, Zap, ChevronRight, MapPin, Star } from "lucide-react";
import LiveScoresBadge from "@/components/LiveScoresBadge";
import ThisWeekend from "@/components/ThisWeekend";
import { CURRENT_SEASON } from "@shared/season";

gsap.registerPlugin(ScrollTrigger);

const HERO_IMG = "/manus-storage/girls-drive_61b44d33.jpeg";
const ACADEMY_IMG = "/manus-storage/boys-rebound_d11067d2.jpeg";
const ACTION_PHOTOS = [
  { src: "/manus-storage/girls-drive_61b44d33.jpeg", alt: "11U Girls — Driving to the basket", label: "11U Girls" },
  { src: "/manus-storage/boys-rebound_d11067d2.jpeg", alt: "10U Boys — Boxing out for the rebound", label: "10U Black" },
  { src: "/manus-storage/girls-pass_43e337f0.jpeg", alt: "11U Girls — Finding the open teammate", label: "11U Girls" },
  { src: "/manus-storage/girls-triple-threat_8866dbbd.jpeg", alt: "11U Girls — Triple threat position", label: "11U Girls" },
  { src: "/manus-storage/girls-court-vision_85b7e4a7.jpeg", alt: "11U Girls — Court vision", label: "11U Girls" },
];

const stats = [
  { value: String(CURRENT_SEASON.teamCount), label: "Teams", color: "text-cobalt" },
  { value: String(CURRENT_SEASON.championships), label: "Championships", color: "text-gold" },
  { value: CURRENT_SEASON.playerCount, label: "Players", color: "text-white" },
  { value: String(CURRENT_SEASON.finalsAppearances), label: "Finals Appearances", color: "text-success" },
];

const differentiators = [
  {
    icon: <Target className="w-6 h-6" />,
    title: "Teaching-First Coaching",
    description: "Every session is structured by a Master's-level educator who differentiates instruction based on each player's learning style.",
    accent: "border-l-cobalt",
  },
  {
    icon: <Trophy className="w-6 h-6" />,
    title: "Competitive Excellence",
    description: "AAU circuits and league play provide real competition. 3 championships and 5 finals appearances this spring prove the system works at the highest level.",
    accent: "border-l-gold",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Small Rosters, Big Impact",
    description: "Maximum 10 players per team ensures every athlete gets meaningful reps, personal attention, and game minutes.",
    accent: "border-l-success",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "90-Minute Development Labs",
    description: "Structured practice blocks covering skill work, game concepts, live play, and film review — not just scrimmages.",
    accent: "border-l-cobalt-light",
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
      {/* ═══════════════ DARK: Hero Section ═══════════════ */}
      <section ref={heroRef} className="relative min-h-[100vh] flex items-end overflow-hidden pb-20">
        <img
          src={HERO_IMG}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-[70%_center] md:object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-arena/40 via-arena/70 to-arena" />
        <span className="watermark top-1/2 -translate-y-1/2 right-[-5%]">LEGACY</span>

        <div className="relative z-10 container pt-24">
          <div className="max-w-3xl">
            <div className="hero-tag inline-block px-4 py-1.5 bg-cobalt/20 border border-cobalt/40 rounded-full mb-6">
              <span className="font-display font-700 text-xs uppercase tracking-widest text-cobalt">
                Spring 2026 · 3 Championships
              </span>
            </div>

            <h1 className="hero-title font-display font-800 text-5xl md:text-7xl lg:text-8xl uppercase leading-[0.9] text-white mb-6">
              {CURRENT_SEASON.teamCount === 5 ? "Five" : String(CURRENT_SEASON.teamCount)} Teams.<br />
              <span className="text-cobalt">One Standard.</span><br />
              Zero Shortcuts.
            </h1>

            <p className="hero-desc text-lg md:text-xl text-white/70 max-w-xl mb-8 leading-relaxed">
              Westchester's elite youth basketball development program.
              Built by educators. Proven by results. Defined by standards no one else will hold.
            </p>

            <div className="hero-cta flex flex-wrap gap-4 items-center">
              <a
                href="https://legacyhoopers.leagueapps.com/camps/4945182-legacy-hoopers-prospective-player-interest-list"
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
              <LiveScoresBadge variant="compact" />
            </div>

            <div className="mt-6">
              <LiveScoresBadge variant="full" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ DARK: Stat Bar ═══════════════ */}
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

      {/* ═══════════════ DARK: This Weekend — Live Tournament ═══════════════ */}
      <ThisWeekend />

      {/* ═══════════════ DARK: Championship Wall ═══════════════ */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <span className="watermark top-1/2 -translate-y-1/2 right-[-5%]">HARDWARE</span>
        <div className="container relative z-10">
          <div className="text-center mb-12">
            <span className="font-display font-700 text-xs uppercase tracking-[0.2em] text-gold mb-3 block">
              Spring 2026 Hardware
            </span>
            <h2 className="font-display font-800 text-4xl md:text-5xl uppercase text-white">
              Championship <span className="text-gold">Wall</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-navy-light to-[#1a2f4a] border border-gold/30 rounded-xl p-6 text-center card-hover">
              <div className="text-4xl mb-3">🏆</div>
              <h3 className="font-display font-800 text-lg uppercase text-gold mb-1">Champions</h3>
              <p className="font-display font-700 text-sm text-white mb-2">ZG Chase for the Chain NY</p>
              <p className="text-white/50 text-xs">10U Boys Black</p>
              <p className="text-white/30 text-[10px] mt-2 uppercase tracking-wider">April 2026</p>
            </div>
            <div className="bg-gradient-to-br from-navy-light to-[#1a2f4a] border border-gold/30 rounded-xl p-6 text-center card-hover">
              <div className="text-4xl mb-3">🏆</div>
              <h3 className="font-display font-800 text-lg uppercase text-gold mb-1">Champions</h3>
              <p className="font-display font-700 text-sm text-white mb-2">ZG Rumble for the Ring CT</p>
              <p className="text-white/50 text-xs">10U Boys Black</p>
              <p className="text-white/30 text-[10px] mt-2 uppercase tracking-wider">May 2026</p>
            </div>
            <div className="bg-gradient-to-br from-navy-light to-[#1a2f4a] border border-gold/30 rounded-xl p-6 text-center card-hover">
              <div className="text-4xl mb-3">🏆</div>
              <h3 className="font-display font-800 text-lg uppercase text-gold mb-1">Champions</h3>
              <p className="font-display font-700 text-sm text-white mb-2">ZG Chase for the Chain NY</p>
              <p className="text-white/50 text-xs">11U Girls</p>
              <p className="text-white/30 text-[10px] mt-2 uppercase tracking-wider">April 2026</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="bg-navy-light border border-white/10 rounded-xl p-5 flex items-center gap-4 card-hover">
              <div className="text-3xl">🥈</div>
              <div>
                <h4 className="font-display font-800 text-sm uppercase text-white">Finalists — ZG Rumble for the Ring CT</h4>
                <p className="text-white/50 text-xs mt-0.5">11U Girls · May 2026</p>
              </div>
            </div>
            <div className="bg-navy-light border border-white/10 rounded-xl p-5 flex items-center gap-4 card-hover">
              <div className="text-3xl">🏅</div>
              <div>
                <h4 className="font-display font-800 text-sm uppercase text-white">Final Four — ZG National Finals MA</h4>
                <p className="text-white/50 text-xs mt-0.5">11U Girls · 3–0 Pool Play · May 2026</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ LIGHT: What Makes Us Different ═══════════════ */}
      <section ref={diffRef} className="section-light py-24 md:py-32 relative overflow-hidden">
        <span className="watermark top-10 left-[-5%]">ELITE</span>
        <div className="container relative z-10">
          <div className="text-center mb-16">
            <span className="font-display font-700 text-xs uppercase tracking-[0.2em] text-cobalt mb-3 block">
              The Difference
            </span>
            <h2 className="font-display font-800 text-4xl md:text-5xl uppercase text-light-text">
              Not a Rec League.<br /><span className="text-cobalt">An Academy.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {differentiators.map((item, i) => (
              <div
                key={i}
                className={`diff-card light-card border-l-4 ${item.accent} p-6 md:p-8`}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-cobalt/10 rounded-lg text-cobalt flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-display font-800 text-lg uppercase text-light-text mb-2">
                      {item.title}
                    </h3>
                    <p className="text-light-muted text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ DARK: Academy Preview (photo bg) ═══════════════ */}
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

      {/* ═══════════════ LIGHT: Testimonials ═══════════════ */}
      <section ref={testimonialsRef} className="section-light py-24 md:py-32 relative overflow-hidden">
        <span className="watermark bottom-10 right-[-5%]">TRUST</span>
        <div className="container relative z-10">
          <div className="text-center mb-16">
            <span className="font-display font-700 text-xs uppercase tracking-[0.2em] text-cobalt mb-3 block">
              From Our Families
            </span>
            <h2 className="font-display font-800 text-4xl md:text-5xl uppercase text-light-text">
              Earned Trust.<br /><span className="text-cobalt">Real Results.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {testimonials.map((item, i) => (
              <div
                key={i}
                className="test-card light-card border-t-[3px] border-t-cobalt p-6 md:p-8 flex flex-col justify-between"
              >
                <div>
                  <div className="flex gap-1 text-gold mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="text-light-muted text-sm italic leading-relaxed mb-6">
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

      {/* ═══════════════ LIGHT: Locations Preview ═══════════════ */}
      <section className="section-light py-24 md:py-32 border-t border-light-border">
        <div className="container">
          <div className="text-center mb-12">
            <span className="font-display font-700 text-xs uppercase tracking-[0.2em] text-cobalt mb-3 block">
              Where We Train
            </span>
            <h2 className="font-display font-800 text-4xl md:text-5xl uppercase text-light-text">
              Three Home Courts
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: "St. Patrick's", teams: "Skills Lab · Mondays", city: "Armonk, NY" },
              { name: "Rippowam Cisqua", teams: "All Teams · Tuesdays", city: "Bedford, NY" },
              { name: "Westchester CC (PEB)", teams: "All Teams · Wednesdays", city: "Valhalla, NY" },
            ].map((loc, i) => (
              <Link
                key={i}
                href="/locations"
                className="group light-card border-l-4 border-l-cobalt p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-cobalt/10 rounded-lg text-cobalt flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-800 text-base uppercase text-light-text group-hover:text-cobalt transition-colors">
                      {loc.name}
                    </h3>
                    <p className="text-light-muted text-xs mt-1">{loc.city}</p>
                    <p className="text-cobalt text-xs mt-2 font-600">{loc.teams}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ DARK: Action Gallery ═══════════════ */}
      <section className="py-24 md:py-32 bg-navy relative overflow-hidden">
        <span className="watermark top-10 left-[-5%] opacity-[0.03]">ACTION</span>
        <div className="container relative z-10">
          <div className="text-center mb-12">
            <span className="font-display font-700 text-xs uppercase tracking-[0.2em] text-cobalt mb-3 block">
              On The Court
            </span>
            <h2 className="font-display font-800 text-4xl md:text-5xl uppercase text-white">
              Game Day <span className="text-cobalt">Moments</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {ACTION_PHOTOS.map((photo, i) => (
              <div
                key={i}
                className={`relative overflow-hidden rounded-xl group ${
                  i === 0 ? "col-span-2 md:col-span-2 row-span-2" : ""
                }`}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover aspect-[4/3] group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="px-2 py-1 bg-cobalt/90 rounded text-white font-display font-700 text-[10px] uppercase tracking-wider">
                    {photo.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ DARK: CTA Section ═══════════════ */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-navy to-arena border-t border-cobalt/10">
        <div className="container text-center">
          <h2 className="font-display font-800 text-4xl md:text-6xl uppercase text-white mb-4">
            Ready to <span className="text-cobalt">Compete?</span>
          </h2>
          <p className="text-white/50 text-base max-w-md mx-auto mb-8">
            Spring 2026: 3 championships. 5 finals appearances. The standard has been set.
          </p>
          <a
            href="https://legacyhoopers.leagueapps.com/camps/4945182-legacy-hoopers-prospective-player-interest-list"
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
