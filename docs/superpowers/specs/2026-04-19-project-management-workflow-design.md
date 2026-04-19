# Ously Monorepo AI Project Management Workflow

## Objective
Establish a clean, non-conflicting workflow for managing both long-term project planning (the backlog) and short-term coding tasks (the sprint) within the Ously monorepo using the Gemini CLI.

## Problem Statement
The Ously project requires:
1.  **Strict Coding Execution:** TDD-focused, disciplined implementation steps (currently handled well by the `superpowers` extension).
2.  **Flexible Future Planning:** The ability to instantly capture drastically shifting ideas mid-sprint without bogging down the local repository with boilerplate documents that must be tracked in version control.

The introduction of the `conductor` extension was explored via Issue #34. However, Conductor tracks "epics/features" using local text files (`conductor/tracks/`). Using `conductor` alongside `superpowers` introduces severe workflow duplication: both extensions attempt to "own" the translation of ideas into action plans (`plan.md` vs `docs/superpowers/plans/`), leading to local file clutter and command conflicts.

## Designed Solution: The "Superpowers + GitHub" Hybrid

This design discards physical local project management files for future backlog state, shifting it entirely to the cloud, while retaining `superpowers` for local sprint execution.

### Architectural Boundaries
*   **The Brain (Backlog):** GitHub Issues / GitHub Projects. Driven exclusively via the `github-mcp-server` integration in Gemini CLI.
*   **The Muscle (Execution):** The local filesystem. Driven exclusively by the `superpowers` extension and its strict skill loops.

### The Unified Workflow Loop

#### 1. Ideation & Triage (Mid-Sprint Interruptions)
When a new idea arises during coding:
*   **Action:** The user prompts the AI: "Add an idea to the backlog: [description]".
*   **Response:** The AI uses `github-mcp-server` to immediately create a Github Issue with appropriate labels (e.g., `enhancement`, `future`).
*   **Benefit:** The local workspace is entirely unaffected. No context switching, branching, or messy local file commits required.

#### 2. Sprint Activation (Picking up Work)
When it is time to build a feature:
*   **Action:** The user directs the AI: "Let's implement Issue #X".
*   **Response:** The AI reads the issue via the GitHub extension.

#### 3. Technical Specification (Superpowers Brainstorming)
*   **Action:** The AI enters the `superpowers:brainstorming` loop.
*   **Response:** The AI works with the user to define the technical implementation, producing a spec in `docs/superpowers/specs/YYYY-MM-DD-<feature>.md`.

#### 4. Granular Planning (Superpowers Writing-Plans)
*   **Action:** Following spec approval, the AI uses `superpowers:writing-plans`.
*   **Response:** The AI creates a microscopic, TDD-focused checklist in `docs/superpowers/plans/YYYY-MM-DD-<feature>.md` outlining specific file edits and terminal commands.

#### 5. Code Execution (Superpowers Subagents)
*   **Action:** The AI dispatches itself as subagents to accomplish the steps in the plan, generating the required code changes and making git commits.
*   **Response:** Once the plan is complete, the AI updates the original GitHub issue (closing it and linking the PR).

## Conclusion
This separation of concerns perfectly solves the requirement to maintain a highly mutable future plan (via GitHub's UI) while preserving high-discipline, repeatable task execution locally (via Superpowers). We do not require any new CLI extensions; we leverage existing integrations.
