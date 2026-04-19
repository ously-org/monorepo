# Prosper API Endpoints Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the projection and comparison API endpoints in the `apps/api` package.

**Architecture:** Use Hono routes with Drizzle ORM to fetch branch lineage, commits, and actions. Use the `ReplayEngine` to simulate financial futures.

**Tech Stack:** Hono, Drizzle ORM, Zod (via @ously/validation), ReplayEngine.

---

### Task 1: Enhance Validation Schemas

**Files:**
- Modify: `packages/validation/src/prosper.ts`

- [ ] **Step 1: Add API Request and Response Schemas**
Add schemas for the projection and comparison requests to ensure robust input validation.

- [ ] **Step 2: Commit**

---

### Task 2: Implement Data Fetching Helpers

**Files:**
- Create: `apps/api/src/services/data.ts`

- [ ] **Step 1: Add lineage fetching logic**
Implement a utility to fetch all commits and actions for a branch and its ancestors.

- [ ] **Step 2: Commit**

---

### Task 3: Implement Projection Endpoint

**Files:**
- Modify: `apps/api/src/index.ts`

- [ ] **Step 1: Add POST /branches/:id/project**
Implement the endpoint using the `fetchBranchLineage` helper and `ReplayEngine`.

- [ ] **Step 2: Commit**

---

### Task 4: Implement Comparison Endpoint

**Files:**
- Modify: `apps/api/src/index.ts`

- [ ] **Step 1: Add POST /branches/compare**
Implement the comparison logic between two branches.

- [ ] **Step 2: Commit**

---

### Task 5: Verification

- [ ] **Step 1: Build the project**
Run `pnpm build` to ensure no type errors.

- [ ] **Step 2: Check endpoints**
Verify the code correctly uses the schemas and the engine.

- [ ] **Step 3: Commit**
