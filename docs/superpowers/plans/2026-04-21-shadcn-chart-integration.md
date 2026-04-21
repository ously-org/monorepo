# Shadcn CLI Chart Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a `chart` component to `@ously/ods`, wrap it, and export it for public use.

**Architecture:** 
- Add shadcn component to `packages/ods/src/internal`.
- Wrap internal exports in `packages/ods/src/components/chart.tsx`.
- Export from `packages/ods/src/index.ts`.

**Tech Stack:** 
- Shadcn CLI
- React
- Turborepo
- pnpm

---

### Task 1: Add internal chart component via shadcn CLI

**Files:**
- Create: `packages/ods/src/internal/chart.tsx`

- [ ] **Step 1: Navigate to ODS package and run shadcn CLI**

Run: `cd packages/ods && npx shadcn@latest add chart`
Expected: `src/internal/chart.tsx` created.

- [ ] **Step 2: Commit changes**

```bash
git add packages/ods/src/internal/chart.tsx
git commit -m "feat(ods): add internal chart component via shadcn cli"
```

---

### Task 2: Create public wrapper for chart component

**Files:**
- Create: `packages/ods/src/components/chart.tsx`

- [ ] **Step 1: Write the public wrapper**

```tsx
import { 
  ChartContainer as InternalChartContainer, 
  ChartTooltip as InternalChartTooltip, 
  ChartTooltipContent as InternalChartTooltipContent,
  type ChartConfig
} from "../internal/chart"

export const ChartContainer = InternalChartContainer
export const ChartTooltip = InternalChartTooltip
export const ChartTooltipContent = InternalChartTooltipContent
export type { ChartConfig }
```

- [ ] **Step 2: Commit changes**

```bash
git add packages/ods/src/components/chart.tsx
git commit -m "feat(ods): create public wrapper for chart component"
```

---

### Task 3: Export the new component and verify build

**Files:**
- Modify: `packages/ods/src/index.ts`

- [ ] **Step 1: Add export to `packages/ods/src/index.ts`**

```tsx
export * from "./components/chart"
```

- [ ] **Step 2: Run verification build**

Run: `pnpm run build --filter @ously/ods`
Expected: Build passes.

- [ ] **Step 3: Commit and push**

```bash
git add packages/ods/src/index.ts
git commit -m "feat(ods): export chart component and verify build"
```
