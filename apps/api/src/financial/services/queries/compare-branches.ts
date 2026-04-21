import { DrizzleD1Database } from "drizzle-orm/d1";
import * as schema from "@ously/db";
import { runProjection } from "./run-projection";
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
export async function compareBranches(
  db: DrizzleD1Database<typeof schema>,
  branchIdA: string,
  branchIdB: string,
  durationMonths: number = 120
): Promise<BranchComparison> {
  // Use a shared reference date for both projections
  const now = new Date();

  // 1. Run projections for both branches
  const [snapshotsA, snapshotsB] = await Promise.all([
    runProjection(db, branchIdA, durationMonths, now),
    runProjection(db, branchIdB, durationMonths, now),
  ]);

  // 2. Get final snapshots (handling empty arrays safely)
  const finalA = snapshotsA[snapshotsA.length - 1];
  const finalB = snapshotsB[snapshotsB.length - 1];

  // 3. Calculate differences
  const diff = {
    netWorth: (finalB?.netWorth || 0) - (finalA?.netWorth || 0),
    assets: (finalB?.assets || 0) - (finalA?.assets || 0),
    liabilities: (finalB?.liabilities || 0) - (finalA?.liabilities || 0),
  };

  return {
    branchA: {
      id: branchIdA,
      finalSnapshot: finalA,
    },
    branchB: {
      id: branchIdB,
      finalSnapshot: finalB,
    },
    diff,
  };
}
