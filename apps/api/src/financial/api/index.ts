import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { ProjectRequestSchema, CompareRequestSchema } from "@ously/validation";
import { projectPost } from "./rest/project.post";
import { comparePost } from "./rest/compare.post";
import { projectRpcHandler } from "./rpc/project.post";
import { compareRpcHandler } from "./rpc/compare.post";
import { Bindings } from "../../shared/types";

// 1. REST Router
export const restRouter = new Hono<{ Bindings: Bindings }>();
restRouter.post("/:id/project", projectPost);
restRouter.post("/compare", comparePost);

// 2. RPC Router (Flattened to resolve OOM)
export const rpcRouter = new Hono<{ Bindings: Bindings }>()
  .post("/:id/project", zValidator("json", ProjectRequestSchema), projectRpcHandler)
  .post("/compare", zValidator("json", CompareRequestSchema), compareRpcHandler);

// 3. Combined Financial Router
export const financialRouter = new Hono<{ Bindings: Bindings }>()
  .route("/rest", restRouter)
  .route("/rpc", rpcRouter);

// Export types for RPC client
export type FinancialRpcType = typeof rpcRouter;
