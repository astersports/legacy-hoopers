/*
 * Starfield — subtle gold gradient-mesh + scattered star accents.
 * Purely decorative; sits behind the hero logo. No interactivity.
 */
const STARS = [
  { top: "8%", left: "18%", size: 3, delay: "0s", op: 0.7 },
  { top: "22%", left: "72%", size: 2, delay: "0.6s", op: 0.5 },
  { top: "40%", left: "10%", size: 2, delay: "1.2s", op: 0.6 },
  { top: "58%", left: "84%", size: 3, delay: "0.3s", op: 0.8 },
  { top: "70%", left: "30%", size: 2, delay: "0.9s", op: 0.5 },
  { top: "84%", left: "60%", size: 3, delay: "1.5s", op: 0.7 },
  { top: "14%", left: "50%", size: 2, delay: "1.8s", op: 0.4 },
  { top: "48%", left: "46%", size: 2, delay: "0.45s", op: 0.6 },
];

export function Starfield() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* gold gradient mesh */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(201,149,46,0.28), transparent 55%), radial-gradient(circle at 75% 70%, rgba(201,149,46,0.16), transparent 50%)",
        }}
      />
      {/* scattered stars */}
      {STARS.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-gold-light motion-safe:animate-pulse"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            opacity: s.op,
            boxShadow: "0 0 6px rgba(201,149,46,0.9)",
            animationDelay: s.delay,
            animationDuration: "3.2s",
          }}
        />
      ))}
    </div>
  );
}
