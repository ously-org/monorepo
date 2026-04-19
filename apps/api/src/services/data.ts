import { DrizzleD1Database } from "drizzle-orm/d1";
import { InferSelectModel } from "drizzle-orm";
import * as schema from "@ously/db";
import { Commit, CommitAction, Goal, EnvVar, AccountingEntity } from "@ously/domain";

function chunkArray<T>(array: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

// Utility to remove nulls and return objects with undefined instead
function mapCommit(c: InferSelectModel<typeof schema.commits>): Commit {
  return {
    id: c.id,
    branchId: c.branchId,
    timestamp: c.timestamp,
    message: c.message ?? undefined,
  };
}

function mapAction(a: InferSelectModel<typeof schema.commitActions>): CommitAction {
  return {
    id: a.id,
    commitId: a.commitId,
    actionType: a.actionType,
    targetType: a.targetType,
    targetId: a.targetId,
    key: a.key,
    valueNum: a.valueNum ?? undefined,
    valueStr: a.valueStr ?? undefined,
    isRelative: a.isRelative,
    refEnvVarId: a.refEnvVarId ?? undefined,
  };
}

function mapGoal(g: InferSelectModel<typeof schema.goals>): Goal {
  return {
    id: g.id,
    branchId: g.branchId,
    type: g.type,
    targetDate: g.targetDate ?? undefined,
    targetValue: g.targetValue ?? undefined,
    targetEntityId: g.targetEntityId ?? undefined,
    dependencyGoalId: g.dependencyGoalId ?? undefined,
    triggerCommitId: g.triggerCommitId ?? undefined,
  };
}

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

export async function fetchBranchLineage(db: DrizzleD1Database<typeof schema>, branchId: string) {
  const commits: Commit[] = [];
  const actions: CommitAction[] = [];
  const branchIds: string[] = [];
  
  let currentBranchId: string | null = branchId;
  while (currentBranchId) {
    const branch = await db.query.branches.findFirst({
      where: (table, { eq }) => eq(table.id, currentBranchId!),
    });
    if (!branch) break;
    
    branchIds.push(currentBranchId);
    
    const branchCommits = await db.query.commits.findMany({
      where: (table, { eq }) => eq(table.branchId, currentBranchId!),
    });
    commits.push(...branchCommits.map(mapCommit));
    
    if (branch.baseCommitId) {
      const baseCommit = await db.query.commits.findFirst({
        where: (table, { eq }) => eq(table.id, branch.baseCommitId!),
      });
      currentBranchId = baseCommit?.branchId || null;
    } else {
      currentBranchId = null;
    }
  }

  if (commits.length > 0) {
    const commitIds = commits.map(c => c.id);
    const chunks = chunkArray(commitIds, 100);
    
    for (const chunk of chunks) {
      const chunkActions = await db.query.commitActions.findMany({
        where: (table, { inArray }) => inArray(table.commitId, chunk),
      });
      actions.push(...chunkActions.map(mapAction));
    }
  }

  const envVarsRaw = await db.query.envVars.findMany();
  const envVars: EnvVar[] = envVarsRaw;
  
  const branchGoals: Goal[] = [];
  if (branchIds.length > 0) {
    const branchIdChunks = chunkArray(branchIds, 100);
    for (const chunk of branchIdChunks) {
      const chunkGoals = await db.query.goals.findMany({
        where: (table, { inArray }) => inArray(table.branchId, chunk),
      });
      branchGoals.push(...chunkGoals.map(mapGoal));
    }
  }
  
  const accountingEntitiesRaw = await db.query.accountingEntities.findMany();
  const accountingEntities: AccountingEntity[] = accountingEntitiesRaw.map(mapEntity);

  return { commits, actions, envVars, goals: branchGoals, accountingEntities };
}
