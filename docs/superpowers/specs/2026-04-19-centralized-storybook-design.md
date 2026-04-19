# Centralized Storybook Design Spec

## Overview
Initialize a centralized Storybook instance within the Ously monorepo to showcase and document the shared `@ously/ods` components.

## Architecture & Location
- **Location:** `apps/storybook`
- **Tech Stack:** React + TypeScript + **`@storybook/nextjs`** (This ensures compatibility with any Next.js specific features that may be added to `@ously/ods` in the future).
- **Dependencies:** It will depend directly on the workspace packages: `@ously/ods`, `@ously/config-tailwind`, and `@ously/tsconfig`.

## Styling Integration
- **Tailwind CSS:** The Storybook app will have a `tailwind.config.ts` that extends `@ously/config-tailwind` and scans `packages/ods` for utility classes.
- **Global CSS:** A global CSS file (e.g., `globals.css`) will be imported into Storybook's `preview.ts` containing all the CSS variables currently defined in the main apps to ensure components render with the correct Ously theme.

## Component Stories
- We will create baseline stories for the existing components in `apps/storybook/src/stories`:
  - `Button.stories.tsx`
  - `Card.stories.tsx`

## Turborepo Orchestration
- **Package Scripts:** `apps/storybook/package.json` will contain `"dev": "storybook dev -p 6006"` and `"build": "storybook build"`.
- **Caching:** The root `turbo.json` will be updated to include `"storybook-static/**"` in the `build` task's `outputs`.
- **Git Ignore:** `storybook-static` will be added to the root `.gitignore`.
