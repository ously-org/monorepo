# Ously Monorepo Coding Style Guide

This guide defines the architectural standards and coding conventions for the Ously monorepo. Gemini Code Assist must prioritize these rules during code reviews.

---

## 🏗 Core Architectural Pillars

### 1. Domain-First Development

- **Source of Truth**: The `@ously/domain` package is the absolute skeleton of the project.
- **Dependency Rule**: `@ously/domain` must have **ZERO dependencies**.
- **Workflow**: All feature development **MUST** start by defining interfaces in `@ously/domain`.
- **Review Check**: Flag any implementation that introduces logic or data structures without a corresponding domain interface.
- **No Runtime Values**: `@ously/domain` must export **types only**. Do NOT add `as const` arrays, enums, or any runtime values. The domain defines _what_ the data looks like, not the valid values.
- **Review Check**: Reject suggestions to share runtime constants from `@ously/domain` to other packages. Each layer defines its own values independently (e.g., Drizzle `{enum: [...]}` in `@ously/db`, Zod `.enum()` in `@ously/validation`). Alignment is enforced at compile time by `match<T>()` and `matchTable<T>()`.

### 2. Structural Alignment (The Matching Rule)

- **Validation**: Every Zod schema in `@ously/validation` must conform to a Domain interface using the `match<T>()` helper.
- **Database**: Every table in `@ously/db` must align with Domain interfaces using the `matchTable<T>()` helper.
- **Review Check**: Ensure new schemas or tables are properly "matched" to their domain counterparts.

---

## 💻 Package-Specific Standards

### 📦 `@ously/ui` (Design System)

- **Abstraction**: Components must be abstract and theme-injected.
- **Encapsulation**: Expose components as needed.
- **Side Effects**: No direct database or API calls are allowed within the UI package.
- **Ignore Pattern**: Internal implementation details in `src/internal/` are excluded from review.

### 🌐 `@ously/api` (Backend)

- **Tech Stack**: Hono on Cloudflare Workers.
- **Schemas**: Always use `@ously/validation` for request/response validation.
- **Auth**: Utilize `@ously/auth` for all authentication logic.
- **Database**: Access D1 exclusively via Drizzle using `@ously/db` schemas.

### 🗄️ `@ously/db` (Storage)

- **SQLite Types**: Use standard SQLite conventions:
  - UUIDs as `TEXT`.
  - Dates/Timestamps as `INTEGER`.

---

## 🎯 Code Quality & Review Focus

### 1. Correctness & Security

- Ensure strict type safety across package boundaries.
- Verify that API endpoints are properly protected and validated.

### 2. Maintainability

- Prefer composition over complex inheritance.
- Keep components and functions focused and atomic.

### 3. Monorepo Best Practices

- Use workspace protocols (`workspace:*`) for internal dependency links.
- Adhere to the defined pnpm/Turborepo workflow.

---

## 📦 Dependency Management

- **Trust Local Definitions**: Always trust the versions defined in `package.json`. Do not suggest that a package "does not exist" or needs to be changed based on external knowledge if it is already present in the workspace.
- **Monorepo Links**: Use workspace protocols (`workspace:*`) for all internal package dependencies.
- **Dependency Review**: When suggesting new dependencies, ensure they align with the tech stack (Hono, Next.js, Cloudflare).

---

## 📈 Project Management & Workflow

- **Issue Types**: Use native GitHub Issue Types (`Epic`, `Feature`, `Bug`, `Analysis`, `Task`).
- **Estimation**: 1 Unit = 2 Hours.
- **Epics**: Large features must be broken down into atomic sub-issues via the Gemini CLI.
