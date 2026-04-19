/**
 * This schema is based on the Better Auth requirements for the Drizzle adapter.
 * Reference: https://www.better-auth.com/docs/adapters/drizzle
 * 
 * To update this schema using the Better Auth CLI, run:
 * pnpm dlx @better-auth/cli generate --output ./src/schema.ts
 */
import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { 
  type User, 
  type Session, 
  type Account, 
  type Verification,
  type Branch,
  type Commit,
  type CommitAction,
  type AccountingEntity,
  type Goal,
  type EnvVar
} from "@ously/domain";
import { matchTable } from "./match-table";

export const users = sqliteTable("user", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name"),
  emailVerified: integer("email_verified", { mode: "boolean" }).notNull(),
  image: text("image"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const sessions = sqliteTable("session", {
  id: text("id").primaryKey(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  token: text("token").notNull().unique(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
});

export const accounts = sqliteTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: integer("access_token_expires_at", { mode: "timestamp" }),
  refreshTokenExpiresAt: integer("refresh_token_expires_at", { mode: "timestamp" }),
  scope: text("scope"),
  password: text("password"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const verifications = sqliteTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }),
  updatedAt: integer("updated_at", { mode: "timestamp" }),
});

export const branches = sqliteTable("branch", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  name: text("name").notNull(),
  type: text("type").$type<"CURRENT" | "FUTURE">().notNull(),
  isFrozen: integer("is_frozen", { mode: "boolean" }).notNull(),
  baseCommitId: text("base_commit_id").references((): any => commits.id),
});

export const commits = sqliteTable("commit", {
  id: text("id").primaryKey(),
  branchId: text("branch_id")
    .notNull()
    .references((): any => branches.id),
  timestamp: integer("timestamp", { mode: "timestamp" }).notNull(),
  message: text("message"),
});

export const commitActions = sqliteTable("commit_action", {
  id: text("id").primaryKey(),
  commitId: text("commit_id")
    .notNull()
    .references((): any => commits.id),
  actionType: text("action_type").$type<"ADD" | "UPDATE" | "REPLACE" | "DELETE">().notNull(),
  targetType: text("target_type").$type<"ENTITY" | "GOAL" | "ENV_VAR">().notNull(),
  targetId: text("target_id").notNull(),
  key: text("key").notNull(),
  valueNum: real("value_num"),
  valueStr: text("value_str"),
  isRelative: integer("is_relative", { mode: "boolean" }).notNull(),
  refEnvVarId: text("ref_env_var_id").references((): any => envVars.id),
});

export const envVars = sqliteTable("env_var", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  baseValue: real("base_value").notNull(),
});

export const accountingEntities = sqliteTable("accounting_entity", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").$type<"ASSET" | "LIABILITY" | "INCOME" | "EXPENSE">().notNull(),
  parentEntityId: text("parent_entity_id").references((): any => accountingEntities.id),
  growthBaseValue: real("growth_base_value").notNull(),
  growthMode: text("growth_mode").$type<"ABSOLUTE" | "RELATIVE">().notNull(),
  refEnvVarId: text("ref_env_var_id").references((): any => envVars.id),
});

export const goals = sqliteTable("goal", {
  id: text("id").primaryKey(),
  branchId: text("branch_id")
    .notNull()
    .references((): any => branches.id),
  type: text("type").$type<"TIME_FIX" | "MEASUREMENT" | "COMMITMENT">().notNull(),
  targetDate: integer("target_date", { mode: "timestamp" }),
  targetValue: real("target_value"),
  targetEntityId: text("target_entity_id").references((): any => accountingEntities.id),
  dependencyGoalId: text("dependency_goal_id").references((): any => goals.id),
  triggerCommitId: text("trigger_commit_id").references((): any => commits.id),
});

matchTable<User>()(users);
matchTable<Session>()(sessions);
matchTable<Account>()(accounts);
matchTable<Verification>()(verifications);
matchTable<Branch>()(branches);
matchTable<Commit>()(commits);
matchTable<CommitAction>()(commitActions);
matchTable<AccountingEntity>()(accountingEntities);
matchTable<Goal>()(goals);
matchTable<EnvVar>()(envVars);
