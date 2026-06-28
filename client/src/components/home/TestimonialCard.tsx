/*
 * TestimonialCard — richer testimonial card with an initial-avatar circle,
 * five gold stars, and name + role. Reuses the existing TESTIMONIALS data.
 */
import { Star } from "lucide-react";
import type { Testimonial } from "@/lib/content";

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <figure className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
      <div className="flex gap-0.5 text-gold" aria-label="5 out of 5 stars">
        {[0, 1, 2, 3, 4].map((i) => (
          <Star key={i} className="h-4 w-4 fill-gold text-gold" aria-hidden />
        ))}
      </div>
      <blockquote className="mt-3 flex-1 text-[15px] leading-relaxed text-foreground">
        "{t.quote}"
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3 border-t border-border pt-4">
        <span
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gold-soft text-sm font-extrabold text-gold-text ring-1 ring-gold/20"
          aria-hidden
        >
          {initials(t.name)}
        </span>
        <span className="text-sm">
          <span className="font-bold text-foreground">{t.name}</span>
          <span className="block text-muted-foreground">{t.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}
