/*
 * Season Ticker — animated scrolling bar with program highlights
 * Runs continuously with CSS animation for performance
 */

const tickerItems = [
  "10U BLACK: CHAMPIONS — ZG CHASE FOR THE CHAIN NY",
  "10U BLACK: CHAMPIONS — ZG RUMBLE FOR THE RING CT",
  "11U GIRLS: CHAMPIONS — ZG CHASE FOR THE CHAIN NY",
  "11U GIRLS: FINALISTS — ZG RUMBLE FOR THE RING CT",
  "11U GIRLS: FINAL FOUR — ZG NATIONAL FINALS MA",
  "3 CHAMPIONSHIPS · 5 FINALS APPEARANCES · SPRING 2026",
  "5 TEAMS · AAU + LEAGUE PLAY · WESTCHESTER NY",
];

export default function SeasonTicker() {
  return (
    <div className="bg-cobalt/10 border-b border-cobalt/20 overflow-hidden py-2">
      <div className="animate-ticker flex whitespace-nowrap">
        {[...tickerItems, ...tickerItems].map((item, i) => (
          <span key={i} className="inline-flex items-center mx-8">
            <span className="w-1.5 h-1.5 bg-cobalt rounded-full mr-3" />
            <span className="font-display font-700 text-[11px] uppercase tracking-[0.12em] text-cobalt/80">
              {item}
            </span>
          </span>
        ))}
      </div>
      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-ticker {
          animation: ticker 40s linear infinite;
        }
        .animate-ticker:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
