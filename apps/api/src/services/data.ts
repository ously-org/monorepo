import { eq, inArray } from "drizzle-orm";
import * as schema from "@ously/db";
import { Commit, CommitAction } from "@ously/domain";

export async function fetchBranchLineage(db: any, branchId: string) {
  const commits: Commit[] = [];
  const actions: CommitAction[] = [];
  const branchIds: string[] = [];
  
  let currentBranchId: string | null = branchId;
  while (currentBranchId) {
    const branch = await db.query.branches.findFirst({
      where: (table: any, { eq }: any) => eq(table.id, currentBranchId),
    });
    if (!branch) break;
    
    branchIds.push(currentBranchId);
    
    const branchCommits = await db.query.commits.findMany({
      where: (table: any, { eq }: any) => eq(table.branchId, currentBranchId),
    });
    commits.push(...branchCommits);
    
    if (branch.baseCommitId) {
      const baseCommit = await db.query.commits.findFirst({
        where: (table: any, { eq }: any) => eq(table.id, branch.baseCommitId),
      });
      currentBranchId = baseCommit?.branchId || null;
    } else {
      currentBranchId = null;
    }
  }

  if (commits.length > 0) {
    const commitIds = commits.map(c => c.id);
    const allActions = await db.query.commitActions.findMany({
      where: (table: any, { inArray }: any) => inArray(table.commitId, commitIds),
    });
    actions.push(...allActions);
  }

  const envVars = await db.query.envVars.findMany();
  const branchGoals = await db.query.goals.findMany({
    where: (table: any, { inArray }: any) => inArray(table.branchId, branchIds),
  });

  return { commits, actions, envVars, goals: branchGoals };
}
