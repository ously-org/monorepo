import { Hono } from "hono";
import { projectPost } from "./rest/project.post";
import { comparePost } from "./rest/compare.post";
import { projectRpc } from "./rpc/project.post";
import { compareRpc } from "./rpc/compare.post";
// 1. REST Router
export const restRouter = new Hono();
restRouter.post("/:id/project", projectPost);
restRouter.post("/compare", comparePost);
// 2. RPC Router (Chained for type inference)
export const rpcRouter = new Hono()
    .route("/", projectRpc)
    .route("/", compareRpc);
// 3. Combined Financial Router
export const financialRouter = new Hono()
    .route("/rest", restRouter)
    .route("/rpc", rpcRouter);
