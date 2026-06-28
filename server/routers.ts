import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { invokeLLM } from "./_core/llm";
import { z } from "zod";
import { fetchAllTournamentData, fetchLiveTournamentData, getTournamentLinks } from "./tournament";

const ASTER_AAU_SYSTEM_PROMPT = `You are the Aster Sports AAU Assistant — a helpful, knowledgeable guide for parents and players interested in the Aster Sports AAU Basketball Academy in Westchester County, New York.

ABOUT ASTER SPORTS AAU:
- Elite youth basketball development program in Westchester County, NY
- Founded and coached by Coach Kenny, a Master's-level educator
- Motto: "Grow Your Game · Own Your Future"
- Mascot: The Knight (blue-plumed knight)
- Currently running Spring 2026 season with 5 teams

TEAMS (Spring 2026):
- 11U Girls: 11-5 record, Nationals Qualified
- 10U Black: 10-6 record, 2x Champions
- 10U Blue: 3-5 record (development squad)
- 9U: 2-8 record (youngest team, building fundamentals)
- 8U: 3-13 record (intro to competitive play)

PRACTICE LOCATIONS:
- St. Patrick's School, Armonk NY — Skills Lab on Mondays
- Rippowam Cisqua School, Bedford NY — All teams on Tuesdays
- Westchester Country Club (PEB), Valhalla NY — All teams on Wednesdays

COACHING PHILOSOPHY:
- Teaching-first approach — every session structured by educators
- 90-minute development labs (not just scrimmages)
- Small rosters (max 10 per team) for individual attention
- Focus on fundamentals, game IQ, and character development
- "Zero shortcuts" — high standards for effort, attitude, and accountability

REGISTRATION:
- Registration, scheduling, and team management run through the Aster Sports app (astersports.app), which replaces LeagueApps.
- Interested families can reach out at frank@astersports.co (program) or coach@astersports.co (coaching) for tryout / interest-list consideration

ACADEMY STANDARDS:
- Players must demonstrate commitment to practice attendance
- Academic accountability is expected
- Respectful behavior on and off the court
- Parents are expected to be supportive and engaged

RESPONSE GUIDELINES:
- Be warm, professional, and enthusiastic about the program
- Keep responses concise (2-4 sentences for simple questions, more for detailed inquiries)
- Always encourage interested families to reach out by email at frank@astersports.co (or coach@astersports.co for coaching questions)
- If you don't know something specific, say so and suggest emailing coach@astersports.co (coaching questions) or frank@astersports.co (program questions)
- Never make up information about schedules, fees, or specific policies you don't have
- Use a confident but approachable tone that reflects the program's elite-but-welcoming culture`;

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  tournament: router({
    live: publicProcedure.query(async () => {
      const data = await fetchLiveTournamentData();
      return data;
    }),
    all: publicProcedure.query(async () => {
      const data = await fetchAllTournamentData();
      return data;
    }),
    links: publicProcedure.query(() => {
      return getTournamentLinks();
    }),
  }),

  chat: router({
    ask: publicProcedure
      .input(z.object({
        message: z.string().min(1).max(1000),
        history: z.array(z.object({
          role: z.enum(["user", "assistant"]),
          content: z.string(),
        })).optional().default([]),
      }))
      .mutation(async ({ input }) => {
        const messages: Array<{ role: "system" | "user" | "assistant"; content: string }> = [
          { role: "system", content: ASTER_AAU_SYSTEM_PROMPT },
          ...input.history.slice(-6).map(m => ({
            role: m.role as "user" | "assistant",
            content: m.content,
          })),
          { role: "user", content: input.message },
        ];

        try {
          const response = await invokeLLM({ messages });
          const rawContent = response.choices?.[0]?.message?.content;
          // Normalize: content can be a plain string OR a structured content array
          let reply: string;
          if (typeof rawContent === "string") {
            reply = rawContent;
          } else if (Array.isArray(rawContent)) {
            reply = rawContent
              .map((c: any) => (c.type === "text" ? c.text : ""))
              .join("")
              .trim();
          } else {
            reply = "";
          }
          if (!reply) {
            reply = "I'm sorry, I wasn't able to process that. Please try again or contact Coach Kenny directly.";
          }
          return { reply };
        } catch (error) {
          console.error("[Chat] LLM error:", error);
          return {
            reply: "I'm having trouble connecting right now. For immediate help, please email frank@astersports.co or contact Coach Kenny directly.",
          };
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
