import { ServerResponse } from "http";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { NextFunction, Request, Response } from "express";
import { accessGate } from "./_core/accessGate";

function makeReq(opts: { path?: string; authorization?: string }): Request {
  return {
    path: opts.path ?? "/",
    headers: opts.authorization ? { authorization: opts.authorization } : {},
  } as unknown as Request;
}

function makeRes() {
  const res: Record<string, unknown> = {};
  res.statusCode = 200;
  res.headers = {} as Record<string, string>;
  res.body = undefined;
  res.status = vi.fn((code: number) => {
    res.statusCode = code;
    return res;
  });
  res.set = vi.fn((key: string, value: string) => {
    (res.headers as Record<string, string>)[key] = value;
    return res;
  });
  res.type = vi.fn(() => res);
  res.send = vi.fn((b: unknown) => {
    res.body = b;
    return res;
  });
  return res as unknown as Response & {
    statusCode: number;
    headers: Record<string, string>;
    body: unknown;
  };
}

function basic(user: string, pass: string): string {
  return "Basic " + Buffer.from(`${user}:${pass}`).toString("base64");
}

const ORIGINAL = { ...process.env };

beforeEach(() => {
  process.env.SITE_ACCESS_EMAIL = "frank@astersports.co";
  process.env.SITE_ACCESS_PASSWORD = "s3cret";
});

afterEach(() => {
  process.env = { ...ORIGINAL };
});

describe("accessGate", () => {
  it("allows the owner with correct credentials", () => {
    const next = vi.fn() as unknown as NextFunction;
    const res = makeRes();
    accessGate(makeReq({ authorization: basic("frank@astersports.co", "s3cret") }), res, next);
    expect(next).toHaveBeenCalledOnce();
    expect(res.statusCode).toBe(200);
  });

  it("accepts the owner email case-insensitively", () => {
    const next = vi.fn() as unknown as NextFunction;
    const res = makeRes();
    accessGate(makeReq({ authorization: basic("Frank@AsterSports.co", "s3cret") }), res, next);
    expect(next).toHaveBeenCalledOnce();
  });

  it("challenges when no credentials are supplied", () => {
    const next = vi.fn() as unknown as NextFunction;
    const res = makeRes();
    accessGate(makeReq({}), res, next);
    expect(next).not.toHaveBeenCalled();
    expect(res.statusCode).toBe(401);
    expect(res.headers["WWW-Authenticate"]).toContain("Basic");
  });

  it("rejects a wrong password", () => {
    const next = vi.fn() as unknown as NextFunction;
    const res = makeRes();
    accessGate(makeReq({ authorization: basic("frank@astersports.co", "nope") }), res, next);
    expect(next).not.toHaveBeenCalled();
    expect(res.statusCode).toBe(401);
  });

  it("rejects a different email even with the right password", () => {
    const next = vi.fn() as unknown as NextFunction;
    const res = makeRes();
    accessGate(makeReq({ authorization: basic("someone@else.com", "s3cret") }), res, next);
    expect(next).not.toHaveBeenCalled();
    expect(res.statusCode).toBe(401);
  });

  it("fails closed (503) when no password is configured", () => {
    delete process.env.SITE_ACCESS_PASSWORD;
    const next = vi.fn() as unknown as NextFunction;
    const res = makeRes();
    accessGate(makeReq({ authorization: basic("frank@astersports.co", "s3cret") }), res, next);
    expect(next).not.toHaveBeenCalled();
    expect(res.statusCode).toBe(503);
  });

  it("emits a WWW-Authenticate header that Node accepts (ASCII-only realm)", () => {
    // Regression: a non-ASCII realm (e.g. an em dash) makes Node's setHeader
    // throw ERR_INVALID_CHAR, which suppresses the browser login prompt. Drive
    // the header through a real ServerResponse so its validation actually runs.
    const realRes = new ServerResponse({ headers: {} } as never);
    const res = makeRes();
    (res.set as unknown) = vi.fn((key: string, value: string) => {
      realRes.setHeader(key, value); // throws if value is not valid HTTP
      (res.headers as Record<string, string>)[key] = value;
      return res;
    });
    const next = vi.fn() as unknown as NextFunction;
    expect(() => accessGate(makeReq({}), res, next)).not.toThrow();
    expect(res.statusCode).toBe(401);
    expect(res.headers["WWW-Authenticate"]).toContain("Basic");
  });

  it("lets the self-authenticated cron endpoint through to its own auth", () => {
    const next = vi.fn() as unknown as NextFunction;
    const res = makeRes();
    accessGate(makeReq({ path: "/api/scheduled/game-check" }), res, next);
    expect(next).toHaveBeenCalledOnce();
  });
});
