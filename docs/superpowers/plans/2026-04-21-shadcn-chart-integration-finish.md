# Shadcn CLI Chart Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a public wrapper for the chart component in `@ously/ods`, update package exports, and verify the build.

**Architecture:** Following the monorepo's "ods" pattern, we wrap internal shadcn components in a public component file and export them from the package root.

**Tech Stack:** React, TypeScript, Tailwind CSS, Turborepo, pnpm.

---

### Task 1: Create public chart wrapper

**Files:**
- Create: `packages/ods/src/components/chart.tsx`

- [ ] **Step 1: Create the wrapper component**

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

### Task 2: Update package exports

**Files:**
- Modify: `packages/ods/src/index.ts`

- [ ] **Step 1: Add chart component to index exports**

```typescript
export * from "./components/button";
export * from "./components/card";
export * from "./components/chart";
export * from "./lib/utils";
```

### Task 3: Verify build

- [ ] **Step 1: Run build for @ously/ods**

Run: `pnpm run build --filter @ously/ods`
Expected: Build passes without errors.

### Task 4: Finalize and commit

- [ ] **Step 1: Stage and commit changes**

Run: `git add packages/ods && git commit -m "feat(ods): add chart component and finalize infrastructure"`
