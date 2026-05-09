# Source of Truth (SoT)

To maintain consistency across the Ously monorepo, project management, and product specifications, we define the following Source of Truth hierarchy.

## 🏛 Documentation Hierarchy

### 1. The Specification (Local)

**Source:** `products/*.SPEC.md`
The **definitive** source of truth for _what_ is being built and _how_ it should behave. Any discrepancy between the implementation or GitHub Issues and the SPEC should be resolved by updating the SPEC first (following a review).

### 2. The Roadmap (Local)

**Source:** `products/ROADMAP.md`
The **definitive** source of truth for _when_ features are planned and their high-level versioning.

### 3. Execution & Progress (GitHub)

**Source:** [GitHub Issues & Projects](https://github.com/orgs/ously-org/projects)
The **definitive** source of truth for the _current status_, _priority_, and _assignment_ of tasks. The code repository tracks the "Plan," while GitHub tracks the "Pulse."

## 🔄 Synchronization

We use the `sync_spec` agent to ensure these sources stay aligned:

- **Local -> GitHub**: Updating GitHub Epics and Milestone dates to match the `ROADMAP.md`.
- **GitHub -> Local**: Updating the progress status (Completed/In Progress) in `ROADMAP.md` based on the status of linked GitHub Epics.
- **Spec -> Issue**: Ensuring that atomic tasks created in GitHub are derived directly from the corresponding `{product}.SPEC.md`.
