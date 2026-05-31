import { type MiddlewareHandler } from "hono";
import { drizzle } from "drizzle-orm/d1";
import { eq } from "drizzle-orm";
import * as schema from "@ously/db";

// Type-level User shape for Variables — avoids runtime dep on @ously/domain
export interface UserShape {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
  gender: string | null;
  currency: string | null;
  subscriptionStatus: string | null;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type Variables = {
  user: UserShape;
};

export type Bindings = {
  DB: D1Database;
};

export function authMiddleware(): MiddlewareHandler<{
  Bindings: Bindings;
  Variables: Variables;
}> {
  return async (c, next) => {
    const authHeader = c.req.header("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const token = authHeader.slice(7);
    const db = drizzle(c.env.DB, { schema });

    const [session] = await db
      .select()
      .from(schema.sessions)
      .where(eq(schema.sessions.token, token))
      .limit(1);

    if (!session || session.expiresAt < new Date()) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const [user] = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.id, session.userId))
      .limit(1);

    if (!user) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    c.set("user", user as UserShape);
    return next();
  };
}
