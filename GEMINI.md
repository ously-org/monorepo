# Ously Monorepo: Master AI Context

## Project Goals
- Multi-app frontend (Ously Main + Prosper)
- Shared Hono Backend on Cloudflare Workers
- AI-Native structure for context-aware agents

## Monorepo Layout
- `apps/`: Deployable units (Hono, Next.js)
- `packages/`: Shared libraries
    - `db`: Drizzle schema (derived from Better Auth; update via `pnpm dlx @better-auth/cli generate`)
    - `auth`: Better Auth configuration
    - `ui`: Shared UI components (shadcn)


## Critical Constraints
- Apps MUST use `packages/types` for data shapes.
- UI components MUST be abstract and theme-injected.
