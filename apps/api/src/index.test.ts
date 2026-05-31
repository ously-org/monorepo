// ISSUE_#85 | 2026-05-13 | Profile API endpoint tests | opencode | deepseek-v4-flash

import { describe, it, expect, vi, beforeEach } from "vitest";
import * as schema from "@ously/db";

const mocks = vi.hoisted(() => ({
  mockSelect: vi.fn(),
  mockFrom: vi.fn(),
  mockWhere: vi.fn(),
  mockLimit: vi.fn(),
  mockUpdate: vi.fn(),
  mockSet: vi.fn(),
  mockUpdateWhere: vi.fn(),
  mockReturning: vi.fn(),
  drizzleMock: vi.fn(),
}));

mocks.drizzleMock.mockReturnValue({
  select: mocks.mockSelect,
  update: mocks.mockUpdate,
});

vi.mock("drizzle-orm/d1", () => ({
  drizzle: mocks.drizzleMock,
}));

import app from "./index";

const mockUser = {
  id: "user-1",
  email: "test@ously.tech",
  name: "Test User",
  image: null,
  gender: null,
  currency: null,
  subscriptionStatus: null,
  emailVerified: true,
  createdAt: new Date("2026-01-01"),
  updatedAt: new Date("2026-01-01"),
};

const mockSession = {
  id: "session-1",
  token: "valid-token",
  userId: "user-1",
  expiresAt: new Date("2099-01-01"),
  createdAt: new Date("2026-01-01"),
  updatedAt: new Date("2026-01-01"),
  ipAddress: null,
  userAgent: null,
};

beforeEach(() => {
  vi.clearAllMocks();
  mocks.drizzleMock.mockReturnValue({
    select: mocks.mockSelect,
    update: mocks.mockUpdate,
  });
  mocks.mockSelect.mockReturnValue({ from: mocks.mockFrom });
  mocks.mockFrom.mockReturnValue({ where: mocks.mockWhere });
  mocks.mockWhere.mockReturnValue({ limit: mocks.mockLimit });
  mocks.mockUpdate.mockReturnValue({ set: mocks.mockSet });
  mocks.mockSet.mockReturnValue({ where: mocks.mockUpdateWhere });
  mocks.mockUpdateWhere.mockReturnValue({ returning: mocks.mockReturning });
});

const env = { DB: {} as D1Database };

describe("GET /me", () => {
  it("returns full profile with valid token", async () => {
    mocks.mockLimit.mockResolvedValueOnce([mockSession]);
    mocks.mockLimit.mockResolvedValueOnce([mockUser]);

    const res = await app.request(
      "/me",
      { headers: { Authorization: "Bearer valid-token" } },
      env,
    );

    expect(res.status).toBe(200);
    const body: any = await res.json();
    expect(body.user).toBeDefined();
    expect(body.user.email).toBe("test@ously.tech");
    expect(body.user.id).toBe("user-1");

    expect(mocks.drizzleMock).toHaveBeenCalledWith(
      env.DB,
      expect.objectContaining({ schema: expect.any(Object) }),
    );
    expect(mocks.mockSelect).toHaveBeenCalledTimes(2);
    expect(mocks.mockFrom).toHaveBeenNthCalledWith(1, schema.sessions);
    expect(mocks.mockFrom).toHaveBeenNthCalledWith(2, schema.users);
    expect(mocks.mockWhere).toHaveBeenCalledTimes(2);
    expect(mocks.mockLimit).toHaveBeenCalledTimes(2);
    expect(mocks.mockLimit).toHaveBeenCalledWith(1);
  });

  it("returns 401 without auth token", async () => {
    const res = await app.request("/me", {}, env);
    expect(res.status).toBe(401);
  });

  it("returns 401 with invalid token", async () => {
    mocks.mockLimit.mockResolvedValueOnce([]);

    const res = await app.request(
      "/me",
      { headers: { Authorization: "Bearer invalid-token" } },
      env,
    );

    expect(res.status).toBe(401);
    expect(mocks.drizzleMock).toHaveBeenCalledTimes(1);
    expect(mocks.mockSelect).toHaveBeenCalledTimes(1);
    expect(mocks.mockFrom).toHaveBeenCalledWith(schema.sessions);
    expect(mocks.mockLimit).toHaveBeenCalledTimes(1);
  });

  it("returns 401 with expired session", async () => {
    mocks.mockLimit.mockResolvedValueOnce([
      { ...mockSession, expiresAt: new Date("2020-01-01") },
    ]);

    const res = await app.request(
      "/me",
      { headers: { Authorization: "Bearer expired-token" } },
      env,
    );

    expect(res.status).toBe(401);
    expect(mocks.drizzleMock).toHaveBeenCalledTimes(1);
    expect(mocks.mockSelect).toHaveBeenCalledTimes(1);
    expect(mocks.mockFrom).toHaveBeenCalledWith(schema.sessions);
  });
});

describe("PATCH /me", () => {
  it("updates allowed fields", async () => {
    mocks.mockLimit.mockResolvedValueOnce([mockSession]);
    mocks.mockLimit.mockResolvedValueOnce([mockUser]);
    mocks.mockReturning.mockResolvedValueOnce([
      { ...mockUser, name: "Updated Name" },
    ]);

    const res = await app.request(
      "/me",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer valid-token",
        },
        body: JSON.stringify({ name: "Updated Name" }),
      },
      env,
    );

    expect(res.status).toBe(200);
    const body: any = await res.json();
    expect(body.user.name).toBe("Updated Name");

    expect(mocks.drizzleMock).toHaveBeenCalledTimes(2);
    expect(mocks.mockSelect).toHaveBeenCalledTimes(2);
    expect(mocks.mockFrom).toHaveBeenNthCalledWith(1, schema.sessions);
    expect(mocks.mockFrom).toHaveBeenNthCalledWith(2, schema.users);
    expect(mocks.mockUpdate).toHaveBeenCalledTimes(1);
    expect(mocks.mockUpdate).toHaveBeenCalledWith(schema.users);
    expect(mocks.mockSet).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Updated Name",
        updatedAt: expect.any(Date),
      }),
    );
    expect(mocks.mockUpdateWhere).toHaveBeenCalledTimes(1);
    expect(mocks.mockReturning).toHaveBeenCalledTimes(1);
  });

  it("updates all allowed fields at once", async () => {
    mocks.mockLimit.mockResolvedValueOnce([mockSession]);
    mocks.mockLimit.mockResolvedValueOnce([mockUser]);
    mocks.mockReturning.mockResolvedValueOnce([
      {
        ...mockUser,
        name: "New",
        image: "https://example.com/pic.png",
        gender: "female",
        currency: "EUR",
      },
    ]);

    const res = await app.request(
      "/me",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer valid-token",
        },
        body: JSON.stringify({
          name: "New",
          image: "https://example.com/pic.png",
          gender: "female",
          currency: "EUR",
        }),
      },
      env,
    );

    expect(res.status).toBe(200);
    expect(mocks.mockSet).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "New",
        image: "https://example.com/pic.png",
        gender: "female",
        currency: "EUR",
        updatedAt: expect.any(Date),
      }),
    );
  });

  it("accepts empty body (no-op)", async () => {
    mocks.mockLimit.mockResolvedValueOnce([mockSession]);
    mocks.mockLimit.mockResolvedValueOnce([mockUser]);
    mocks.mockReturning.mockResolvedValueOnce([mockUser]);

    const res = await app.request(
      "/me",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer valid-token",
        },
        body: JSON.stringify({}),
      },
      env,
    );

    expect(res.status).toBe(200);
    expect(mocks.mockSet).toHaveBeenCalledWith(
      expect.objectContaining({ updatedAt: expect.any(Date) }),
    );
  });

  it("rejects invalid gender value", async () => {
    mocks.mockLimit.mockResolvedValueOnce([mockSession]);
    mocks.mockLimit.mockResolvedValueOnce([mockUser]);

    const res = await app.request(
      "/me",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer valid-token",
        },
        body: JSON.stringify({ gender: "invalid" }),
      },
      env,
    );

    expect(res.status).toBe(400);
    expect(mocks.mockSet).not.toHaveBeenCalled();
  });

  it("rejects invalid currency value", async () => {
    mocks.mockLimit.mockResolvedValueOnce([mockSession]);
    mocks.mockLimit.mockResolvedValueOnce([mockUser]);

    const res = await app.request(
      "/me",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer valid-token",
        },
        body: JSON.stringify({ currency: "INVALID" }),
      },
      env,
    );

    expect(res.status).toBe(400);
    expect(mocks.mockSet).not.toHaveBeenCalled();
  });
});
