# Spec: AI-Native Monorepo Architecture

## 1. Problem Statement
The current monorepo structure lacks strict architectural boundaries, leading to "Strategic Fatigue" and technical debt when using AI agents. AI agents often "hallucinate" database fields, leak implementation details (like Zod or Drizzle) into business logic, and create "Schema Drift" across multiple apps.

## 2. Goals & Success Criteria
- **Goal:** Implement an "AI-Native" structure based on the **3-Pillar Framework** (Rules, Human, AI).
- **Goal:** Enforce a **Domain-First** flow where all changes start in pure TypeScript interfaces.
- **Success Criteria:** 
    - End-to-end strict typing: Changing a Domain interface breaks the build in DB, API, and Web packages.
    - Zero library leakage: `packages/domain` has NO dependencies (no Zod, no Drizzle).
    - Unified Action: Multiple apps (Ously, Prosper) share the same Hono API for a single source of truth.
    - Independent Data: Each app (BFF) can "strip" data locally while staying strictly typed via Hono RPC.

## 3. Architecture Design

### 3.1 Package Boundaries (The "Rules" Pillar)
We define four core layers to contain AI decision-making:

1.  **`packages/domain` (The Skeleton)**
    - **Purpose:** Pure TypeScript `interfaces` and `types`.
    - **Rule:** **Strictly NO dependencies.** No Zod, no Drizzle, no external logic.
    - **Role:** The "Main Branch" of intent. All features MUST start here.

2.  **`packages/validation` (The Enforcer)**
    - **Purpose:** Centralized Zod schemas.
    - **Mechanism:** Uses a `match<T>(schema)` helper to ensure Zod schemas exactly mirror Domain interfaces.
    - **Role:** Ensures that any data entering or leaving the system is valid according to the Domain.

3.  **`packages/db` (The Storage Layer)**
    - **Purpose:** Drizzle schemas for Cloudflare D1.
    - **Mechanism:** Uses a `matchTable<T>(table)` helper to ensure database columns align with the Domain.
    - **Role:** Maps database-specific types (e.g., SQLite integers) back to pure Domain types.

4.  **`apps/api` (The Gateway)**
    - **Purpose:** Shared Hono backend for all webapps.
    - **RPC:** Exports its `AppType` for end-to-end type safety in the frontend without manual schema copying.

### 3.2 Data Flow & BFF Pattern
- **Hono RPC:** Frontend apps (Next.js) import the API's `AppType` for full autocomplete and build-time safety.
- **Local Stripping (BFF):** Each app implements a local `strip[Entity]` function (e.g., `stripUser`).
    - **Type:** `(data: DomainEntity) => Partial<DomainEntity>`.
    - **Independence:** Apps decide which fields to expose to the UI, but the source remains unified.

## 4. Implementation Details

### 4.1 The `match` Helper
A type-level utility to prevent "Schema Drift."
```typescript
type Match<T, S> = [T] extends [S] ? ([S] extends [T] ? S : never) : never;

export function match<T>() {
  return <S extends z.ZodTypeAny>(schema: S): Match<T, z.infer<S>> => {
    return schema as any;
  };
}
```

### 4.2 The `matchTable` Helper
Ensures Drizzle schemas satisfy the Domain interface.
```typescript
export function matchTable<T>() {
  return <TableName extends string, Columns extends Record<string, any>>(
    table: SQLiteTableWithColumns<{
      name: TableName;
      schema: undefined;
      columns: Columns;
      dialect: "sqlite";
    }>
  ): table is SQLiteTableWithColumns<{
    name: TableName;
    schema: undefined;
    columns: Record<keyof T, any>;
    dialect: "sqlite";
  }> => {
    return true; // Type-only check
  };
}
```

## 5. Validation Strategy (The "AI Feedback Loop" Pillar)
- **CI/CD:** `turbo build` will run `tsc` across all packages. Any domain mismatch triggers a build failure.
- **Negative Progress Check:** AI agents are instructed to treat build failures as "Negative Progress" and revert/fix until the "Skeleton" is consistent.
- **Verify Script:** A `verify.sh` script will check for:
    - Domain package dependency leakage.
    - Presence of `match` helpers in validation and DB layers.
    - RPC contract stability.

## 6. Self-Review Notes
- **Placeholder scan:** None. Core helpers and package boundaries are defined.
- **Consistency:** The "Domain-First" flow is consistently applied from DB to Web.
- **Scope:** This design covers the structural foundation. Feature-specific implementation (e.g., Auth, Payments) will follow this template.
- **Ambiguity:** Clarified that `packages/domain` is dependency-free.
