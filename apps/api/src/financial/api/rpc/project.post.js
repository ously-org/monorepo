import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "@ously/db";
import { ProjectRequestSchema } from "@ously/validation";
import { runProjection } from "../../services/queries/run-projection";
const app = new Hono();
/**
 * RPC Handler: Project a branch's future
 */
export const projectRpc = app.post("/:id/project", zValidator("json", ProjectRequestSchema), async (c) => {
    const branchId = c.req.param("id");
    const { durationMonths } = c.req.valid("json");
    const db = drizzle(c.env.DB, { schema });
    try {
        const snapshots = await runProjection(db, branchId, durationMonths);
        if (snapshots.length === 0) {
            return c.json({ error: "Branch not found or has no history" }, 404);
        }
        return c.json({ snapshots });
    }
    catch (error) {
        console.error("Projection error:", error);
        return c.json({ error: "Internal server error" }, 500);
    }
});
