/*
 * DESIGN: Court Noir — Registration Gateway
 * Directs users to the Aster Sports registration flow
 */
import { useEffect } from "react";
import { ChevronRight, ExternalLink } from "lucide-react";

export default function Register() {
  useEffect(() => {
    // Auto-redirect after a brief moment to show the page
    const timer = setTimeout(() => {
      window.open("https://legacyhoopers.leagueapps.com/camps/4945182-legacy-hoopers-prospective-player-interest-list", "_blank");
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center pt-20">
      <div className="container">
        <div className="max-w-xl mx-auto text-center">
          <span className="font-display font-700 text-xs uppercase tracking-[0.2em] text-cobalt mb-4 block">
            Registration
          </span>
          <h1 className="font-display font-800 text-5xl md:text-6xl uppercase text-white leading-[0.9] mb-6">
            Join the<br /><span className="text-cobalt">Program</span>
          </h1>
          <p className="text-white/60 text-base mb-8 leading-relaxed">
            Registration is handled through our secure platform. You'll be redirected momentarily.
            If not, click the button below.
          </p>

          <a
            href="https://legacyhoopers.leagueapps.com/camps/4945182-legacy-hoopers-prospective-player-interest-list"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-10 py-5 bg-cobalt text-white font-display font-800 text-base uppercase tracking-wider rounded-lg shadow-2xl shadow-cobalt/30 hover:bg-cobalt-light hover:shadow-cobalt/50 transition-all duration-200 hover:-translate-y-1"
          >
            Register Now <ExternalLink className="w-5 h-5" />
          </a>

          <div className="mt-12 bg-navy-light border border-white/5 rounded-xl p-6">
            <h3 className="font-display font-800 text-sm uppercase text-white mb-3">What to Expect</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
              {[
                { step: "1", title: "Select Team", desc: "Choose the age group and team that fits your child." },
                { step: "2", title: "Complete Info", desc: "Player details, emergency contacts, and medical info." },
                { step: "3", title: "Confirm & Pay", desc: "Secure payment and instant confirmation." },
              ].map((s, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-full bg-cobalt/20 border border-cobalt/40 flex items-center justify-center font-display font-800 text-xs text-cobalt flex-shrink-0">
                    {s.step}
                  </span>
                  <div>
                    <span className="font-display font-700 text-xs uppercase text-white block">{s.title}</span>
                    <span className="text-white/50 text-xs">{s.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <p className="text-white/30 text-xs">
              Questions? Email <a href="mailto:info@legacyhoopers.org" className="text-cobalt hover:underline">info@legacyhoopers.org</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
