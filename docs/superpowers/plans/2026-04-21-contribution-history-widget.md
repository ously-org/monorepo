# Contribution History Widget Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the "Contribution History" widget using Shadcn CLI integration to evaluate the monorepo setup and architectural alignment.

**Architecture:** 
1. Use `shadcn` CLI inside `@ously/ods` to add the `chart` component.
2. Maintain the ODS public/private boundary by wrapping internal components.
3. Build a high-fidelity Storybook story to verify the visual match and token consumption.

**Tech Stack:** React, Tailwind CSS, Recharts, Shadcn UI, Storybook.

---

### Task 1: ODS Infrastructure Setup

**Files:**
- Modify: `packages/ods/package.json`

- [ ] **Step 1: Install dependencies**
Run: `cd packages/ods && pnpm add recharts lucide-react`

- [ ] **Step 2: Commit infrastructure changes**
```bash
git add packages/ods/package.json
git commit -m "build(ods): add recharts and lucide-react dependencies"
```

### Task 2: Shadcn CLI Chart Integration

**Files:**
- Create: `packages/ods/src/internal/chart.tsx` (via CLI)
- Create: `packages/ods/src/components/chart.tsx`
- Modify: `packages/ods/src/index.ts`

- [ ] **Step 1: Run Shadcn CLI to add chart**
Run: `cd packages/ods && npx shadcn@latest add chart`
*Note: Ensure the CLI places it in `src/internal/chart.tsx` based on `components.json`.*

- [ ] **Step 2: Create public wrapper for Chart**
Create `packages/ods/src/components/chart.tsx`:
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

- [ ] **Step 3: Export from ODS root**
Modify `packages/ods/src/index.ts`:
```typescript
export * from "./components/button";
export * from "./components/card";
export * from "./components/chart";
export * from "./lib/utils";
```

- [ ] **Step 4: Verify build**
Run: `pnpm run build --filter @ously/ods`

- [ ] **Step 5: Commit chart component**
```bash
git add packages/ods/src/internal/chart.tsx packages/ods/src/components/chart.tsx packages/ods/src/index.ts
git commit -m "feat(ods): add chart component via shadcn cli"
```

### Task 3: Contribution History Widget Implementation

**Files:**
- Create: `apps/storybook/src/stories/ContributionHistory.stories.tsx`

- [ ] **Step 1: Implement the widget story**
Create `apps/storybook/src/stories/ContributionHistory.stories.tsx`:
```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter, 
  Button, 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from '@ously/ods';
import { Bar, BarChart, XAxis } from 'recharts';

const meta = {
  title: 'Widgets/ContributionHistory',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj;

const chartData = [
  { month: "Dec", amount: 120 },
  { month: "Jan", amount: 200 },
  { month: "Feb", amount: 150 },
  { month: "Mar", amount: 250 },
  { month: "Apr", amount: 130 },
  { month: "May", amount: 280 },
]

const chartConfig = {
  amount: {
    label: "Amount",
    color: "var(--chart-2)",
  },
}

export const Default: Story = {
  render: () => (
    <div className="dark">
      <Card className="w-full max-w-sm bg-card text-card-foreground border-border shadow-xl overflow-hidden rounded-xl">
        <CardHeader className="pb-2">
          <CardTitle className="font-mono text-lg font-bold tracking-tight">Contribution History</CardTitle>
          <CardDescription className="text-muted-foreground font-mono text-xs mt-1">Last 6 months of activity</CardDescription>
        </CardHeader>
        
        <CardContent className="pb-4">
          <div className="h-[180px] w-full mt-4 mb-6">
            <ChartContainer config={chartConfig} className="h-full w-full">
              <BarChart data={chartData} margin={{ top: 0, left: 0, right: 0, bottom: 0 }}>
                <XAxis 
                  dataKey="month" 
                  tickLine={false} 
                  axisLine={false} 
                  tickMargin={10} 
                  className="font-mono text-[10px]"
                  tick={{ fill: 'currentColor', opacity: 0.5 }}
                />
                <ChartTooltip content={<ChartTooltipContent hideLabel />} cursor={false} />
                <Bar dataKey="amount" fill="var(--color-amount)" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="flex flex-col bg-muted/50 rounded-lg p-3">
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-1">Upcoming</span>
              <span className="font-mono font-bold text-base mb-1">May 25,<br/>2024</span>
              <span className="font-mono text-xs text-muted-foreground/80 mt-auto">$1,000<br/>scheduled</span>
            </div>
            <div className="flex flex-col bg-muted/50 rounded-lg p-3">
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-1">Auto-Save Plan</span>
              <span className="font-mono font-bold text-base mb-1">Accelerated</span>
              <span className="font-mono text-xs text-muted-foreground/80 mt-auto">Recurring<br/>weekly</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="pt-2 border-t border-border bg-card">
          <Button className="w-full font-mono font-medium h-12 rounded-sm transition-colors mt-2" size="lg">
            View Full Report
          </Button>
        </CardFooter>
      </Card>
    </div>
  ),
};
```

- [ ] **Step 2: Verify Storybook**
Run: `pnpm run storybook` and navigate to the new story.

- [ ] **Step 3: Commit story**
```bash
git add apps/storybook/src/stories/ContributionHistory.stories.tsx
git commit -m "feat(storybook): add contribution history widget story"
```
