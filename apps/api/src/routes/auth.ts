import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { UserSchema } from "@ously/validation";
import { getAuth, type AuthBindings, type Variables } from "../auth";

const app = new OpenAPIHono<{ Bindings: AuthBindings; Variables: Variables }>();

app.on(["POST", "GET"], "/api/auth/*", (c) => {
  const auth = getAuth(c.env as AuthBindings);
  return auth.handler(c.req.raw);
});

const googleRoute = createRoute({
  method: "get",
  path: "/google",
  summary: "Sign in with Google",
  description:
    "Redirects to Google OAuth for authentication. After successful sign-in, a session cookie will be set.",
  tags: ["Auth"],
  responses: {
    302: {
      description: "Redirects to Google OAuth consent screen",
    },
  },
});

app.openapi(googleRoute, (c) => {
  const redirectUrl = new URL("/api/auth/callback/google", c.req.url);
  return c.redirect(
    `/api/auth/sign-in/google?callbackURL=${encodeURIComponent(redirectUrl.toString())}`,
    302,
  );
});

const sessionRoute = createRoute({
  method: "get",
  path: "/session",
  summary: "Get current session",
  description:
    "Returns the authenticated user's session. If authenticated via cookie, also returns a Bearer token to test other endpoints.",
  tags: ["Auth"],
  responses: {
    200: {
      description: "Authenticated session with Bearer token",
      content: {
        "application/json": {
          schema: z.object({
            user: UserSchema as any,
            token: z.string(),
          }),
        },
      },
    },
    401: {
      description: "Not authenticated",
      content: {
        "application/json": {
          schema: z.object({ error: z.string() }),
        },
      },
    },
  },
});

// @ts-expect-error handler return type matches at runtime
app.openapi(sessionRoute, async (c) => {
  const auth = getAuth(c.env as AuthBindings);
  const session = await auth.api.getSession({
    headers: c.req.raw.headers,
  });

  if (!session?.user || !session?.session) {
    return c.json({ error: "Not authenticated" }, 401);
  }

  return c.json({
    user: session.user,
    token: session.session.token,
  });
});

const signOutRoute = createRoute({
  method: "post",
  path: "/signout",
  summary: "Sign out",
  description: "Ends the current session and clears the auth cookie",
  tags: ["Auth"],
  responses: {
    200: {
      description: "Signed out successfully",
      content: {
        "application/json": {
          schema: z.object({ success: z.boolean() }),
        },
      },
    },
  },
});

app.openapi(signOutRoute, async (c) => {
  const auth = getAuth(c.env as AuthBindings);
  const headers = new Headers(c.req.raw.headers);
  await auth.api.signOut({ headers });
  return c.json({ success: true });
});

const getTokenRoute = createRoute({
  method: "get",
  path: "/token",
  summary: "Get Bearer token from session cookie",
  description:
    "Extracts the session token from the current cookie session. Use as 'Bearer <token>' in the Authorize dialog to test authenticated endpoints like GET /me and PATCH /me.",
  tags: ["Auth"],
  responses: {
    200: {
      description: "Bearer token from current session",
      content: {
        "application/json": {
          schema: z.object({
            token: z.string().describe("Use as Authorization: Bearer <token>"),
            user: UserSchema as any,
          }),
        },
      },
    },
    401: {
      description: "No active session — sign in first via GET /auth/google",
      content: {
        "application/json": {
          schema: z.object({ error: z.string() }),
        },
      },
    },
  },
});

// @ts-expect-error handler return type matches at runtime
app.openapi(getTokenRoute, async (c) => {
  const auth = getAuth(c.env as AuthBindings);
  const session = await auth.api.getSession({
    headers: c.req.raw.headers,
  });

  if (!session?.user || !session?.session) {
    return c.json(
      { error: "No active session. Sign in first via GET /auth/google" },
      401,
    );
  }

  return c.json({
    token: session.session.token,
    user: session.user,
  });
});

export default app;
