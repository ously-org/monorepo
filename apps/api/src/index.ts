import { Hono } from "hono";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "@ously/db";
import { fetchBranchLineage } from "./services/data";
import { ReplayEngine } from "./services/engine";
import { ProjectRequestSchema, CompareRequestSchema } from "@ously/validation";
import { EnvVar, Goal, AccountingEntity } from "@ously/domain";

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

  // Find the earliest commit date
  const earliestCommit = commits.reduce((earliest, current) => 
    new Date(current.timestamp) < new Date(earliest.timestamp) ? current : earliest
  , commits[0]);
  const startDate = new Date(earliestCommit.timestamp);
  
  // Set to first day of the month for consistent monthly steps
  startDate.setDate(1);
  startDate.setHours(0, 0, 0, 0);

  // Initialize engine with the earliest start date
  const engine = new ReplayEngine({
    date: startDate,
    envVars: new Map(envVars.map((v: EnvVar) => [v.id, v.baseValue])),
    goals: new Map(goals.map((g: Goal) => [g.id, { ...g, isMet: false }])),
    entities: new Map(accountingEntities.map((e: AccountingEntity) => [e.id, { ...e, currentValue: 0 }])),
  });

  // Total simulation months = historical months + future durationMonths
  const now = new Date();
  const historicalMonths = (now.getFullYear() - startDate.getFullYear()) * 12 + (now.getMonth() - startDate.getMonth());
  const totalMonths = Math.max(0, historicalMonths) + parsed.data.durationMonths;

  // Replay historical commits + project into the future
  const snapshots = engine.project(commits, actions, totalMonths);
  
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

  const earliestCommitA = dataA.commits.reduce((earliest, current) => 
    new Date(current.timestamp) < new Date(earliest.timestamp) ? current : earliest
  , dataA.commits[0]);
  const startDateA = new Date(earliestCommitA.timestamp);
  startDateA.setDate(1);
  startDateA.setHours(0, 0, 0, 0);

  const engineA = new ReplayEngine({
    date: startDateA,
    envVars: new Map(dataA.envVars.map((v: EnvVar) => [v.id, v.baseValue])),
    goals: new Map(dataA.goals.map((g: Goal) => [g.id, { ...g, isMet: false }])),
    entities: new Map(dataA.accountingEntities.map((e: AccountingEntity) => [e.id, { ...e, currentValue: 0 }])),
  });

  const now = new Date();
  const historicalMonthsA = (now.getFullYear() - startDateA.getFullYear()) * 12 + (now.getMonth() - startDateA.getMonth());
  const totalMonthsA = Math.max(0, historicalMonthsA) + parsed.data.durationMonths;

  const snapshotsA = engineA.project(dataA.commits, dataA.actions, totalMonthsA);

  const earliestCommitB = dataB.commits.reduce((earliest, current) => 
    new Date(current.timestamp) < new Date(earliest.timestamp) ? current : earliest
  , dataB.commits[0]);
  const startDateB = new Date(earliestCommitB.timestamp);
  startDateB.setDate(1);
  startDateB.setHours(0, 0, 0, 0);

  const engineB = new ReplayEngine({
    date: startDateB,
    envVars: new Map(dataB.envVars.map((v: EnvVar) => [v.id, v.baseValue])),
    goals: new Map(dataB.goals.map((g: Goal) => [g.id, { ...g, isMet: false }])),
    entities: new Map(dataB.accountingEntities.map((e: AccountingEntity) => [e.id, { ...e, currentValue: 0 }])),
  });
  
  const historicalMonthsB = (now.getFullYear() - startDateB.getFullYear()) * 12 + (now.getMonth() - startDateB.getMonth());
  const totalMonthsB = Math.max(0, historicalMonthsB) + parsed.data.durationMonths;

  const snapshotsB = engineB.project(dataB.commits, dataB.actions, totalMonthsB);

  const finalA = snapshotsA[snapshotsA.length - 1];
  const finalB = snapshotsB[snapshotsB.length - 1];

  return c.json({
    branchA: { snapshots: snapshotsA },
    branchB: { snapshots: snapshotsB },
    comparison: {
      netWorthDiff: finalB.netWorth - finalA.netWorth,
      assetsDiff: finalB.assets - finalA.assets,
      liabilitiesDiff: finalB.liabilities - finalA.liabilities,
    }
  });
});

export default app;
