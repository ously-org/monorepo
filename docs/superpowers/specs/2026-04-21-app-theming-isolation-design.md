# Spec: App-Specific Theming & Shadcn Isolation (2026-04-21)

## 🎯 Goal
Decentralize design tokens to resolve build errors and strictly isolate Shadcn components within `@ously/ods`.

## 🏗️ Architecture

### 1. Component Isolation (`@ously/ods`)
- **Strict Separation:** Shadcn components remain in `packages/ods/src/internal`.
- **Public API:** Wrapped components in `packages/ods/src/components` are the only exposed UI elements.
- **Pure Logic:** `@ously/ods` contains NO CSS files. It relies on the consuming application to provide the necessary CSS variables.

### 2. App-Specific Themes
Each application defines its own theme in its entry CSS file, preventing cross-package import issues.

- **`apps/web-main` (Ously):**
  - File: `app/globals.css`
  - Theme: Original Ously variables (as found in `packages/config-tailwind/theme.css` currently).

- **`apps/web-prosper` (Prosper):**
  - File: `app/globals.css`
  - Theme: Prosper `b5dN5Y7sp` preset variables.

- **`apps/storybook`:**
  - File: `src/index.css`
  - Theme: Prosper `b5dN5Y7sp` preset variables (Technically separate file from Prosper, even if values match for now).

### 3. Shared Tailwind Config (`@ously/config-tailwind`)
- **Logic Only:** Contains `tailwind.config.ts` for shared plugins, core theme extensions, and utility mappings.
- **No CSS Exports:** `theme.css` will be removed.

## 🛠️ Infrastructure Changes
1. **Revert `@import`:** Remove all `@import "@ously/config-tailwind/theme.css"` references.
2. **Clean Exports:** Remove `./theme.css` from `packages/config-tailwind/package.json` exports.
3. **Verify Build:** Ensure `pnpm run build` succeeds project-wide.

## ✅ Success Criteria
- [ ] `apps/web-main` renders with Ously styles.
- [ ] `apps/web-prosper` renders with Prosper styles.
- [ ] `apps/storybook` renders with Prosper styles.
- [ ] No `ERR_PACKAGE_PATH_NOT_EXPORTED` errors during build.
- [ ] `pnpm run build` passes for all packages.
