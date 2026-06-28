/*
 * AiRecordsSection — composes the cosmetic-AI showcase that sits ALONGSIDE the
 * live standings on the Records page. A labeled header ("AI Lab") plus four
 * features, each clearly badged AI. Reads the same live TeamRecord[] the
 * standings use, but only for cosmetic/derived presentation — never mutated.
 */
import { Sparkles, Cpu } from "lucide-react";
import type { TeamRecord } from "@/lib/aster";
import { Pill } from "@/components/kit";
import { AiScoutingReport } from "./AiScoutingReport";
import { AiWinProbability } from "./AiWinProbability";
import { AiSeasonForecast } from "./AiSeasonForecast";
import { AiInsights } from "./AiInsights";
import { AiAsk } from "./AiAsk";

export function AiRecordsSection({ records }: { records: TeamRecord[] }) {
  if (records.length === 0) return null;

  return (
    <section className="mt-12" aria-label="AI insights">
      {/* Labeled header */}
      <div className="mb-6">
        <div className="flex flex-wrap items-center gap-2">
          <Pill icon={Sparkles}>AI Lab</Pill>
          <Pill icon={Cpu}>Preview</Pill>
        </div>
        <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
          Records, read by AI
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          A look at where the program is headed — scouting briefs, win projections, trend
          forecasts and pattern flags, all drawn from the live records above. A preview of the
          model layer; not yet wired to a live model.
        </p>
      </div>

      {/* Top row: scouting + win probability */}
      <div className="grid gap-4 lg:grid-cols-2">
        <AiScoutingReport records={records} />
        <AiWinProbability records={records} />
      </div>

      {/* Forecast */}
      <div className="mt-4">
        <AiSeasonForecast records={records} />
      </div>

      {/* Insights + ask */}
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <AiInsights records={records} />
        <AiAsk records={records} />
      </div>
    </section>
  );
}
