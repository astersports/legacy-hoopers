import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the LLM module
vi.mock("./_core/llm", () => ({
  invokeLLM: vi.fn(),
}));

import { invokeLLM } from "./_core/llm";
const mockInvokeLLM = vi.mocked(invokeLLM);

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("chat.ask", () => {
  it("returns a plain string reply when LLM responds with a string", async () => {
    mockInvokeLLM.mockResolvedValueOnce({
      choices: [
        {
          message: {
            content: "You can register through the Aster Sports app!",
          },
        },
      ],
    } as any);

    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.chat.ask({
      message: "How do I register?",
      history: [],
    });

    expect(result.reply).toBe("You can register through the Aster Sports app!");
  });

  it("normalizes structured content array into a plain string", async () => {
    mockInvokeLLM.mockResolvedValueOnce({
      choices: [
        {
          message: {
            content: [
              { type: "text", text: "We practice at " },
              { type: "text", text: "three gyms in Westchester." },
            ],
          },
        },
      ],
    } as any);

    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.chat.ask({
      message: "Where do you practice?",
      history: [],
    });

    expect(result.reply).toBe("We practice at three gyms in Westchester.");
  });

  it("returns fallback message when LLM returns empty content", async () => {
    mockInvokeLLM.mockResolvedValueOnce({
      choices: [
        {
          message: {
            content: "",
          },
        },
      ],
    } as any);

    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.chat.ask({
      message: "Hello",
      history: [],
    });

    expect(result.reply).toContain("I'm sorry");
  });

  it("returns fallback message when LLM throws an error", async () => {
    mockInvokeLLM.mockRejectedValueOnce(new Error("Network error"));

    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.chat.ask({
      message: "Test error",
      history: [],
    });

    expect(result.reply).toContain("having trouble connecting");
  });

  it("passes conversation history to LLM", async () => {
    mockInvokeLLM.mockResolvedValueOnce({
      choices: [
        {
          message: {
            content: "Great follow-up response!",
          },
        },
      ],
    } as any);

    const caller = appRouter.createCaller(createPublicContext());
    await caller.chat.ask({
      message: "Tell me more",
      history: [
        { role: "user", content: "What teams do you have?" },
        { role: "assistant", content: "We have 5 teams in Spring 2026." },
      ],
    });

    expect(mockInvokeLLM).toHaveBeenCalledWith({
      messages: expect.arrayContaining([
        expect.objectContaining({ role: "system" }),
        expect.objectContaining({ role: "user", content: "What teams do you have?" }),
        expect.objectContaining({ role: "assistant", content: "We have 5 teams in Spring 2026." }),
        expect.objectContaining({ role: "user", content: "Tell me more" }),
      ]),
    });
  });
});
