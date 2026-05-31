// ISSUE_#85 | 2026-05-13 | Profile API endpoints (GET /me, PATCH /me) | opencode | deepseek-v4-flash

import { OpenAPIHono, createRoute, extendZodWithOpenApi, z } from "@hono/zod-openapi";
import { drizzle } from "drizzle-orm/d1";
import { eq } from "drizzle-orm";
import * as schema from "@ously/db";
import { ProfileUpdateSchema, UserSchema } from "@ously/validation";
import { authMiddleware, type Bindings, type Variables } from "../auth";

extendZodWithOpenApi(z);

const app = new OpenAPIHono<{ Bindings: Bindings; Variables: Variables }>();

app.use(authMiddleware());

const getProfileRoute = createRoute({
  method: "get",
  path: "/",
  summary: "Get profile",
  description: "Returns the authenticated user's profile",
  tags: ["Profile"],
  responses: {
    200: {
      description: "Authenticated user profile",
      content: {
        "application/json": {
          schema: z.object({ user: UserSchema as any }),
        },
      },
    },
  },
});

app.openapi(getProfileRoute, async (c) => {
  const user = c.get("user");
  return c.json({ user });
});

const updateProfileRoute = createRoute({
  method: "patch",
  path: "/",
  summary: "Update profile",
  description: "Updates the authenticated user's profile fields",
  tags: ["Profile"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: ProfileUpdateSchema as any,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Updated user profile",
      content: {
        "application/json": {
          schema: z.object({ user: UserSchema as any }),
        },
      },
    },
    400: {
      description: "Validation error",
      content: {
        "application/json": {
          schema: z.object({
            error: z.string(),
            issues: z.array(z.any()),
          }),
        },
      },
    },
  },
});

// @ts-expect-error handler return type matches at runtime
app.openapi(updateProfileRoute, async (c) => {
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
