import { DrizzleD1Database } from "drizzle-orm/d1";
import * as schema from "@ously/db";
import { 
  getBranchLineageIds, 
  getCommitsByBranchIds, 
  getActionsByCommitIds, 
  getGoalsByBranchIds 
} from "../../repos/branch-lineage.repo";
import { 
  getAccountingEntities, 
  getEnvVars 
} from "../../repos/accounting.repo";
import { ReplayEngine, Snapshot } from "../../engine/replay-engine";

/**
 * Orchestrates a financial projection for a specific branch.
 */
export async function runProjection(
  db: DrizzleD1Database<typeof schema>,
  branchId: string,
  durationMonths: number = 120,
  asOf: Date = new Date()
): Promise<Snapshot[]> {
  // 1. Fetch lineage and related data
  const branchIds = await getBranchLineageIds(db, branchId);
  const commits = await getCommitsByBranchIds(db, branchIds);
  
  // 2. Empty Lineage Guard
  if (commits.length === 0) {
    return [];
  }

  const commitIds = commits.map(c => c.id);
  const actions = await getActionsByCommitIds(db, commitIds);
  const goals = await getGoalsByBranchIds(db, branchIds);

  // 3. Fetch global accounting entities and env vars
  const accountingEntities = await getAccountingEntities(db);
  const envVars = await getEnvVars(db);

  // 4. Calculate startDate (earliest commit) and normalize
  const earliestCommit = commits.reduce((earliest, current) => {
    return current.timestamp < earliest.timestamp ? current : earliest;
  }, commits[0]);

  const startDate = new Date(earliestCommit.timestamp);
  startDate.setDate(1);
  startDate.setHours(0, 0, 0, 0);

  // 5. Calculate totalMonths (historical + future)
  const historicalMonths = (asOf.getFullYear() - startDate.getFullYear()) * 12 + (asOf.getMonth() - startDate.getMonth());
  const totalMonths = Math.max(0, historicalMonths) + durationMonths;

  // 6. Initialize ReplayEngine
  const engine = new ReplayEngine({
    date: startDate,
    entities: new Map(accountingEntities.map(e => [e.id, { ...e, currentValue: 0 }])),
    envVars: new Map(envVars.map(ev => [ev.id, ev.baseValue])),
    goals: new Map(goals.map(g => [g.id, { ...g, isMet: false }])),
  });

  // 7. Run projection
  return engine.project(commits, actions, totalMonths);
}
