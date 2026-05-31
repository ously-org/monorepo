# Ously Monorepo Context

Managed via pnpm & Turborepo.

## 🏗 Architecture & Conventions

- **`@ously/domain`**: Pure TS interfaces. **ZERO dependencies.**
- **`@ously/db`**: Drizzle schemas for Cloudflare D1. Tables MUST align with domain using `matchTable<T>()`.
- **`@ously/validation`**: Zod schemas. MUST align with domain using `match<T>()`.
- **`@ously/ui`**: Design System. No DB/API calls.
- **`@ously/auth` & `@ously/tsconfig` & `@ously/config-tailwind`**: Shared configurations/auth.
- **`apps/api`**: Shared Hono backend on Cloudflare Workers.
- **`apps/web-main` & `web-prosper`**: Next.js applications.

## 📜 Coding Conventions

1. **Domain-First**: All feature development MUST start by defining interfaces in `@ously/domain`.
2. **Tracking Headers**: Add `// ISSUE_#<number> | <date> | <desc> | <tool> | <model>` ONLY for functional runtime changes.
3. **GitHub CLI**: Use `gh` for all GitHub interactions. Never merge PRs (human-only).

## 🤖 AI Workflow

- **Antigravity CLI**: Planning, spec creation, issues, and PR management.
- **OpenCode**: Code execution, linting, type-checking, and tests.
