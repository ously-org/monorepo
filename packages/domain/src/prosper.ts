export type BranchType = "CURRENT" | "FUTURE";
export type ActionType = "ADD" | "UPDATE" | "REPLACE" | "DELETE";
export type TargetType = "ENTITY" | "GOAL" | "ENV_VAR";
export type AccountingEntityType = "ASSET" | "LIABILITY" | "INCOME" | "EXPENSE";
export type GrowthMode = "ABSOLUTE" | "RELATIVE";
export type GoalType = "TIME_FIX" | "MEASUREMENT" | "COMMITMENT";

export interface Branch {
  id: string;
  userId: string;
  name: string;
  type: BranchType;
  isFrozen: boolean;
  baseCommitId?: string;
}

export interface Commit {
  id: string;
  branchId: string;
  timestamp: Date;
  message?: string;
}

export interface CommitAction {
  id: string;
  commitId: string;
  actionType: ActionType;
  targetType: TargetType;
  targetId: string;
  key: string;
  valueNum?: number;
  valueStr?: string;
  isRelative: boolean;
  refEnvVarId?: string;
}

export interface AccountingEntity {
  id: string;
  name: string;
  type: AccountingEntityType;
  parentEntityId?: string;
  growthBaseValue: number;
  growthMode: GrowthMode;
  refEnvVarId?: string;
}

export interface Goal {
  id: string;
  branchId: string;
  type: GoalType;
  targetDate?: Date;
  targetValue?: number;
  targetEntityId?: string;
  dependencyGoalId?: string;
  triggerCommitId?: string;
}

export interface EnvVar {
  id: string;
  name: string;
  baseValue: number;
}
