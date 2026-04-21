# Atomic ODS Components Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the `Item` and `Empty` atomic component systems in ODS and verify them in Storybook before assembling the final widget.

**Architecture:** 
1. Follow the ODS internal/public boundary pattern.
2. Align component structure and class names (e.g., `cn-item`) with the reference HTML provided by the user.
3. Prioritize isolated verification in Storybook.

**Tech Stack:** React, Tailwind CSS, `@ously/ods`, Storybook.

---

### Task 1: Implement "Item" Atomic System

**Files:**
- Create: `packages/ods/src/internal/item-shadcn.tsx`
- Create: `packages/ods/src/components/item.tsx`
- Create: `apps/storybook/src/stories/Item.stories.tsx`
- Modify: `packages/ods/src/index.ts`

- [ ] **Step 1: Create internal Item component**

Create `packages/ods/src/internal/item-shadcn.tsx`:
```tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../lib/utils"

const itemVariants = cva(
  "cn-item group/item flex w-full flex-wrap transition-colors duration-100 outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 [a]:transition-colors",
  {
    variants: {
      variant: {
        default: "cn-item-variant-default",
        muted: "cn-item-variant-muted",
      },
      size: {
        default: "cn-item-size-default flex-col items-stretch",
        sm: "cn-item-size-sm items-center gap-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof itemVariants> {}

const Item = React.forwardRef<HTMLDivElement, ItemProps>(
  ({ className, variant, size, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="item"
      data-variant={variant}
      data-size={size}
      className={cn(itemVariants({ variant, size, className }))}
      {...props}
    />
  )
)
Item.displayName = "Item"

const ItemContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="item-content"
    className={cn("cn-item-content flex flex-1 flex-col [&+[data-slot=item-content]]:flex-none gap-1", className)}
    {...props}
  />
))
ItemContent.displayName = "ItemContent"

const ItemTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="item-title"
    className={cn("cn-item-title line-clamp-1 flex w-fit items-center", className)}
    {...props}
  />
))
ItemTitle.displayName = "ItemTitle"

const ItemDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    data-slot="item-description"
    className={cn("cn-item-description line-clamp-2 [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary text-xs font-medium tracking-wider text-muted-foreground uppercase", className)}
    {...props}
  />
))
ItemDescription.displayName = "ItemDescription"

export { Item, ItemContent, ItemTitle, ItemDescription }
```

- [ ] **Step 2: Create public Item wrapper**

Create `packages/ods/src/components/item.tsx`:
```tsx
import { 
  Item as InternalItem, 
  ItemContent as InternalItemContent, 
  ItemTitle as InternalItemTitle, 
  ItemDescription as InternalItemDescription 
} from "../internal/item-shadcn"

export const Item = InternalItem
export const ItemContent = InternalItemContent
export const ItemTitle = InternalItemTitle
export const ItemDescription = InternalItemDescription
```

- [ ] **Step 3: Export from ODS**

Update `packages/ods/src/index.ts` to include:
```typescript
export * from "./components/item";
```

- [ ] **Step 4: Create Item story**

Create `apps/storybook/src/stories/Item.stories.tsx`:
```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Item, ItemContent, ItemDescription, ItemTitle } from '@ously/ods';

const meta = {
  title: 'Atoms/Item',
  component: Item,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Item>;

export default meta;
type Story = StoryObj<typeof Item>;

export const DashboardStat: Story = {
  render: (args) => (
    <div className="dark w-[200px] p-4 bg-background">
      <Item {...args}>
        <ItemContent>
          <ItemDescription>Upcoming</ItemDescription>
          <span className="text-lg font-semibold text-white">May 25, 2024</span>
          <span className="text-sm text-muted-foreground">$1,000 scheduled</span>
        </ItemContent>
      </Item>
    </div>
  ),
  args: {
    variant: 'muted',
    size: 'default',
  }
};

export const ListRow: Story = {
  render: (args) => (
    <div className="dark w-[400px] p-4 bg-background">
      <Item {...args}>
        <ItemContent>
          <ItemTitle className="text-white">Vanguard VIG</ItemTitle>
          <ItemDescription className="normal-case tracking-normal">450 Shares</ItemDescription>
        </ItemContent>
        <div className="text-sm font-semibold text-white">$1,842.10</div>
      </Item>
    </div>
  ),
  args: {
    variant: 'muted',
    size: 'sm',
  }
};
```

- [ ] **Step 5: Commit**

```bash
git add packages/ods apps/storybook
git commit -m "feat(ods): add Item atomic system and stories"
```

---

### Task 2: Implement "Empty" Atomic System

**Files:**
- Create: `packages/ods/src/internal/empty-shadcn.tsx`
- Create: `packages/ods/src/components/empty.tsx`
- Create: `apps/storybook/src/stories/Empty.stories.tsx`
- Modify: `packages/ods/src/index.ts`

- [ ] **Step 1: Create internal Empty component**

Create `packages/ods/src/internal/empty-shadcn.tsx`:
```tsx
import * as React from "react"
import { cn } from "../lib/utils"

const Empty = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="empty"
    className={cn(
      "cn-empty flex w-full min-w-0 flex-1 flex-col items-center justify-center text-center text-balance p-4",
      className
    )}
    {...props}
  />
))
Empty.displayName = "Empty"

const EmptyMedia = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="empty-icon"
    className={cn(
      "cn-empty-media flex shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0 cn-empty-media-icon",
      className
    )}
    {...props}
  />
))
EmptyMedia.displayName = "EmptyMedia"

const EmptyHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="empty-header"
    className={cn("cn-empty-header flex max-w-sm flex-col items-center", className)}
    {...props}
  />
))
EmptyHeader.displayName = "EmptyHeader"

const EmptyTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="empty-title"
    className={cn("cn-empty-title font-heading text-lg font-semibold", className)}
    {...props}
  />
))
EmptyTitle.displayName = "EmptyTitle"

const EmptyDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    data-slot="empty-description"
    className={cn(
      "cn-empty-description text-muted-foreground [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary text-sm",
      className
    )}
    {...props}
  />
))
EmptyDescription.displayName = "EmptyDescription"

const EmptyContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="empty-content"
    className={cn(
      "cn-empty-content flex w-full max-w-sm min-w-0 flex-col items-center text-balance mt-4",
      className
    )}
    {...props}
  />
))
EmptyContent.displayName = "EmptyContent"

export { Empty, EmptyMedia, EmptyHeader, EmptyTitle, EmptyDescription, EmptyContent }
```

- [ ] **Step 2: Create public Empty wrapper**

Create `packages/ods/src/components/empty.tsx`:
```tsx
import { 
  Empty as InternalEmpty,
  EmptyMedia as InternalEmptyMedia,
  EmptyHeader as InternalEmptyHeader,
  EmptyTitle as InternalEmptyTitle,
  EmptyDescription as InternalEmptyDescription,
  EmptyContent as InternalEmptyContent
} from "../internal/empty-shadcn"

export const Empty = InternalEmpty
export const EmptyMedia = InternalEmptyMedia
export const EmptyHeader = InternalEmptyHeader
export const EmptyTitle = InternalEmptyTitle
export const EmptyDescription = InternalEmptyDescription
export const EmptyContent = InternalEmptyContent
```

- [ ] **Step 3: Export from ODS**

Update `packages/ods/src/index.ts` to include:
```typescript
export * from "./components/empty";
```

- [ ] **Step 4: Create Empty story**

Create `apps/storybook/src/stories/Empty.stories.tsx`:
```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Empty, EmptyMedia, EmptyHeader, EmptyTitle, EmptyDescription, EmptyContent, Button } from '@ously/ods';
import { PlusIcon, Loader2Icon } from 'lucide-react';

const meta = {
  title: 'Atoms/Empty',
  component: Empty,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Empty>;

export default meta;
type Story = StoryObj<typeof Empty>;

export const Default: Story = {
  render: () => (
    <div className="dark w-[400px] p-8 bg-background border border-border rounded-xl">
      <Empty>
        <EmptyHeader>
          <EmptyMedia>
            <PlusIcon className="w-12 h-12 text-muted-foreground" />
          </EmptyMedia>
          <EmptyTitle className="text-white">Distribute Track</EmptyTitle>
          <EmptyDescription>
            Upload your first master to start reaching listeners on Spotify, Apple Music, and more.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button size="lg">Create Release</Button>
        </EmptyContent>
      </Empty>
    </div>
  )
};

export const Loading: Story = {
  render: () => (
    <div className="dark w-[400px] p-8 bg-background border border-border rounded-xl">
      <Empty>
        <EmptyHeader>
          <EmptyMedia>
            <Loader2Icon className="w-8 h-8 text-primary animate-spin" />
          </EmptyMedia>
          <EmptyTitle className="text-white">Syncing your accounts</EmptyTitle>
          <EmptyDescription>
            We're pulling in your latest transactions. This usually takes a few seconds.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button variant="outline">Cancel</Button>
        </EmptyContent>
      </Empty>
    </div>
  )
};
```

- [ ] **Step 5: Commit**

```bash
git add packages/ods apps/storybook
git commit -m "feat(ods): add Empty atomic system and stories"
```

---

### Task 3: Assemble Contribution History Widget

**Files:**
- Modify: `apps/storybook/src/stories/ContributionHistory.stories.tsx`

- [ ] **Step 1: Refactor Story to use Atoms**

Update the `Default` story in `apps/storybook/src/stories/ContributionHistory.stories.tsx` to use `Item` and `ItemContent` for the stat blocks.

- [ ] **Step 2: Add Empty State variant**

Add an `EmptyState` story to `ContributionHistory.stories.tsx` using the `Empty` atomic system inside a `Card`.

- [ ] **Step 3: Commit**

```bash
git add apps/storybook/src/stories/ContributionHistory.stories.tsx
git commit -m "feat(storybook): refactor widget to use atomic components"
```
