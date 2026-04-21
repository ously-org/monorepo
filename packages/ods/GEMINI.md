# Oously Design System (ODS)

## Scope
Shared UI components (Internal shadcn components wrapped for public use).

## Rules
- Components MUST be abstract and theme-injected.
- Expose only wrapped components; raw shadcn components stay internal.
- No direct database or API calls in this package.

### Atoms First Development
- ALL component development MUST follow an atomic approach.
- Create small, reusable components (Atoms/Molecules) first.
- Every small component MUST have its own individual entry in Storybook for isolated verification.
- Complex widgets (Organisms) should be "scrambled" (assembled) from these pre-verified atoms.
- Verification happens at the atom level before assembly.
