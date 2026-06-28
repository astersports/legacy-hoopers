/*
 * ProgramComparison — side-by-side table of all 6 programs across the facts that
 * matter most: price, cadence, age, group size, film, tryout. (#2)
 */
import { Check, Minus } from "lucide-react";
import { SERVICES } from "@/lib/content";
import { COMPARE } from "./programsMeta";

function Yes() {
  return (
    <span className="inline-flex" aria-label="Yes">
      <Check className="h-4 w-4 text-gold-text" />
    </span>
  );
}
function No() {
  return (
    <span className="inline-flex" aria-label="No">
      <Minus className="h-4 w-4 text-muted-foreground/50" />
    </span>
  );
}

const ROWS: { label: string; render: (key: string) => React.ReactNode }[] = [
  { label: "Price", render: (k) => SERVICES.find((s) => s.key === k)!.price },
  { label: "Cadence", render: (k) => SERVICES.find((s) => s.key === k)!.cadence },
  { label: "Age / grade", render: (k) => COMPARE[k].age },
  { label: "Group size", render: (k) => COMPARE[k].group },
  { label: "Game film", render: (k) => (COMPARE[k].film ? <Yes /> : <No />) },
  { label: "Tryout", render: (k) => (COMPARE[k].tryout ? <Yes /> : <No />) },
];

export function ProgramComparison() {
  return (
    <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-sm">
      <table className="w-full min-w-[640px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="sticky left-0 bg-card px-4 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Program
            </th>
            {SERVICES.map((s) => (
              <th key={s.key} className="px-4 py-4">
                <span className="flex items-center gap-2">
                  <span
                    className="grid h-7 w-7 shrink-0 place-items-center rounded-lg text-white"
                    style={{ backgroundColor: s.accent }}
                  >
                    <s.icon className="h-4 w-4" />
                  </span>
                  <span className="font-bold text-foreground">{s.name}</span>
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row) => (
            <tr key={row.label} className="border-b border-border last:border-0 even:bg-secondary/30">
              <th className="sticky left-0 bg-inherit px-4 py-3.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {row.label}
              </th>
              {SERVICES.map((s) => (
                <td key={s.key} className="px-4 py-3.5 font-medium text-foreground">
                  {row.render(s.key)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
