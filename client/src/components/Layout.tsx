import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import AIChatbot from "./AIChatbot";
import SeasonTicker from "./SeasonTicker";

const LOGO_URL = "/manus-storage/knight-helmet_f18ad2a1.png";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/records", label: "Records" },
  { href: "/academy", label: "Academy" },
  { href: "/mission", label: "Mission" },
  { href: "/coach-kenny", label: "Coach Kenny" },
  { href: "/locations", label: "Locations" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen bg-arena">
      {/* Navigation */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-navy/95 backdrop-blur-xl border-b border-cobalt/20 shadow-lg shadow-cobalt/5"
            : "bg-transparent"
        }`}
      >
        <div className="container flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src={LOGO_URL}
              alt="Legacy Hoopers"
              className="w-9 h-9 md:w-11 md:h-11 rounded-full object-contain drop-shadow-[0_0_8px_rgba(74,143,212,0.4)] transition-transform duration-200 group-hover:scale-105"
            />
            <span className="font-display font-800 text-lg md:text-xl uppercase tracking-tight text-white">
              Legacy<span className="text-cobalt"> Hoopers</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 font-display font-700 text-sm uppercase tracking-wider transition-colors duration-200 rounded-md ${
                  location === link.href
                    ? "text-cobalt bg-cobalt/10"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://legacyhoopers.leagueapps.com/camps/4945182-legacy-hoopers-prospective-player-interest-list"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 px-5 py-2.5 bg-cobalt text-white font-display font-800 text-sm uppercase tracking-wider rounded-md shadow-lg shadow-cobalt/30 hover:bg-cobalt-light hover:shadow-cobalt/50 transition-all duration-200 hover:-translate-y-0.5"
            >
              Register
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-white/80 hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="lg:hidden bg-navy/98 backdrop-blur-xl border-t border-cobalt/10 animate-in fade-in slide-in-from-top-2 duration-200">
            <nav className="container py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-3 font-display font-700 text-base uppercase tracking-wider rounded-lg transition-colors ${
                    location === link.href
                      ? "text-cobalt bg-cobalt/10"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="https://legacyhoopers.leagueapps.com/camps/4945182-legacy-hoopers-prospective-player-interest-list"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 px-4 py-3 bg-cobalt text-white font-display font-800 text-base uppercase tracking-wider rounded-lg text-center"
              >
                Register
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Season Ticker */}
      <SeasonTicker />

      {/* Main Content */}
      <main>{children}</main>

      {/* AI Chatbot */}
      <AIChatbot />

      {/* Footer */}
      <footer className="bg-navy border-t border-cobalt/10">
        <div className="container py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <img src={LOGO_URL} alt="Legacy Hoopers" className="w-10 h-10" />
                <span className="font-display font-800 text-xl uppercase text-white">
                  Legacy<span className="text-cobalt"> Hoopers</span>
                </span>
              </div>
              <p className="text-white/50 text-sm leading-relaxed max-w-sm">
                Westchester County's premier youth basketball development program.
                Building complete players through elite coaching, structured development,
                and competitive excellence.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-display font-800 text-xs uppercase tracking-widest text-cobalt mb-4">
                Program
              </h4>
              <div className="flex flex-col gap-2">
                <Link href="/academy" className="text-white/50 hover:text-white text-sm transition-colors">Academy Standards</Link>
                <Link href="/records" className="text-white/50 hover:text-white text-sm transition-colors">Team Records</Link>
                <Link href="/locations" className="text-white/50 hover:text-white text-sm transition-colors">Gym Locations</Link>
                <Link href="/coach-kenny" className="text-white/50 hover:text-white text-sm transition-colors">Coach Kenny</Link>
              </div>
            </div>

            {/* Connect */}
            <div>
              <h4 className="font-display font-800 text-xs uppercase tracking-widest text-cobalt mb-4">
                Connect
              </h4>
              <div className="flex flex-col gap-2">
                <a href="https://legacyhoopers.leagueapps.com/camps/4945182-legacy-hoopers-prospective-player-interest-list" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white text-sm transition-colors">Register Now</a>
                <Link href="/mission" className="text-white/50 hover:text-white text-sm transition-colors">Our Mission</Link>
                <a href="mailto:info@legacyhoopers.org" className="text-white/50 hover:text-white text-sm transition-colors">Contact Us</a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/30 text-xs">
              &copy; {new Date().getFullYear()} Legacy Hoopers Basketball Academy. All rights reserved.
            </p>
            <p className="text-white/30 text-xs">
              Westchester County, New York
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
