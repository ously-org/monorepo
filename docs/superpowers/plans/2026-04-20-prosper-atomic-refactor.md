# Prosper Atomic CQS Refactor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor the API into an atomic, file-per-job structure with Command-Query Separation (CQS) in the service layer.

**Tech Stack:** TypeScript, Hono, Drizzle ORM.

---

### Task 1: Repository Layer (Atomic Data Access)
- [ ] **Step 1: Create `src/financial/repos/branch-lineage.repo.ts`**
    - Move recursive lineage, commit, action, and goal fetching here.
    - Implement chunking for SQLite limits.
- [ ] **Step 2: Create `src/financial/repos/accounting.repo.ts`**
    - Move `accountingEntities` and `envVars` fetching here.
- [ ] **Step 3: Commit**

### Task 2: Service Layer (CQS Atomic Logic)
- [ ] **Step 1: Create `src/financial/services/queries/run-projection.ts`**
    - Orchestrate repos + engine for read-only projection.
- [ ] **Step 2: Create `src/financial/services/queries/compare-branches.ts`**
    - Orchestrate dual projections + diffing.
- [ ] **Step 3: Commit**

### Task 3: API Layer (Atomic Adapters)
- [ ] **Step 1: Create REST endpoints**
    - `src/financial/api/rest/project.post.ts`
    - `src/financial/api/rest/compare.post.ts`
- [ ] **Step 2: Create RPC endpoints**
    - `src/financial/api/rpc/project.post.ts`
    - `src/financial/api/rpc/compare.post.ts`
- [ ] **Step 3: Create `src/financial/api/index.ts`**
    - Mount and export combined router.
- [ ] **Step 4: Commit**

### Task 4: Integration & Cleanup
- [ ] **Step 1: Move engine to `src/financial/engine/`**
- [ ] **Step 2: Update `src/index.ts` to mount new modular routes**
- [ ] **Step 3: Delete legacy `src/services/` folder**
- [ ] **Step 4: Verify with `pnpm --filter api test`**
- [ ] **Step 5: Commit**
