# Prosper Core Logic Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement a Git-like financial branching system and projection engine for the Prosper app.

**Architecture:** Event-sourced projection using a monthly loop that replays commits over a ground-truth state.

**Tech Stack:** TypeScript, Hono (API), Drizzle ORM (DB), SQLite/D1, Zod (Validation).

---

### Task 1: Define Domain Interfaces

**Files:**
- Modify: `packages/domain/src/index.ts`
- Create: `packages/domain/src/prosper.ts`

- [ ] **Step 1: Create `prosper.ts` with core types**

```typescript
export type BranchType = "CURRENT" | "FUTURE";
export type ActionType = "ADD" | "UPDATE" | "REPLACE" | "DELETE";
export type TargetType = "ENTITY" | "GOAL" | "ENV_VAR";
export type AccountingEntityType = "ASSET" | "LIABILITY" | "INCOME" | "EXPENSE";
export type GrowthMode = "ABSOLUTE" | "RELATIVE";
export type GoalType = "TIME_FIX" | "MEASUREMENT" | "COMMITMENT";

export interface Branch {
  id: string;
  userId: string;
  name: string;
  type: BranchType;
  isFrozen: boolean;
  baseCommitId?: string;
}

export interface Commit {
  id: string;
  branchId: string;
  timestamp: Date;
  message?: string;
}

export interface CommitAction {
  id: string;
  commitId: string;
  actionType: ActionType;
  targetType: TargetType;
  targetId: string;
  key: string;
  valueNum?: number;
  valueStr?: string;
  isRelative: boolean;
  refEnvVarId?: string;
}

export interface AccountingEntity {
  id: string;
  name: string;
  type: AccountingEntityType;
  parentEntityId?: string;
  growthBaseValue: number;
  growthMode: GrowthMode;
  refEnvVarId?: string;
}

export interface Goal {
  id: string;
  branchId: string;
  type: GoalType;
  targetDate?: Date;
  targetValue?: number;
  targetEntityId?: string;
  dependencyGoalId?: string;
  triggerCommitId?: string;
}

export interface EnvVar {
  id: string;
  name: string;
  baseValue: number;
}
```

- [ ] **Step 2: Export from `index.ts`**
- [ ] **Step 3: Commit**

---

### Task 2: Implement Database Schema

**Files:**
- Modify: `packages/db/src/schema.ts`

- [ ] **Step 1: Add Prosper tables to `schema.ts`**
- [ ] **Step 2: Add `matchTable` calls for new entities**
- [ ] **Step 3: Commit**

---

### Task 3: Implement Zod Validation

**Files:**
- Create: `packages/validation/src/prosper.ts`
- Modify: `packages/validation/src/index.ts`

- [ ] **Step 1: Create Zod schemas matching Domain interfaces**
- [ ] **Step 2: Export from `index.ts`**
- [ ] **Step 3: Commit**

---

### Task 4: Implement the Projection Engine

**Files:**
- Create: `apps/api/src/services/engine.ts`
- Create: `apps/api/src/services/engine.test.ts`

- [ ] **Step 1: Write failing test for the engine projection**
- [ ] **Step 2: Implement `ReplayEngine` (Monthly Loop logic)**
- [ ] **Step 3: Run tests and verify**
- [ ] **Step 4: Commit**

---

### Task 5: API Endpoints

**Files:**
- Modify: `apps/api/src/index.ts`

- [ ] **Step 1: Add `POST /branches/:id/project`**
- [ ] **Step 2: Add `POST /branches/compare`**
- [ ] **Step 3: Commit**
