/*
 * Shape-matched loading skeletons for the schedule body. Mirrors the summary
 * strip + filter bar + grouped-event card shapes so the layout doesn't jump
 * when live data arrives. Subtle shimmer via a pulsing gradient. Cosmetic.
 */
function Bar({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded bg-gradient-to-r from-secondary via-secondary/50 to-secondary ${className}`}
    />
  );
}

function RowSkeleton() {
  return (
    <div className="flex items-center gap-3 py-3">
      <span className="h-10 w-1 shrink-0 rounded-full bg-secondary" />
      <div className="w-12 shrink-0 space-y-1">
        <Bar className="mx-auto h-5 w-7" />
        <Bar className="mx-auto h-2 w-6" />
      </div>
      <div className="min-w-0 flex-1 space-y-2">
        <Bar className="h-3.5 w-2/3" />
        <Bar className="h-2.5 w-1/3" />
      </div>
      <Bar className="h-3 w-12 shrink-0" />
    </div>
  );
}

export function ScheduleSkeleton() {
  return (
    <div className="mt-4 space-y-5" aria-busy="true" aria-label="Loading schedule">
      {/* summary strip */}
      <div className="flex flex-col gap-2 sm:flex-row">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex flex-1 items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 shadow-sm">
            <span className="h-9 w-9 shrink-0 animate-pulse rounded-xl bg-secondary" />
            <div className="flex-1 space-y-1.5">
              <Bar className="h-4 w-10" />
              <Bar className="h-2.5 w-20" />
            </div>
          </div>
        ))}
      </div>
      {/* grouped event cards */}
      {[0, 1].map((i) => (
        <div key={i} className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="flex items-center gap-3 border-b border-border px-4 py-3">
            <span className="h-8 w-1 rounded-full bg-secondary" />
            <div className="flex-1 space-y-1.5">
              <Bar className="h-4 w-32" />
              <Bar className="h-2.5 w-24" />
            </div>
          </div>
          <div className="divide-y divide-border/60 px-3">
            <RowSkeleton />
            <RowSkeleton />
          </div>
        </div>
      ))}
    </div>
  );
}
