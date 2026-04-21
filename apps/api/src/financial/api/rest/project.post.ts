import { Context } from "hono";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "@ously/db";
import { ProjectRequestSchema } from "@ously/validation";
import { runProjection } from "../../services/queries/run-projection";
import { Bindings } from "../../../shared/types";

/**
 * REST Handler: Project a branch's future
 */
export const projectPost = async (c: Context<{ Bindings: Bindings }>) => {
  const branchId = c.req.param("id");

  if (!branchId) {
    return c.json({ error: "Missing id parameter" }, 400);
  }

  const body = await c.req.json().catch(() => ({}));
  const parsed = ProjectRequestSchema.safeParse(body);

  if (!parsed.success) {
    return c.json({ error: "Invalid request body", details: parsed.error }, 400);
  }

  const db = drizzle(c.env.DB, { schema });
  
  try {
    const snapshots = await runProjection(db, branchId, parsed.data.durationMonths);
    
    if (snapshots.length === 0) {
      return c.json({ error: "Branch not found or has no history" }, 404);
    }

    return c.json({ snapshots });
  } catch (error) {
    console.error("Projection error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
};
