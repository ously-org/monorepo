import { Hono } from "hono";
import { drizzle } from "drizzle-orm/d1";
import { auth as createAuth } from "@ously/auth";
import * as schema from "@ously/db";

type Bindings = {
  DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get("/", (c) => {
  return c.text("Ously API - Online");
});

app.get("/me", async (c) => {
  const db = drizzle(c.env.DB, { schema });
  const auth = createAuth(db);
  const session = await auth.api.getSession({
    headers: c.req.raw.headers,
  });

  if (!session) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  return c.json({ user: session.user });
});

export default app;
