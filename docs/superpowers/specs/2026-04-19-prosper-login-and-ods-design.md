# Design Spec: Prosper Login and Oously Design System (ODS)

## 1. Goal
Implement a mock login page for the Prosper app using a shared, highly-constrained design system (ODS) and set up the architectural foundation for app-specific themes using `shadcn` CLI presets.

## 2. Architecture

### 2.1 Oously Design System (@ously/ods)
- **Path**: `packages/ods` (Refactored from `packages/ui`)
- **Internal Layer (`src/internal/`)**: Raw Shadcn/ui components (minimal changes).
- **Public Layer (`src/components/`)**: Wrapped ODS components that hide internal complexity.
- **Strict Constraints**: Public components will only expose a limited set of props (no direct `className` overrides for layout/spacing unless explicitly allowed).
- **Theming**: All components will use standard Shadcn CSS variables (`--primary`, `--background`, etc.).

### 2.2 App-Specific Themes
- **Rule**: Design tokens MUST be added using `shadcn` CLI only. Do not manually extract/copy values.
- **Prosper Theme**: Use `shadcn init --preset b5dN5Y7sp`.
- **Main Ously Theme**: Use `shadcn init --preset b3lE426DL`, then override primary color to `oklch(0.47 0.157 37.304)`.

### 2.3 Prosper Login Page
- **Path**: `apps/web-prosper/app/login/page.tsx`
- **Design**: Centered card, "Sign in to Prosper", buttons for "Continue with Google" and "Continue with GitHub".
- **Visuals**: Inspired by `app.coderabbit.ai/login`.
- **Auth**: Mock implementation (Google/GitHub only, no password).

## 3. Component Details

### 3.1 Button
- **Internal**: `internal/button-shadcn.tsx`
- **Public**: `components/button.tsx`
- **Exposed Props**: `variant` ("primary", "secondary", "ghost"), `size`, `isLoading`, `icon`, `onClick`, `disabled`.

### 3.2 Card (New)
- **Internal**: `internal/card-shadcn.tsx`
- **Public**: `components/card.tsx`
- **Exposed Props**: `title`, `description`, `children`, `footer`.

### 3.3 Icons
- Use `lucide-react` for standard icons.
- Add Google/GitHub SVG icons for login buttons.

## 4. Implementation Steps
1. Refactor `packages/ui` to `packages/ods` and update naming to `@ously/ods`.
2. Run `shadcn init` with appropriate presets for `apps/web-prosper` and `apps/web-main`.
3. Set up the `internal/` components in `packages/ods` using `shadcn add`.
4. Wrap internal components with constrained public components in `packages/ods/src/components`.
5. Implement the login page in `apps/web-prosper`.

## 5. Success Criteria
- [ ] `packages/ui` refactored to `packages/ods`.
- [ ] `apps/web-prosper` login page matches the intended design.
- [ ] Theme variables added via `shadcn` CLI and consistent.
- [ ] Components are strictly constrained as per ODS rules.
