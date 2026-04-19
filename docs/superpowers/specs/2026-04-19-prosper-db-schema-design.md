# Design Doc: Prosper Core Database Schema

**Status:** Draft
**Date:** 2026-04-19
**Topic:** Database implementation for the Prosper core logic in `@ously/db`.

## 1. Overview
This design outlines the database schema for the Prosper core logic, which handles financial branching, version control for budgets/plans, and financial entities.

## 2. Architecture
The schema will be implemented in the `@ously/db` package using Drizzle ORM for SQLite (Cloudflare D1 compatible). Each table will be linked to its corresponding domain interface in `@ously/domain` via the `matchTable` helper.

## 3. Data Schema

### 3.1. `branches`
Stores budgeting/planning branches for users.
*   `id`: Primary Key (Text)
*   `userId`: Foreign Key to `users.id` (Text). One user can have many branches.
*   `name`: Display name for the branch (Text).
*   `type`: "CURRENT" (Main/Real branch) or "FUTURE" (Planning branch) (Text).
*   `isFrozen`: Boolean (Integer, mode: "boolean").
*   `baseCommitId`: ID of the parent commit if this branch branched off another (Text, nullable).

### 3.2. `commits`
Represents a snapshot or a set of changes in a branch.
*   `id`: Primary Key (Text).
*   `branchId`: Foreign Key to `branches.id` (Text).
*   `timestamp`: Date/Time of the commit (Integer, mode: "timestamp").
*   `message`: Descriptive commit message (Text, nullable).

### 3.3. `commitActions`
Granular changes stored within a commit.
*   `id`: Primary Key (Text).
*   `commitId`: Foreign Key to `commits.id` (Text).
*   `actionType`: "ADD" | "UPDATE" | "REPLACE" | "DELETE" (Text).
*   `targetType`: "ENTITY" | "GOAL" | "ENV_VAR" (Text).
*   `targetId`: ID of the target object being modified (Text).
*   *Note: Using a loose `targetId` instead of multiple foreign keys to support different object types.*
*   `key`: Property name being modified (Text).
*   `valueNum`: Numerical value for the change (Real, nullable).
*   `valueStr`: String value for the change (Text, nullable).
*   `isRelative`: Whether the value is an offset or a direct replacement (Integer, mode: "boolean").
*   `refEnvVarId`: Optional reference to `envVars.id` for dynamic calculations (Text, nullable).

### 3.4. `accountingEntities`
Core financial objects like bank accounts, loans, or income sources.
*   `id`: Primary Key (Text).
*   `name`: Display name (Text).
*   `type`: "ASSET" | "LIABILITY" | "INCOME" | "EXPENSE" (Text).
*   `parentEntityId`: Hierarchical parent for grouping (Text, nullable).
*   `growthBaseValue`: Starting value for interest/growth calculations (Real).
*   `growthMode`: "ABSOLUTE" (Fixed growth) or "RELATIVE" (Percentage growth) (Text).
*   `refEnvVarId`: Reference to an environment variable like "interestRate" (Text, nullable).

### 3.5. `goals`
Financial milestones.
*   `id`: Primary Key (Text).
*   `branchId`: Foreign Key to `branches.id` (Text).
*   `type`: "TIME_FIX" (Reach by date) | "MEASUREMENT" (Reach value) | "COMMITMENT" (Recurring) (Text).
*   `targetDate`: Target date (Integer, mode: "timestamp", nullable).
*   `targetValue`: Target numerical value (Real, nullable).
*   `targetEntityId`: Target accounting entity (Text, nullable).
*   `dependencyGoalId`: Parent/preceding goal (Text, nullable).
*   `triggerCommitId`: Commit ID that triggers or resolves this goal (Text, nullable).

### 3.6. `envVars`
Global variables affecting multiple entities (e.g., Inflation, Interest rates).
*   `id`: Primary Key (Text).
*   `name`: Name of the variable (Text).
*   `baseValue`: Base numerical value (Real).

## 4. Implementation Strategy
- Modify `packages/db/src/schema.ts`.
- Ensure all foreign key references are non-null unless optional.
- Use `matchTable<T>()` for each table definition to ensure alignment with the domain.

## 5. Verification Plan
- Run `tsc` in `packages/db` to verify type safety.
- Verify `matchTable` doesn't produce errors.
