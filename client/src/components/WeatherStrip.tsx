/*
 * Game-day weather strip — cosmetic showcase of the Aster weather hub service.
 * Wired to @aster/weather later; values come from content.ts for now.
 * tone="light" (default) for light sections, "dark" for navy bands.
 */
import { Sun, Cloud, CloudRain, CloudSun, MapPin, type LucideIcon } from "lucide-react";
import { GAMEDAY_WEATHER } from "@/lib/content";

const ICONS: Record<string, LucideIcon> = { sun: Sun, cloud: Cloud, rain: CloudRain, partly: CloudSun };

export function WeatherStrip({ tone = "light" }: { tone?: "light" | "dark" }) {
  const w = GAMEDAY_WEATHER;
  const NowIcon = ICONS[w.now.icon];
  const dark = tone === "dark";

  const card = dark
    ? "border-white/10 bg-white/5 backdrop-blur"
    : "border-border bg-card shadow-sm";
  const temp = dark ? "text-white" : "text-foreground";
  const sub = dark ? "text-white/70" : "text-muted-foreground";
  const meta = dark ? "text-white/50" : "text-muted-foreground";
  const tile = dark ? "border-white/10 bg-white/5" : "border-border bg-secondary/50";
  const tileDay = dark ? "text-white/60" : "text-muted-foreground";
  const tileTemp = dark ? "text-white" : "text-foreground";
  const iconWrap = dark ? "bg-gold/15 text-gold-light" : "bg-gold-soft text-gold-text";
  const fcIcon = dark ? "text-gold-light" : "text-gold-text";

  return (
    <div className={`overflow-hidden rounded-2xl border ${card}`}>
      <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <span className={`grid h-14 w-14 shrink-0 place-items-center rounded-xl ${iconWrap}`}>
            <NowIcon className="h-7 w-7" />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-3xl font-extrabold tabular-nums ${temp}`}>{w.now.temp}°</span>
              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-emerald-700">
                {w.status}
              </span>
            </div>
            <div className={`text-sm ${sub}`}>{w.now.label} · feels {w.now.feels}°</div>
            <div className={`mt-0.5 flex items-center gap-1 text-xs ${meta}`}>
              <MapPin className="h-3 w-3" /> {w.venue} · {w.city}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {w.forecast.map((d) => {
            const Icon = ICONS[d.icon];
            return (
              <div key={d.day} className={`flex min-w-[60px] flex-col items-center gap-1 rounded-xl border px-3 py-2 ${tile}`}>
                <span className={`text-[11px] font-semibold uppercase tracking-wide ${tileDay}`}>{d.day}</span>
                <Icon className={`h-5 w-5 ${fcIcon}`} />
                <span className={`text-xs font-bold tabular-nums ${tileTemp}`}>
                  {d.hi}°<span className="opacity-50"> {d.lo}°</span>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
