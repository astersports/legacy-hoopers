/*
 * App & Hub services grid — the "everything in one place" showcase. Cosmetic
 * links to the next-level services that make families' lives easier.
 */
import { ArrowUpRight } from "lucide-react";
import { HUB_LINKS } from "@/lib/content";

const TONE: Record<string, string> = {
  gold: "bg-gold-soft text-gold-text",
  navy: "bg-primary/10 text-primary",
  blue: "bg-blue-50 text-blue-600",
  green: "bg-emerald-50 text-emerald-600",
};

export function AppHub() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {HUB_LINKS.map((l) => (
        <button
          key={l.label}
          type="button"
          className="group flex items-start gap-4 rounded-2xl border border-border bg-card p-5 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-gold/40 hover:shadow-md"
        >
          <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${TONE[l.tone]}`}>
            <l.icon className="h-5 w-5" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="flex items-center gap-1 font-bold text-foreground">
              {l.label}
              <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold-text" />
            </span>
            <span className="mt-0.5 block text-sm leading-relaxed text-muted-foreground">{l.desc}</span>
            <span className="mt-2 inline-block text-xs font-semibold text-gold-text">{l.cta} →</span>
          </span>
        </button>
      ))}
    </div>
  );
}
