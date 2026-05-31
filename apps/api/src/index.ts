// ISSUE_#85 | 2026-05-13 | Profile API endpoints (GET /me, PATCH /me) | opencode | deepseek-v4-flash

import { Hono } from "hono";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "@ously/db";
import profileRoutes from "./routes/profile";

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

app.route("/me", profileRoutes);

// TODO(ISSUE-89): Implement Account Deletion workflow
// TODO(ISSUE-124): Integrate Better Auth middleware and session handling

export default app;
