# Spec: Refactor `packages/ui` to `packages/ods`

## Problem
The shared UI package is currently named `@ously/ods` and located in `packages/ui`. We want to align it with the Oously Design System (ODS) and rename it to `@ously/ods`, moving it to `packages/ods`.

## Proposed Changes
1. **Directory Structure:**
   - Move `packages/ui` to `packages/ods`.
2. **Package Configuration:**
   - Update `packages/ods/package.json` name to `@ously/ods`.
   - Update `packages/ods/tsconfig.json` path aliases if any.
3. **Workspace References:**
   - Update all `package.json` files that depend on `@ously/ods` to use `@ously/ods`.
   - Update all TS/TSX files that import from `@ously/ods` to use `@ously/ods`.
   - Update `next.config.mjs` files using `transpilePackages`.
   - Update documentation files (`GEMINI.md`, etc.).
4. **Validation:**
   - Run `pnpm install` to update the monorepo lockfile.
   - Run `turbo build --filter=@ously/ods` to ensure the new package builds correctly.

## Success Criteria
- No remaining references to `@ously/ods` in the codebase.
- The monorepo builds successfully.
- `pnpm install` completes without errors.
