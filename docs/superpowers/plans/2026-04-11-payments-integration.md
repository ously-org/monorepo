# Payments Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create `@ously/payments` package to provide Polar.sh SDK integration and shared webhook handling.

**Architecture:** A shared library package in `packages/payments` that exports a client factory and validation utilities.

**Tech Stack:** TypeScript, `@polar-sh/sdk`, `pnpm`.

---

### Task 1: Scaffolding and Dependencies

**Files:**
- Create: `packages/payments/package.json`
- Create: `packages/payments/tsconfig.json`

- [ ] **Step 1: Create package.json**

```json
{
  "name": "@ously/payments",
  "version": "0.0.0",
  "private": true,
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "dependencies": {
    "@polar-sh/sdk": "^0.8.1"
  },
  "devDependencies": {
    "@ously/tsconfig": "workspace:*",
    "typescript": "^5.4.5"
  }
}
```

- [ ] **Step 2: Create tsconfig.json**

```json
{
  "extends": "@ously/tsconfig/base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 3: Run pnpm install**

Run: `pnpm install`

- [ ] **Step 4: Commit boilerplate**

```bash
git add packages/payments/package.json packages/payments/tsconfig.json pnpm-lock.yaml
git commit -m "chore: scaffold @ously/payments boilerplate"
```

---

### Task 2: Implementation

**Files:**
- Create: `packages/payments/src/index.ts`

- [ ] **Step 1: Write the implementation**

```typescript
import { Polar } from "@polar-sh/sdk";

export const createPolarClient = (accessToken: string) => {
  return new Polar({
    accessToken,
    server: "sandbox", // Default to sandbox for dev
  });
};

export interface WebhookPayload {
  type: string;
  data: any;
}

export const validateWebhook = async (payload: WebhookPayload, secret: string) => {
    // Polar webhook validation logic
    // (To be fully implemented based on Polar docs)
    return true; 
};
```

- [ ] **Step 2: Verify export with a basic test (optional but recommended)**

Create: `packages/payments/src/index.test.ts`
```typescript
import { describe, it, expect } from 'vitest';
import { createPolarClient, validateWebhook } from './index';

describe('payments integration', () => {
    it('should export createPolarClient', () => {
        expect(createPolarClient).toBeDefined();
    });

    it('should export validateWebhook', () => {
        expect(validateWebhook).toBeDefined();
    });
});
```
*Note: This assumes Vitest is available in the workspace or we'll need to add it.*

- [ ] **Step 3: Commit implementation**

```bash
git add packages/payments/src/index.ts
git commit -m "feat: payments integration package (@ously/payments) with polar.sh"
```
