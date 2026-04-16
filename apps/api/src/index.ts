import { Hono } from "hono";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "@ously/db";

type Bindings = {
  DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get("/", (c) => {
  return c.text("Ously API - Online");
});

/**
 * Example route using the shared DB package
 */
app.get("/users", async (c) => {
  const db = drizzle(c.env.DB, { schema });
  const users = await db.select().from(schema.users).all();
  return c.json({ users });
});

export default app;
