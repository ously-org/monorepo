# Ously Monorepo Design Specification (Final)

**Date:** 2026-04-11  
**Project:** Ously Monorepo  
**Goal:** Create a unified, AI-native monorepo containing multiple Next.js webapps and a shared Hono backend, all deployed to Cloudflare with global tax compliance via Polar.sh.

---

## 1. Core Architecture & Tech Stack

The project uses **Turborepo** with **pnpm** for orchestration and **TypeScript** for end-to-end safety.

### **Frontend (Apps)**
- **Next.js (App Router):** Two apps: `web-main` (Ously) and `web-prosper` (Prosper).
- **Cloudflare Pages:** Automated deployments.
- **Styling:** **Tailwind CSS** + **shadcn/ui** (Shared components with per-app color themes).

### **Backend (Apps)**
- **Hono:** Ultra-fast API on **Cloudflare Workers**.
- **Better Auth:** Modern, edge-ready authentication (Social, MFA, Passkeys).
- **Polar.sh:** Merchant of Record for global payments and VAT compliance.

### **Persistence & Data**
- **Cloudflare D1:** Serverless SQLite database.
- **Drizzle ORM:** Type-safe database management and migrations.

### **Shared Packages (`packages/`)**
- **`db`**: Drizzle schema definitions and migrations for D1.
- **`auth`**: Better Auth configuration and shared auth client.
- **`payments`**: Polar.sh SDK wrapper and shared billing logic.
- **`ui`**: Shared shadcn/ui components (Radix-based).
- **`config-tailwind`**: Shared themes and CSS variable configurations.
- **`types`**: Zod schemas and shared TS interfaces (Frontend <-> Backend).

---

## 2. Folder Structure (AI-Native Layout)

```text
/
├── apps/
│   ├── api/                # Hono API (Cloudflare Workers)
│   │   ├── src/
│   │   ├── wrangler.toml   # api.ously.com
│   │   └── GEMINI.md       # Backend logic context
│   ├── web-main/           # Next.js (ously.com)
│   │   ├── app/
│   │   ├── wrangler.toml   # Custom domain config
│   │   └── GEMINI.md       # Ously business context
│   └── web-prosper/        # Next.js (prosper.ously.com)
│       ├── app/
│       ├── wrangler.toml   # Custom domain config
│       └── GEMINI.md       # Prosper business context
├── packages/
│   ├── db/                 # Drizzle Schema & Migrations
│   ├── auth/               # Better Auth Instance
│   ├── payments/           # Polar.sh Integration
│   ├── ui/                 # Shared Components
│   ├── config-tailwind/    # Shared CSS/Theme rules
│   └── types/              # Shared Zod/TS Types
├── .github/workflows/      # CI/CD (Cloudflare Deployments)
├── turbo.json              # Build pipeline
└── GEMINI.md               # Monorepo Master Guideline (The Brain)
```

---

## 3. AI-Native "Context Guarding" Strategy

To ensure AI (Gemini CLI) never loses track of the 3 independent projects:

1.  **Project Manifests (`GEMINI.md`):** Every sub-project folder contains its own `GEMINI.md`. This file tells the AI: "You are now working in the Prosper app. Its primary goal is X. Do not change the UI in `packages/ui` unless it's an abstract change."
2.  **The "Bridge" Packages:**
    -   `packages/types`: All communication between Hono and Next.js **must** use these Zod-validated types. This allows the AI to "trace" data flow automatically.
    -   `packages/db`: A single source of truth for the database.
3.  **Explicit Environment Docs:**
    -   `wrangler.toml` files will include comments specifically for AI to understand which secrets (API keys) are required for each environment.

---

## 4. CI/CD & Cloudflare Deployment

- **GitHub Actions:** 
    -   Uses `turbo prune` to deploy only what changed.
    -   Deploys Workers via `wrangler deploy`.
    -   Deploys Pages via `wrangler pages deploy`.
- **Domain Config:** Managed via `wrangler.toml` keys to keep infrastructure "in code."

---

## 5. Visual Identity & Theming

- **System:** `packages/ui` exports "naked" components using CSS variables.
- **App-Level:** `web-main` and `web-prosper` inject their own color palettes into these variables via their root `layout.tsx` and `globals.css`.
- **Polar.sh Integration:** Payments will be handled via a shared library that syncs Polar webhooks into our D1 database.

---

## 6. Success Criteria

- Turborepo successfully orchestrates builds for all apps and packages.
- A single `pnpm install` sets up the entire environment.
- Polar.sh webhooks successfully update user subscription status in D1.
- AI (Gemini CLI) can accurately answer "How does a user pay in Prosper?" by reading the `packages/payments` and `apps/web-prosper` contexts.
