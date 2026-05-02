# Ously Monorepo: Root Context

This is the primary repository for the Ously project, managed as a pnpm monorepo with Turborepo. It contains all services, shared packages, and project management workflows.

## 🏗 Project Architecture

### Applications (`apps/`)
- **`api`**: Shared Hono backend deployed on Cloudflare Workers. Uses D1 and Better Auth.
- **`web-main`**: Primary Next.js web application.
- **`web-prosper`**: Specialized Next.js web application.

### Shared Packages (`packages/`)
- **`@ously/domain`**: **The Skeleton.** Contains pure TypeScript interfaces. Absolute source of truth. **Mandate: ZERO dependencies.**
- **`@ously/db`**: **Storage Layer.** Drizzle schemas and migrations for Cloudflare D1 (SQLite).
- **`@ously/validation`**: **The Enforcer.** Zod schemas for request/response validation, matching Domain interfaces.
- **`@ously/ui`**: **Design System.** Shared React components based on shadcn/ui. Exposes wrapped components only.
- **`@ously/auth`**: Shared authentication logic and configurations.
- **`@ously/tsconfig`**: Shared TypeScript configurations.
- **`@ously/config-tailwind`**: Shared Tailwind CSS configurations.

---

## 🛠 Tech Stack
- **Runtimes**: Node.js, Cloudflare Workers.
- **Frameworks**: Next.js (Frontend), Hono (Backend).
- **Database**: Cloudflare D1 (SQLite) with Drizzle ORM.
- **Styling**: Tailwind CSS, shadcn/ui.
- **Monorepo Tools**: pnpm, Turborepo.
- **Validation**: Zod.

---

## 🚀 Key Commands
- **Install Dependencies**: `pnpm install`
- **Development Mode**: `pnpm dev` (runs `turbo dev` for all apps)
- **Production Build**: `pnpm build` (runs `turbo build` for all apps)
- **Linting**: `pnpm lint`
- **Type Checking**: `pnpm type-check`
- **Formatting**: `pnpm format` (uses Prettier)

---

## 📜 Development Conventions

### 1. Domain-First Development
All feature development **MUST** start by defining interfaces in `@ously/domain`. This package must remain dependency-free.

### 2. Structural Alignment
- **Validation**: Every Zod schema in `@ously/validation` must conform to a Domain interface using the `match<T>()` helper.
- **Database**: Every table in `@ously/db` must align with Domain interfaces using the `matchTable<T>()` helper.

### 3. Shared UI
- Avoid direct database or API calls within `@ously/ui`.
- Components must be abstract and theme-injected.
- Expose only wrapped components; raw shadcn components stay internal.

### 4. API & Auth
- Use `@ously/validation` for all request/response schemas in the `api`.
- All auth logic should reside in or utilize `@ously/auth`.

---

## 📈 Project Management (PM)
Project management is handled within the `pm/` directory and integrated with GitHub Issues/Projects.

- **EPIC-Driven**: Features start as `[Epic]` issues and are broken down into atomic sub-issues.
- **Estimation**: 1 Unit = 2 Hours. Capacity is tracked in units.
- **Workflow**: See `pm/GEMINI.md` for detailed GraphQL-based issue management and automation commands.

---

## 🤖 Gemini CLI Usage
This `GEMINI.md` file serves as your primary context. For specific sub-tasks, refer to the local `GEMINI.md` files in each app or package directory for more granular rules.
