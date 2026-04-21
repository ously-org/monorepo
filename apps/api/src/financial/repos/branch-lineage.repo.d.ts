import { DrizzleD1Database } from "drizzle-orm/d1";
import * as schema from "@ously/db";
import { Commit, CommitAction, Goal } from "@ously/domain";
/**
 * Recursively fetch a branch's lineage (IDs) from child to parent.
 */
export declare function getBranchLineageIds(db: DrizzleD1Database<typeof schema>, branchId: string): Promise<string[]>;
/**
 * Fetch all commits for the given branch IDs.
 */
export declare function getCommitsByBranchIds(db: DrizzleD1Database<typeof schema>, branchIds: string[]): Promise<Commit[]>;
/**
 * Fetch all actions for the given commit IDs.
 */
export declare function getActionsByCommitIds(db: DrizzleD1Database<typeof schema>, commitIds: string[]): Promise<CommitAction[]>;
/**
 * Fetch all goals for the given branch IDs.
 */
export declare function getGoalsByBranchIds(db: DrizzleD1Database<typeof schema>, branchIds: string[]): Promise<Goal[]>;
//# sourceMappingURL=branch-lineage.repo.d.ts.map