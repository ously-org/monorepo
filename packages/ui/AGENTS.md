# Ously UI: Design System

## Scope

Shared UI components (Internal shadcn components wrapped for public use).

## Rules

- Components MUST be abstract and theme-injected.
- Expose components as needed.
- No direct database or API calls in this package.
- **Review Policy**: Gemini Code Assist MUST ignore reviewing files within the `src/internal/` directory as these are considered implementation details.
- **DropdownMenu**: DO NOT use `DropdownMenu` (or any `radix-ui` dropdown primitive) in new components without asking the user first. Exception: `AccountSidebarButton` is pre-approved.
- **Story Mandate**: Every new component MUST have a corresponding Storybook story created in `src/components/__stories__/`. This is non-negotiable.

## 📓 Storybook Guidelines

- **Framework**: Use `@storybook/experimental-nextjs-vite` for the Storybook application to support Next.js built-ins like `next/link` and `next/navigation` in a Vite environment.
- **Dependency Management**: Components using `next/*` imports MUST have `next` declared as a `peerDependency` in `packages/ui/package.json`.
- **Story Location**: Stories MUST be placed in `src/components/__stories__/` following the component's name (e.g., `button.stories.tsx`).
- **CSF 3.0**: All stories MUST use Component Story Format 3.0.
- **Mocking**: For components using Next.js hooks (e.g., `usePathname`), use Storybook parameters or decorators to provide the necessary context if the framework doesn't handle it automatically.
