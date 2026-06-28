/*
 * TeamPicker — a small accessible <select> styled to the Aster kit, used by the
 * cosmetic-AI surfaces to choose which live team to "analyze". Presentation only.
 */
import type { TeamRecord } from "@/lib/aster";

export function TeamPicker({
  records,
  value,
  onChange,
  label,
  id,
}: {
  records: TeamRecord[];
  value: string;
  onChange: (name: string) => void;
  label: string;
  id: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor={id} className="shrink-0 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      <div className="relative flex-1 sm:max-w-xs">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-xl border border-border bg-secondary/60 px-3 py-2 pr-9 text-sm font-semibold text-foreground shadow-sm outline-none ring-gold/40 transition focus:bg-card focus:ring-2"
        >
          {records.map((t) => (
            <option key={t.name} value={t.name}>
              {t.name}
            </option>
          ))}
        </select>
        <svg
          aria-hidden
          viewBox="0 0 20 20"
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
        >
          <path d="M6 8l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}
