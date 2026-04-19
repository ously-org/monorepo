# Shared Config Packages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement shared configuration packages for consistent TypeScript rules, Tailwind CSS tokens, and shared Zod schemas.

**Architecture:** Monorepo packages under `packages/` that provide shared configurations and types to be used by apps and other packages.

**Tech Stack:** TypeScript, Tailwind CSS, Zod, pnpm.

---

### Task 1: Create `@ously/tsconfig` Package

**Files:**
- Create: `packages/tsconfig/package.json`
- Create: `packages/tsconfig/base.json`

- [ ] **Step 1: Create `packages/tsconfig/package.json`**
```json
{
  "name": "@ously/tsconfig",
  "version": "0.0.0",
  "private": true,
  "files": ["base.json", "nextjs.json", "workers.json"]
}
```

- [ ] **Step 2: Create `packages/tsconfig/base.json`**
```json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "display": "Default",
  "compilerOptions": {
    "composite": false,
    "declaration": true,
    "declarationMap": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "inlineSources": false,
    "isolatedModules": true,
    "moduleResolution": "node",
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "preserveWatchOutput": true,
    "skipLibCheck": true,
    "strict": true,
    "target": "esnext"
  },
  "exclude": ["node_modules"]
}
```

- [ ] **Step 3: Commit tsconfig package**
Run: `git add packages/tsconfig && git commit -m "feat(tsconfig): add shared base tsconfig"`

---

### Task 2: Create `@ously/config-tailwind` Package

**Files:**
- Create: `packages/config-tailwind/package.json`
- Create: `packages/config-tailwind/tailwind.config.ts`

- [ ] **Step 1: Create `packages/config-tailwind/package.json`**
```json
{
  "name": "@ously/config-tailwind",
  "version": "0.0.0",
  "private": true,
  "main": "./tailwind.config.ts",
  "types": "./tailwind.config.ts",
  "dependencies": {
    "tailwindcss": "^3.4.1",
    "tailwindcss-animate": "^1.0.7"
  }
}
```

- [ ] **Step 2: Create `packages/config-tailwind/tailwind.config.ts`**
```typescript
import type { Config } from "tailwindcss";

const config: Omit<Config, "content"> = {
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
```

- [ ] **Step 3: Commit tailwind config package**
Run: `git add packages/config-tailwind && git commit -m "feat(tailwind): add shared design tokens"`

---

### Task 3: Create `@ously/types` Package

**Files:**
- Create: `packages/types/package.json`
- Create: `packages/types/src/index.ts`
- Create: `packages/types/src/index.test.ts` (for TDD verification)

- [ ] **Step 1: Create `packages/types/package.json`**
```json
{
  "name": "@ously/types",
  "version": "0.0.0",
  "private": true,
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "dependencies": {
    "zod": "^3.23.8"
  },
  "devDependencies": {
    "vitest": "^1.6.0"
  },
  "scripts": {
    "test": "vitest run"
  }
}
```

- [ ] **Step 2: Write failing test for UserSchema**
Create `packages/types/src/index.test.ts`:
```typescript
import { expect, test } from "vitest";
import { UserSchema } from "./index";

test("UserSchema validates valid user", () => {
  const validUser = {
    id: "123",
    email: "test@example.com",
    name: "Test User"
  };
  expect(UserSchema.parse(validUser)).toEqual(validUser);
});

test("UserSchema rejects invalid email", () => {
  const invalidUser = {
    id: "123",
    email: "invalid-email",
  };
  expect(() => UserSchema.parse(invalidUser)).toThrow();
});
```

- [ ] **Step 3: Run test to verify it fails (missing index.ts)**
Run: `pnpm --filter @ously/types exec vitest run` (after install)
Expected: FAIL (index.ts not found or UserSchema not exported)

- [ ] **Step 4: Create `packages/types/src/index.ts`**
```typescript
import { z } from "zod";

export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string().optional(),
});

export type User = z.infer<typeof UserSchema>;
```

- [ ] **Step 5: Run test to verify it passes**
Run: `pnpm --filter @ously/types exec vitest run`
Expected: PASS

- [ ] **Step 6: Commit types package**
Run: `git add packages/types && git commit -m "feat(types): add shared user schema"`

---

### Task 4: Installation and Final Commit

- [ ] **Step 1: Run `pnpm install`**
Run: `pnpm install`

- [ ] **Step 2: Final Commit (if any unstaged changes)**
Run: `git add . && git commit -m "feat: shared config packages (tsconfig, tailwind, types)"`
*(Note: Tasks 1-3 already committed their parts, this is a catch-all as requested by user)*

- [ ] **Step 3: Verify build**
Run: `pnpm turbo build` (if turbo is configured)
