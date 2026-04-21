import { Context } from "hono";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "@ously/db";
import { compareBranches } from "../../services/queries/compare-branches";
import { Bindings } from "../../../shared/types";

/**
 * RPC Handler: Compare two branches
 */
export const compareRpcHandler = async (c: Context<{ Bindings: Bindings }>) => {
  // @ts-expect-error - Validated by middleware in rpcRouter
  const { branchIdA, branchIdB, durationMonths } = c.req.valid("json");
  
  const db = drizzle(c.env.DB, { schema });

  try {
    const comparison = await compareBranches(
      db,
      branchIdA,
      branchIdB,
      durationMonths
    );

    if (!comparison.branchA.finalSnapshot && !comparison.branchB.finalSnapshot) {
      return c.json({ error: "One or both branches not found or have no history" }, 404);
    }

    return c.json(comparison);
  } catch (error) {
    console.error("Comparison error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
};
