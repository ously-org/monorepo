# Carry-Over Context — Google Auth Setup

**Date**: 2026-05-31
**Issue**: Login/Register with Google OAuth via Better Auth

---

## What Was Done

### Packages installed in `apps/api`
- `better-auth` (v1.6.13)
- `@better-auth/drizzle-adapter` (v1.6.13)
- `drizzle-orm` updated to `^0.45.2` (was `^0.30.10`) to satisfy better-auth peer dep

### Files changed / created

| File | What |
|---|---|
| `apps/api/src/auth.ts` | **Rewritten** — lazy better-auth instance (Google only, no email/password), unified middleware supporting both cookie-based and Bearer token auth |
| `apps/api/src/routes/auth.ts` | **New** — Mounts better-auth handler at `/api/auth/*`, Swagger-documented endpoints: `/google`, `/session`, `/signout`, `/token` |
| `apps/api/src/index.ts` | Mounts `/auth` routes, updated OpenAPI description with auth instructions |
| `apps/api/src/routes/profile.ts` | Adapted to new `Bindings` type (adds optional `GOOGLE_CLIENT_ID` etc.) |
| `apps/api/.dev.vars` | **New** — Template for `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `BETTER_AUTH_URL`, `BETTER_AUTH_SECRET` |
| `apps/api/example.dev.vars` | **New** — Annotated example with instructions |
| `apps/api/wrangler.toml` | Added `[vars]` section for production env vars |
| `.gitignore` | Added `.dev.vars` |
| `apps/api/src/index.test.ts` | Updated test expectations (drizzle called 2x instead of 1x due to better-auth path) |

### Architecture
- `@ously/db` schema (`user`, `session`, `account`, `verification` tables) was already designed for better-auth — no migration needed
- Auth middleware (`authMiddleware()`) checks **both** better-auth session cookie **and** `Authorization: Bearer <token>` header
- The `/auth/token` endpoint extracts the session token from better-auth's cookie so it can be used as a Bearer token in Swagger's Authorize dialog

### Verification
- `pnpm run type-check --filter api` ✓ passes
- `npx vitest run` in `apps/api` ✓ 19 tests pass

---

## How the Login/Register Flow Works

1. User hits `GET /auth/google` → redirects to Google OAuth
2. Google redirects back to `/api/auth/callback/google`
3. better-auth auto-creates user/account/session records
4. Session cookie set → browser is authenticated
5. For Swagger testing: call `GET /auth/token` to get a Bearer token

No separate registration — Google is the identity provider.

---

## Actionable Next Steps

### For human

| Priority | Task |
|---|---|
| 🔴 High | **Create Google OAuth credentials** at https://console.cloud.google.com/apis/credentials<br>— Web application type<br>— Authorized redirect URI: `http://localhost:8787/api/auth/callback/google` |
| 🔴 High | **Fill in `.dev.vars`** with actual values:<br>— `GOOGLE_CLIENT_ID` (from step above)<br>— `GOOGLE_CLIENT_SECRET` (from step above)<br>— `BETTER_AUTH_SECRET` (generate with `openssl rand -base64 32`)<br>— `BETTER_AUTH_URL=http://localhost:8787` |
| 🟡 Medium | **Set production secrets** via `wrangler secret put GOOGLE_CLIENT_ID` etc. before deploying |
| 🟡 Medium | **Add production redirect URI** (`https://api.ously.tech/api/auth/callback/google`) in Google Cloud Console |
| 🟢 Low | Decide: client-side auth on `web-main` / `web-prosper` (uses `better-auth/client` + `createAuthClient`) |

### For AI

| Priority | Task |
|---|---|
| 🔴 High | **Test the full OAuth flow** — `wrangler dev`, hit `/auth/google` in browser, verify user/session/account rows created in D1 |
| 🟡 Medium | **Add client-side auth** to `apps/web-main` — `createAuthClient` + `useSession` + sign-in button, sign-out button |
| 🟡 Medium | **Add rate limiting / CSRF protections** if needed for auth routes |
| 🟢 Low | **Add `@ously/auth` package** (referenced in `AGENTS.md` but doesn't exist yet) — extract better-auth config into shared package |
| 🟢 Low | **Handle `wrangler.toml` production vars** — currently empty placeholders; set via dashboard or `wrangler secret put` |

---

## Key File Paths

```
apps/api/
├── .dev.vars                    # Your actual secrets (gitignored)
├── example.dev.vars             # Template with instructions
├── wrangler.toml                # Cloudflare Workers config + D1 binding
└── src/
    ├── index.ts                 # Main app (Hono + OpenAPI + Swagger)
    ├── auth.ts                  # Better-auth instance + auth middleware
    └── routes/
        ├── auth.ts              # Auth endpoints + better-auth handler mount
        └── profile.ts           # GET /me, PATCH /me (authenticated)

packages/
├── domain/src/
│   ├── auth.ts                  # Session, Account, Verification interfaces
│   └── user.ts                  # User interface
├── db/src/schema.ts             # Drizzle schema (user, session, account, verification)
└── validation/src/index.ts      # Zod schemas (UserSchema, SessionSchema, etc.)
```
