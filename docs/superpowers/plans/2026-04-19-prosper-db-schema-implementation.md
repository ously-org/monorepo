# Prosper Database Schema Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the Prosper core database schema in the `@ously/db` package using Drizzle ORM.

**Architecture:** Extend the existing `packages/db/src/schema.ts` with tables for branching, commits, accounting entities, and goals. Each table is linked to its domain interface via `matchTable`.

**Tech Stack:** TypeScript, Drizzle ORM, SQLite.

---

### Task 1: Implement `branches` Table

**Files:**
- Modify: `packages/db/src/schema.ts`

- [ ] **Step 1: Add imports and define `branches` table**

```typescript
import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { 
  type User, 
  type Session, 
  type Account, 
  type Verification,
  type Branch,
  type Commit,
  type CommitAction,
  type AccountingEntity,
  type Goal,
  type EnvVar
} from "@ously/domain";

// ... existing tables ...

export const branches = sqliteTable("branch", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  name: text("name").notNull(),
  type: text("type").$type<"CURRENT" | "FUTURE">().notNull(),
  isFrozen: integer("is_frozen", { mode: "boolean" }).notNull(),
  baseCommitId: text("base_commit_id"),
});
```

- [ ] **Step 2: Commit**

```bash
git add packages/db/src/schema.ts
git commit -m "feat(db): add branches table"
```

---

### Task 2: Implement `commits` and `commitActions` Tables

**Files:**
- Modify: `packages/db/src/schema.ts`

- [ ] **Step 1: Define `commits` and `commitActions` tables**

```typescript
export const commits = sqliteTable("commit", {
  id: text("id").primaryKey(),
  branchId: text("branch_id")
    .notNull()
    .references(() => branches.id),
  timestamp: integer("timestamp", { mode: "timestamp" }).notNull(),
  message: text("message"),
});

export const commitActions = sqliteTable("commit_action", {
  id: text("id").primaryKey(),
  commitId: text("commit_id")
    .notNull()
    .references(() => commits.id),
  actionType: text("action_type").$type<"ADD" | "UPDATE" | "REPLACE" | "DELETE">().notNull(),
  targetType: text("target_type").$type<"ENTITY" | "GOAL" | "ENV_VAR">().notNull(),
  targetId: text("target_id").notNull(),
  key: text("key").notNull(),
  valueNum: real("value_num"),
  valueStr: text("value_str"),
  isRelative: integer("is_relative", { mode: "boolean" }).notNull(),
  refEnvVarId: text("ref_env_var_id"),
});
```

- [ ] **Step 2: Commit**

```bash
git add packages/db/src/schema.ts
git commit -m "feat(db): add commits and commitActions tables"
```

---

### Task 3: Implement `accountingEntities` and `envVars` Tables

**Files:**
- Modify: `packages/db/src/schema.ts`

- [ ] **Step 1: Define `accountingEntities` and `envVars` tables**

```typescript
export const envVars = sqliteTable("env_var", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  baseValue: real("base_value").notNull(),
});

export const accountingEntities = sqliteTable("accounting_entity", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").$type<"ASSET" | "LIABILITY" | "INCOME" | "EXPENSE">().notNull(),
  parentEntityId: text("parent_entity_id"),
  growthBaseValue: real("growth_base_value").notNull(),
  growthMode: text("growth_mode").$type<"ABSOLUTE" | "RELATIVE">().notNull(),
  refEnvVarId: text("ref_env_var_id").references(() => envVars.id),
});
```

- [ ] **Step 2: Commit**

```bash
git add packages/db/src/schema.ts
git commit -m "feat(db): add accountingEntities and envVars tables"
```

---

### Task 4: Implement `goals` Table

**Files:**
- Modify: `packages/db/src/schema.ts`

- [ ] **Step 1: Define `goals` table**

```typescript
export const goals = sqliteTable("goal", {
  id: text("id").primaryKey(),
  branchId: text("branch_id")
    .notNull()
    .references(() => branches.id),
  type: text("type").$type<"TIME_FIX" | "MEASUREMENT" | "COMMITMENT">().notNull(),
  targetDate: integer("target_date", { mode: "timestamp" }),
  targetValue: real("target_value"),
  targetEntityId: text("target_entity_id").references(() => accountingEntities.id),
  dependencyGoalId: text("dependency_goal_id"),
  triggerCommitId: text("trigger_commit_id").references(() => commits.id),
});
```

- [ ] **Step 2: Commit**

```bash
git add packages/db/src/schema.ts
git commit -m "feat(db): add goals table"
```

---

### Task 5: Link Tables to Domain and Verify

**Files:**
- Modify: `packages/db/src/schema.ts`

- [ ] **Step 1: Add `matchTable` calls**

```typescript
matchTable<Branch>()(branches);
matchTable<Commit>()(commits);
matchTable<CommitAction>()(commitActions);
matchTable<AccountingEntity>()(accountingEntities);
matchTable<Goal>()(goals);
matchTable<EnvVar>()(envVars);
```

- [ ] **Step 2: Run verification**

Run: `pnpm --filter @ously/db tsc`
Expected: Success (No type errors)

- [ ] **Step 3: Commit**

```bash
git add packages/db/src/schema.ts
git commit -m "feat(db): finalize prosper database schema and verify types"
```
