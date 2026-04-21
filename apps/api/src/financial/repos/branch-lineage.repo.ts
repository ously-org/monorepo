import { DrizzleD1Database } from "drizzle-orm/d1";
import { InferSelectModel } from "drizzle-orm";
import * as schema from "@ously/db";
import { Commit, CommitAction, Goal } from "@ously/domain";

function chunkArray<T>(array: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

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

/**
 * Recursively fetch a branch's lineage (IDs) from child to parent.
 */
export async function getBranchLineageIds(
  db: DrizzleD1Database<typeof schema>,
  branchId: string
): Promise<string[]> {
  const branchIds: string[] = [];
  let currentBranchId: string | null = branchId;

  while (currentBranchId) {
    const branch = await db.query.branches.findFirst({
      where: (table, { eq }) => eq(table.id, currentBranchId!),
    });
    if (!branch) break;

    branchIds.push(currentBranchId);

    if (branch.baseCommitId) {
      const baseCommit = await db.query.commits.findFirst({
        where: (table, { eq }) => eq(table.id, branch.baseCommitId!),
      });
      currentBranchId = baseCommit?.branchId || null;
    } else {
      currentBranchId = null;
    }
  }

  return branchIds;
}

/**
 * Fetch all commits for the given branch IDs.
 */
export async function getCommitsByBranchIds(
  db: DrizzleD1Database<typeof schema>,
  branchIds: string[]
): Promise<Commit[]> {
  if (branchIds.length === 0) return [];

  const chunks = chunkArray(branchIds, 100);
  const allCommits: Commit[] = [];

  for (const chunk of chunks) {
    const results = await db.query.commits.findMany({
      where: (table, { inArray }) => inArray(table.branchId, chunk),
    });
    allCommits.push(...results.map(mapCommit));
  }

  return allCommits;
}

/**
 * Fetch all actions for the given commit IDs.
 */
export async function getActionsByCommitIds(
  db: DrizzleD1Database<typeof schema>,
  commitIds: string[]
): Promise<CommitAction[]> {
  if (commitIds.length === 0) return [];

  const chunks = chunkArray(commitIds, 100);
  const allActions: CommitAction[] = [];

  for (const chunk of chunks) {
    const results = await db.query.commitActions.findMany({
      where: (table, { inArray }) => inArray(table.commitId, chunk),
    });
    allActions.push(...results.map(mapAction));
  }

  return allActions;
}

/**
 * Fetch all goals for the given branch IDs.
 */
export async function getGoalsByBranchIds(
  db: DrizzleD1Database<typeof schema>,
  branchIds: string[]
): Promise<Goal[]> {
  if (branchIds.length === 0) return [];

  const chunks = chunkArray(branchIds, 100);
  const allGoals: Goal[] = [];

  for (const chunk of chunks) {
    const results = await db.query.goals.findMany({
      where: (table, { inArray }) => inArray(table.branchId, chunk),
    });
    allGoals.push(...results.map(mapGoal));
  }

  return allGoals;
}
