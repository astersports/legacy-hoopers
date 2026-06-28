/*
 * InterestCapture — inline email capture inside a gold-soft band. Cosmetic only
 * (preventDefault); shows a friendly confirmation on submit.
 */
import { useState } from "react";
import { BellRing, Check } from "lucide-react";

export function InterestCapture() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <div className="overflow-hidden rounded-2xl border border-gold/20 bg-gold-soft px-6 py-8 sm:px-10 sm:py-10">
      <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <h3 className="text-2xl font-extrabold tracking-tight text-foreground">
            Get first dibs on the next season.
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Drop your email and we'll notify you when tryouts, camps and clinics
            open for registration.
          </p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (email.trim()) setSent(true);
          }}
          className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto"
        >
          <label htmlFor="interest-email" className="sr-only">
            Email address
          </label>
          <input
            id="interest-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            className="h-11 min-w-0 rounded-xl border border-border bg-card px-4 text-sm text-foreground shadow-sm outline-none focus:ring-2 focus:ring-gold sm:w-64"
          />
          <button
            type="submit"
            aria-label="Notify me when registration opens"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-gold px-5 text-sm font-semibold text-navy shadow-sm transition-colors hover:bg-gold-light"
          >
            {sent ? (
              <>
                <Check className="h-4 w-4" aria-hidden /> You're on the list
              </>
            ) : (
              <>
                <BellRing className="h-4 w-4" aria-hidden /> Notify me
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
