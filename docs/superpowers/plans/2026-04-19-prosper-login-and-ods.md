# Prosper Login and ODS Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement a mock login page for Prosper and refactor the shared UI package into a constrained Oously Design System (@ously/ods) using Shadcn presets.

**Architecture:** Refactor `packages/ui` to `packages/ods`, set up app-specific themes via `shadcn` CLI presets, and implement a mock login page in Prosper using strictly constrained public components that wrap internal Shadcn primitives.

**Tech Stack:** Next.js, Tailwind CSS, Shadcn/ui, Lucide React, Turborepo.
**Plan Agent**: Gemini 3.1 Pro

---

### Task 1: Refactor `packages/ui` to `packages/ods`

**Files:**
- Modify: `package.json` (workspace root)
- Modify: `pnpm-workspace.yaml`
- Rename: `packages/ui` -> `packages/ods`
- Modify: `packages/ods/package.json`
- Modify: `apps/web-prosper/package.json`
- Modify: `apps/web-main/package.json`
- Modify: `apps/api/package.json` (if applicable)

- [ ] **Step 1: Rename the directory**
Run: `mv packages/ui packages/ods`

- [ ] **Step 2: Update `packages/ods/package.json`**
Change `"name": "@ously/ods"` to `"name": "@ously/ods"`.

- [ ] **Step 3: Update `pnpm-workspace.yaml`**
Ensure it includes `packages/*` (already does).

- [ ] **Step 4: Update all workspace references**
Search for `@ously/ods` and replace with `@ously/ods`.
Run: `grep -r "@ously/ods" .`

- [ ] **Step 5: Verify build**
Run: `pnpm install && turbo build --filter=@ously/ods`

- [ ] **Step 6: Commit**
```bash
git add .
git commit -m "refactor: rename @ously/ods to @ously/ods"
```

### Task 2: Initialize Shadcn Theme for Prosper

**Files:**
- Modify: `apps/web-prosper/app/globals.css`
- Modify: `apps/web-prosper/tailwind.config.ts`

- [ ] **Step 1: Run shadcn init with preset**
Run: `pnpm dlx shadcn@latest init --preset b5dN5Y7sp --template next --yes` inside `apps/web-prosper`.
*Note: I will need to handle the prompts for CSS variables and configuration paths.*

- [ ] **Step 2: Verify globals.css**
Check that it contains the new variables (e.g., `--background: 0 0% 3.9%`).

- [ ] **Step 3: Commit**
```bash
git add apps/web-prosper/app/globals.css apps/web-prosper/tailwind.config.ts
git commit -m "feat(prosper): initialize shadcn theme with b5dN5Y7sp preset"
```

### Task 3: Initialize Shadcn Theme for Main Ously

**Files:**
- Modify: `apps/web-main/app/globals.css`
- Modify: `apps/web-main/tailwind.config.ts`

- [ ] **Step 1: Run shadcn init with preset**
Run: `pnpm dlx shadcn@latest init --preset b3lE426DL --template next --yes` inside `apps/web-main`.

- [ ] **Step 2: Override primary color**
Update `:root` in `apps/web-main/app/globals.css`:
```css
:root {
  --primary: 37.304 0.157 47%; /* oklch(0.47 0.157 37.304) converted to HSL-ish for shadcn */
}
```
*Note: I'll use the exact values from the CLI output if it supports OKLCH directly.*

- [ ] **Step 3: Commit**
```bash
git add apps/web-main/app/globals.css apps/web-main/tailwind.config.ts
git commit -m "feat(web-main): initialize shadcn theme with b3lE426DL preset"
```

### Task 4: Implement Constrained ODS Card Component

**Files:**
- Create: `packages/ods/src/internal/card-shadcn.tsx`
- Create: `packages/ods/src/components/card.tsx`
- Modify: `packages/ods/src/index.ts`

- [ ] **Step 1: Add internal Shadcn Card**
Run: `pnpm dlx shadcn@latest add card --path packages/ods/src/internal`
*Note: I'll move the generated file to the internal folder.*

- [ ] **Step 2: Create public ODS Card**
```tsx
import * as React from "react"
import { Card as ShadcnCard, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../internal/card-shadcn"

export interface CardProps {
  title?: string
  description?: string
  children: React.ReactNode
  footer?: React.ReactNode
}

export const Card = ({ title, description, children, footer }: CardProps) => (
  <ShadcnCard>
    {(title || description) && (
      <CardHeader>
        {title && <CardTitle>{title}</CardTitle>}
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
    )}
    <CardContent>{children}</CardContent>
    {footer && <CardFooter>{footer}</CardFooter>}
  </ShadcnCard>
)
```

- [ ] **Step 3: Export from index**
```typescript
export * from "./components/card";
```

- [ ] **Step 4: Commit**
```bash
git add packages/ods
git commit -m "feat(ods): add constrained Card component"
```

### Task 5: Implement Prosper Login Page

**Files:**
- Create: `apps/web-prosper/app/login/page.tsx`

- [ ] **Step 1: Write the login page**
```tsx
import { Button } from "@ously/ods"
import { Card } from "@ously/ods"
import { Github, Chrome } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-background p-4">
      <Card 
        title="Sign in to Prosper" 
        description="Connect your account to continue."
      >
        <div className="flex flex-col gap-4 py-4">
          <Button variant="outline" className="w-full flex gap-2">
            <Chrome className="w-4 h-4" />
            Continue with Google
          </Button>
          <Button variant="outline" className="w-full flex gap-2">
            <Github className="w-4 h-4" />
            Continue with GitHub
          </Button>
        </div>
      </Card>
    </div>
  )
}
```

- [ ] **Step 2: Commit**
```bash
git add apps/web-prosper/app/login/page.tsx
git commit -m "feat(prosper): add mock login page"
```
