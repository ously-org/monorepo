import { 
  AccountingEntity, 
  EnvVar, 
  Goal, 
  CommitAction, 
  Branch, 
  Commit 
} from "@ously/domain";

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

export class ReplayEngine {
  private state: EngineState;

  constructor(initialState: Partial<EngineState>) {
    this.state = {
      month: 0,
      date: initialState.date || new Date(),
      entities: initialState.entities || new Map(),
      envVars: initialState.envVars || new Map(),
      goals: initialState.goals || new Map(),
      isFrozen: false,
    };
  }

  public run(futureCommits: Commit[], actions: CommitAction[], durationMonths: number = 120): Snapshot[] {
    const snapshots: Snapshot[] = [];
    
    for (let i = 0; i <= durationMonths; i++) {
      if (this.state.isFrozen) {
        snapshots.push(this.createSnapshot());
        continue;
      }

      this.processMonth(i, futureCommits, actions);
      snapshots.push(this.createSnapshot());
      
      // Advance date by one month
      this.state.month++;
      const nextDate = new Date(this.state.date);
      nextDate.setMonth(nextDate.getMonth() + 1);
      this.state.date = nextDate;
    }

    return snapshots;
  }

  private processMonth(month: number, commits: Commit[], actions: CommitAction[]) {
    this.applyGrowth();
    this.applyActions(month, commits, actions);
  }

  private applyGrowth() {
    for (const entity of this.state.entities.values()) {
      if (entity.type !== "ASSET" && entity.type !== "LIABILITY") continue;

      let growthRate = entity.growthBaseValue;
      if (entity.refEnvVarId) {
        const envVarValue = this.state.envVars.get(entity.refEnvVarId);
        if (envVarValue !== undefined) {
          growthRate = envVarValue;
        }
      }

      if (entity.growthMode === "RELATIVE") {
        entity.currentValue *= (1 + growthRate);
      } else {
        entity.currentValue += growthRate;
      }
    }
  }

  private applyActions(month: number, commits: Commit[], actions: CommitAction[]) {
    const monthCommits = commits.filter(c => {
      const commitDate = new Date(c.timestamp);
      return commitDate.getFullYear() === this.state.date.getFullYear() &&
             commitDate.getMonth() === this.state.date.getMonth();
    });

    for (const commit of monthCommits) {
      const commitActions = actions.filter(a => a.commitId === commit.id);
      for (const action of commitActions) {
        this.applyAction(action);
        if (this.state.isFrozen) return;
      }
    }
  }

  private applyAction(action: CommitAction) {
    if (action.targetType === "ENTITY") {
      const entity = this.state.entities.get(action.targetId);
      if (!entity) {
        if (action.actionType !== "ADD") {
          this.state.isFrozen = true;
          return;
        }
        // Handle ADD later if needed
        return;
      }

      const value = action.valueNum || 0;
      if (action.actionType === "UPDATE") {
        entity.currentValue += value;
      } else if (action.actionType === "REPLACE") {
        entity.currentValue = value;
      } else if (action.actionType === "DELETE") {
        this.state.entities.delete(action.targetId);
      }
    } else if (action.targetType === "ENV_VAR") {
      const value = action.valueNum || 0;
      if (action.actionType === "UPDATE") {
        const current = this.state.envVars.get(action.targetId) || 0;
        this.state.envVars.set(action.targetId, current + value);
      } else if (action.actionType === "REPLACE") {
        this.state.envVars.set(action.targetId, value);
      } else if (action.actionType === "DELETE") {
        this.state.envVars.delete(action.targetId);
      }
    }
  }

  private createSnapshot(): Snapshot {
    let assets = 0;
    let liabilities = 0;
    const entitiesRecord: Record<string, number> = {};

    for (const entity of this.state.entities.values()) {
      entitiesRecord[entity.id] = entity.currentValue;
      if (entity.type === "ASSET") assets += entity.currentValue;
      if (entity.type === "LIABILITY") liabilities += entity.currentValue;
    }

    return {
      month: this.state.month,
      date: new Date(this.state.date),
      netWorth: assets - liabilities,
      assets,
      liabilities,
      debtToAssetRatio: assets === 0 ? 0 : liabilities / assets,
      entities: entitiesRecord,
      isFrozen: this.state.isFrozen,
    };
  }
}
