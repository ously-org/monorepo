import { AccountingEntity, Goal, CommitAction, Commit } from "@ously/domain";
export interface AccountingEntityState extends AccountingEntity {
    currentValue: number;
}
export interface GoalState extends Goal {
    isMet: boolean;
    metAtMonth?: number;
}
export interface EngineState {
    month: number;
    date: Date;
    entities: Map<string, AccountingEntityState>;
    envVars: Map<string, number>;
    goals: Map<string, GoalState>;
    isFrozen: boolean;
}
export interface Snapshot {
    month: number;
    date: Date;
    netWorth: number;
    assets: number;
    liabilities: number;
    debtToAssetRatio: number;
    entities: Record<string, number>;
    isFrozen: boolean;
}
export declare class ReplayEngine {
    private state;
    private appliedCommitIds;
    private commitGroups;
    private allCommits;
    private allActions;
    constructor(initialState: Partial<EngineState>);
    project(futureCommits: Commit[], actions: CommitAction[], durationMonths?: number): Snapshot[];
    private processMonth;
    private resolveMarketForces;
    private evaluateGoals;
    private applyGrowth;
    private applyActions;
    private applyAction;
    private createSnapshot;
}
//# sourceMappingURL=replay-engine.d.ts.map