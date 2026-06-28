/*
 * Coach Kenny — clean & light. Copy carried over from the prior site
 * (operator to confirm credentials/bio specifics).
 */
import { Award, GraduationCap, Heart, Target } from "lucide-react";
import { AgentScanConsole } from "@/components/agent/AgentScanConsole";
import { COACH_SCAN } from "@/lib/agentScans";

const credentials = [
  { icon: GraduationCap, title: "Master's in Education", desc: "Differentiated instruction and learning theory applied to basketball development." },
  { icon: Award, title: "AAU coaching experience", desc: "Multiple seasons coaching competitive travel basketball at the highest youth levels." },
  { icon: Heart, title: "Teaching-first approach", desc: "Every drill, concept, and correction is rooted in educational best practices." },
  { icon: Target, title: "Player development focus", desc: "Individual growth plans for every athlete, tracking skill progression across seasons." },
];

const philosophy = [
  "Basketball is a vehicle for teaching life skills — discipline, accountability, and resilience.",
  "Every player deserves coaching that meets them where they are and pushes them forward.",
  "Competition reveals character. How you respond to adversity defines who you become.",
  "Parents are partners, not spectators. Alignment between home and court accelerates growth.",
  "There are no shortcuts. Development takes time, repetition, and intentional practice.",
];

export default function CoachKenny() {
  return (
    <div>
      <section className="border-b border-border bg-gradient-to-b from-secondary/50 to-background">
        <div className="container py-16">
          <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold-text">Program leadership</span>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">Coach Kenny</h1>
          <p className="mt-4 max-w-lg text-lg text-muted-foreground">
            Founder, head coach, and the driving force behind Aster Sports AAU's teaching-first philosophy.
          </p>
          <AgentScanConsole scan={COACH_SCAN} className="mt-8 max-w-2xl" />
        </div>
      </section>

      <section className="container py-14">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
              <h2 className="text-xl font-extrabold tracking-tight text-foreground">The educator-coach</h2>
              <div className="mt-5 space-y-4 leading-relaxed text-muted-foreground">
                <p>
                  Coach Kenny founded Aster Sports AAU with a simple conviction: youth basketball coaching should
                  be held to the same standard as classroom teaching. With a{" "}
                  <span className="font-semibold text-foreground">Master's degree in Education</span>, he brings
                  pedagogical expertise most youth coaches simply don't have.
                </p>
                <p>
                  His approach is rooted in differentiated instruction — the same methodology used by the best
                  teachers in the country. Every player receives coaching tailored to their learning style, skill
                  level, and developmental stage.
                </p>
                <p>
                  Before founding Aster Sports AAU, Coach Kenny spent years studying what separates elite
                  development programs from recreational leagues. The answer wasn't talent — it was structure,
                  accountability, and intentional teaching.
                </p>
                <p>
                  That's what Aster Sports AAU delivers. Not a rec league with better jerseys — a genuine academy
                  where every minute of practice is designed and every player's growth is tracked.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3 lg:col-span-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-primary">Credentials</h3>
            {credentials.map((c) => (
              <div key={c.title} className="rounded-xl border border-border bg-card p-5 shadow-sm">
                <div className="flex items-start gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                    <c.icon className="h-4 w-4" />
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-foreground">{c.title}</h4>
                    <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{c.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-secondary/30">
        <div className="container py-14">
          <h2 className="mb-8 text-2xl font-extrabold tracking-tight text-foreground">Coaching philosophy</h2>
          <div className="mx-auto max-w-3xl space-y-3">
            {philosophy.map((p, i) => (
              <div key={i} className="flex items-start gap-4 rounded-xl border border-border bg-card p-5 shadow-sm">
                <span className="w-8 shrink-0 text-lg font-extrabold text-primary">{String(i + 1).padStart(2, "0")}</span>
                <p className="pt-0.5 text-sm leading-relaxed text-muted-foreground">{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
