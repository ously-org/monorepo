# Ously Monorepo Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a unified, AI-native monorepo containing multiple Next.js webapps and a shared Hono backend, all deployed to Cloudflare with global tax compliance via Polar.sh.

**Architecture:** Layered monorepo with Turborepo for orchestration and pnpm for package management. Shared packages for UI, DB, Auth, and Payments to ensure consistency across frontends and backends.

**Tech Stack:** 
- **Monorepo:** Turborepo, pnpm
- **Frontends:** Next.js (App Router), Tailwind CSS, shadcn/ui
- **Backend:** Hono, Cloudflare Workers
- **Persistence:** Cloudflare D1, Drizzle ORM
- **Authentication:** Better Auth
- **Payments:** Polar.sh
- **AI-Native:** Multi-level `GEMINI.md` manifests for context-aware agents.

---

### Task 1: Monorepo & Root Scaffolding

**Files:**
- Create: `package.json`
- Create: `turbo.json`
- Create: `pnpm-workspace.yaml`
- Create: `.gitignore`
- Create: `GEMINI.md` (Root Manifest)

- [ ] **Step 1: Initialize pnpm workspace and root package.json**

```json
{
  "name": "ously-monorepo",
  "private": true,
  "scripts": {
    "build": "turbo build",
    "dev": "turbo dev",
    "lint": "turbo lint",
    "format": "prettier --write \"**/*.{ts,tsx,md}\"",
    "type-check": "turbo type-check"
  },
  "devDependencies": {
    "turbo": "^2.7.2",
    "prettier": "^3.0.0",
    "typescript": "^5.0.0"
  },
  "packageManager": "pnpm@10.30.3"
}
```

- [ ] **Step 2: Create `pnpm-workspace.yaml`**

```yaml
packages:
  - "apps/*"
  - "packages/*"
```

- [ ] **Step 3: Create `turbo.json`**

```json
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "dist/**"]
    },
    "lint": {
      "cache": false
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "type-check": {
      "dependsOn": ["^build"]
    }
  }
}
```

- [ ] **Step 4: Create Root `GEMINI.md` (AI Brain)**

```markdown
# Ously Monorepo: Master AI Context

## Project Goals
- Multi-app frontend (Ously Main + Prosper)
- Shared Hono Backend on Cloudflare Workers
- AI-Native structure for context-aware agents

## Monorepo Layout
- `apps/`: Deployable units (Hono, Next.js)
- `packages/`: Shared libraries (DB, Auth, UI)

## Critical Constraints
- Apps MUST use `packages/types` for data shapes.
- UI components MUST be abstract and theme-injected.
```

- [ ] **Step 5: Run `pnpm install` and Commit**

Run: `pnpm install`
Commit: `git add . && git commit -m "chore: initial turborepo scaffold"`

---

### Task 2: Shared Config Packages (`packages/*`)

**Files:**
- Create: `packages/tsconfig/base.json`, `packages/tsconfig/package.json`
- Create: `packages/config-tailwind/tailwind.config.ts`, `packages/config-tailwind/package.json`
- Create: `packages/types/src/index.ts`, `packages/types/package.json`

- [ ] **Step 1: Create `packages/tsconfig` package for consistent TS rules**
- [ ] **Step 2: Create `packages/config-tailwind` package for shared design tokens**
- [ ] **Step 3: Create `packages/types` package for shared Zod schemas (API contracts)**
- [ ] **Step 4: Commit**

---

### Task 3: Shared UI Package (`packages/ui`)

**Files:**
- Create: `packages/ui/package.json`
- Create: `packages/ui/src/index.ts`
- Create: `packages/ui/src/components/button.tsx` (Example shadcn component)

- [ ] **Step 1: Scaffold UI package with Radix and Tailwind**
- [ ] **Step 2: Implement abstract components that use CSS variables for colors**
- [ ] **Step 3: Export components from `index.ts`**
- [ ] **Step 4: Commit**

---

### Task 4: Database & Auth Infrastructure (`packages/db`, `packages/auth`)

**Files:**
- Create: `packages/db/src/schema.ts`, `packages/db/drizzle.config.ts`
- Create: `packages/auth/src/index.ts`

- [ ] **Step 1: Scaffold `packages/db` with Drizzle ORM for Cloudflare D1**
- [ ] **Step 2: Define core `users`, `sessions`, and `organizations` schema**
- [ ] **Step 3: Scaffold `packages/auth` with Better Auth and Drizzle Adapter**
- [ ] **Step 4: Commit**

---

### Task 5: Backend API Scaffolding (`apps/api`)

**Files:**
- Create: `apps/api/src/index.ts`
- Create: `apps/api/wrangler.toml` (Custom domain: `api.ously.com`)
- Create: `apps/api/GEMINI.md`

- [ ] **Step 1: Initialize Hono API on Cloudflare Worker**
- [ ] **Step 2: Set up D1 and Auth bindings**
- [ ] **Step 3: Create base route and middleware**
- [ ] **Step 4: Commit**

---

### Task 6: Next.js Apps Scaffolding (`apps/web-main`, `apps/web-prosper`)

**Files:**
- Create: `apps/web-main/` (Next.js scaffold)
- Create: `apps/web-prosper/` (Next.js scaffold)
- Create: `apps/*/wrangler.toml`

- [ ] **Step 1: Scaffold `web-main` (Ously) and inject shared Tailwind config**
- [ ] **Step 2: Scaffold `web-prosper` (Prosper) and inject shared Tailwind config**
- [ ] **Step 3: Define per-app color schemes using CSS variables in `globals.css`**
- [ ] **Step 4: Commit**

---

### Task 7: Payments Integration (`packages/payments`)

**Files:**
- Create: `packages/payments/src/index.ts`
- Create: `packages/payments/package.json`

- [ ] **Step 1: Scaffold `packages/payments` with Polar.sh SDK**
- [ ] **Step 2: Implement shared Webhook handler for backend consumption**
- [ ] **Step 3: Commit**

---

### Task 8: GitHub Actions CI/CD

**Files:**
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: Create workflow that uses `turbo prune` for efficient deployments**
- [ ] **Step 2: Configure `wrangler` deployment commands for Workers and Pages**
- [ ] **Step 3: Commit**

---

## Final Review Check

1. **AI-Native Check:** Every `apps/*` and `packages/*` folder has its own `GEMINI.md` file?
2. **Type Safety Check:** All apps use `packages/types` for API contracts?
3. **Theming Check:** Can `web-main` and `web-prosper` use different colors for the same `Button` component?
4. **Deployment Check:** Are all Cloudflare domains documented in `wrangler.toml`?
