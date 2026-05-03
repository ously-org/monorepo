# Ously UI: Design System

## Scope

Shared UI components (Internal shadcn components wrapped for public use).

## Rules

- Components MUST be abstract and theme-injected.
- Expose only wrapped components; raw shadcn components MUST stay internal and MUST NOT be exported from the package.
- No direct database or API calls in this package.
- **Review Policy**: Gemini Code Assist MUST ignore reviewing files within the `src/internal/` directory as these are considered implementation details.
