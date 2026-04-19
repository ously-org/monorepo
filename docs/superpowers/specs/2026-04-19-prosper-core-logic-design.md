# Prosper Core Logic & Git-like Financial Branching Design

## 1. Problem Statement
Users need a way to simulate multiple future financial scenarios ("what-if" branching) starting from their current financial status. This requires a robust system to track changes over time, handle dependencies between financial entities (assets, liabilities, goals), and resolve conflicts when the underlying "ground truth" changes.

## 2. Architecture: Event-Sourced Snapshots
Prosper uses an event-sourced approach where the future state is not stored directly but is **computed** by replaying a series of "Commits" over a "Current Branch" (ground truth).

### Core Components
- **Projection Engine:** A monthly loop that moves forward in time, applying market forces (inflation, growth), scheduled commits, and goal-triggered actions.
- **The State Map:** A temporary, in-memory representation of the financial state at any point in the future.
- **The Branching Model:**
    - **Current Branch:** The immutable history of past actions (Ground Truth).
    - **Future Branch:** Speculative timelines that branch from the `HEAD` of the Current Branch.
    - **Rebasing:** When the Current Branch is updated, Future Branches automatically "rebase" by replaying their commits from the new Current HEAD. If a commit fails to apply (e.g., updating a deleted asset), the branch is marked `FROZEN`.

## 3. Package Integration & Data Model

### 3.1. @packages/db (The Storage)
We use a normalized, strictly-typed schema to ensure end-to-end safety. No JSON blobs.
- `Branch`: `id`, `userId`, `name`, `type` (`CURRENT` | `FUTURE`), `isFrozen`, `baseCommitId`.
- `Commit`: `id`, `branchId`, `timestamp` (Date), `message`.
- `CommitAction`: 
    - `id`, `commitId`, `actionType` (`ADD`, `UPDATE`, `REPLACE`, `DELETE`).
    - `targetType` (`ENTITY`, `GOAL`, `ENV_VAR`).
    - `targetId`: UUID of the target.
    - `key`: Property name (e.g., `"value"`, `"name"`, `"growth"`).
    - `valueNum`: Numeric value.
    - `valueStr`: String value.
    - `isRelative`: Boolean (e.g., `valueNum = 1.05` + `isRelative = true` means +5%).
    - `refEnvVarId`: Link to `EnvVar` for growth.
- `AccountingEntity`: `id`, `name`, `type` (`ASSET`, `LIABILITY`, `INCOME`, `EXPENSE`), `parentEntityId`, `growthBaseValue`, `growthMode` (`ABSOLUTE` | `RELATIVE`), `refEnvVarId`.
- `Goal`: `id`, `branchId`, `type` (`TIME_FIX`, `MEASUREMENT`, `COMMITMENT`), `targetDate`, `targetValue`, `targetEntityId`, `dependencyGoalId`, `triggerCommitId`.

### 3.2. @apps/api (The Engine)
The Hono backend will host the `ReplayEngine`.
- **Route:** `POST /branches/:id/project` -> Returns the full time-series projection.
- **Route:** `POST /branches/compare` -> Takes two branch IDs and returns the diff.

## 4. The Projection Engine (Monthly Loop)
For each month:
1. **Market Forces:** Resolve `EnvVar` values.
2. **Organic Growth:** Update `ASSET/LIABILITY` based on `growthMode`.
3. **User Actions:** Apply `CommitActions` for the current month.
4. **Goal Evaluation:** 
    - Evaluate `TIME_FIX` and `MEASUREMENT` goals.
    - If met, execute linked `COMMITMENT` triggers.
5. **Conflict Check:** If `targetId` is missing, mark branch `FROZEN` and stop.
6. **Ratios:** Calculate built-in ratios (e.g., Debt-to-Asset).

## 5. Future Considerations (Out of Scope for V1)
- **Inflation/Real Values:** Implementing a deflator based on the `Inflation` env variable to show "Today's Dollars" vs "Future Dollars."
- **Goal Solver:** An iterative engine that solves for "How much more do I need to save?" by running the simulation multiple times with varied inputs.
- **Advanced Conflict Resolution:** A UI/API for "re-targeting" actions when a branch is frozen.

## 6. Implementation Roadmap
1. **Domain:** Define interfaces in `@ously/domain`.
2. **DB Schema:** Implement tables in `@ously/db`.
3. **Validation:** Zod schemas in `@ously/validation`.
4. **Engine:** Implement `ReplayEngine` in `apps/api/src/services`.
5. **API Routes:** Expose projection and comparison endpoints.
