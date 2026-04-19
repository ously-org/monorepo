import { Hono } from "hono";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "@ously/db";
import { fetchBranchLineage } from "./services/data";
import { ReplayEngine } from "./services/engine";
import { ProjectRequestSchema, CompareRequestSchema } from "@ously/validation";
import { EnvVar, Goal, AccountingEntity, Commit, CommitAction } from "@ously/domain";

type Bindings = {
  DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get("/", (c) => {
  return c.text("Ously API - Online");
});

app.get("/users", async (c) => {
  const db = drizzle(c.env.DB, { schema });
  const users = await db.select().from(schema.users).all();
  return c.json({ users });
});

function runProjection(
  commits: Commit[],
  actions: CommitAction[],
  envVars: EnvVar[],
  goals: Goal[],
  accountingEntities: AccountingEntity[],
  durationMonths: number
) {
  if (commits.length === 0) return [];

  const earliestCommit = commits.reduce((earliest, current) => 
    new Date(current.timestamp) < new Date(earliest.timestamp) ? current : earliest
  , commits[0]);
  const startDate = new Date(earliestCommit.timestamp);
  
  startDate.setDate(1);
  startDate.setHours(0, 0, 0, 0);

  const engine = new ReplayEngine({
    date: startDate,
    envVars: new Map(envVars.map((v) => [v.id, v.baseValue])),
    goals: new Map(goals.map((g) => [g.id, { ...g, isMet: false }])),
    entities: new Map(accountingEntities.map((e) => [e.id, { ...e, currentValue: 0 }])),
  });

  const now = new Date();
  const historicalMonths = (now.getFullYear() - startDate.getFullYear()) * 12 + (now.getMonth() - startDate.getMonth());
  const totalMonths = Math.max(0, historicalMonths) + durationMonths;

  return engine.project(commits, actions, totalMonths);
}

/**
 * Project a branch's future
 */
app.post("/branches/:id/project", async (c) => {
  const branchId = c.req.param("id");
  const body = await c.req.json().catch(() => ({}));
  const parsed = ProjectRequestSchema.safeParse(body);
  
  if (!parsed.success) {
    return c.json({ error: "Invalid request body", details: parsed.error }, 400);
  }

  const db = drizzle(c.env.DB, { schema });
  const { commits, actions, envVars, goals, accountingEntities } = await fetchBranchLineage(db, branchId);
  
  if (commits.length === 0) {
    return c.json({ error: "Branch not found or has no history" }, 404);
  }

  const snapshots = runProjection(commits, actions, envVars, goals, accountingEntities, parsed.data.durationMonths);
  
  return c.json({ snapshots });
});

/**
 * Compare two branches
 */
app.post("/branches/compare", async (c) => {
  const body = await c.req.json().catch(() => ({}));
  const parsed = CompareRequestSchema.safeParse(body);
  
  if (!parsed.success) {
    return c.json({ error: "Invalid request body", details: parsed.error }, 400);
  }

  const db = drizzle(c.env.DB, { schema });
  
  const [dataA, dataB] = await Promise.all([
    fetchBranchLineage(db, parsed.data.branchIdA),
    fetchBranchLineage(db, parsed.data.branchIdB),
  ]);

  if (dataA.commits.length === 0 || dataB.commits.length === 0) {
    return c.json({ error: "One or both branches not found" }, 404);
  }

  const snapshotsA = runProjection(dataA.commits, dataA.actions, dataA.envVars, dataA.goals, dataA.accountingEntities, parsed.data.durationMonths);
  const snapshotsB = runProjection(dataB.commits, dataB.actions, dataB.envVars, dataB.goals, dataB.accountingEntities, parsed.data.durationMonths);

  const finalA = snapshotsA.length > 0 ? snapshotsA[snapshotsA.length - 1] : null;
  const finalB = snapshotsB.length > 0 ? snapshotsB[snapshotsB.length - 1] : null;

  return c.json({
    branchA: { snapshots: snapshotsA },
    branchB: { snapshots: snapshotsB },
    comparison: (finalA && finalB) ? {
      netWorthDiff: finalB.netWorth - finalA.netWorth,
      assetsDiff: finalB.assets - finalA.assets,
      liabilitiesDiff: finalB.liabilities - finalA.liabilities,
    } : null
  });
});

export default app;
