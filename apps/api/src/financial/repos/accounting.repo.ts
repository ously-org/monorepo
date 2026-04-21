import { DrizzleD1Database } from "drizzle-orm/d1";
import { InferSelectModel } from "drizzle-orm";
import * as schema from "@ously/db";
import { AccountingEntity, EnvVar } from "@ously/domain";

function mapEntity(e: InferSelectModel<typeof schema.accountingEntities>): AccountingEntity {
  return {
    id: e.id,
    name: e.name,
    type: e.type,
    parentEntityId: e.parentEntityId ?? undefined,
    growthBaseValue: e.growthBaseValue,
    growthMode: e.growthMode,
    refEnvVarId: e.refEnvVarId ?? undefined,
  };
}

function mapEnvVar(ev: InferSelectModel<typeof schema.envVars>): EnvVar {
  return {
    id: ev.id,
    name: ev.name,
    baseValue: ev.baseValue,
  };
}

/**
 * Fetch all accounting entities.
 */
export async function getAccountingEntities(
  db: DrizzleD1Database<typeof schema>
): Promise<AccountingEntity[]> {
  const results = await db.query.accountingEntities.findMany();
  return results.map(mapEntity);
}

/**
 * Fetch all environment variables.
 */
export async function getEnvVars(
  db: DrizzleD1Database<typeof schema>
): Promise<EnvVar[]> {
  const results = await db.query.envVars.findMany();
  return results.map(mapEnvVar);
}
