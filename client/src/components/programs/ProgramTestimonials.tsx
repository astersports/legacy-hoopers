/*
 * ProgramTestimonials — 3-card parent/partner quotes (reuses TESTIMONIALS). (#7)
 */
import { Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/content";
import ScrollReveal from "@/components/ScrollReveal";

export function ProgramTestimonials() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {TESTIMONIALS.map((t, i) => (
        <ScrollReveal key={t.name} delay={i * 60}>
          <figure className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
            <Quote className="h-6 w-6 text-gold-text" />
            <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-foreground">
              "{t.quote}"
            </blockquote>
            <figcaption className="mt-4 border-t border-border pt-4">
              <div className="text-sm font-bold text-foreground">{t.name}</div>
              <div className="text-xs text-muted-foreground">{t.role}</div>
            </figcaption>
          </figure>
        </ScrollReveal>
      ))}
    </div>
  );
}
