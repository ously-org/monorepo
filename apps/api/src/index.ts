import { Hono } from "hono";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "@ously/db";
import { fetchBranchLineage } from "./services/data";
import { ReplayEngine } from "./services/engine";
import { ProjectRequestSchema, CompareRequestSchema } from "@ously/validation";

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
  const { commits, actions, envVars, goals } = await fetchBranchLineage(db, branchId);
  
  if (commits.length === 0) {
    return c.json({ error: "Branch not found or has no history" }, 404);
  }

  // Initialize engine at Month 0
  const engine = new ReplayEngine({
    envVars: new Map(envVars.map(v => [v.id, v.baseValue])),
    goals: new Map(goals.map(g => [g.id, { ...g, isMet: false }])),
  });

  // Replay historical commits + project into the future
  const snapshots = engine.project(commits, actions, parsed.data.durationMonths);
  
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

  const engineA = new ReplayEngine({
    envVars: new Map(dataA.envVars.map(v => [v.id, v.baseValue])),
    goals: new Map(dataA.goals.map(g => [g.id, { ...g, isMet: false }])),
  });
  const snapshotsA = engineA.project(dataA.commits, dataA.actions, parsed.data.durationMonths);

  const engineB = new ReplayEngine({
    envVars: new Map(dataB.envVars.map(v => [v.id, v.baseValue])),
    goals: new Map(dataB.goals.map(g => [g.id, { ...g, isMet: false }])),
  });
  const snapshotsB = engineB.project(dataB.commits, dataB.actions, parsed.data.durationMonths);

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
