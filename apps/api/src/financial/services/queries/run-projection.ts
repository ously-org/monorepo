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
import { ReplayEngine, Snapshot } from "../../../services/engine";

/**
 * Orchestrates a financial projection for a specific branch.
 */
export async function runProjection(
  db: DrizzleD1Database<typeof schema>,
  branchId: string,
  durationMonths: number = 120
): Promise<Snapshot[]> {
  // 1. Fetch lineage and related data
  const branchIds = await getBranchLineageIds(db, branchId);
  const commits = await getCommitsByBranchIds(db, branchIds);
  const commitIds = commits.map(c => c.id);
  const actions = await getActionsByCommitIds(db, commitIds);
  const goals = await getGoalsByBranchIds(db, branchIds);

  // 2. Fetch global accounting entities and env vars
  const accountingEntities = await getAccountingEntities(db);
  const envVars = await getEnvVars(db);

  // 3. Calculate startDate (earliest commit)
  const earliestCommit = commits.reduce((earliest, current) => {
    return current.timestamp < earliest.timestamp ? current : earliest;
  }, commits[0]);

  const startDate = earliestCommit ? new Date(earliestCommit.timestamp) : new Date();

  // 4. Initialize ReplayEngine
  const engine = new ReplayEngine({
    date: startDate,
    entities: new Map(accountingEntities.map(e => [e.id, { ...e, currentValue: 0 }])),
    envVars: new Map(envVars.map(ev => [ev.id, ev.baseValue])),
    goals: new Map(goals.map(g => [g.id, { ...g, isMet: false }])),
  });

  // 5. Run projection
  return engine.project(commits, actions, durationMonths);
}
