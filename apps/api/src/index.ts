import {
  OpenAPIHono,
  createRoute,
  extendZodWithOpenApi,
  z,
} from "@hono/zod-openapi";
import { swaggerUI } from "@hono/swagger-ui";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "@ously/db";
import { UserSchema } from "@ously/validation";
import profileRoutes from "./routes/profile";
import authRoutes from "./routes/auth";

extendZodWithOpenApi(z);

type Bindings = {
  DB: D1Database;
  GOOGLE_CLIENT_ID?: string;
  GOOGLE_CLIENT_SECRET?: string;
  BETTER_AUTH_URL?: string;
};

const app = new OpenAPIHono<{ Bindings: Bindings }>();

const healthRoute = createRoute({
  method: "get",
  path: "/",
  summary: "Health check",
  description: "Returns API status",
  tags: ["Health"],
  responses: {
    200: {
      description: "API is online",
      content: {
        "text/plain": { schema: z.string() },
      },
    },
  },
});

app.openapi(healthRoute, (c) => {
  return c.text("Ously API - Online");
});

const usersRoute = createRoute({
  method: "get",
  path: "/users",
  summary: "List all users",
  description: "Returns all registered users",
  tags: ["Users"],
  responses: {
    200: {
      description: "List of users",
      content: {
        "application/json": {
          schema: z.object({ users: z.array(UserSchema as any) }),
        },
      },
    },
  },
});

// @ts-expect-error handler return type matches at runtime
app.openapi(usersRoute, async (c) => {
  const db = drizzle(c.env.DB, { schema });
  const users = await db.select().from(schema.users).all();
  return c.json({ users });
});

app.route("/me", profileRoutes);
app.route("/auth", authRoutes);

app.doc("/openapi.json", {
  openapi: "3.0.3",
  info: {
    title: "Ously API",
    version: "1.0.0",
    description:
      "API for the Ously platform — user profiles, authentication (Google OAuth via Better Auth), and more.\n\n" +
      "## Authentication\n\n" +
      "1. Call **GET /auth/google** to sign in with Google (opens in browser)\n" +
      "2. After signing in, call **GET /auth/token** to get your Bearer token\n" +
      "3. Click **Authorize** at the top and paste `Bearer <your-token>` to test authenticated endpoints",
  },
  servers: [{ url: "/", description: "Current environment" }],
});

app.get("/docs", swaggerUI({ url: "/openapi.json" }));

export default app;
