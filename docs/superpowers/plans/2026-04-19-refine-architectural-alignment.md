# Refine Architectural Helpers & Domain Alignment

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Address CodeRabbit's feedback by refining the `match` helper to return the schema instance and extending `matchTable` alignment to all database tables.

**Architecture:** 
1. Update `packages/validation/src/match.ts` to return the Zod schema instance (S) while enforcing `z.infer<S> extends T`.
2. Expand `packages/domain` to include missing entities (Session, Account, Verification).
3. Apply `matchTable` to all tables in `packages/db/src/schema.ts`.

**Tech Stack:** TypeScript, Zod, Drizzle ORM.

---

### Task 1: Refine `match` Helper [DONE]

**Files:**
- Modify: `packages/validation/src/match.ts`

- [x] **Step 1: Update `match` helper signature**

```typescript
import { z } from "zod";

/**
 * Ensures a Zod schema strictly matches a Domain interface.
 * Returns the schema instance itself (S) to preserve .parse()/.safeParse().
 */
export function match<T>() {
  return <S extends z.ZodType<T, any, any>>(schema: S): S => {
    return schema;
  };
}
```

- [x] **Step 2: Verify in `packages/validation/src/index.ts`**

Run: `pnpm --filter @ously/validation type-check`
Expected: PASS. The `UserSchema` should still be a valid Zod object.

- [x] **Step 3: Commit**

```bash
git add packages/validation/src/match.ts
git commit -m "refactor(validation): refine match helper to return schema instance"
```

---

### Task 2: Expand Domain Interfaces [DONE]

**Files:**
- Create: `packages/domain/src/auth.ts`
- Modify: `packages/domain/src/index.ts`

- [x] **Step 1: Define missing auth interfaces**

File: `packages/domain/src/auth.ts`
```typescript
export interface Session {
  id: string;
  expiresAt: Date;
  token: string;
  createdAt: Date;
  updatedAt: Date;
  ipAddress?: string;
  userAgent?: string;
  userId: string;
}

export interface Account {
  id: string;
  accountId: string;
  providerId: string;
  userId: string;
  accessToken?: string;
  refreshToken?: string;
  idToken?: string;
  accessTokenExpiresAt?: Date;
  refreshTokenExpiresAt?: Date;
  scope?: string;
  password?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Verification {
  id: string;
  identifier: string;
  value: string;
  expiresAt: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
```

- [x] **Step 2: Export new interfaces**

File: `packages/domain/src/index.ts`
```typescript
export * from "./user";
export * from "./auth";
```

- [x] **Step 3: Commit**

```bash
git add packages/domain/src/
git commit -m "feat(domain): add Session, Account, and Verification interfaces"
```

---

### Task 3: Complete DB Alignment [DONE]

**Files:**
- Modify: `packages/db/src/schema.ts`

- [x] **Step 1: Apply `matchTable` to all tables**

File: `packages/db/src/schema.ts`
```typescript
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { type User, type Session, type Account, type Verification } from "@ously/domain";
import { matchTable } from "./match-table";

// ... (table definitions)

matchTable<User>()(users);
matchTable<Session>()(sessions);
matchTable<Account>()(accounts);
matchTable<Verification>()(verifications);
```

- [x] **Step 2: Verify type alignment**

Run: `pnpm --filter @ously/db type-check`
Expected: PASS. If Drizzle columns don't match Domain types (e.g., SQLite integer vs JS Date), the compiler will fail.

- [x] **Step 3: Commit**

```bash
git add packages/db/src/schema.ts
git commit -m "feat(db): enforce domain alignment for all auth tables"
```
