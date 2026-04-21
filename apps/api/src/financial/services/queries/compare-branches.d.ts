import { DrizzleD1Database } from "drizzle-orm/d1";
import * as schema from "@ously/db";
import { Snapshot } from "../../engine/replay-engine";
export interface BranchComparison {
    branchA: {
        id: string;
        finalSnapshot?: Snapshot;
    };
    branchB: {
        id: string;
        finalSnapshot?: Snapshot;
    };
    diff: {
        netWorth: number;
        assets: number;
        liabilities: number;
    };
}
/**
 * Compares the financial projections of two different branches.
 */
export declare function compareBranches(db: DrizzleD1Database<typeof schema>, branchIdA: string, branchIdB: string, durationMonths?: number): Promise<BranchComparison>;
//# sourceMappingURL=compare-branches.d.ts.map