# Ously UI: Design System

- **Rules**:
  - Components must be abstract, theme-injected, and have zero database/API calls.
  - Do not use `DropdownMenu` or radix-ui dropdowns without approval (except `AccountSidebarButton`).
  - Ignore/skip files in `src/internal/`.
- **Storybook (CSF 3.0)**:
  - Every component requires a story in `src/components/__stories__/<name>.stories.tsx`.
  - Use `@storybook/experimental-nextjs-vite`. Declared `next` imports must be in `peerDependencies`.
