import { DrizzleD1Database } from "drizzle-orm/d1";
import * as schema from "@ously/db";
import { AccountingEntity, EnvVar } from "@ously/domain";
/**
 * Fetch all accounting entities.
 */
export declare function getAccountingEntities(db: DrizzleD1Database<typeof schema>): Promise<AccountingEntity[]>;
/**
 * Fetch all environment variables.
 */
export declare function getEnvVars(db: DrizzleD1Database<typeof schema>): Promise<EnvVar[]>;
//# sourceMappingURL=accounting.repo.d.ts.map