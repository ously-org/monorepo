# Ously Monorepo: Master AI Context

## Scope & Purpose
**Status:** Monorepo Setup Complete.
The scope of the initial Gemini CLI task was strictly to **setup the monorepo foundation**. This includes the Turborepo orchestration, shared configurations, and the basic scaffolding of apps and packages. 

**Note to future agents:** Do not expand the infrastructure unless explicitly instructed. Focus on feature development within the established boundaries.

## Project Goals
- Multi-app frontend (Ously Main + Prosper)
- Shared Hono Backend on Cloudflare Workers
- AI-Native structure for context-aware agents

## Monorepo Layout
- `apps/`: Deployable units
    - `api`: Hono backend (Cloudflare Workers)
    - `web-main`: Next.js frontend (Ously)
    - `web-prosper`: Next.js frontend (Prosper)
- `packages/`: Shared libraries
    - `tsconfig`: Shared TypeScript rules
    - `config-tailwind`: Shared design tokens & themes
    - `ui`: Shared UI components (Internal shadcn components wrapped for public use)
    - `db`: Drizzle schema (Database structure reference)
    - `types`: Shared TS interfaces & Zod schemas

## Critical Constraints
- Apps MUST use `packages/types` for data shapes.
- UI components MUST be abstract and theme-injected.
- `packages/ui` only exposes wrapped components; raw shadcn components are kept internal.
- NO cross-package relative imports allowed; apps and packages MUST use absolute imports for workspace dependencies (e.g., `@ously/ui`, `@ously/types`).
- Internal package imports SHOULD use relative paths to ensure compatibility with standard build and resolution tools.

