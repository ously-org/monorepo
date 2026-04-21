import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "@ously/db";
import { CompareRequestSchema } from "@ously/validation";
import { compareBranches } from "../../services/queries/compare-branches";
const app = new Hono();
/**
 * RPC Handler: Compare two branches
 */
export const compareRpc = app.post("/compare", zValidator("json", CompareRequestSchema), async (c) => {
    const { branchIdA, branchIdB, durationMonths } = c.req.valid("json");
    const db = drizzle(c.env.DB, { schema });
    try {
        const comparison = await compareBranches(db, branchIdA, branchIdB, durationMonths);
        if (!comparison.branchA.finalSnapshot && !comparison.branchB.finalSnapshot) {
            return c.json({ error: "One or both branches not found or have no history" }, 404);
        }
        return c.json(comparison);
    }
    catch (error) {
        console.error("Comparison error:", error);
        return c.json({ error: "Internal server error" }, 500);
    }
});
