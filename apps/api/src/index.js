import { Hono } from "hono";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "@ously/db";
import { financialRouter } from "./financial/api";
const app = new Hono()
    .get("/", (c) => {
    return c.text("Ously API - Online");
})
    .get("/users", async (c) => {
    const db = drizzle(c.env.DB, { schema });
    const users = await db.select().from(schema.users).all();
    return c.json({ users });
})
    .route("/financial", financialRouter);
export default app;
