# Legacy Hoopers — Website (rebuild queued)

Public website for **Legacy Hoopers LLC** (Westchester NY AAU youth basketball) — live
scores, tournament history, season leaderboard, film highlights.

> **STATUS: throwaway prototype — DO NOT SHIP.**
> This repo is a 2-day Manus prototype. Per the platform charter (Manus register **M4**), the
> real Legacy Hoopers site will be **rebuilt later on Railway as a thin consumer of the
> `aster-sports` public read API** (hardened SECDEF RPCs — never direct tables, never a data
> clone, never re-hardcoded tenant facts). The only thing to carry forward from this
> prototype is the **"Court Noir" design language** (see [`ideas.md`](./ideas.md)). Everything
> else is reference, not foundation.

**Org:** Legacy Hoopers LLC — a *tenant* of the Aster Sports platform, a separate company
from Aster Sports.
**Owner of this repo:** Olive Juice Inc (DBA Aster Sports).

## Stack (prototype, as-is)

| Layer | Tech |
|---|---|
| Frontend | React 19 · Tailwind CSS 4 · Vite 7 · Wouter |
| Server | Express 4 · tRPC 11 |
| DB | MySQL/TiDB via Drizzle ORM (`mysql2`) — prototype only |
| Motion / charts | GSAP · Recharts |
| AI chat | `streamdown` (LLM Q&A prototype) |

## Quickstart (to run the prototype locally only)

```bash
git clone git@github.com:astersports/legacy-hoopers.git
cd legacy-hoopers
pnpm install
cp .env.example .env   # DATABASE_URL — file may need creating
pnpm dev
```

## Access restriction (owner-only)

The whole site (static pages **and** the tRPC API) is gated behind HTTP Basic Auth
so only the owner can reach it — see `server/_core/accessGate.ts`. Configure it with
two environment variables on the host (Railway):

| Env var | Required | Default | Purpose |
|---|---|---|---|
| `SITE_ACCESS_PASSWORD` | **yes** | — | Password the browser must supply. |
| `SITE_ACCESS_EMAIL` | no | `frank@astersports.co` | Username (an email) the browser must supply. |

When prompted by the browser, sign in with the email as the **username** and
`SITE_ACCESS_PASSWORD` as the **password**.

**Fail-closed:** if `SITE_ACCESS_PASSWORD` is unset the site denies *everyone*
(HTTP 503), so a misconfiguration can never leave it open to the public. The
self-authenticated cron endpoint (`/api/scheduled/game-check`) is exempt because it
verifies its own signed cron token.

## Scripts (from package.json)

```bash
pnpm dev      # dev server (tsx watch)
pnpm build    # vite build + esbuild server bundle → dist/
pnpm start    # NODE_ENV=production node dist/index.js
pnpm check    # tsc --noEmit
pnpm test     # vitest run
pnpm format   # prettier --write .
pnpm db:push  # drizzle-kit generate && migrate
```

## When the real rebuild starts (charter R7)

- New repo state gets a `CLAUDE.md` + CI workflow (lane stand-up).
- Architecture: **thin client of the app's public read API** (charter Q4/Q5 doctrine). The
  schedule/records data lives in the app's Supabase; this site reads it through org-gated
  SECDEF RPCs (the `get_public_team_records` / `org_is_public_listed` pattern).
- Data hygiene: public youth data = **first name + jersey number only** (already public).
  Keep any real PII (DOB, address, contact, parent info) and per-child place+time off public
  pages, behind family login in the app.
