import { 
  AccountingEntity, 
  EnvVar, 
  Goal, 
  CommitAction, 
  Branch, 
  Commit,
  AccountingEntityType
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

  public project(futureCommits: Commit[], actions: CommitAction[], durationMonths: number = 120): Snapshot[] {
    const snapshots: Snapshot[] = [];
    
    // Initial snapshot before any month passes (Month 0)
    snapshots.push(this.createSnapshot());

    for (let i = 1; i <= durationMonths; i++) {
      // Advance date by one month
      this.state.month++;
      const nextDate = new Date(this.state.date);
      nextDate.setMonth(nextDate.getMonth() + 1);
      this.state.date = nextDate;

      if (this.state.isFrozen) {
        snapshots.push(this.createSnapshot());
        continue;
      }

      this.processMonth(i, futureCommits, actions);
      snapshots.push(this.createSnapshot());
    }

    return snapshots;
  }

  private processMonth(month: number, commits: Commit[], actions: CommitAction[]) {
    this.applyGrowth();
    this.applyActions(month, commits, actions);
    this.evaluateGoals(month, commits, actions);
  }

  private evaluateGoals(month: number, commits: Commit[], actions: CommitAction[]) {
    for (const goal of this.state.goals.values()) {
      if (goal.isMet) continue;

      let met = false;
      if (goal.type === "TIME_FIX") {
        if (goal.targetDate && this.state.date >= goal.targetDate) {
          met = true;
        }
      } else if (goal.type === "MEASUREMENT") {
        if (goal.targetEntityId && goal.targetValue !== undefined) {
          const entity = this.state.entities.get(goal.targetEntityId);
          if (entity && entity.currentValue >= goal.targetValue) {
            met = true;
          }
        }
      } else if (goal.type === "COMMITMENT") {
        if (goal.dependencyGoalId) {
          const depGoal = this.state.goals.get(goal.dependencyGoalId);
          if (depGoal && depGoal.isMet) {
            met = true;
          }
        }
      }

      if (met) {
        goal.isMet = true;
        goal.metAtMonth = month;
        
        // Handle trigger
        if (goal.type === "COMMITMENT" && goal.triggerCommitId) {
          const triggerCommit = commits.find(c => c.id === goal.triggerCommitId);
          if (triggerCommit) {
            const triggerActions = actions.filter(a => a.commitId === triggerCommit.id);
            for (const action of triggerActions) {
              this.applyAction(action);
            }
          }
        }
      }
    }
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
      let entity = this.state.entities.get(action.targetId);
      
      if (!entity) {
        if (action.actionType === "ADD") {
          entity = {
            id: action.targetId,
            name: action.valueStr || "New Entity",
            type: (action.key as AccountingEntityType) || "ASSET",
            growthBaseValue: 0,
            growthMode: "ABSOLUTE",
            currentValue: action.valueNum || 0,
          };
          this.state.entities.set(action.targetId, entity);
          return;
        } else {
          this.state.isFrozen = true;
          return;
        }
      }

      let value = action.valueNum || 0;
      if (action.refEnvVarId) {
        const envVarValue = this.state.envVars.get(action.refEnvVarId);
        if (envVarValue !== undefined) {
          value = envVarValue;
        }
      }

      if (action.isRelative) {
        value = entity.currentValue * value;
      }

      if (action.actionType === "UPDATE") {
        entity.currentValue += value;
      } else if (action.actionType === "REPLACE") {
        entity.currentValue = value;
      } else if (action.actionType === "DELETE") {
        this.state.entities.delete(action.targetId);
      }
    } else if (action.targetType === "ENV_VAR") {
      let current = this.state.envVars.get(action.targetId);
      if (current === undefined) {
        if (action.actionType === "ADD") {
          this.state.envVars.set(action.targetId, action.valueNum || 0);
          return;
        } else {
          this.state.isFrozen = true;
          return;
        }
      }

      let value = action.valueNum || 0;
      if (action.isRelative) {
        value = current * value;
      }

      if (action.actionType === "UPDATE") {
        this.state.envVars.set(action.targetId, current + value);
      } else if (action.actionType === "REPLACE") {
        this.state.envVars.set(action.targetId, value);
      } else if (action.actionType === "DELETE") {
        this.state.envVars.delete(action.targetId);
      }
    } else if (action.targetType === "GOAL") {
      const goal = this.state.goals.get(action.targetId);
      if (!goal) {
        if (action.actionType !== "ADD") {
          this.state.isFrozen = true;
        }
        return;
      }
      
      if (action.actionType === "UPDATE") {
        if (action.key === "targetValue" && action.valueNum !== undefined) {
          goal.targetValue = (goal.targetValue || 0) + action.valueNum;
        }
      } else if (action.actionType === "REPLACE") {
        if (action.key === "targetValue" && action.valueNum !== undefined) {
          goal.targetValue = action.valueNum;
        }
      } else if (action.actionType === "DELETE") {
        this.state.goals.delete(action.targetId);
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
