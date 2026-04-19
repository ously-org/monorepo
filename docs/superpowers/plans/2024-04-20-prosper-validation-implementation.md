# Prosper Validation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement Zod validation schemas for the Prosper domain models in the `@ously/validation` package.

**Architecture:** Use the `match<T>()` helper to ensure Zod schemas strictly align with domain interfaces. Enums will be defined as `z.enum()`, and objects as `z.object()`.

**Tech Stack:** Zod, TypeScript.

---

### Task 1: Create prosper.ts in @ously/validation

**Files:**
- Create: `packages/validation/src/prosper.ts`

- [ ] **Step 1: Define Enums and Interfaces**

Implement the enums and interface schemas using `match<T>()` and `zod`.

```typescript
import { z } from "zod";
import {
  type Branch,
  type Commit,
  type CommitAction,
  type AccountingEntity,
  type Goal,
  type EnvVar,
  type BranchType,
  type ActionType,
  type TargetType,
  type AccountingEntityType,
  type GrowthMode,
  type GoalType,
} from "@ously/domain";
import { match } from "./match";

export const BranchTypeSchema = z.enum(["CURRENT", "FUTURE"]) satisfies z.ZodType<BranchType>;
export const ActionTypeSchema = z.enum(["ADD", "UPDATE", "REPLACE", "DELETE"]) satisfies z.ZodType<ActionType>;
export const TargetTypeSchema = z.enum(["ENTITY", "GOAL", "ENV_VAR"]) satisfies z.ZodType<TargetType>;
export const AccountingEntityTypeSchema = z.enum(["ASSET", "LIABILITY", "INCOME", "EXPENSE"]) satisfies z.ZodType<AccountingEntityType>;
export const GrowthModeSchema = z.enum(["ABSOLUTE", "RELATIVE"]) satisfies z.ZodType<GrowthMode>;
export const GoalTypeSchema = z.enum(["TIME_FIX", "MEASUREMENT", "COMMITMENT"]) satisfies z.ZodType<GoalType>;

export const BranchSchema = match<Branch>()(
  z.object({
    id: z.string(),
    userId: z.string(),
    name: z.string(),
    type: BranchTypeSchema,
    isFrozen: z.boolean(),
    baseCommitId: z.string().optional(),
  })
);

export const CommitSchema = match<Commit>()(
  z.object({
    id: z.string(),
    branchId: z.string(),
    timestamp: z.date(),
    message: z.string().optional(),
  })
);

export const CommitActionSchema = match<CommitAction>()(
  z.object({
    id: z.string(),
    commitId: z.string(),
    actionType: ActionTypeSchema,
    targetType: TargetTypeSchema,
    targetId: z.string(),
    key: z.string(),
    valueNum: z.number().optional(),
    valueStr: z.string().optional(),
    isRelative: z.boolean(),
    refEnvVarId: z.string().optional(),
  })
);

export const AccountingEntitySchema = match<AccountingEntity>()(
  z.object({
    id: z.string(),
    name: z.string(),
    type: AccountingEntityTypeSchema,
    parentEntityId: z.string().optional(),
    growthBaseValue: z.number(),
    growthMode: GrowthModeSchema,
    refEnvVarId: z.string().optional(),
  })
);

export const GoalSchema = match<Goal>()(
  z.object({
    id: z.string(),
    branchId: z.string(),
    type: GoalTypeSchema,
    targetDate: z.date().optional(),
    targetValue: z.number().optional(),
    targetEntityId: z.string().optional(),
    dependencyGoalId: z.string().optional(),
    triggerCommitId: z.string().optional(),
  })
);

export const EnvVarSchema = match<EnvVar>()(
  z.object({
    id: z.string(),
    name: z.string(),
    baseValue: z.number(),
  })
);
```

- [ ] **Step 2: Commit**

```bash
git add packages/validation/src/prosper.ts
git commit -m "feat(validation): implement prosper zod validation schemas"
```

### Task 2: Update index.ts to export new schemas

**Files:**
- Modify: `packages/validation/src/index.ts`

- [ ] **Step 1: Export from prosper.ts**

Update `packages/validation/src/index.ts` to export all schemas from `prosper.ts`.

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

export * from "./prosper";
export { type User };
```

- [ ] **Step 2: Verify build**

Run `pnpm build` in the root or `pnpm tsc` in `packages/validation` to ensure no type errors.

Run: `pnpm --filter @ously/validation tsc`

- [ ] **Step 3: Commit**

```bash
git add packages/validation/src/index.ts
git commit -m "feat(validation): export prosper schemas"
```
