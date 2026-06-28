import { BRAND } from "@/lib/brand";

/** The Aster constellation-arrow mark. `tone` picks a backdrop for contrast. */
export function Logo({
  className = "h-10 w-10",
  tone = "plain",
}: {
  className?: string;
  tone?: "plain" | "navy" | "soft";
}) {
  const ring =
    tone === "navy"
      ? "grid place-items-center rounded-xl bg-white/5 ring-1 ring-white/10"
      : tone === "soft"
        ? "grid place-items-center rounded-xl bg-gold-soft ring-1 ring-gold/20"
        : "";
  return (
    <span className={tone === "plain" ? "" : `${ring} p-1.5`}>
      <img
        src={BRAND.logo}
        alt={`${BRAND.name} logo`}
        className={`${className} object-contain`}
        draggable={false}
      />
    </span>
  );
}
