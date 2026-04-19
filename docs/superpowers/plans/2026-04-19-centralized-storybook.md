# Centralized Storybook Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Scaffolding a centralized Storybook Next.js app in the monorepo for the `@ously/ods` components.

**Architecture:** We are creating a manual scaffold of Storybook under `apps/storybook` using `@storybook/nextjs`. We avoid the `create-storybook` CLI to prevent interactive prompts from hanging the agent. It extends internal tailwind and tsconfig packages.

**Tech Stack:** React, `@storybook/nextjs`, TailwindCSS.

---

### Task 1: Scaffold Storybook Package

**Files:**
- Create: `apps/storybook/package.json`
- Create: `apps/storybook/tsconfig.json`

- [ ] **Step 1: Write `apps/storybook/package.json`**

```json
{
  "name": "storybook-app",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "dev": "storybook dev -p 6006",
    "build": "storybook build"
  },
  "dependencies": {
    "@ously/config-tailwind": "workspace:*",
    "@ously/ods": "workspace:*",
    "@ously/tsconfig": "workspace:*",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "next": "^14.2.0"
  },
  "devDependencies": {
    "@storybook/addon-essentials": "^8.0.0",
    "@storybook/addon-interactions": "^8.0.0",
    "@storybook/addon-links": "^8.0.0",
    "@storybook/blocks": "^8.0.0",
    "@storybook/nextjs": "^8.0.0",
    "@storybook/react": "^8.0.0",
    "@storybook/test": "^8.0.0",
    "storybook": "^8.0.0",
    "tailwindcss": "^3.4.1",
    "typescript": "^5.0.0"
  }
}
```

- [ ] **Step 2: Write `apps/storybook/tsconfig.json`**

```json
{
  "extends": "@ously/tsconfig/base.json",
  "compilerOptions": {
    "baseUrl": ".",
    "jsx": "preserve",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".storybook/**/*.ts", ".storybook/**/*.tsx"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 3: Run install**

Run: `pnpm install`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add apps/storybook/package.json apps/storybook/tsconfig.json pnpm-lock.yaml
git commit -m "chore(storybook): scaffold base package for storybook"
```

### Task 2: Storybook Configuration & Tailwind

**Files:**
- Create: `apps/storybook/.storybook/main.ts`
- Create: `apps/storybook/.storybook/preview.ts`
- Create: `apps/storybook/tailwind.config.ts`
- Create: `apps/storybook/postcss.config.mjs`
- Create: `apps/storybook/src/index.css`

- [ ] **Step 1: Write `.storybook/main.ts`**

```typescript
import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
};
export default config;
```

- [ ] **Step 2: Write `src/index.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: oklch(1 0 0);
    --foreground: oklch(0.148 0.004 228.8);
    --card: oklch(1 0 0);
    --card-foreground: oklch(0.148 0.004 228.8);
    --popover: oklch(1 0 0);
    --popover-foreground: oklch(0.148 0.004 228.8);
    --primary: oklch(0.47 0.157 37.304);
    --primary-foreground: oklch(0.98 0.016 73.684);
    --secondary: oklch(0.967 0.001 286.375);
    --secondary-foreground: oklch(0.21 0.006 285.885);
    --muted: oklch(0.963 0.002 197.1);
    --muted-foreground: oklch(0.56 0.021 213.5);
    --accent: oklch(0.963 0.002 197.1);
    --accent-foreground: oklch(0.218 0.008 223.9);
    --destructive: oklch(0.577 0.245 27.325);
    --border: oklch(0.925 0.005 214.3);
    --input: oklch(0.925 0.005 214.3);
    --ring: oklch(0.723 0.014 214.4);
    --radius: 0.625rem;
  }
  .dark {
    --background: oklch(0.148 0.004 228.8);
    --foreground: oklch(0.987 0.002 197.1);
    --card: oklch(0.218 0.008 223.9);
    --card-foreground: oklch(0.987 0.002 197.1);
    --popover: oklch(0.218 0.008 223.9);
    --popover-foreground: oklch(0.987 0.002 197.1);
    --primary: oklch(0.47 0.157 37.304);
    --primary-foreground: oklch(0.98 0.016 73.684);
    --secondary: oklch(0.274 0.006 286.033);
    --secondary-foreground: oklch(0.985 0 0);
    --muted: oklch(0.275 0.011 216.9);
    --muted-foreground: oklch(0.723 0.014 214.4);
    --accent: oklch(0.275 0.011 216.9);
    --accent-foreground: oklch(0.987 0.002 197.1);
    --destructive: oklch(0.704 0.191 22.216);
    --border: oklch(1 0 0 / 10%);
    --input: oklch(1 0 0 / 15%);
    --ring: oklch(0.56 0.021 213.5);
  }
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

- [ ] **Step 3: Write `.storybook/preview.ts`**

```typescript
import type { Preview } from "@storybook/react";
import "../src/index.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
```

- [ ] **Step 4: Write `tailwind.config.ts` and `postcss.config.mjs`**

```typescript
import type { Config } from "tailwindcss";
import sharedConfig from "@ously/config-tailwind/tailwind.config";

const config: Pick<Config, "prefix" | "presets" | "content"> = {
  content: [
    "./src/**/*.{ts,tsx}",
    "../../packages/ods/src/**/*.{ts,tsx}"
  ],
  presets: [sharedConfig],
};

export default config;
```

```javascript
// postcss.config.mjs
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

- [ ] **Step 5: Commit**

```bash
git add apps/storybook/.storybook apps/storybook/src apps/storybook/tailwind.config.ts apps/storybook/postcss.config.mjs
git commit -m "feat(storybook): setup config, tailwind and global css"
```

### Task 3: Component Stories

**Files:**
- Create: `apps/storybook/src/stories/Button.stories.tsx`
- Create: `apps/storybook/src/stories/Card.stories.tsx`

- [ ] **Step 1: Write `Button.stories.tsx`**

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@ously/ods/components/button';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
    },
    isLoading: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'default',
    size: 'default',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary',
    variant: 'secondary',
  },
};

export const Destructive: Story = {
  args: {
    children: 'Destructive',
    variant: 'destructive',
  },
};

export const Loading: Story = {
  args: {
    children: 'Please wait',
    isLoading: true,
  },
};
```

- [ ] **Step 2: Write `Card.stories.tsx`**

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Card } from '@ously/ods/components/card';
import { Button } from '@ously/ods/components/button';

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    size: {
      control: 'select',
      options: ['default', 'sm'],
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Create project',
    description: 'Deploy your new project in one-click.',
    children: <p>This is the main content area of the card.</p>,
    footer: <Button>Deploy</Button>,
    size: 'default',
  },
};

export const Small: Story = {
  args: {
    title: 'Small Card',
    description: 'A compact version.',
    children: <p>Content goes here.</p>,
    size: 'sm',
  },
};
```

- [ ] **Step 3: Commit**

```bash
git add apps/storybook/src/stories
git commit -m "feat(storybook): add button and card stories"
```

### Task 4: Turborepo Integration

**Files:**
- Modify: `turbo.json`
- Modify: `.gitignore`

- [ ] **Step 1: Update `turbo.json`**

Append `storybook-static/**` to the `outputs` array in the `build` task of the root `turbo.json`.

```json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", ".vercel/**", "dist/**", "storybook-static/**"]
    },
    "lint": {
      "cache": false
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "type-check": {
      "dependsOn": ["^build"]
    }
  }
}
```

- [ ] **Step 2: Update `.gitignore`**

Run: `echo "storybook-static" >> .gitignore`

- [ ] **Step 3: Test Build**

Run: `pnpm run build --filter=storybook-app`
Expected: Build succeeds and outputs into `storybook-static`.

- [ ] **Step 4: Commit**

```bash
git add turbo.json .gitignore
git commit -m "chore(storybook): add caching and gitignore rules"
```
