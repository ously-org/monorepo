# Prosper Projection Engine Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the core logic for replaying a series of commits over an initial state to project future financial values.

**Architecture:** The `ReplayEngine` will be a service in `apps/api` that iterates month-by-month, applying accounting logic (growth, actions, goals) to produce a series of state snapshots.

**Tech Stack:** TypeScript, `@ously/domain`, `@ously/validation`, Vitest.

---

### Task 1: Setup Testing Environment in `apps/api`

**Files:**
- Modify: `apps/api/package.json`

- [ ] **Step 1: Add Vitest to `apps/api`**
- [ ] **Step 2: Add test script to `apps/api/package.json`**
- [ ] **Step 3: Verify vitest runs (it will fail because no tests yet)**
- [ ] **Step 4: Commit**

---

### Task 2: Implement the `ReplayEngine` Skeleton

**Files:**
- Create: `apps/api/src/services/engine.ts`

- [ ] **Step 1: Define the `EngineState` and `Snapshot` types**
- [ ] **Step 2: Implement the `ReplayEngine` class with `run` method**
- [ ] **Step 3: Commit**

---

### Task 3: Implement Growth and Action Logic

**Files:**
- Modify: `apps/api/src/services/engine.ts`

- [ ] **Step 1: Implement `applyGrowth` method**
- [ ] **Step 2: Implement `applyActions` method**
- [ ] **Step 3: Update `processMonth` to use these methods**
- [ ] **Step 4: Commit**

---

### Task 4: Implement Goal Evaluation and Commitments

**Files:**
- Modify: `apps/api/src/services/engine.ts`

- [ ] **Step 1: Implement `evaluateGoals` method**
- [ ] **Step 2: Update `processMonth`**
- [ ] **Step 3: Commit**

---

### Task 5: Write Unit Tests for the `ReplayEngine`

**Files:**
- Create: `apps/api/src/services/engine.test.ts`

- [ ] **Step 1: Write basic growth test**
- [ ] **Step 2: Run tests**
- [ ] **Step 3: Write test for CommitActions and Goals**
- [ ] **Step 4: Run tests again**
- [ ] **Step 5: Commit**
