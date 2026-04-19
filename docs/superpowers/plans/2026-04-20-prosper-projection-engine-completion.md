# Prosper Projection Engine Fixes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix missing dependency, imports, liability goal logic, performance issues, and goal creation in the `ReplayEngine`.

**Architecture:** Use a pre-indexed map for commits to optimize performance. Update `evaluateGoals` to handle `LIABILITY` type entities differently. Ensure `Goal` creation uses the correct `branchId`.

**Tech Stack:** TypeScript, Turborepo, Vitest.

---

### Task 1: Add Missing Dependency

**Files:**
- Modify: `apps/api/package.json`

- [x] **Step 1: Add `@ously/domain` to `dependencies`**

- [x] **Step 2: Run `pnpm install`**

- [x] **Step 3: Commit**

### Task 2: Fix Imports and Performance (Pre-indexing)

**Files:**
- Modify: `apps/api/src/services/engine.ts`

- [ ] **Step 1: Add missing imports**

- [ ] **Step 2: Update `EngineState` and `ReplayEngine` for pre-indexing**

- [ ] **Step 3: Implement pre-indexing in `project` method**

- [ ] **Step 4: Update `applyActions` to use pre-indexed commits**

- [ ] **Step 5: Update `processMonth` call**

- [ ] **Step 6: Commit**

### Task 3: Fix Goal Evaluation and Creation

**Files:**
- Modify: `apps/api/src/services/engine.ts`

- [ ] **Step 1: Fix `evaluateGoals` logic for `LIABILITY`**

- [ ] **Step 2: Update `applyAction` to use `branchId` from `Commit`**

- [ ] **Step 3: Store all commits and actions in the engine during projection**

- [ ] **Step 4: Update `evaluateGoals` to handle triggered commits correctly**

- [ ] **Step 5: Commit**

### Task 4: Update Tests and Verify

**Files:**
- Modify: `apps/api/src/services/engine.test.ts`

- [ ] **Step 1: Add test case for `LIABILITY` goal**

- [ ] **Step 2: Add test case for consistent goal evaluation order**

- [ ] **Step 3: Run tests**

- [ ] **Step 4: Commit**
