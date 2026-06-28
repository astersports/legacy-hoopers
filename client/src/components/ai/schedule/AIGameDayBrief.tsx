/*
 * AI Game-Day Brief — a generated, streamed pre-game summary for the next event.
 *
 * COSMETIC / MOCK: the brief text is composed locally from the next event +
 * the cosmetic GAMEDAY_WEATHER constant and revealed with a typewriter effect.
 * No model call. This is the showcase surface for Aster's future generative
 * game-day briefing. Pulls only from data already computed by the page.
 */
import { useMemo, useState } from "react";
import { Brain, CloudSun, Clock, Backpack, Navigation, RefreshCw } from "lucide-react";
import { type ScheduleEvent, fmtDateHeader, fmtTime } from "@/lib/schedule";
import { GAMEDAY_WEATHER } from "@/lib/content";
import { AICard, useTypewriter, ThinkingDots } from "./aiKit";

function arrivalTime(startISO: string, leadMin: number): string {
  const t = Date.parse(startISO) - leadMin * 60_000;
  return new Date(t).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "America/New_York",
  });
}

function buildBrief(next: ScheduleEvent): string {
  const wx = GAMEDAY_WEATHER;
  const opp = next.opponent ? `vs. ${next.opponent}` : "";
  const where = next.location_name ?? wx.venue;
  const tip = fmtTime(next.start_at);
  const arrive = arrivalTime(next.start_at, 45);
  const home = (next.home_away ?? "").toLowerCase() === "away" ? "away" : "home";
  const wxIcon: string = wx.now.icon;
  const wxLine =
    wxIcon === "rain"
      ? `Rain is in the picture (${wx.now.temp}°) — pack a change of layers and expect a slower drive.`
      : `Conditions look ${wx.now.label.toLowerCase()} near tip-off (${wx.now.temp}°, feels ${wx.now.feels}°) — comfortable for an indoor ${home} game.`;

  return [
    `Game day for ${next.team_name} ${opp}`.trim() + ".",
    `${wxLine}`,
    `Plan to be at ${where} by ${arrive} — that's a 45-minute pre-game window for warm-ups, check-in, and parking.`,
    `Bring: water bottle, both jerseys, and a snack for after. Tip-off is ${tip}.`,
  ].join(" ");
}

const FACTS = (next: ScheduleEvent) => [
  { icon: CloudSun, label: "Weather", value: `${GAMEDAY_WEATHER.now.temp}° · ${GAMEDAY_WEATHER.now.label}` },
  { icon: Clock, label: "Arrive by", value: arrivalTime(next.start_at, 45) },
  { icon: Navigation, label: "Travel", value: "~18 min drive" },
  { icon: Backpack, label: "Bring", value: "Water · jerseys · snack" },
];

export function AIGameDayBrief({ next, now }: { next: ScheduleEvent | null; now: number }) {
  const [seed, setSeed] = useState(0); // bump to replay the typewriter
  const brief = useMemo(() => (next ? buildBrief(next) : ""), [next]);
  const { out, done } = useTypewriter(brief, 12, !!next && seed >= 0);

  if (!next) return null;
  const facts = FACTS(next);

  return (
    <AICard
      icon={Brain}
      title="AI Game-Day Brief"
      caption={`${fmtDateHeader(next.start_at, now)} · ${fmtTime(next.start_at)}`}
    >
      <div key={seed} className="rounded-xl border border-border bg-secondary/40 p-3.5">
        <p className="min-h-[4.5rem] text-sm leading-relaxed text-foreground">
          {out}
          {!done && (
            <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 bg-gold motion-safe:animate-pulse" aria-hidden="true" />
          )}
        </p>
        {!done && (
          <div className="mt-2 flex items-center gap-2 text-[11px] font-semibold text-muted-foreground">
            <ThinkingDots /> generating brief…
          </div>
        )}
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {facts.map((f) => (
          <div key={f.label} className="rounded-xl border border-border bg-card px-3 py-2.5">
            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-gold-text">
              <f.icon className="h-3 w-3" aria-hidden="true" /> {f.label}
            </div>
            <div className="mt-0.5 truncate text-sm font-semibold text-foreground">{f.value}</div>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between">
        <span className="text-[11px] text-muted-foreground">Generated from schedule + forecast · preview</span>
        <button
          type="button"
          onClick={() => setSeed((s) => s + 1)}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-2.5 py-1.5 text-xs font-semibold text-foreground transition-colors hover:bg-secondary"
        >
          <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" /> Regenerate
        </button>
      </div>
    </AICard>
  );
}
