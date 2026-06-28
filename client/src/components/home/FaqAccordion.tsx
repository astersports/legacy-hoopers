/*
 * FaqAccordion — lightweight single-open accordion for common questions.
 * Self-contained (no external deps) so it matches the kit's visual language.
 */
import { useState } from "react";
import { Plus } from "lucide-react";

const FAQS = [
  {
    q: "What ages and grades do you serve?",
    a: "Athletes from grade 2 through 11. Camps and clinics start as young as 6, while AAU travel teams and the Elite Academy run through high school.",
  },
  {
    q: "Do I need to try out to join?",
    a: "Camps, clinics, small groups and 1:1 training are open enrollment — sign up and go. AAU travel teams and the Elite Academy require a tryout or application so we can place every athlete on the right roster.",
  },
  {
    q: "How does scheduling and communication work?",
    a: "Everything lives in the Aster app: schedules, RSVPs, game-day weather, coach messaging, payments and live stats — all in one place, pushed to your phone.",
  },
  {
    q: "Are your coaches certified?",
    a: "Yes. Every coach is SafeSport-certified and background-checked, and our development staff carry coaching and player-development credentials.",
  },
  {
    q: "What does it cost and are there payment plans?",
    a: "Pricing varies by program — clinics from $40 a session, camps from $149, 1:1 training at $90 an hour, and season pricing for travel teams. Flexible plans and autopay are available at checkout.",
  },
];

export function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-3xl divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      {FAQS.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex min-h-[44px] w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6"
            >
              <span className="text-[15px] font-semibold text-foreground">{f.q}</span>
              <Plus
                className={`h-5 w-5 shrink-0 text-gold-text transition-transform duration-200 ${
                  isOpen ? "rotate-45" : ""
                }`}
                aria-hidden
              />
            </button>
            <div
              className="grid transition-all duration-300 ease-out"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground sm:px-6">
                  {f.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
