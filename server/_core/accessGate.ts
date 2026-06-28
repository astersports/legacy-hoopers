import { timingSafeEqual } from "crypto";
import type { Express, NextFunction, Request, Response } from "express";

/**
 * Site-wide access gate.
 *
 * This prototype site must only be reachable by the owner (frank@astersports.co).
 * We gate the ENTIRE app (static pages + tRPC API) behind HTTP Basic Auth rather
 * than the Manus OAuth flow, because that flow depends on the (decommissioning)
 * Manus auth server and has no login UI wired up. Basic Auth is self-contained,
 * has zero external dependencies, and is enforced by the browser on every request.
 *
 * Credentials come from env so nothing secret lives in the repo:
 *   - SITE_ACCESS_EMAIL    username to accept (default: frank@astersports.co)
 *   - SITE_ACCESS_PASSWORD password to accept (REQUIRED — no default)
 *
 * Fail-closed: if SITE_ACCESS_PASSWORD is unset the site denies everyone, so a
 * misconfiguration can never silently leave the site open to the public.
 */

const DEFAULT_EMAIL = "frank@astersports.co";
// MUST be ASCII-only: this string goes into the WWW-Authenticate HTTP header,
// and Node throws ERR_INVALID_CHAR on any non-ASCII byte (e.g. an em dash),
// which would suppress the browser's Basic Auth prompt entirely.
const REALM = "Aster AAU private site";

function allowedEmail(): string {
  return (process.env.SITE_ACCESS_EMAIL ?? DEFAULT_EMAIL).trim().toLowerCase();
}

function accessPassword(): string {
  return process.env.SITE_ACCESS_PASSWORD ?? "";
}

// Paths that carry their own authentication and must stay reachable by their
// non-browser callers (the scheduled game-check cron authenticates via its own
// signed cron JWT inside the handler).
const SELF_AUTHED_PATHS = new Set(["/api/scheduled/game-check"]);

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

function parseBasicAuth(
  header: string | undefined
): { user: string; pass: string } | null {
  if (!header || !header.startsWith("Basic ")) return null;
  let decoded: string;
  try {
    decoded = Buffer.from(header.slice(6), "base64").toString("utf8");
  } catch {
    return null;
  }
  const sep = decoded.indexOf(":");
  if (sep === -1) return null;
  return { user: decoded.slice(0, sep), pass: decoded.slice(sep + 1) };
}

function challenge(res: Response) {
  res
    .status(401)
    .set("WWW-Authenticate", `Basic realm="${REALM}", charset="UTF-8"`)
    .type("text/plain")
    .send("Authentication required.");
}

export function accessGate(req: Request, res: Response, next: NextFunction) {
  if (SELF_AUTHED_PATHS.has(req.path)) {
    next();
    return;
  }

  const password = accessPassword();
  if (!password) {
    console.error(
      "[AccessGate] SITE_ACCESS_PASSWORD is not set — denying all requests (fail-closed)."
    );
    res
      .status(503)
      .type("text/plain")
      .send("Access control is not configured. Set SITE_ACCESS_PASSWORD.");
    return;
  }

  const creds = parseBasicAuth(req.headers.authorization);
  if (!creds) {
    challenge(res);
    return;
  }

  const emailOk = safeEqual(creds.user.trim().toLowerCase(), allowedEmail());
  const passOk = safeEqual(creds.pass, password);
  // Always evaluate both comparisons before branching to avoid leaking which
  // half was wrong via response timing.
  if (emailOk && passOk) {
    next();
    return;
  }

  challenge(res);
}

export function registerAccessGate(app: Express) {
  app.use(accessGate);
}
