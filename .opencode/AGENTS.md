# OpenCode Execution Rules

Primary code execution engine. Gemini CLI handles planning/PRs.

- **Directives**:
  - Execute instructions strictly. If ambiguous, ask.
  - Keep changes minimal and modular.
  - Delegate to subagents:
    - `@code-explorer`: Search and find files.
    - `@backend-coder`: API and packages backend logic.
    - `@frontend-coder`: Next.js web application frontend logic.
    - `@ui-architect`: UI component and design system tasks.
    - `@storybook-writer`: Writing CSF stories.
    - `@precommit-checker`: Running formatting, linting, and build checks.
  - Run validation (`pnpm type-check` and `pnpm lint`) before completing.
