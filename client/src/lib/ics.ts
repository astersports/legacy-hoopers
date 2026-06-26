import { eventEnd, type ScheduleEvent } from "./schedule";

function ics(dt: number): string {
  return new Date(dt).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}
function esc(s: string): string {
  return s.replace(/([,;\\])/g, "\\$1").replace(/\n/g, "\\n");
}

/** Build + download an .ics of upcoming events (games + tournaments; practices optional). */
export function downloadSchedule(events: ScheduleEvent[], filename = "legacy-hoopers-schedule.ics") {
  const lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Legacy Hoopers//Schedule//EN", "CALSCALE:GREGORIAN"];
  for (const e of events) {
    const title = e.kind === "practice" ? e.title || "Practice" : `${e.team_name}${e.opponent ? ` vs. ${e.opponent}` : ""}`;
    const loc = [e.location_name, e.location_address].filter(Boolean).join(", ");
    lines.push(
      "BEGIN:VEVENT",
      `UID:${e.event_id}@legacyhoopers`,
      `DTSTAMP:${ics(Date.now())}`,
      `DTSTART:${ics(Date.parse(e.start_at))}`,
      `DTEND:${ics(eventEnd(e))}`,
      `SUMMARY:${esc(title)}`,
      loc ? `LOCATION:${esc(loc)}` : "",
      "END:VEVENT",
    );
  }
  lines.push("END:VCALENDAR");
  const blob = new Blob([lines.filter(Boolean).join("\r\n")], { type: "text/calendar" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

export async function shareSchedule() {
  const url = window.location.href;
  if (navigator.share) {
    try { await navigator.share({ title: "Legacy Hoopers Schedule", url }); return; } catch { /* cancelled */ }
  }
  try { await navigator.clipboard.writeText(url); } catch { /* no-op */ }
}
