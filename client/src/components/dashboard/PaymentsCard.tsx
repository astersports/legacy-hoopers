/*
 * PaymentsCard — next invoice amount, due date, autopay status + Manage button.
 */
import { CreditCard, CheckCircle2 } from "lucide-react";

export function PaymentsCard() {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-transform duration-200 hover:-translate-y-0.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-gold-soft text-gold-text">
            <CreditCard className="h-5 w-5" />
          </span>
          <h3 className="font-bold text-foreground">Next invoice</h3>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-emerald-700">
          <CheckCircle2 className="h-3.5 w-3.5" /> Autopay on
        </span>
      </div>

      <div className="mt-5">
        <div className="text-3xl font-extrabold tabular-nums text-foreground">$185.00</div>
        <div className="text-sm text-muted-foreground">Spring 2026 · installment 3 of 4</div>
      </div>

      <div className="mt-4 flex items-center justify-between rounded-xl bg-secondary/50 px-4 py-3 text-sm">
        <span className="text-muted-foreground">Due date</span>
        <span className="font-semibold text-foreground">Apr 1, 2026</span>
      </div>

      <button
        type="button"
        className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground shadow-sm transition-colors hover:bg-secondary"
      >
        Manage billing
      </button>
    </div>
  );
}
