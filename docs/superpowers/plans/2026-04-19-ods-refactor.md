# ODS Refactor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor `@ously/ui` to `@ously/ods` across the monorepo to align with the Oously Design System.

**Architecture:** 
- Move `packages/ui` to `packages/ods`.
- Update package names and workspace references.
- Verify with `pnpm install` and `turbo build`.

**Tech Stack:** Turborepo, pnpm, Next.js, Hono, TypeScript.

---

### Task 1: Rename Directory and Update Package Identity

**Files:**
- Move: `packages/ui` -> `packages/ods`
- Modify: `packages/ods/package.json`
- Modify: `packages/ods/tsconfig.json`

- [ ] **Step 1: Move the directory**
Run: `mv packages/ui packages/ods`

- [ ] **Step 2: Update `package.json` name**
Modify: `packages/ods/package.json`
Change `"name": "@ously/ui"` to `"name": "@ously/ods"`.

- [ ] **Step 3: Update `tsconfig.json` path aliases**
Modify: `packages/ods/tsconfig.json`
Change `"@ously/ui/*": ["./src/*"]` to `"@ously/ods/*": ["./src/*"]`.

- [ ] **Step 4: Commit**
```bash
git add packages/ods
git commit -m "refactor: move packages/ui to packages/ods and update name"
```

### Task 2: Update App Dependencies

**Files:**
- Modify: `apps/web-main/package.json`
- Modify: `apps/web-prosper/package.json`

- [ ] **Step 1: Update `apps/web-main/package.json`**
Change `"@ously/ui": "workspace:*"` to `"@ously/ods": "workspace:*"`.

- [ ] **Step 2: Update `apps/web-prosper/package.json`**
Change `"@ously/ui": "workspace:*"` to `"@ously/ods": "workspace:*"`.

- [ ] **Step 3: Commit**
```bash
git add apps/web-main/package.json apps/web-prosper/package.json
git commit -m "refactor: update app dependencies to @ously/ods"
```

### Task 3: Update App Configurations

**Files:**
- Modify: `apps/web-main/next.config.mjs`
- Modify: `apps/web-prosper/next.config.mjs`

- [ ] **Step 1: Update `apps/web-main/next.config.mjs`**
Change `transpilePackages: ["@ously/ui"]` to `transpilePackages: ["@ously/ods"]`.

- [ ] **Step 2: Update `apps/web-prosper/next.config.mjs`**
Change `transpilePackages: ["@ously/ui"]` to `transpilePackages: ["@ously/ods"]`.

- [ ] **Step 3: Commit**
```bash
git add apps/web-main/next.config.mjs apps/web-prosper/next.config.mjs
git commit -m "refactor: update next.config.mjs to transpile @ously/ods"
```

### Task 4: Update Source Code Imports

**Files:**
- Modify: `apps/web-main/app/page.tsx`
- Modify: `apps/web-prosper/app/page.tsx`

- [ ] **Step 1: Update imports in `apps/web-main/app/page.tsx`**
Change `import { Button } from "@ously/ui";` to `import { Button } from "@ously/ods";`.

- [ ] **Step 2: Update imports in `apps/web-prosper/app/page.tsx`**
Change `import { Button } from "@ously/ui";` to `import { Button } from "@ously/ods";`.

- [ ] **Step 3: Commit**
```bash
git add apps/web-main/app/page.tsx apps/web-prosper/app/page.tsx
git commit -m "refactor: update button imports to @ously/ods"
```

### Task 5: Update Documentation and Global Configs

**Files:**
- Modify: `GEMINI.md`
- Modify: `docs/superpowers/plans/2026-04-11-nextjs-apps-scaffold.md` (and others if needed)

- [ ] **Step 1: Update `GEMINI.md`**
Replace all occurrences of `@ously/ui` with `@ously/ods`.

- [ ] **Step 2: Update historical docs**
Search for `@ously/ui` in `docs/` and replace with `@ously/ods`.

- [ ] **Step 3: Commit**
```bash
git add GEMINI.md docs/
git commit -m "docs: rename @ously/ui to @ously/ods"
```

### Task 6: Synchronize and Verify

- [ ] **Step 1: Run `pnpm install`**
Run: `pnpm install`
Expected: `pnpm-lock.yaml` updated successfully.

- [ ] **Step 2: Run build**
Run: `turbo build --filter=@ously/ods`
Expected: Build passes.

- [ ] **Step 3: Run full build**
Run: `turbo build`
Expected: All apps and packages build successfully.

- [ ] **Step 4: Commit lockfile**
```bash
git add pnpm-lock.yaml
git commit -m "chore: update lockfile for @ously/ods"
```
