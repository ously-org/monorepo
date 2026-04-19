# AI-Native Monorepo Restructuring Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure the monorepo into an "AI-Native" architecture using a 3-Pillar Framework (Rules, Human, AI) to minimize technical debt and strategic fatigue.

**Architecture:** We will implement a Domain-First flow where `packages/domain` houses pure TypeScript interfaces (the Skeleton), `packages/validation` enforces these shapes via Zod, and `packages/db` maps them to Cloudflare D1 (SQLite) tables.

**Tech Stack:** TypeScript, Zod, Drizzle ORM, Cloudflare D1, Hono, Turborepo.

---

### Task 1: Create `packages/domain`

**Files:**
- Create: `packages/domain/package.json`
- Create: `packages/domain/tsconfig.json`
- Create: `packages/domain/src/index.ts`
- Create: `packages/domain/src/user.ts`

- [ ] **Step 1: Initialize `packages/domain` package.json**

```json
{
  "name": "@ously/domain",
  "version": "0.0.0",
  "private": true,
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "scripts": {
    "type-check": "tsc --noEmit"
  },
  "devDependencies": {
    "@ously/tsconfig": "workspace:*",
    "typescript": "^5.4.5"
  }
}
```

- [ ] **Step 2: Create `packages/domain/tsconfig.json`**

```json
{
  "extends": "@ously/tsconfig/base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src"]
}
```

- [ ] **Step 3: Define User Domain Interface**

File: `packages/domain/src/user.ts`
```typescript
export interface User {
  id: string;
  email: string;
  name?: string;
}
```

- [ ] **Step 4: Export Domain Entities**

File: `packages/domain/src/index.ts`
```typescript
export * from "./user";
```

- [ ] **Step 5: Commit**

```bash
git add packages/domain
git commit -m "feat(domain): initialize pure domain package"
```

---

### Task 2: Refactor `packages/types` to `packages/validation`

**Files:**
- Modify: `packages/types/package.json`
- Create: `packages/types/src/match.ts`
- Modify: `packages/types/src/index.ts`

- [ ] **Step 1: Update package.json name to `@ously/validation`**

```json
{
  "name": "@ously/validation",
  "dependencies": {
    "@ously/domain": "workspace:*",
    "zod": "^3.23.8"
  }
}
```

- [ ] **Step 2: Create `match` helper**

File: `packages/types/src/match.ts`
```typescript
import { z } from "zod";

type Match<T, S> = [T] extends [S] ? ([S] extends [T] ? S : never) : never;

export function match<T>() {
  return <S extends z.ZodTypeAny>(schema: S): Match<T, z.infer<S>> => {
    return schema as any;
  };
}
```

- [ ] **Step 3: Refactor UserSchema to use `match`**

File: `packages/types/src/index.ts`
```typescript
import { z } from "zod";
import { type User } from "@ously/domain";
import { match } from "./match";

export const UserSchema = match<User>()(
  z.object({
    id: z.string(),
    email: z.string().email(),
    name: z.string().optional(),
  })
);

export { type User };
```

- [ ] **Step 4: Commit**

```bash
git add packages/types
git commit -m "refactor(validation): implement match helper and rename to validation"
```

---

### Task 3: Update `packages/db` with `matchTable`

**Files:**
- Modify: `packages/db/package.json`
- Create: `packages/db/src/match-table.ts`
- Modify: `packages/db/src/schema.ts`

- [ ] **Step 1: Add `@ously/domain` dependency**

```json
{
  "dependencies": {
    "@ously/domain": "workspace:*",
    "drizzle-orm": "^0.30.10"
  }
}
```

- [ ] **Step 2: Create `matchTable` helper**

File: `packages/db/src/match-table.ts`
```typescript
import { type SQLiteTableWithColumns } from "drizzle-orm/sqlite-core";

export function matchTable<T>() {
  return <TableName extends string, Columns extends Record<string, any>>(
    table: SQLiteTableWithColumns<{
      name: TableName;
      schema: undefined;
      columns: Columns;
      dialect: "sqlite";
    }>
  ): table is SQLiteTableWithColumns<{
    name: TableName;
    schema: undefined;
    columns: Record<keyof T, any>;
    dialect: "sqlite";
  }> => {
    return true; // Type-only check
  };
}
```

- [ ] **Step 3: Update schema to use `matchTable`**

File: `packages/db/src/schema.ts`
```typescript
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { type User } from "@ously/domain";
import { matchTable } from "./match-table";

export const users = sqliteTable("user", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name"),
  emailVerified: integer("email_verified", { mode: "boolean" }).notNull(),
  image: text("image"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

// Validate that users table satisfies User interface
matchTable<User>()(users);
```

- [ ] **Step 4: Commit**

```bash
git add packages/db
git commit -m "feat(db): implement matchTable helper for domain alignment"
```

---

### Task 4: Establish Package-Level `GEMINI.md` Files

**Files:**
- Create: `packages/domain/GEMINI.md`
- Create: `packages/validation/GEMINI.md`
- Create: `packages/db/GEMINI.md`
- Create: `packages/ui/GEMINI.md`

- [ ] **Step 1: Create Domain Package Rules**

File: `packages/domain/GEMINI.md`
```markdown
# Ously Domain: The Skeleton

## Scope
Pure TypeScript interfaces and types. This is the absolute source of truth for the monorepo.

## Rules
- **ZERO DEPENDENCIES.** Do not add any libraries (Zod, Drizzle, etc.) to this package.
- All feature development MUST start by defining interfaces here.
- If a design choice is ambiguous, STOP and ask the user.
```

- [ ] **Step 2: Create Validation Package Rules**

File: `packages/validation/GEMINI.md`
```markdown
# Ously Validation: The Enforcer

## Scope
Zod schemas for request/response validation.

## Rules
- Every schema MUST conform to a Domain interface using the `match<T>()` helper.
- Do not define "Business Logic" here; only validation logic.
```

- [ ] **Step 3: Create DB Package Rules**

File: `packages/db/GEMINI.md`
```markdown
# Ously DB: Storage Layer (Cloudflare D1)

## Scope
Drizzle schemas and migrations for SQLite.

## Rules
- Tables MUST align with Domain interfaces using the `matchTable<T>()` helper.
- Use standard SQLite types (UUIDs as TEXT, Dates as INTEGER timestamps).
```

- [ ] **Step 4: Create UI Package Rules**

File: `packages/ui/GEMINI.md`
```markdown
# Ously UI: Design System

## Scope
Shared UI components (Internal shadcn components wrapped for public use).

## Rules
- Components MUST be abstract and theme-injected.
- Expose only wrapped components; raw shadcn components stay internal.
- No direct database or API calls in this package.
```

- [ ] **Step 5: Commit**

```bash
git add packages/*/GEMINI.md
git commit -m "docs: establish strict package-level AI boundaries"
```

---

### Task 5: Update Root `GEMINI.md`

**Files:**
- Modify: `GEMINI.md`

- [ ] **Step 1: Inject Vibe Coding & 3-Pillar Framework**

```markdown
# Ously Monorepo: Master AI Context

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
```

- [ ] **Step 2: Commit**

```bash
git add GEMINI.md
git commit -m "docs: update master context with vibe coding principles"
```

---

### Task 6: Final Verification

- [ ] **Step 1: Run Global Type-Check**

Run: `pnpm type-check`
Expected: PASS across all packages.

- [ ] **Step 2: Verify Dependency Isolation**

Check `packages/domain/package.json` for any unexpected dependencies.

- [ ] **Step 3: Final Commit**

```bash
git commit --allow-empty -m "chore: AI-native monorepo setup complete"
```
