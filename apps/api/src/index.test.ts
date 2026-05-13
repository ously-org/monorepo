// ISSUE_#85 | 2026-05-13 | Profile API endpoint tests | opencode | deepseek-v4-flash

import { describe, it, expect, vi, beforeEach } from "vitest";

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
  });
});
