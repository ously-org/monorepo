import { drizzle } from "drizzle-orm/d1";
import * as schema from "@ously/db";
import { CompareRequestSchema } from "@ously/validation";
import { compareBranches } from "../../services/queries/compare-branches";
/**
 * REST Handler: Compare two branches
 */
export const comparePost = async (c) => {
    const body = await c.req.json().catch(() => ({}));
    const parsed = CompareRequestSchema.safeParse(body);
    if (!parsed.success) {
        return c.json({ error: "Invalid request body", details: parsed.error }, 400);
    }
    const db = drizzle(c.env.DB, { schema });
    try {
        const comparison = await compareBranches(db, parsed.data.branchIdA, parsed.data.branchIdB, parsed.data.durationMonths);
        if (!comparison.branchA.finalSnapshot && !comparison.branchB.finalSnapshot) {
            return c.json({ error: "One or both branches not found or have no history" }, 404);
        }
        return c.json(comparison);
    }
    catch (error) {
        console.error("Comparison error:", error);
        return c.json({ error: "Internal server error" }, 500);
    }
};
