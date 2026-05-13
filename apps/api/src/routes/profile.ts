// ISSUE_#85 | 2026-05-13 | Profile API endpoints (GET /me, PATCH /me) | opencode | deepseek-v4-flash

import { Hono } from "hono";
import { drizzle } from "drizzle-orm/d1";
import { eq } from "drizzle-orm";
import * as schema from "@ously/db";
import { ProfileUpdateSchema } from "@ously/validation";
import { authMiddleware, type Bindings, type Variables } from "../auth";

const app = new Hono<{ Bindings: Bindings; Variables: Variables }>();

app.use(authMiddleware());

app.get("/", async (c) => {
  const user = c.get("user");
  return c.json({ user });
});

app.patch("/", async (c) => {
  const user = c.get("user");
  const body = await c.req.json();

  const result = ProfileUpdateSchema.safeParse(body);
  if (!result.success) {
    return c.json(
      { error: "Validation failed", issues: result.error.issues },
      400,
    );
  }

  const db = drizzle(c.env.DB, { schema });

  const [updated] = await db
    .update(schema.users)
    .set({ ...result.data, updatedAt: new Date() })
    .where(eq(schema.users.id, user.id))
    .returning();

  return c.json({ user: updated });
});

export default app;
