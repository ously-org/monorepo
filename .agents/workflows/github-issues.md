## 1. Core Rule: Absolutely NO Markdown Modifications
- **NO MARKDOWN EVER**: Do NOT mention "blocks", "blocked-by", or "sub-issues" anywhere in the issue `body`. 
- **NO TASKLISTS**: Do NOT use the `[tasklist]` markdown syntax for *any* reason.

## 2. Dependencies vs. Sub-Issues
GitHub has two separate "Relationships" attributes. Implement them as follows:

### A. Dependencies (Blocked By / Blocks)
You **MUST** use the GitHub GraphQL API to create "Blocked By" dependencies.
1. **Resolve Node IDs**: Convert standard integers to GraphQL global Node IDs.
   ```bash
   gh issue view <BLOCKED_ISSUE_NUMBER> --json id   # Target
   gh issue view <BLOCKING_ISSUE_NUMBER> --json id  # Prerequisite
   ```
2. **Execute Mutation**:
   ```bash
   gh api graphql -f query='mutation { addBlockedBy(input: { issueId: "<BLOCKED_NODE_ID>", blockingIssueId: "<BLOCKING_NODE_ID>" }) { issue { number } } }'
   ```

## 2. Standard Hierarchy
We follow a flat, deliverable-centric structure:
- **Milestone**: The primary deliverable target (e.g., `prosper@v0.1: Initial MVP`).
- **Issue**: Individual tasks directly assigned to a Milestone. No nesting or Epics are required.

## 3. Automation & Labeling
- **Scoped Labels**: Always use `app:ously`, `app:prosper`, or `app:api` to denote the work target.
- **Issue Types**: Use `Feature`, `Bug`, `Analysis`, or `Documentation`.
- **Auto-labeling**: For PRs, use the GitHub `labeler` action. For Issues, use keyword-based automation in GitHub Actions to auto-assign scoped labels.
- **Assignees**: `gh issue edit <ID> --add-assignee <handle>`
- **Milestones**: Group issues by target deliverables. `gh issue edit <ID> --milestone <name>`
- **Projects V2**: Connect issues to Kanban via `gh project item-add <Project_Num> --url <issue_url>`.

## 4. Velocity & Capacity Management
- **Estimation Unit**: All effort estimates in the Project board MUST use "Units".
- **Conversion**: **1 Unit = 2 Hours** of focused development.
- **Dynamic Capacity**: Always verify the current week's capacity by running `gws calendar +agenda --week`. 
- **Work Blocks**: Look for events labeled `[Ously]` to identify available sprint hours.
- **Naming Logic**: 
    - `[Ously] Work Block` = **1 Unit** (2 hours).
    - `[Ously] 2 Work Block` = **2 Units** (4 hours).
    - `[Ously] 3 Work Block` = **3 Units** (6 hours).
- **Sprint Targets**: Iteration 2 has a confirmed capacity of **13 Work Blocks + 1 Review Block** (Total: **14 Units / 28 Hours**).
