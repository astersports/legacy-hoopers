/*
 * CredibilityStrip — muted "circuit" wordmark pills that sit under the metrics
 * band to signal the competitive circuits the program plays.
 */
const CIRCUITS = ["Zero Gravity", "AAU", "League Play", "USSSA"];

export function CredibilityStrip() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
      <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">
        Competing in
      </span>
      {CIRCUITS.map((c) => (
        <span
          key={c}
          className="rounded-full bg-white/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/60 ring-1 ring-white/10"
        >
          {c}
        </span>
      ))}
    </div>
  );
}
