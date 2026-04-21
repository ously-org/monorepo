# Handover: Prosper Shadcn Integration & Storybook

## Current State
- Centralized Storybook app (`apps/storybook`) has been scaffolded and configured to use `@storybook/nextjs` to prevent Next.js specific issues with `@ously/ods` components.
- Storybook caching and `tailwind.config.ts` are configured.
- Initial stories for `Button` and `Card` are created.
- **Current Issue:** The build is failing (`ERR_PACKAGE_PATH_NOT_EXPORTED`) when `apps/web-main` and `apps/web-prosper` try to import `theme.css` from `@ously/config-tailwind`. I attempted to fix this by modifying `packages/config-tailwind/package.json` exports, but Next.js is still complaining about module resolution.

## User Directive for Next Steps
The user has provided a critical directive regarding how Shadcn and design tokens should be handled:

> "keep the shadcn in ods only and the design token will be depend on app but it mainly base on shadcn"

**What this means:**
1. **Component Location:** ALL Shadcn UI components MUST remain strictly within `packages/ods/src/internal` and be exported wrapped via `packages/ods/src/components`. Do not install or place Shadcn components directly inside `apps/web-main` or `apps/web-prosper`.
2. **Styling/Theming Strategy:** The global CSS variables (the "design tokens" like colors, radii, etc., specifically the `--preset b5dN5Y7sp` the user mentioned earlier for Prosper) should **NOT** be centralized in `packages/config-tailwind/theme.css`.
3. **App-Specific Themes:** Instead, each application (`apps/web-main/app/globals.css`, `apps/web-prosper/app/globals.css`, and `apps/storybook/src/index.css`) should define its own set of CSS variables (`:root` and `.dark` blocks). The components in `ods` will simply consume these variables via Tailwind utility classes.

## Immediate Action Items for Next Agent
1. **Revert Centralized CSS:** Remove the `@import "@ously/config-tailwind/theme.css"` and the relative import attempts from the apps' `globals.css` files.
2. **Apply Prosper Preset:** The user wants the `b5dN5Y7sp` preset applied to Prosper. I have already generated a test app with this preset in `/home/prame/.gemini/tmp/issue-7/test-app`.
    - Extract the CSS variables from `/home/prame/.gemini/tmp/issue-7/test-app/src/app/globals.css`.
    - Inject these specifically into `apps/web-prosper/app/globals.css`.
3. **Restore Web Main:** Ensure `apps/web-main/app/globals.css` has its original theme variables restored (you can find these in the git history or previous tool outputs in this session).
4. **Fix Build:** By reverting the attempt to share `theme.css` via the `config-tailwind` package, the Next.js `ERR_PACKAGE_PATH_NOT_EXPORTED` build errors should be resolved. Ensure `pnpm run build` succeeds across the monorepo.
5. **Storybook Theme:** Decide which theme (Main or Prosper) Storybook should use by default, or provide a way to toggle them, and inject the appropriate CSS variables into `apps/storybook/src/index.css`.
