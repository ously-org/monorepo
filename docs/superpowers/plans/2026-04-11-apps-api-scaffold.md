# Backend API Scaffolding (apps/api) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the backend API scaffolding for `apps/api` using Hono and Cloudflare Workers.

**Architecture:** Hono-based API running on Cloudflare Workers (D1 binding). Integrates with `@ously/auth`, `@ously/db`, and `@ously/validation`.

**Tech Stack:** Hono, Cloudflare Workers, Better Auth, D1 Database, pnpm workspaces.

---

### Task 1: Create apps/api directory and package.json

**Files:**
- Create: `apps/api/package.json`

- [ ] **Step 1: Create apps/api directory**
Run: `mkdir -p apps/api`

- [ ] **Step 2: Create package.json**
```json
{
  "name": "api",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "dev": "wrangler dev src/index.ts",
    "deploy": "wrangler deploy --minify src/index.ts"
  },
  "dependencies": {
    "@ously/auth": "workspace:*",
    "@ously/db": "workspace:*",
    "@ously/types": "workspace:*",
    "hono": "^4.4.7"
  },
  "devDependencies": {
    "@cloudflare/workers-types": "^4.20240529.0",
    "@ously/tsconfig": "workspace:*",
    "typescript": "^5.4.5",
    "wrangler": "^3.57.2"
  }
}
```

### Task 2: Create Hono API implementation

**Files:**
- Create: `apps/api/src/index.ts`

- [ ] **Step 1: Create src directory**
Run: `mkdir -p apps/api/src`

- [ ] **Step 2: Create index.ts**
```typescript
import { Hono } from "hono";
import { drizzle } from "drizzle-orm/d1";
import { auth as createAuth } from "@ously/auth";
import * as schema from "@ously/db";

type Bindings = {
  DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get("/", (c) => {
  return c.text("Ously API - Online");
});

app.get("/me", async (c) => {
  const db = drizzle(c.env.DB, { schema });
  const auth = createAuth(db);
  const session = await auth.api.getSession({
    headers: c.req.raw.headers,
  });

  if (!session) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  return c.json({ user: session.user });
});

export default app;
```

### Task 3: Create Cloudflare Wrangler configuration

**Files:**
- Create: `apps/api/wrangler.toml`

- [ ] **Step 1: Create wrangler.toml**
```toml
name = "api"
main = "src/index.ts"
compatibility_date = "2024-05-29"

[[d1_databases]]
binding = "DB"
database_name = "ously-db"
database_id = "your-database-id-here" # TBD in production

[env.production]
name = "api-prod"
routes = [
	{ pattern = "api.ously.com", custom_domain = true }
]
```

### Task 4: Create API documentation

**Files:**
- Create: `apps/api/GEMINI.md`

- [ ] **Step 1: Create GEMINI.md**
```markdown
# Ously API: Context

## Purpose
Shared Hono backend for all Ously webapps.

## Tech Stack
- Hono
- Cloudflare Workers
- Better Auth
- D1 Database

## Coding Rules
- Use `@ously/types` for all request/response schemas.
- All auth logic should use `@ously/auth`.
- Database access through Drizzle with `@ously/db` schema.
```

### Task 5: Install dependencies and Verify

- [ ] **Step 1: Run pnpm install**
Run: `pnpm install`

- [ ] **Step 2: Verify type checking**
Run: `pnpm -C apps/api exec tsc --noEmit`

### Task 6: Commit changes

- [ ] **Step 1: Commit**
Run: `git add . && git commit -m "feat: backend API scaffold (hono, cloudflare-worker)"`
