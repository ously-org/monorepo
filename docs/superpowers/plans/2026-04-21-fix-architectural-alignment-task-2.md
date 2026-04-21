# Fix Architectural Alignment Issues in Task 2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Correct internal import and export patterns in the ODS chart component to align with project standards.

**Architecture:** Update `packages/ods` to use relative imports for internal utilities and ensure all relevant chart components are correctly exported from the public interface.

**Tech Stack:** TypeScript, React, Turborepo

---

### Task 1: Fix Internal Import in Chart

**Files:**
- Modify: `packages/ods/src/internal/chart.tsx`

- [ ] **Step 1: Replace absolute import with relative import**

Update the import of `cn` to use a relative path instead of the workspace-absolute path.

```tsx
// Old
import { cn } from "@ously/ods/lib/utils"

// New
import { cn } from "../lib/utils"
```

### Task 2: Export Legend Components from Chart

**Files:**
- Modify: `packages/ods/src/components/chart.tsx`

- [ ] **Step 1: Export ChartLegend and ChartLegendContent**

Update the public chart component to export the legend components from the internal implementation.

```tsx
import { 
  ChartContainer as InternalChartContainer, 
  ChartTooltip as InternalChartTooltip, 
  ChartTooltipContent as InternalChartTooltipContent,
  ChartLegend as InternalChartLegend,
  ChartLegendContent as InternalChartLegendContent,
  type ChartConfig
} from "../internal/chart"

export const ChartContainer = InternalChartContainer
export const ChartTooltip = InternalChartTooltip
export const ChartTooltipContent = InternalChartTooltipContent
export const ChartLegend = InternalChartLegend
export const ChartLegendContent = InternalChartLegendContent
export type { ChartConfig }
```

### Task 3: Verify and Commit

- [ ] **Step 1: Run build for @ously/ods**

Run: `pnpm run build --filter @ously/ods`
Expected: Build passes without errors.

- [ ] **Step 2: Commit fix**

```bash
git add packages/ods/src/internal/chart.tsx packages/ods/src/components/chart.tsx
git commit -m "fix(ods): align chart imports and exports with architectural standards"
```
