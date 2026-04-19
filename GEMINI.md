# Ously Monorepo: Master AI Context

## Scope & Purpose
**Status:** Monorepo Setup Complete.
The scope of the initial Gemini CLI task was strictly to **setup the monorepo foundation**. This includes the Turborepo orchestration, shared configurations, and the basic scaffolding of apps and packages. 

**Note to future agents:** Do not expand the infrastructure unless explicitly instructed. Focus on feature development within the established boundaries.

## 🧠 The Vibe Coding Framework
We operate under a 3-Pillar Framework to prevent technical debt:
1. **Rules:** Enforce strict architectural boundaries (Domain-First).
2. **Human:** Externalize decision-making to this document and Agent Prompts.
3. **AI:** Mandatory orchestration (TSC, Lint, Format) in every feedback loop.

## 🏗️ AI-Native Architecture
1. **Domain (@ously/domain):** Pure TS Interfaces. Zero dependencies. The "Skeleton."
2. **Validation (@ously/validation):** Zod schemas mapped to Domain via `match<T>`.
3. **DB (@ously/db):** D1/SQLite schemas mapped to Domain via `matchTable<T>`.
4. **API (apps/api):** Hono Gateway. The ONLY entry point to DB. Exports RPC `AppType`.

## Project Goals
- Multi-app frontend (Ously Main + Prosper)
- Shared Hono Backend on Cloudflare Workers
- AI-Native structure for context-aware agents

## Monorepo Layout
- `apps/`: Deployable units
    - `api`: Hono Gateway. Exports RPC `AppType`. The ONLY entry point to DB.
    - `web-main`: Next.js frontend (Ously)
    - `web-prosper`: Next.js frontend (Prosper)
- `packages/`: Shared libraries
    - `tsconfig`: Shared TypeScript rules
    - `config-tailwind`: Shared design tokens & themes
    - `ui`: Shared UI components (Internal shadcn components wrapped for public use)
    - `db`: D1/SQLite schemas mapped to Domain via `matchTable<T>`.
    - `domain`: Pure TS Interfaces. Zero dependencies. The "Skeleton."
    - `validation`: Zod schemas mapped to Domain via `match<T>`.

## Critical Constraints
- Apps MUST use `packages/validation` for data shapes.
- UI components MUST be abstract and theme-injected.
- `packages/ui` only exposes wrapped components; raw shadcn components are kept internal.
- NO cross-package relative imports allowed; apps and packages MUST use absolute imports for workspace dependencies (e.g., `@ously/ui`, `@ously/validation`).
- Internal package imports SHOULD use relative paths to ensure compatibility with standard build and resolution tools.

## Platform-Specific Constraints
- **Cloudflare Pages:** NEVER use `route` or `custom_domain` keys in `wrangler.toml` for Pages projects. These are Workers-only features.
- **Cloudflare Compatibility:** ALL projects (`wrangler.toml`) MUST include `compatibility_flags = ["nodejs_compat"]` and a `compatibility_date` of `2024-09-23` or newer.
- **Next.js on Cloudflare:** ALWAYS use `@cloudflare/next-on-pages` for deployment. Build directory MUST be `.vercel/output/static`.
- **Research First:** Before configuring infrastructure for specific platforms (Cloudflare, Polar, etc.), ALWAYS use `web_search` to verify the latest official configuration schema.
