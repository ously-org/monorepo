function mapEntity(e) {
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
function mapEnvVar(ev) {
    return {
        id: ev.id,
        name: ev.name,
        baseValue: ev.baseValue,
    };
}
/**
 * Fetch all accounting entities.
 */
export async function getAccountingEntities(db) {
    const results = await db.query.accountingEntities.findMany();
    return results.map(mapEntity);
}
/**
 * Fetch all environment variables.
 */
export async function getEnvVars(db) {
    const results = await db.query.envVars.findMany();
    return results.map(mapEnvVar);
}
