# Contribution History Component Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a "Contribution History" component matching the provided visual design, utilizing the Shadcn `Card`, `Button`, and `Chart` components as a base.

**Architecture:** 
1. Install `recharts` in `@ously/ods`.
2. Add the Shadcn `Chart` component internals to `packages/ods/src/internal/chart-shadcn.tsx` and export a public wrapper.
3. Build a complex story in `apps/storybook/src/stories/ContributionHistory.stories.tsx` that combines `Card`, `Chart`, and `Button` to precisely match the target design and layout.

**Tech Stack:** React, Tailwind CSS, Recharts, `@ously/ods` (Shadcn).

---

### Task 1: Add Recharts Dependency

**Files:**
- Modify: `packages/ods/package.json`

- [ ] **Step 1: Install recharts in ODS package**

Run: `cd packages/ods && pnpm add recharts`

- [ ] **Step 2: Commit**

```bash
git add packages/ods/package.json packages/ods/package.json
git commit -m "build(ods): add recharts dependency"
```

### Task 2: Implement Chart Components in ODS

**Files:**
- Create: `packages/ods/src/internal/chart-shadcn.tsx`
- Create: `packages/ods/src/components/chart.tsx`
- Modify: `packages/ods/src/index.ts`

- [ ] **Step 1: Create the internal Shadcn Chart components**

Create `packages/ods/src/internal/chart-shadcn.tsx`:
```tsx
import * as React from "react"
import * as RechartsPrimitive from "recharts"
import { cn } from "../lib/utils"

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode
    icon?: React.ComponentType
    color?: string
    theme?: Record<"light" | "dark", string>
  }
}

const ChartContext = React.createContext<ChartConfig | null>(null)

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config: ChartConfig
    children: React.ComponentProps<
      typeof RechartsPrimitive.ResponsiveContainer
    >["children"]
  }
>(({ id, className, children, config, ...props }, ref) => {
  const chartId = React.useId()
  const idPrefix = id || chartId

  return (
    <ChartContext.Provider value={config}>
      <div
        data-chart={idPrefix}
        ref={ref}
        className={cn(
          "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-hidden",
          className
        )}
        {...props}
      >
        <style
          dangerouslySetInnerHTML={{
            __html: Object.entries(config)
              .map(([key, item]) => {
                const color = item.color || item.theme?.light
                const darkColor = item.theme?.dark || color
                if (!color) return ""
                return `
                  [data-chart=${idPrefix}] {
                    --color-${key}: ${color};
                  }
                  .dark [data-chart=${idPrefix}] {
                    --color-${key}: ${darkColor};
                  }
                `
              })
              .join(""),
          }}
        />
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
})
ChartContainer.displayName = "ChartContainer"

const ChartTooltip = RechartsPrimitive.Tooltip

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof RechartsPrimitive.Tooltip> & {
    hideLabel?: boolean
    hideIndicator?: boolean
    indicator?: "line" | "dot" | "dashed"
    nameKey?: string
    labelKey?: string
  }
>(({ active, payload, className, indicator = "dot", hideLabel = false, hideIndicator = false, label, labelFormatter, labelClassName, formatter, color, nameKey, labelKey }, ref) => {
  const config = React.useContext(ChartContext)

  if (!active || !payload?.length) {
    return null
  }

  return (
    <div
      ref={ref}
      className={cn(
        "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl",
        className
      )}
    >
      <div className="grid gap-1.5">
        {payload.map((item, index) => {
          const itemConfig = config?.[item.dataKey as string]
          return (
            <div
              key={item.dataKey}
              className={cn(
                "flex w-full items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground",
                indicator === "dot" && "items-center"
              )}
            >
              {!hideIndicator && (
                <div
                  className={cn(
                    "shrink-0 rounded-[2px] border-[--color-bg] bg-[--color-bg]",
                    indicator === "dot" && "h-2.5 w-2.5"
                  )}
                  style={{
                    "--color-bg": `var(--color-${item.dataKey})`,
                  } as React.CSSProperties}
                />
              )}
              <div className="flex flex-1 justify-between leading-none">
                <div className="grid gap-1.5">
                  <span className="text-muted-foreground">
                    {itemConfig?.label || item.name}
                  </span>
                </div>
                {item.value && (
                  <span className="font-mono font-medium tabular-nums text-foreground">
                    {item.value.toLocaleString()}
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
})
ChartTooltipContent.displayName = "ChartTooltipContent"

export { ChartContainer, ChartTooltip, ChartTooltipContent }
```

- [ ] **Step 2: Create the public wrapper**

Create `packages/ods/src/components/chart.tsx`:
```tsx
import { 
  ChartContainer as ShadcnChartContainer, 
  ChartTooltip as ShadcnChartTooltip, 
  ChartTooltipContent as ShadcnChartTooltipContent,
  type ChartConfig
} from "../internal/chart-shadcn"

export const ChartContainer = ShadcnChartContainer
export const ChartTooltip = ShadcnChartTooltip
export const ChartTooltipContent = ShadcnChartTooltipContent
export type { ChartConfig }
```

- [ ] **Step 3: Export from ODS root**

Modify `packages/ods/src/index.ts` to add the export:
```typescript
export * from "./components/button";
export * from "./components/card";
export * from "./components/chart";
export * from "./lib/utils";
```

- [ ] **Step 4: Commit**

```bash
git add packages/ods/src/internal/chart-shadcn.tsx packages/ods/src/components/chart.tsx packages/ods/src/index.ts
git commit -m "feat(ods): add chart component base"
```

### Task 3: Build Contribution History Story

**Files:**
- Create: `apps/storybook/src/stories/ContributionHistory.stories.tsx`

- [ ] **Step 1: Write the Contribution History story**

Create `apps/storybook/src/stories/ContributionHistory.stories.tsx`:
```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Button, ChartContainer, ChartTooltip, ChartTooltipContent } from '@ously/ods';
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
    <Card className="w-full max-w-sm bg-[#1c1c1c] text-white border-0 shadow-xl overflow-hidden rounded-xl">
      <CardHeader className="pb-2">
        <CardTitle className="font-mono text-lg font-bold tracking-tight">Contribution History</CardTitle>
        <CardDescription className="text-gray-400 font-mono text-xs mt-1">Last 6 months of activity</CardDescription>
      </CardHeader>
      
      <CardContent className="pb-4">
        {/* Chart Section */}
        <div className="h-[180px] w-full mt-4 mb-6">
          <ChartContainer config={chartConfig} className="h-full w-full">
            <BarChart data={chartData} margin={{ top: 0, left: 0, right: 0, bottom: 0 }}>
              <XAxis 
                dataKey="month" 
                tickLine={false} 
                axisLine={false} 
                tickMargin={10} 
                className="font-mono text-[10px]"
                tick={{ fill: '#666' }}
              />
              <ChartTooltip content={<ChartTooltipContent hideLabel />} cursor={false} />
              <Bar dataKey="amount" fill="var(--color-amount)" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </div>

        {/* Info Blocks Section */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="flex flex-col bg-[#252525] rounded-lg p-3">
            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-1">Upcoming</span>
            <span className="font-mono font-bold text-base mb-1">May 25,<br/>2024</span>
            <span className="font-mono text-xs text-gray-500 mt-auto">$1,000<br/>scheduled</span>
          </div>
          <div className="flex flex-col bg-[#252525] rounded-lg p-3">
            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-1">Auto-Save Plan</span>
            <span className="font-mono font-bold text-base mb-1">Accelerated</span>
            <span className="font-mono text-xs text-gray-500 mt-auto">Recurring<br/>weekly</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-2 border-t border-white/5 bg-[#1c1c1c]">
        <Button className="w-full bg-[#008080] hover:bg-[#006666] text-white font-mono font-medium h-12 rounded-sm transition-colors mt-2" size="lg">
          View Full Report
        </Button>
      </CardFooter>
    </Card>
  ),
};
```

- [ ] **Step 2: Commit**

```bash
git add apps/storybook/src/stories/ContributionHistory.stories.tsx
git commit -m "feat(storybook): add contribution history widget story"
```
