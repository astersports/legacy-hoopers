/*
 * LocationsTeaser — a navy logo-watermarked mini-panel plus a card listing the
 * gyms the program plays out of, each with a "Directions" link.
 */
import { MapPin, ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/Logo";

const GYMS = [
  { name: "Westchester County Center", town: "White Plains, NY" },
  { name: "Westchester Community College", town: "Valhalla, NY" },
  { name: "Rippowam Field House", town: "Stamford, CT" },
  { name: "East Coast Sports & Fitness", town: "Elmsford, NY" },
];

function mapHref(name: string, town: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${name}, ${town}`)}`;
}

export function LocationsTeaser() {
  return (
    <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-stretch">
      {/* navy watermark panel */}
      <div className="hero-navy relative flex flex-col justify-end overflow-hidden rounded-2xl p-7 text-white">
        <span className="watermark right-2 top-1/2 -translate-y-1/2">ASTER</span>
        <Logo className="relative h-12 w-12" />
        <h3 className="relative mt-4 text-2xl font-extrabold tracking-tight">
          Play across the tri-state's best gyms.
        </h3>
        <p className="relative mt-2 text-sm text-white/70">
          Turn-by-turn directions and parking notes for every venue, right in the
          Aster app.
        </p>
      </div>

      {/* gym list */}
      <div className="rounded-2xl border border-border bg-card p-2 shadow-sm">
        <ul className="divide-y divide-border">
          {GYMS.map((g) => (
            <li
              key={g.name}
              className="flex items-center justify-between gap-4 rounded-xl px-4 py-4 transition-colors hover:bg-secondary/50"
            >
              <span className="flex min-w-0 items-center gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gold-soft text-gold-text">
                  <MapPin className="h-4 w-4" aria-hidden />
                </span>
                <span className="min-w-0">
                  <span className="block truncate font-bold text-foreground">{g.name}</span>
                  <span className="block text-sm text-muted-foreground">{g.town}</span>
                </span>
              </span>
              <a
                href={mapHref(g.name, g.town)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Directions to ${g.name} in ${g.town}`}
                className="inline-flex min-h-[44px] shrink-0 items-center gap-1 rounded-lg px-3 text-sm font-semibold text-gold-text hover:underline"
              >
                Directions <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
