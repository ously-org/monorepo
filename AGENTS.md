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
- **`@ously/ui`**: **Design System.** Shared React components based on shadcn/ui.
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

### 0. File Change Tracking

For every file edited as part of a task, add a comment header at the top of the file with the format:

```
// ISSUE_#<number> | <YYYY-MM-DD> | <One-line summary of the change>
```

For files with YAML frontmatter (`---` delimited), use an HTML comment above the frontmatter:

```
<!-- ISSUE_#<number> | <YYYY-MM-DD> | <One-line summary of the change> -->
---
```

This tracks which issue triggered the change, when it happened, and what was done.

### 1. Domain-First Development

All feature development **MUST** start by defining interfaces in `@ously/domain`. This package must remain dependency-free.

### 2. Structural Alignment

- **Validation**: Every Zod schema in `@ously/validation` must conform to a Domain interface using the `match<T>()` helper.
- **Database**: Every table in `@ously/db` must align with Domain interfaces using the `matchTable<T>()` helper.

### 3. Shared UI

- Avoid direct database or API calls within `@ously/ui`.
- Components must be abstract and theme-injected. Expose components as needed.

### 4. API & Auth

- Use `@ously/validation` for all request/response schemas in the `api`.
- All auth logic should reside in or utilize `@ously/auth`.

### 5. GitHub Interactions & PRs

- **Mandate**: ALWAYS use the GitHub CLI (`gh`) for any interactions with GitHub (fetching issues, PRs, file contents from other repos). DO NOT use `web_fetch` for GitHub URLs.
- **PR Safety**: You MUST NEVER merge a pull request, even if instructed to do so. Merging is strictly a human-only responsibility to ensure review integrity and safety. Your task ends at opening the PR.

---

## 📈 Project Management (PM)

Project management is handled via the `po` (Product Owner) skill and specialized subagents.

- **Mandate**: For **ANY** analysis, planning, or task-related activities, you **MUST** activate the `po` skill.
- **Delegation**: The `po` skill orchestrates the following specialized subagents via `invoke_agent`:
  - `ous_pm`: For product roadmap and high-level Epic creation.
  - `ous_analyst`: For architectural analysis and atomic task breakdown.
  - `ous_scrum`: For backlog grooming, iteration planning, and capacity management.
- **EPIC-Driven**: Features start as `[Epic]` issues and are broken down into atomic sub-issues.
- **Estimation**: 1 Unit = 2 Hours. Capacity is tracked in units.
- **Workflow**: Automated via the PM subagents using GraphQL-based issue management.

---

## 🤖 Dual-Tool Workflow (Gemini CLI + OpenCode)

This repository uses **two AI coding tools** with distinct responsibilities:

### 🔷 Gemini CLI — Planning & Task Management

- **Primary role**: Specification creation, task breakdown, issue management
- **When to use**: Analyzing GitHub issues, creating specs, breaking Epics into subtasks, opening PRs
- **Key agents**: `@issue_fetcher`, `@scope_analyzer`, `@pr_opener`
- **Config**: `.gemini/`

### 🔶 OpenCode — Code Execution

- **Primary role**: All code implementation, refactoring, bug fixes
- **When to use**: Writing/changing any code across `apps/` and `packages/`
- **Key agents**: `@code-explorer` (search), `@backend-coder`, `@frontend-coder`, `@ui-architect` (implementation), `@precommit-checker` (validation), `@storybook-writer` (docs)
- **Config**: `.opencode/`

### Workflow

```
Issue arrives
  → Gemini CLI: @issue_fetcher → @scope_analyzer → Master Plan
  → OpenCode: @code-explorer → @backend-coder / @frontend-coder / @ui-architect
  → OpenCode: @precommit-checker (format + lint + build)
  → Gemini CLI: @pr_opener (gh pr create)
```

### Agent Mapping

| Task                    | Gemini CLI           | OpenCode                    |
| ----------------------- | -------------------- | --------------------------- |
| Fetch issue/PR context  | `@issue_fetcher`     | `@code-explorer` (_gh_ CLI) |
| Scope/impact analysis   | `@scope_analyzer`    | `@code-explorer`            |
| Backend implementation  | `@backend_engineer`  | `@backend-coder`            |
| Frontend implementation | `@frontend_engineer` | `@frontend-coder`           |
| UI/Design system        | `@ods_architect`     | `@ui-architect`             |
| Storybook docs          | `@storybook_creator` | `@storybook-writer`         |
| Pre-commit checks       | `@precommit_check`   | `@precommit-checker`        |
| PR creation             | `@pr_opener`         | N/A (Gemini only)           |

---

## 🤖 Gemini CLI Usage

This `GEMINI.md` file serves as your primary context. For specific sub-tasks, refer to the local `GEMINI.md` files in each app or package directory for more granular rules.
