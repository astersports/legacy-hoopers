import { Check, ArrowRight } from "lucide-react";
import type { Service } from "@/lib/content";
import { REGISTER_URL } from "@/lib/brand";

export function ServiceCard({ s, compact = false }: { s: Service; compact?: boolean }) {
  return (
    <div
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
      style={{ borderTopColor: s.accent, borderTopWidth: 3 }}
    >
      {s.popular && (
        <span className="absolute right-4 top-4 rounded-full bg-gold px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-navy">
          Most popular
        </span>
      )}
      <div className="p-6">
        <span
          className="grid h-12 w-12 place-items-center rounded-xl text-white"
          style={{ backgroundColor: s.accent }}
        >
          <s.icon className="h-6 w-6" />
        </span>
        <h3 className="mt-4 text-lg font-extrabold tracking-tight text-foreground">{s.name}</h3>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.blurb}</p>

        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-2xl font-extrabold text-foreground">{s.price}</span>
          <span className="text-xs uppercase tracking-wide text-muted-foreground">{s.cadence}</span>
        </div>

        {!compact && (
          <ul className="mt-4 space-y-2">
            {s.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-text" /> {f}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-auto border-t border-border p-4">
        <a
          href={REGISTER_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 rounded-xl bg-secondary px-4 py-2.5 text-sm font-semibold text-foreground transition-colors group-hover:bg-gold group-hover:text-navy"
        >
          Get started <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
