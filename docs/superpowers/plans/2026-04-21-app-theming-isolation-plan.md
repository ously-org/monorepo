# App-Specific Theming & Shadcn Isolation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Decentralize design tokens to resolve build errors and strictly isolate Shadcn components within `@ously/ods`.

**Architecture:** Each application (`web-main`, `web-prosper`, `storybook`) defines its own CSS variables in a local CSS file. `@ously/ods` consumes these variables without exporting any CSS itself. `@ously/config-tailwind` provides shared Tailwind configuration logic but no CSS files.

**Tech Stack:** Next.js, Tailwind CSS, Shadcn UI, Turborepo, pnpm.

---

### Task 1: Update Root GEMINI.md

**Files:**
- Modify: `GEMINI.md`

- [ ] **Step 1: Add the directive to read GEMINI.md in every folder**

```markdown
## 🧠 The Vibe Coding Framework
We operate under a 3-Pillar Framework to prevent technical debt and strategic fatigue:
1. **Rules:** Enforce strict architectural boundaries (Domain-First). Always read the `GEMINI.md` in every folder that you visit.
...
```

- [ ] **Step 2: Commit**

```bash
git add GEMINI.md
git commit -m "docs: add rule to read GEMINI.md in every folder"
```

### Task 2: Migrate Ously Theme to `web-main`

**Files:**
- Modify: `apps/web-main/app/globals.css`

- [ ] **Step 1: Update `globals.css` with Ously variables and remove shared import**

```css
@import "tw-animate-css";
@import "shadcn/tailwind.css";

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
    --primary: oklch(0.511 0.096 186.391);
    --primary-foreground: oklch(0.984 0.014 180.72);
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
    --chart-1: oklch(0.855 0.138 181.071);
    --chart-2: oklch(0.704 0.14 182.503);
    --chart-3: oklch(0.6 0.118 184.704);
    --chart-4: oklch(0.511 0.096 186.391);
    --chart-5: oklch(0.437 0.078 188.216);
    --radius: 0.625rem;
    --sidebar: oklch(0.987 0.002 197.1);
    --sidebar-foreground: oklch(0.148 0.004 228.8);
    --sidebar-primary: oklch(0.6 0.118 184.704);
    --sidebar-primary-foreground: oklch(0.984 0.014 180.72);
    --sidebar-accent: oklch(0.963 0.002 197.1);
    --sidebar-accent-foreground: oklch(0.218 0.008 223.9);
    --sidebar-border: oklch(0.925 0.005 214.3);
    --sidebar-ring: oklch(0.723 0.014 214.4);
  }
  .dark {
    --background: oklch(0.148 0.004 228.8);
    --foreground: oklch(0.987 0.002 197.1);
    --card: oklch(0.218 0.008 223.9);
    --card-foreground: oklch(0.987 0.002 197.1);
    --popover: oklch(0.218 0.008 223.9);
    --popover-foreground: oklch(0.987 0.002 197.1);
    --primary: oklch(0.437 0.078 188.216);
    --primary-foreground: oklch(0.984 0.014 180.72);
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
    --chart-1: oklch(0.855 0.138 181.071);
    --chart-2: oklch(0.704 0.14 182.503);
    --chart-3: oklch(0.6 0.118 184.704);
    --chart-4: oklch(0.511 0.096 186.391);
    --chart-5: oklch(0.437 0.078 188.216);
    --sidebar: oklch(0.218 0.008 223.9);
    --sidebar-foreground: oklch(0.987 0.002 197.1);
    --sidebar-primary: oklch(0.704 0.14 182.503);
    --sidebar-primary-foreground: oklch(0.277 0.046 192.524);
    --sidebar-accent: oklch(0.275 0.011 216.9);
    --sidebar-accent-foreground: oklch(0.987 0.002 197.1);
    --sidebar-border: oklch(1 0 0 / 10%);
    --sidebar-ring: oklch(0.56 0.021 213.5);
  }
}

@layer base {
  .theme {
    --font-heading: var(--font-mono);
    --font-mono: var(--font-mono);
  }
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
  html {
    @apply font-mono;
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add apps/web-main/app/globals.css
git commit -m "feat(web-main): localize Ously theme variables"
```

### Task 3: Migrate Prosper Theme to `web-prosper`

**Files:**
- Modify: `apps/web-prosper/app/globals.css`

- [ ] **Step 1: Update `globals.css` with Prosper variables and remove shared import**

```css
@import "tw-animate-css";
@import "shadcn/tailwind.css";

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
    --primary: oklch(0.511 0.096 186.391);
    --primary-foreground: oklch(0.984 0.014 180.72);
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
    --chart-1: oklch(0.855 0.138 181.071);
    --chart-2: oklch(0.704 0.14 182.503);
    --chart-3: oklch(0.6 0.118 184.704);
    --chart-4: oklch(0.511 0.096 186.391);
    --chart-5: oklch(0.437 0.078 188.216);
    --radius: 0.625rem;
    --sidebar: oklch(0.987 0.002 197.1);
    --sidebar-foreground: oklch(0.148 0.004 228.8);
    --sidebar-primary: oklch(0.6 0.118 184.704);
    --sidebar-primary-foreground: oklch(0.984 0.014 180.72);
    --sidebar-accent: oklch(0.963 0.002 197.1);
    --sidebar-accent-foreground: oklch(0.218 0.008 223.9);
    --sidebar-border: oklch(0.925 0.005 214.3);
    --sidebar-ring: oklch(0.723 0.014 214.4);
  }
  .dark {
    --background: oklch(0.148 0.004 228.8);
    --foreground: oklch(0.987 0.002 197.1);
    --card: oklch(0.218 0.008 223.9);
    --card-foreground: oklch(0.987 0.002 197.1);
    --popover: oklch(0.218 0.008 223.9);
    --popover-foreground: oklch(0.987 0.002 197.1);
    --primary: oklch(0.437 0.078 188.216);
    --primary-foreground: oklch(0.984 0.014 180.72);
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
    --chart-1: oklch(0.855 0.138 181.071);
    --chart-2: oklch(0.704 0.14 182.503);
    --chart-3: oklch(0.6 0.118 184.704);
    --chart-4: oklch(0.511 0.096 186.391);
    --chart-5: oklch(0.437 0.078 188.216);
    --sidebar: oklch(0.218 0.008 223.9);
    --sidebar-foreground: oklch(0.987 0.002 197.1);
    --sidebar-primary: oklch(0.704 0.14 182.503);
    --sidebar-primary-foreground: oklch(0.277 0.046 192.524);
    --sidebar-accent: oklch(0.275 0.011 216.9);
    --sidebar-accent-foreground: oklch(0.987 0.002 197.1);
    --sidebar-border: oklch(1 0 0 / 10%);
    --sidebar-ring: oklch(0.56 0.021 213.5);
  }
}

@layer base {
  .theme {
    --font-heading: var(--font-mono);
    --font-mono: var(--font-mono);
  }
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
  html {
    @apply font-mono;
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add apps/web-prosper/app/globals.css
git commit -m "feat(web-prosper): localize Prosper theme variables"
```

### Task 4: Migrate Prosper Theme to `storybook`

**Files:**
- Modify: `apps/storybook/src/index.css`

- [ ] **Step 1: Update `index.css` with Prosper variables and remove shared import**

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
    --primary: oklch(0.511 0.096 186.391);
    --primary-foreground: oklch(0.984 0.014 180.72);
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
    --chart-1: oklch(0.855 0.138 181.071);
    --chart-2: oklch(0.704 0.14 182.503);
    --chart-3: oklch(0.6 0.118 184.704);
    --chart-4: oklch(0.511 0.096 186.391);
    --chart-5: oklch(0.437 0.078 188.216);
    --radius: 0.625rem;
    --sidebar: oklch(0.987 0.002 197.1);
    --sidebar-foreground: oklch(0.148 0.004 228.8);
    --sidebar-primary: oklch(0.6 0.118 184.704);
    --sidebar-primary-foreground: oklch(0.984 0.014 180.72);
    --sidebar-accent: oklch(0.963 0.002 197.1);
    --sidebar-accent-foreground: oklch(0.218 0.008 223.9);
    --sidebar-border: oklch(0.925 0.005 214.3);
    --sidebar-ring: oklch(0.723 0.014 214.4);
  }
  .dark {
    --background: oklch(0.148 0.004 228.8);
    --foreground: oklch(0.987 0.002 197.1);
    --card: oklch(0.218 0.008 223.9);
    --card-foreground: oklch(0.987 0.002 197.1);
    --popover: oklch(0.218 0.008 223.9);
    --popover-foreground: oklch(0.987 0.002 197.1);
    --primary: oklch(0.437 0.078 188.216);
    --primary-foreground: oklch(0.984 0.014 180.72);
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
    --chart-1: oklch(0.855 0.138 181.071);
    --chart-2: oklch(0.704 0.14 182.503);
    --chart-3: oklch(0.6 0.118 184.704);
    --chart-4: oklch(0.511 0.096 186.391);
    --chart-5: oklch(0.437 0.078 188.216);
    --sidebar: oklch(0.218 0.008 223.9);
    --sidebar-foreground: oklch(0.987 0.002 197.1);
    --sidebar-primary: oklch(0.704 0.14 182.503);
    --sidebar-primary-foreground: oklch(0.277 0.046 192.524);
    --sidebar-accent: oklch(0.275 0.011 216.9);
    --sidebar-accent-foreground: oklch(0.987 0.002 197.1);
    --sidebar-border: oklch(1 0 0 / 10%);
    --sidebar-ring: oklch(0.56 0.021 213.5);
  }
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add apps/storybook/src/index.css
git commit -m "feat(storybook): localize Prosper theme variables"
```

### Task 5: Clean up `packages/config-tailwind`

**Files:**
- Modify: `packages/config-tailwind/package.json`
- Delete: `packages/config-tailwind/theme.css`

- [ ] **Step 1: Remove `theme.css` export from `package.json`**

```json
{
  "name": "@ously/config-tailwind",
  "version": "0.0.0",
  "private": true,
  "main": "./tailwind.config.ts",
  "exports": {
    ".": "./tailwind.config.ts",
    "./tailwind.config": "./tailwind.config.ts"
  },
  "dependencies": {
    "tailwindcss": "^3.4.1",
    "tailwindcss-animate": "^1.0.7"
  }
}
```

- [ ] **Step 2: Delete `theme.css`**

Run: `rm packages/config-tailwind/theme.css`

- [ ] **Step 3: Commit**

```bash
git add packages/config-tailwind/package.json
git rm packages/config-tailwind/theme.css
git commit -m "refactor(config-tailwind): remove shared theme.css"
```

### Task 6: Final Verification

- [ ] **Step 1: Run build across monorepo**

Run: `pnpm run build`
Expected: Success for all apps and packages.
