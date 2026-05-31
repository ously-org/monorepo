import { betterAuth } from "better-auth";
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { drizzle } from "drizzle-orm/d1";
import { eq } from "drizzle-orm";
import * as schema from "@ously/db";
import type { MiddlewareHandler } from "hono";
import type {
  User,
  UserGender,
  UserCurrency,
  UserSubscriptionStatus,
} from "@ously/domain";

export type UserShape = User;
export type { UserGender, UserCurrency, UserSubscriptionStatus };

export type AuthBindings = {
  DB: D1Database;
  GOOGLE_CLIENT_ID?: string;
  GOOGLE_CLIENT_SECRET?: string;
  BETTER_AUTH_URL?: string;
};

export type Bindings = AuthBindings;

export type Variables = {
  user: UserShape;
};

let _cachedAuth: ReturnType<typeof betterAuth> | null = null;
let _cachedDb: unknown = null;

export function getAuth(env: AuthBindings): ReturnType<typeof betterAuth> {
  if (_cachedAuth && _cachedDb === env.DB) {
    return _cachedAuth;
  }
  const drizzleDb = drizzle(env.DB, { schema });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _cachedAuth = betterAuth({
    database: drizzleAdapter(drizzleDb, {
      provider: "sqlite",
    }),
    socialProviders: {
      google: {
        clientId: env.GOOGLE_CLIENT_ID ?? "",
        clientSecret: env.GOOGLE_CLIENT_SECRET ?? "",
      },
    },
    emailAndPassword: {
      enabled: false,
    },
  }) as any;
  _cachedDb = env.DB;
  return _cachedAuth!;
}

export function authMiddleware(): MiddlewareHandler<{
  Bindings: Bindings;
  Variables: Variables;
}> {
  return async (c, next) => {
    const env: AuthBindings = c.env as unknown as AuthBindings;

    try {
      const auth = getAuth(env);
      const session = await auth.api.getSession({
        headers: c.req.raw.headers,
      });
      if (session?.user) {
        c.set("user", session.user as unknown as UserShape);
        await next();
        return;
      }
    } catch {
      // fall through to Bearer token auth
    }

    const authHeader = c.req.header("Authorization");
    if (authHeader?.startsWith("Bearer ")) {
      const token = authHeader.slice(7);
      const db = drizzle(env.DB, { schema });

      const [session] = await db
        .select()
        .from(schema.sessions)
        .where(eq(schema.sessions.token, token))
        .limit(1);

      if (session && session.expiresAt > new Date()) {
        const [user] = await db
          .select()
          .from(schema.users)
          .where(eq(schema.users.id, session.userId))
          .limit(1);

        if (user) {
          c.set("user", user as UserShape);
          await next();
          return;
        }
      }
    }

    return c.json({ error: "Unauthorized" }, 401);
  };
}
