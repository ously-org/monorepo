import { DrizzleD1Database } from "drizzle-orm/d1";
import * as schema from "@ously/db";
import { Snapshot } from "../../engine/replay-engine";
/**
 * Orchestrates a financial projection for a specific branch.
 */
export declare function runProjection(db: DrizzleD1Database<typeof schema>, branchId: string, durationMonths?: number, asOf?: Date): Promise<Snapshot[]>;
//# sourceMappingURL=run-projection.d.ts.map