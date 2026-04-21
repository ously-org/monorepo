import { Context } from "hono";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "@ously/db";
import { runProjection } from "../../services/queries/run-projection";
import { Bindings } from "../../../shared/types";

/**
 * RPC Handler: Project a branch's future
 */
export const projectRpcHandler = async (c: Context<{ Bindings: Bindings }>) => {
  const branchId = c.req.param("id");
  // @ts-expect-error - Validated by middleware in rpcRouter
  const { durationMonths } = c.req.valid("json");
  
  const db = drizzle(c.env.DB, { schema });
  
  try {
    const snapshots = await runProjection(db, branchId, durationMonths);
    
    if (snapshots.length === 0) {
      return c.json({ error: "Branch not found or has no history" }, 404);
    }

    return c.json({ snapshots });
  } catch (error) {
    console.error("Projection error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
};
