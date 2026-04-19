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
    // Logic will be added in subsequent tasks
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
