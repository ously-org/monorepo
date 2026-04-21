import { z } from "zod";
import {
  type Branch,
  type Commit,
  type CommitAction,
  type AccountingEntity,
  type Goal,
  type EnvVar,
  type BranchType,
  type ActionType,
  type TargetType,
  type AccountingEntityType,
  type GrowthMode,
  type GoalType,
} from "@ously/domain";
import { match } from "./match";

export const BranchTypeSchema = z.enum(["CURRENT", "FUTURE"]) satisfies z.ZodType<BranchType>;
export const ActionTypeSchema = z.enum(["ADD", "UPDATE", "REPLACE", "DELETE"]) satisfies z.ZodType<ActionType>;
export const TargetTypeSchema = z.enum(["ENTITY", "GOAL", "ENV_VAR"]) satisfies z.ZodType<TargetType>;
export const AccountingEntityTypeSchema = z.enum(["ASSET", "LIABILITY", "INCOME", "EXPENSE"]) satisfies z.ZodType<AccountingEntityType>;
export const GrowthModeSchema = z.enum(["ABSOLUTE", "RELATIVE"]) satisfies z.ZodType<GrowthMode>;
export const GoalTypeSchema = z.enum(["TIME_FIX", "MEASUREMENT", "COMMITMENT"]) satisfies z.ZodType<GoalType>;

export const BranchSchema = z.object({
  id: z.string(),
  userId: z.string(),
  name: z.string(),
  type: BranchTypeSchema,
  isFrozen: z.boolean(),
  baseCommitId: z.string().optional(),
}) satisfies z.ZodType<Branch>;

export const CommitSchema = z.object({
  id: z.string(),
  branchId: z.string(),
  timestamp: z.date(),
  message: z.string().optional(),
}) satisfies z.ZodType<Commit>;

export const CommitActionSchema = z.object({
  id: z.string(),
  commitId: z.string(),
  actionType: ActionTypeSchema,
  targetType: TargetTypeSchema,
  targetId: z.string(),
  key: z.string(),
  valueNum: z.number().optional(),
  valueStr: z.string().optional(),
  isRelative: z.boolean(),
  refEnvVarId: z.string().optional(),
}) satisfies z.ZodType<CommitAction>;

export const AccountingEntitySchema = z.object({
  id: z.string(),
  name: z.string(),
  type: AccountingEntityTypeSchema,
  parentEntityId: z.string().optional(),
  growthBaseValue: z.number(),
  growthMode: GrowthModeSchema,
  refEnvVarId: z.string().optional(),
}) satisfies z.ZodType<AccountingEntity>;

export const GoalSchema = z.object({
  id: z.string(),
  branchId: z.string(),
  type: GoalTypeSchema,
  targetDate: z.date().optional(),
  targetValue: z.number().optional(),
  targetEntityId: z.string().optional(),
  dependencyGoalId: z.string().optional(),
  triggerCommitId: z.string().optional(),
}) satisfies z.ZodType<Goal>;

export const EnvVarSchema = z.object({
  id: z.string(),
  name: z.string(),
  baseValue: z.number(),
}) satisfies z.ZodType<EnvVar>;

export const ProjectRequestSchema = z.object({
  durationMonths: z.number().int().positive().optional().default(120),
}) satisfies z.ZodType;

export const CompareRequestSchema = z.object({
  branchIdA: z.string(),
  branchIdB: z.string(),
  durationMonths: z.number().int().positive().optional().default(120),
}) satisfies z.ZodType;
