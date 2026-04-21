# Prosper Atomic CQS Refactor: Final Resolution Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Resolve OOM and deep instantiation errors during TypeScript compilation by simplifying Hono RPC types and Zod schemas.

**Architecture:** 
1. Reduce `AppType` inference complexity by breaking down the Hono router and avoiding deep nesting of inferred types.
2. Replace `z.ZodType<T>` with more explicit `satisfies` or manual type assertions to reduce the burden on the TS compiler.
3. Optimize CI/local build by increasing Node heap limit.

**Tech Stack:** Hono, Zod, TypeScript, Turborepo

---

### Task 1: Simplify Zod Schema Mapping in packages/validation

**Files:**
- Modify: `packages/validation/src/prosper.ts`

- [ ] **Step 1: Update schemas to use explicit mapping/satisfies**

Update `BranchSchema`, `CommitSchema`, `CommitActionSchema`, `AccountingEntitySchema`, `GoalSchema`, and `EnvVarSchema` to use `z.object({ ... }) satisfies z.ZodType<T>` instead of `z.ZodType<T> = z.object({ ... })`. This helps TS avoid deep recursion during type checking.

```typescript
export const BranchSchema = z.object({
  id: z.string(),
  userId: z.string(),
  name: z.string(),
  type: BranchTypeSchema,
  isFrozen: z.boolean(),
  baseCommitId: z.string().optional(),
}) satisfies z.ZodType<Branch>;
```

- [ ] **Step 2: Verify packages/validation still compiles**

Run: `pnpm --filter @ously/validation build`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add packages/validation/src/prosper.ts
git commit -m "refactor(validation): simplify zod schemas to reduce type complexity"
```

### Task 2: Simplify Hono RPC Type Export in apps/api

**Files:**
- Modify: `apps/api/src/financial/api/index.ts`
- Modify: `apps/api/src/index.ts`

- [ ] **Step 1: Simplify FinancialRpcType export**

In `apps/api/src/financial/api/index.ts`, instead of exporting `typeof rpcRouter`, export a more focused type or split the router if needed. For now, let's try splitting the RPC router into smaller pieces.

```typescript
// apps/api/src/financial/api/index.ts

// ... imports ...

export const rpcRouter = new Hono<{ Bindings: Bindings }>()
  .route("/project", projectRpc)
  .route("/compare", compareRpc);

export type FinancialRpcType = typeof rpcRouter;
```
Wait, the instruction says: "simplify the FinancialRpcType export if possible. Instead of exporting the whole router type, consider exporting a more focused type or breaking the router into smaller chunks."

Let's try to export the type of the `rpcRouter` but ensuring it's not overly complex.

Actually, the issue might be the `.route("/", projectRpc).route("/", compareRpc)` which might be creating deep nesting. Using unique paths might help.

- [ ] **Step 2: Verify apps/api compiles with increased heap size**

Run: `NODE_OPTIONS="--max-old-space-size=4096" npx tsc --noEmit` in `apps/api`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add apps/api/src/financial/api/index.ts apps/api/src/index.ts
git commit -m "fix(api): simplify RPC router types to resolve OOM"
```

### Task 3: Final Verification & Cleanup

- [ ] **Step 1: Run all tests in the monorepo**

Run: `pnpm test`
Expected: ALL PASS

- [ ] **Step 2: Final build check**

Run: `pnpm build`
Expected: ALL PASS

- [ ] **Step 3: Commit any final tweaks**

```bash
git commit -m "chore: final cleanup and verification for Prosper logic"
```
