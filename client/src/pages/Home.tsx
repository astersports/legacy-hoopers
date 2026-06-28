/**
 * Aster Sports AAU — landing page.
 * Design: Celestial Cartography — dark constellation aesthetic, gold→orange
 * gradient, Space Grotesk display, animated starfield. Ported from the
 * astersports.io main page and adapted to the AAU program.
 * Self-contained chrome (own header + footer); rendered outside the light Layout.
 */
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "wouter";
import {
  ArrowRight, ArrowUpRight, MapPin, Menu, X, ChevronDown, Send, Mail,
  Dumbbell, CalendarDays, Trophy, Film, LayoutDashboard, Sparkles, Smartphone,
  UserPlus, BookOpen, Target, Users, type LucideIcon,
} from "lucide-react";
import { BRAND, REGISTER_URL } from "@/lib/brand";
import { JOURNEY } from "@/lib/content";

const LOGO_URL = BRAND.logo;
const DISPLAY = { fontFamily: "var(--font-space)" } as const;

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setIsVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, isVisible };
}

function StarAccent({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5L8 0Z" fill="url(#sg)" />
      <defs>
        <linearGradient id="sg" x1="8" y1="0" x2="8" y2="16" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F6CC55" /><stop offset="1" stopColor="#E0631C" />
        </linearGradient>
      </defs>
    </svg>
  );
}

type Status = "live" | "beta" | "soon";
const STATUS_META: Record<Status, { label: string; color: string }> = {
  live: { label: "Live", color: "#34d399" },
  beta: { label: "Beta", color: "#4a9fff" },
  soon: { label: "Coming soon", color: "#94a3b8" },
};

type Node = { name: string; tagline: string; href: string; icon: LucideIcon; status: Status; external?: boolean };
const NODES: Node[] = [
  { name: "Programs", tagline: "Camps · clinics · teams · 1:1", href: "/programs", icon: Dumbbell, status: "live" },
  { name: "Schedule", tagline: "Games, practices & tournaments", href: "/schedule", icon: CalendarDays, status: "live" },
  { name: "Records", tagline: "Every game on the record", href: "/records", icon: Trophy, status: "live" },
  { name: "Highlights", tagline: "AI film room & live stream", href: "/highlights", icon: Film, status: "live" },
  { name: "Dashboard", tagline: "Your athlete, tracked", href: "/dashboard", icon: LayoutDashboard, status: "live" },
  { name: "Aster AI", tagline: "Computer-vision film + insights", href: "/highlights", icon: Sparkles, status: "beta" },
  { name: "Family App", tagline: "Schedule, RSVPs & messaging", href: REGISTER_URL, icon: Smartphone, status: "soon", external: true },
  { name: "Register", tagline: "Tryouts & interest list", href: REGISTER_URL, icon: UserPlus, status: "live", external: true },
];

const PILLARS = [
  { name: "Teaching-first coaching", desc: "Master-trained, SafeSport-certified coaches who explain the why behind every rep.", accent: "#F6CC55", icon: BookOpen },
  { name: "Real competition", desc: "AAU travel and league play — every game charted and on the record.", accent: "#4a9fff", icon: Trophy },
  { name: "Tracked development", desc: "Individual growth plans, film breakdowns, and live metrics per athlete.", accent: "#a78bfa", icon: Target },
  { name: "Family partnership", desc: "One app for schedule, weather, payments, and team messaging.", accent: "#34d399", icon: Users },
];

const FAQS = [
  { q: "What is Aster Sports AAU?", a: "A Westchester, NY youth basketball program — AAU travel teams, camps, clinics, small groups, and 1:1 training — run on the Aster Sports platform for live scores, records, film, and family tools." },
  { q: "What programs do you offer?", a: "AAU travel teams, multi-day skills camps, weekly clinics, 2–4 player small groups, private 1:1 training, and an invite-only Elite Academy. See the Programs page for details and pricing." },
  { q: "How do tryouts and registration work?", a: "Travel teams require a tryout; camps, clinics, and training are open registration. Join the interest list and you'll get tryout dates and one-tap checkout in the Aster app." },
  { q: "What ages do you serve?", a: "Grades 2–11, boys and girls, placed by age band and skill — not just birthday. Every athlete gets a development plan tracked across the season." },
  { q: "Where do you play and practice?", a: "Practices and home games are across Westchester County gyms; AAU travel runs the Zero Gravity circuit plus league play. Every venue has directions and game-day weather in the app." },
  { q: "How does billing work?", a: "Flexible plans with autopay and instant receipts in the Aster app — season fees for teams, per-session or block pricing for clinics and training." },
];

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = (
    <>
      {NODES.slice(0, 5).map((n) => (
        <Link key={n.name} href={n.href} onClick={() => setOpen(false)}
          className="text-sm text-slate-300 hover:text-[#F6CC55] transition-colors" style={DISPLAY}>
          {n.name}
        </Link>
      ))}
      <a href="#about" onClick={() => setOpen(false)} className="text-sm text-slate-300 hover:text-[#F6CC55] transition-colors" style={DISPLAY}>About</a>
      <a href="#faq" onClick={() => setOpen(false)} className="text-sm text-slate-300 hover:text-[#F6CC55] transition-colors" style={DISPLAY}>FAQ</a>
    </>
  );

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#0a0e1a]/90 backdrop-blur-xl border-b border-white/5" : "bg-transparent"}`}>
      <div className="container flex items-center justify-between h-16 md:h-20">
        <Link href="/" className="flex items-center gap-3">
          <img src={LOGO_URL} alt={BRAND.name} className="h-9 w-auto md:h-11" />
          <span className="text-lg md:text-xl font-semibold tracking-tight text-white" style={DISPLAY}>{BRAND.name}</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {navLinks}
          <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer"
            className="aster-grad-bg inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[#1a0e05] font-semibold text-sm transition-transform duration-150 hover:scale-[1.03] active:scale-[0.97]" style={DISPLAY}>
            <UserPlus className="w-4 h-4" /> Register
          </a>
        </nav>
        <button className="md:hidden p-2 text-white" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${open ? "max-h-[36rem] opacity-100" : "max-h-0 opacity-0"}`}>
        <nav className="container pt-2 pb-6 flex flex-col gap-4 bg-[#0a0e1a] border-b border-white/10 shadow-2xl">
          {navLinks}
          <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer"
            className="aster-grad-bg inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-[#1a0e05] font-semibold text-sm" style={DISPLAY} onClick={() => setOpen(false)}>
            <UserPlus className="w-4 h-4" /> Register
          </a>
        </nav>
      </div>
    </header>
  );
}

const STARS = [
  { top: "14%", left: "9%", tw: true }, { top: "8%", left: "30%", tw: true },
  { top: "22%", left: "52%", tw: true }, { top: "18%", left: "70%", tw: false },
  { top: "11%", left: "86%", tw: true }, { top: "34%", left: "20%", tw: false },
  { top: "40%", left: "78%", tw: false }, { top: "6%", left: "62%", tw: false },
  { top: "30%", left: "40%", tw: true }, { top: "26%", left: "92%", tw: false },
];

function HeroSection() {
  const { ref, isVisible } = useScrollReveal();
  const rise = `transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`;
  return (
    <section className="relative flex items-center overflow-hidden md:min-h-[100svh]">
      <div className="aster-sky" />
      <div className="aster-stars absolute inset-0" aria-hidden="true">
        {STARS.map((s, i) => <span key={i} className={s.tw ? "tw" : ""} style={{ top: s.top, left: s.left }} />)}
      </div>
      <img src={LOGO_URL} alt="" aria-hidden="true"
        className="aster-hero-logo hidden lg:block absolute right-4 xl:right-16 top-24 h-[300px] xl:h-[400px] w-auto opacity-90 pointer-events-none select-none" />
      <div className="container relative z-10 pt-24 pb-10 md:pt-28 md:pb-16" ref={ref}>
        <div className="max-w-2xl">
          <div className={`mb-3 ${rise}`}>
            <span className="aster-mono text-xs tracking-[0.32em] uppercase text-[#FBD56B]/85">
              Westchester, NY · AAU Basketball
            </span>
          </div>
          <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.02] tracking-tight text-white mb-4 delay-100 ${rise}`} style={DISPLAY}>
            The program your<br />athlete <span className="aster-grad-text">orbits.</span>
          </h1>
          <p className={`text-lg md:text-xl text-slate-300 max-w-xl leading-relaxed mb-6 delay-200 ${rise}`}>
            Camps, clinics, 1:1 training, and AAU travel teams — one complete youth basketball program, every surface charted on the Aster platform.
          </p>
          <div className={`flex flex-col sm:flex-row gap-4 mb-6 delay-300 ${rise}`}>
            <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer"
              className="aster-grad-bg inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-[#1a0e05] font-semibold text-base transition-transform duration-150 hover:scale-[1.03] active:scale-[0.97] shadow-lg shadow-[#E0631C]/20" style={DISPLAY}>
              Join the program <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#constellation"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-white/15 text-white font-medium text-base transition-all duration-200 hover:border-[#F6CC55]/40 hover:text-[#F6CC55]" style={DISPLAY}>
              Explore the constellation
            </a>
          </div>
          <div className={`flex items-center gap-2 text-slate-400 text-sm delay-500 ${rise}`}>
            <MapPin className="w-4 h-4 text-[#F6CC55]/60" /> <span>Based in Westchester, NY · {BRAND.region}</span>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-[#0a0e1a] to-transparent" />
    </section>
  );
}

function NodePill({ status }: { status: Status }) {
  const meta = STATUS_META[status];
  if (status === "live") {
    return <span className="aster-grad-bg aster-mono self-start mt-auto text-[10.5px] tracking-[0.12em] uppercase px-2.5 py-1 rounded-full text-[#1a0e05] font-bold">{meta.label}</span>;
  }
  return <span className="aster-mono self-start mt-auto text-[10.5px] tracking-[0.12em] uppercase px-2.5 py-1 rounded-full border" style={{ color: meta.color, borderColor: `color-mix(in srgb, ${meta.color} 45%, transparent)` }}>{meta.label}</span>;
}

function ConstellationNode({ node, index, isVisible }: { node: Node; index: number; isVisible: boolean }) {
  const Icon = node.icon;
  const lit = node.status === "live";
  const inner = (
    <>
      <div className={`aster-star ${lit ? "on" : ""} mb-2.5`}><Icon className="w-5 h-5" /></div>
      <h3 className="text-base font-semibold text-white mb-1" style={DISPLAY}>{node.name}</h3>
      <p className="text-[12.5px] text-slate-400 leading-snug mb-2.5">{node.tagline}</p>
      <NodePill status={node.status} />
      {node.external && <ArrowUpRight className="absolute top-4 right-4 w-4 h-4 text-slate-500 group-hover:text-[#F6CC55] transition-colors" />}
    </>
  );
  const cls = `aster-node group relative flex flex-col p-4 min-h-[124px] transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`;
  const style = { transitionDelay: `${120 + index * 80}ms` };
  return node.external ? (
    <a href={node.href} target="_blank" rel="noopener noreferrer" className={cls} style={style}>{inner}</a>
  ) : (
    <Link href={node.href} className={cls} style={style}>{inner}</Link>
  );
}

function ConstellationSection() {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section id="constellation" className="relative py-12 md:py-20 bg-[#0a0e1a]">
      <div className="container aster-constellation" ref={ref}>
        <h2 className={`flex items-center gap-3 text-[13px] font-semibold tracking-[0.2em] uppercase text-slate-400 mb-6 transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`} style={DISPLAY}>
          The constellation <span className="flex-1 h-px bg-white/10" />
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
          {NODES.map((n, i) => <ConstellationNode key={n.name} node={n} index={i} isVisible={isVisible} />)}
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section id="services" className="relative py-12 md:py-16 bg-[#0d1220]">
      <div className="container max-w-3xl" ref={ref}>
        <div className={`flex items-center gap-2 mb-4 transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
          <StarAccent /><span className="text-sm font-medium text-[#F6CC55] tracking-wider uppercase" style={DISPLAY}>What We Do</span>
        </div>
        <h2 className={`text-3xl md:text-4xl font-bold text-white mb-12 tracking-tight transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`} style={DISPLAY}>
          Every rep intentional.<br /><span className="text-slate-400">Every player developed.</span>
        </h2>
        <div className="space-y-8">
          {PILLARS.map((p, i) => {
            const Icon = p.icon;
            return (
              <div key={p.name} className={`flex gap-4 transition-all duration-500 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`} style={{ transitionDelay: `${150 + i * 100}ms` }}>
                <div className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center border" style={{ backgroundColor: `color-mix(in srgb, ${p.accent} 10%, transparent)`, borderColor: `color-mix(in srgb, ${p.accent} 22%, transparent)` }}>
                  <Icon className="w-5 h-5" style={{ color: p.accent }} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1" style={DISPLAY}>{p.name}</h3>
                  <p className="text-slate-400 leading-relaxed text-[15px]">{p.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="relative py-12 md:py-16 bg-[#0a0e1a]">
      <div className="container" ref={ref}>
        <div className="text-center mb-14">
          <div className={`flex items-center justify-center gap-2 mb-4 transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
            <StarAccent /><span className="text-sm font-medium text-[#F6CC55] tracking-wider uppercase" style={DISPLAY}>How it works</span>
          </div>
          <h2 className={`text-3xl md:text-4xl font-bold text-white tracking-tight transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`} style={DISPLAY}>
            From tryout to standout.
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {JOURNEY.map((step, i) => (
            <div key={step.n} className={`aster-panel relative p-6 group transition-all ${isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"}`}
              style={{ transitionDelay: `${200 + i * 120}ms`, transitionTimingFunction: "cubic-bezier(0.23,1,0.32,1)" }}>
              <span className="text-4xl font-bold aster-grad-text inline-block transition-transform duration-200 group-hover:scale-110" style={DISPLAY}>{step.n}</span>
              <h3 className="text-lg font-semibold text-white mt-3 mb-2" style={DISPLAY}>{step.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section id="about" className="relative py-12 md:py-16 bg-[#0d1220]">
      <div className="container max-w-3xl" ref={ref}>
        <div className={`flex items-center gap-2 mb-4 transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
          <StarAccent /><span className="text-sm font-medium text-[#F6CC55] tracking-wider uppercase" style={DISPLAY}>About</span>
        </div>
        <h2 className={`text-3xl md:text-4xl font-bold text-white mb-8 tracking-tight transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`} style={DISPLAY}>
          Built on teaching.<br /><span className="text-slate-400">Driven by development.</span>
        </h2>
        <div className={`space-y-5 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
          <p className="text-lg text-slate-300 leading-relaxed">
            Aster Sports AAU is a Westchester, NY youth basketball program built around a simple conviction: coaching should be held to the same standard as classroom teaching. Founded by a Master's-level educator, every session is designed with intentional pedagogy — not just drills.
          </p>
          <p className="text-lg text-slate-300 leading-relaxed">
            We field AAU travel teams and run camps, clinics, small groups, and 1:1 training across grades 2–11 — competing on the Zero Gravity circuit and in league play, with every game on the record and every athlete's growth tracked.
          </p>
          <p className="text-slate-400 leading-relaxed">
            Powered by the Aster Sports platform: live scores, film, schedules, and family tools in one place — beyond spreadsheets, group texts, and LeagueApps.
          </p>
        </div>
        <div className={`mt-8 flex items-center gap-2 text-slate-400 text-sm transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
          <MapPin className="w-4 h-4 text-[#F6CC55]/60" /> <span>Westchester, NY</span>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const { ref, isVisible } = useScrollReveal();
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  return (
    <section id="faq" className="relative py-12 md:py-16 bg-[#0a0e1a]">
      <div className="container max-w-3xl" ref={ref}>
        <div className="text-center mb-12">
          <div className={`flex items-center justify-center gap-2 mb-4 transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
            <StarAccent /><span className="text-sm font-medium text-[#F6CC55] tracking-wider uppercase" style={DISPLAY}>FAQ</span>
          </div>
          <h2 className={`text-3xl md:text-4xl font-bold text-white tracking-tight transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`} style={DISPLAY}>
            Common questions, straight answers.
          </h2>
        </div>
        <div className="space-y-3">
          {FAQS.map((f, i) => (
            <div key={i} className={`aster-panel overflow-hidden transition-all duration-500 ${openIdx === i ? "shadow-[0_0_0_1px_rgba(246,204,85,0.35)]" : ""} ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ transitionDelay: `${150 + i * 50}ms` }}>
              <button className="w-full flex items-center justify-between p-5 text-left" onClick={() => setOpenIdx(openIdx === i ? null : i)} aria-expanded={openIdx === i}>
                <span className="text-base font-medium text-white pr-4" style={DISPLAY}>{f.q}</span>
                <ChevronDown className={`w-5 h-5 text-[#F6CC55] flex-shrink-0 transition-transform duration-200 ${openIdx === i ? "rotate-180" : ""}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ease-out ${openIdx === i ? "max-h-60 opacity-100" : "max-h-0 opacity-0"}`}>
                <p className="px-5 pb-5 text-slate-400 leading-relaxed text-[15px]">{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Field({ id, label, children }: { id: string; label: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-300 mb-2" style={DISPLAY}>{label}</label>
      {children}
    </div>
  );
}

function ContactSection() {
  const { ref, isVisible } = useScrollReveal();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`AAU inquiry from ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.location.href = `mailto:frank@astersports.co?subject=${subject}&body=${body}`;
    setSent(true);
  };
  const field = "w-full px-4 py-3 rounded-lg bg-[#0b1020] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#F6CC55]/40 focus:ring-1 focus:ring-[#F6CC55]/20 transition-all";
  return (
    <section id="contact" className="relative py-12 md:py-16 overflow-hidden bg-[#0d1220]">
      <div className="aster-sky opacity-60" />
      <div className="container relative z-10 max-w-4xl" ref={ref}>
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
          <div className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
            <StarAccent className="mb-6 w-5 h-5 animate-pulse-glow" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight" style={DISPLAY}>
              Ready to develop a<br /><span className="aster-grad-text">complete player?</span>
            </h2>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              Tell us about your athlete — age, goals, experience — and we'll point you to the right first step. Tryouts and sessions fill fast.
            </p>
            <div className="space-y-3 text-slate-400">
              <div className="flex items-center gap-3"><Mail className="w-4 h-4 text-[#F6CC55]/60" /><a href="mailto:frank@astersports.co" className="hover:text-[#F6CC55] transition-colors">frank@astersports.co</a></div>
              <div className="flex items-center gap-3"><MapPin className="w-4 h-4 text-[#F6CC55]/60" /><span>Westchester, NY</span></div>
            </div>
          </div>
          <div className={`transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
            {sent ? (
              <div className="aster-panel p-8 text-center shadow-[0_0_0_1px_rgba(246,204,85,0.35)]">
                <StarAccent className="mx-auto mb-4 w-6 h-6" />
                <h3 className="text-xl font-semibold text-white mb-2" style={DISPLAY}>Message ready to send</h3>
                <p className="text-slate-400 text-sm">Your email app should have opened. If not, reach us at <a href="mailto:frank@astersports.co" className="text-[#F6CC55]">frank@astersports.co</a>.</p>
                <button onClick={() => { setSent(false); setForm({ name: "", email: "", message: "" }); }} className="mt-4 text-sm text-[#F6CC55] hover:underline">Send another</button>
              </div>
            ) : (
              <form onSubmit={submit} className="aster-panel p-6 md:p-8 space-y-5">
                <Field id="name" label="Name"><input id="name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={field} placeholder="Your name" /></Field>
                <Field id="email" label="Email"><input id="email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={field} placeholder="your@email.com" /></Field>
                <Field id="message" label="Message"><textarea id="message" required rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={`${field} resize-none`} placeholder="Tell us about your athlete..." /></Field>
                <button type="submit" className="aster-grad-bg w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-[#1a0e05] font-semibold text-base transition-transform duration-150 hover:scale-[1.02] active:scale-[0.97] shadow-lg shadow-[#F6CC55]/20" style={DISPLAY}>
                  <Send className="w-4 h-4" /> Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-12 bg-[#070a12] border-t border-white/5">
      <div className="container flex flex-col gap-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-3">
            <img src={LOGO_URL} alt={BRAND.name} className="h-8 w-auto" />
            <span className="text-base font-semibold text-white" style={DISPLAY}>{BRAND.name}</span>
          </Link>
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-7 text-sm">
            <span className="text-slate-400">{BRAND.region}</span>
            {NODES.slice(0, 5).map((n) => (
              <Link key={n.name} href={n.href} className="text-[#F6CC55] hover:text-[#E0631C] transition-colors">{n.name}</Link>
            ))}
            <a href="mailto:frank@astersports.co" className="text-[#F6CC55] hover:text-[#E0631C] transition-colors">frank@astersports.co</a>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/5 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {BRAND.name} · Powered by Aster Sports</p>
          <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> Westchester, NY</span>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0e1a] overflow-x-hidden">
      <Header />
      <HeroSection />
      <ConstellationSection />
      <ServicesSection />
      <ProcessSection />
      <AboutSection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
