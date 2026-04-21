# Shadcn CLI Chart Integration Design

**Status:** Draft
**Date:** 2026-04-21

## Goal
Add a `chart` component to the `@ously/ods` package using the shadcn CLI, wrap it for public use to maintain abstraction, and export it for use in other packages.

## Architecture
- **Internal Component:** Added via `shadcn-ui` CLI into `packages/ods/src/internal/chart.tsx`.
- **Public Wrapper:** Created in `packages/ods/src/components/chart.tsx` to re-export specific parts of the internal component.
- **Export:** The public wrapper is exported from `packages/ods/src/index.ts`.

## Tech Stack
- React (ODS)
- Shadcn UI (CLI)
- Turborepo / pnpm (Build & Verification)

## Verification
- Run `pnpm run build --filter @ously/ods` to ensure the new exports don't break the build and the new code is valid.
