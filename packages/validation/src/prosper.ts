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

export const BranchSchema = match<Branch>()(
  z.object({
    id: z.string(),
    userId: z.string(),
    name: z.string(),
    type: BranchTypeSchema,
    isFrozen: z.boolean(),
    baseCommitId: z.string().optional(),
  })
);

export const CommitSchema = match<Commit>()(
  z.object({
    id: z.string(),
    branchId: z.string(),
    timestamp: z.date(),
    message: z.string().optional(),
  })
);

export const CommitActionSchema = match<CommitAction>()(
  z.object({
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
  })
);

export const AccountingEntitySchema = match<AccountingEntity>()(
  z.object({
    id: z.string(),
    name: z.string(),
    type: AccountingEntityTypeSchema,
    parentEntityId: z.string().optional(),
    growthBaseValue: z.number(),
    growthMode: GrowthModeSchema,
    refEnvVarId: z.string().optional(),
  })
);

export const GoalSchema = match<Goal>()(
  z.object({
    id: z.string(),
    branchId: z.string(),
    type: GoalTypeSchema,
    targetDate: z.date().optional(),
    targetValue: z.number().optional(),
    targetEntityId: z.string().optional(),
    dependencyGoalId: z.string().optional(),
    triggerCommitId: z.string().optional(),
  })
);

export const EnvVarSchema = match<EnvVar>()(
  z.object({
    id: z.string(),
    name: z.string(),
    baseValue: z.number(),
  })
);

export const ProjectRequestSchema = z.object({
  durationMonths: z.number().int().positive().optional().default(120),
});

export const CompareRequestSchema = z.object({
  branchIdA: z.string(),
  branchIdB: z.string(),
  durationMonths: z.number().int().positive().optional().default(120),
});
