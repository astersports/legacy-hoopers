/*
 * Season Ticker — animated scrolling bar with program highlights
 * Runs continuously with CSS animation for performance
 */

const tickerItems = [
  "10U BLACK BOYS: 2X SPRING CHAMPIONS",
  "11U GIRLS: 1 CHAMPIONSHIP · 1 FINALS · 1 FINAL FOUR",
  "3 CHAMPIONSHIPS THIS SPRING",
  "GIRLS NATIONALS: FINAL FOUR APPEARANCE",
  "WINTER 2025–26: 15–5 COMBINED · #1 & #2 DEFENSE",
  "5 TEAMS · AAU + LEAGUE PLAY · WESTCHESTER NY",
  "SPRING 2026 · DOMINANT SEASON",
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
