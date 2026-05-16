// ISSUE_#85 | 2026-05-13 | Profile API integration tests with real SQLite | opencode | deepseek-v4-flash

import { describe, it, expect, beforeAll, vi } from "vitest";
import Database from "better-sqlite3";
import { drizzle as drizzleBetter } from "drizzle-orm/better-sqlite3";
import { eq } from "drizzle-orm";
import * as schema from "@ously/db";

const MIGRATION_SQL = `
CREATE TABLE \`account\` (
	\`id\` text PRIMARY KEY NOT NULL,
	\`account_id\` text NOT NULL,
	\`provider_id\` text NOT NULL,
	\`user_id\` text NOT NULL,
	\`access_token\` text,
	\`refresh_token\` text,
	\`id_token\` text,
	\`access_token_expires_at\` integer,
	\`refresh_token_expires_at\` integer,
	\`scope\` text,
	\`password\` text,
	\`created_at\` integer NOT NULL,
	\`updated_at\` integer NOT NULL,
	FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON UPDATE no action ON DELETE no action
);
CREATE TABLE \`session\` (
	\`id\` text PRIMARY KEY NOT NULL,
	\`expires_at\` integer NOT NULL,
	\`token\` text NOT NULL,
	\`created_at\` integer NOT NULL,
	\`updated_at\` integer NOT NULL,
	\`ip_address\` text,
	\`user_agent\` text,
	\`user_id\` text NOT NULL,
	FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON UPDATE no action ON DELETE no action
);
CREATE TABLE \`user\` (
	\`id\` text PRIMARY KEY NOT NULL,
	\`email\` text NOT NULL,
	\`name\` text,
	\`email_verified\` integer NOT NULL,
	\`image\` text,
	\`gender\` text,
	\`currency\` text,
	\`subscription_status\` text,
	\`created_at\` integer NOT NULL,
	\`updated_at\` integer NOT NULL
);
CREATE TABLE \`verification\` (
	\`id\` text PRIMARY KEY NOT NULL,
	\`identifier\` text NOT NULL,
	\`value\` text NOT NULL,
	\`expires_at\` integer NOT NULL,
	\`created_at\` integer,
	\`updated_at\` integer
);
CREATE UNIQUE INDEX \`session_token_unique\` ON \`session\` (\`token\`);
CREATE UNIQUE INDEX \`user_email_unique\` ON \`user\` (\`email\`);
`;

let testDb: ReturnType<typeof drizzleBetter>;

vi.mock("drizzle-orm/d1", () => ({
  drizzle: vi.fn(() => testDb),
}));

import app from "../index";

const TEST_USER_BASE = {
  emailVerified: true,
  image: null,
  gender: null,
  currency: null,
  subscriptionStatus: null,
  createdAt: new Date("2026-01-01"),
  updatedAt: new Date("2026-01-01"),
};

const TEST_SESSION_BASE = {
  expiresAt: new Date("2099-01-01"),
  createdAt: new Date("2026-01-01"),
  updatedAt: new Date("2026-01-01"),
  ipAddress: null,
  userAgent: null,
};

const env = { DB: {} as any };

let counter = 0;

async function seedUser(overrides?: Record<string, any>): Promise<string> {
  counter++;
  const id = `u-${counter}`;
  await testDb
    .insert(schema.users)
    .values({
      id,
      email: `${id}@t.ously`,
      name: "Test User",
      ...TEST_USER_BASE,
      ...overrides,
    })
    .run();
  return id;
}

async function seedSession(
  token: string,
  userId: string,
  overrides?: Record<string, any>,
): Promise<void> {
  counter++;
  await testDb
    .insert(schema.sessions)
    .values({
      id: `s-${counter}`,
      token,
      userId,
      ...TEST_SESSION_BASE,
      ...overrides,
    })
    .run();
}

beforeAll(() => {
  const sqliteDb = new Database(":memory:");
  sqliteDb.exec(MIGRATION_SQL);
  testDb = drizzleBetter(sqliteDb, { schema });
});

describe("GET /me (integration)", () => {
  it("returns full profile with valid session token", async () => {
    const uid = await seedUser();
    await seedSession("gt-valid-token", uid);

    const res = await app.request(
      "/me",
      { headers: { Authorization: "Bearer gt-valid-token" } },
      env,
    );

    expect(res.status).toBe(200);
    const body: any = await res.json();
    expect(body.user.id).toBe(uid);
    expect(body.user.email).toBe(`${uid}@t.ously`);
    expect(body.user.name).toBe("Test User");
  });

  it("returns 401 without auth token", async () => {
    const res = await app.request("/me", {}, env);
    expect(res.status).toBe(401);
  });

  it("returns 401 with invalid token", async () => {
    const uid = await seedUser();
    await seedSession("gt-real-token", uid);

    const res = await app.request(
      "/me",
      { headers: { Authorization: "Bearer wrong-token" } },
      env,
    );
    expect(res.status).toBe(401);
  });

  it("returns 401 with expired session token", async () => {
    const uid = await seedUser();
    await seedSession("gt-expired-token", uid, {
      expiresAt: new Date("2020-01-01"),
    });

    const res = await app.request(
      "/me",
      { headers: { Authorization: "Bearer gt-expired-token" } },
      env,
    );
    expect(res.status).toBe(401);
  });
});

describe("PATCH /me (integration)", () => {
  it("updates user name and persists to database", async () => {
    const uid = await seedUser();
    await seedSession("pt-name", uid);

    const res = await app.request(
      "/me",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer pt-name",
        },
        body: JSON.stringify({ name: "Updated Name" }),
      },
      env,
    );

    expect(res.status).toBe(200);
    const body: any = await res.json();
    expect(body.user.name).toBe("Updated Name");

    const user = (
      await testDb
        .select()
        .from(schema.users)
        .where(eq(schema.users.id, uid))
        .limit(1)
    )[0]!;
    expect(user.name).toBe("Updated Name");
  });

  it("updates all allowed fields", async () => {
    const uid = await seedUser();
    await seedSession("pt-all", uid);

    const res = await app.request(
      "/me",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer pt-all",
        },
        body: JSON.stringify({
          name: "New Name",
          image: "https://example.com/avatar.png",
          gender: "male",
          currency: "USD",
        }),
      },
      env,
    );

    expect(res.status).toBe(200);

    const user = (
      await testDb
        .select()
        .from(schema.users)
        .where(eq(schema.users.id, uid))
        .limit(1)
    )[0]!;
    expect(user.name).toBe("New Name");
    expect(user.image).toBe("https://example.com/avatar.png");
    expect(user.gender).toBe("male");
    expect(user.currency).toBe("USD");
  });

  it("updates updatedAt timestamp on write", async () => {
    const uid = await seedUser();
    await seedSession("pt-updatedat", uid);

    const before = (
      await testDb
        .select()
        .from(schema.users)
        .where(eq(schema.users.id, uid))
        .limit(1)
    )[0]!;

    await app.request(
      "/me",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer pt-updatedat",
        },
        body: JSON.stringify({ name: "Updated" }),
      },
      env,
    );

    const after = (
      await testDb
        .select()
        .from(schema.users)
        .where(eq(schema.users.id, uid))
        .limit(1)
    )[0]!;

    expect(after.updatedAt.getTime()).toBeGreaterThan(
      before.updatedAt.getTime(),
    );
  });

  it("rejects invalid gender with 400 and does not mutate DB", async () => {
    const uid = await seedUser();
    await seedSession("pt-bad-gender", uid);

    const res = await app.request(
      "/me",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer pt-bad-gender",
        },
        body: JSON.stringify({ gender: "invalid" }),
      },
      env,
    );

    expect(res.status).toBe(400);

    const user = (
      await testDb
        .select()
        .from(schema.users)
        .where(eq(schema.users.id, uid))
        .limit(1)
    )[0]!;
    expect(user.gender).toBeNull();
  });

  it("rejects invalid currency with 400 and does not mutate DB", async () => {
    const uid = await seedUser();
    await seedSession("pt-bad-currency", uid);

    const res = await app.request(
      "/me",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer pt-bad-currency",
        },
        body: JSON.stringify({ currency: "INVALID" }),
      },
      env,
    );

    expect(res.status).toBe(400);

    const user = (
      await testDb
        .select()
        .from(schema.users)
        .where(eq(schema.users.id, uid))
        .limit(1)
    )[0]!;
    expect(user.currency).toBeNull();
  });

  it("accepts empty body as no-op", async () => {
    const uid = await seedUser();
    await seedSession("pt-empty", uid);

    const res = await app.request(
      "/me",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer pt-empty",
        },
        body: JSON.stringify({}),
      },
      env,
    );

    expect(res.status).toBe(200);

    const user = (
      await testDb
        .select()
        .from(schema.users)
        .where(eq(schema.users.id, uid))
        .limit(1)
    )[0]!;
    expect(user.name).toBe("Test User");
  });
});
