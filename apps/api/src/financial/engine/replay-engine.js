export class ReplayEngine {
    state;
    appliedCommitIds = new Set();
    commitGroups = new Map();
    allCommits = [];
    allActions = [];
    constructor(initialState) {
        this.state = {
            month: 0,
            date: initialState.date || new Date(),
            entities: initialState.entities || new Map(),
            envVars: initialState.envVars || new Map(),
            goals: initialState.goals || new Map(),
            isFrozen: false,
        };
    }
    project(futureCommits, actions, durationMonths = 120) {
        const snapshots = [];
        this.appliedCommitIds.clear();
        this.commitGroups.clear();
        this.allCommits = futureCommits;
        this.allActions = actions;
        // Pre-index commits by YYYY-MM
        for (const commit of futureCommits) {
            const date = new Date(commit.timestamp);
            const key = `${date.getFullYear()}-${date.getMonth()}`;
            if (!this.commitGroups.has(key)) {
                this.commitGroups.set(key, []);
            }
            this.commitGroups.get(key).push(commit);
        }
        // Initial snapshot before any month passes (Month 0)
        snapshots.push(this.createSnapshot());
        for (let i = 1; i <= durationMonths; i++) {
            if (this.state.isFrozen) {
                snapshots.push(this.createSnapshot());
                continue;
            }
            this.processMonth(i);
            // Advance date by one month AFTER processing
            this.state.month++;
            const nextDate = new Date(this.state.date);
            nextDate.setMonth(nextDate.getMonth() + 1);
            this.state.date = nextDate;
            snapshots.push(this.createSnapshot());
        }
        return snapshots;
    }
    processMonth(month) {
        this.resolveMarketForces();
        this.applyGrowth();
        this.applyActions();
        this.evaluateGoals(month);
    }
    resolveMarketForces() {
        // Placeholder for fetching/resolving current market forces (EnvVars)
        // In a real implementation, this might involve complex logic or external data.
    }
    evaluateGoals(month) {
        // Sort goals by ID for consistent evaluation order
        const sortedGoals = Array.from(this.state.goals.values()).sort((a, b) => a.id.localeCompare(b.id));
        let anyNewGoalMet = true;
        while (anyNewGoalMet) {
            anyNewGoalMet = false;
            for (const goal of sortedGoals) {
                if (this.state.isFrozen)
                    break;
                if (goal.isMet)
                    continue;
                let met = false;
                if (goal.type === "TIME_FIX") {
                    if (goal.targetDate && this.state.date >= goal.targetDate) {
                        met = true;
                    }
                }
                else if (goal.type === "MEASUREMENT") {
                    if (goal.targetEntityId && goal.targetValue !== undefined) {
                        const entity = this.state.entities.get(goal.targetEntityId);
                        if (entity) {
                            if (entity.type === "LIABILITY") {
                                if (entity.currentValue <= goal.targetValue) {
                                    met = true;
                                }
                            }
                            else {
                                if (entity.currentValue >= goal.targetValue) {
                                    met = true;
                                }
                            }
                        }
                    }
                }
                else if (goal.type === "COMMITMENT") {
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
                    anyNewGoalMet = true;
                    // Handle trigger
                    if (goal.type === "COMMITMENT" && goal.triggerCommitId) {
                        if (!this.appliedCommitIds.has(goal.triggerCommitId)) {
                            const triggerCommit = this.allCommits.find(c => c.id === goal.triggerCommitId);
                            if (triggerCommit) {
                                this.appliedCommitIds.add(triggerCommit.id);
                                const triggerActions = this.allActions.filter(a => a.commitId === triggerCommit.id);
                                for (const action of triggerActions) {
                                    this.applyAction(action, triggerCommit);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    applyGrowth() {
        for (const entity of this.state.entities.values()) {
            if (entity.type !== "ASSET" && entity.type !== "LIABILITY")
                continue;
            let growthRate = entity.growthBaseValue;
            if (entity.refEnvVarId) {
                const envVarValue = this.state.envVars.get(entity.refEnvVarId);
                if (envVarValue !== undefined) {
                    growthRate = envVarValue;
                }
            }
            if (entity.growthMode === "RELATIVE") {
                entity.currentValue *= (1 + growthRate);
            }
            else {
                entity.currentValue += growthRate;
            }
        }
    }
    applyActions() {
        const key = `${this.state.date.getFullYear()}-${this.state.date.getMonth()}`;
        const monthCommits = this.commitGroups.get(key) || [];
        // Collect all triggerCommitIds to prevent applying them based on timestamp
        const triggerCommitIds = new Set();
        for (const goal of this.state.goals.values()) {
            if (goal.triggerCommitId) {
                triggerCommitIds.add(goal.triggerCommitId);
            }
        }
        for (const commit of monthCommits) {
            if (this.appliedCommitIds.has(commit.id))
                continue;
            // Do not apply goal triggers just because we reached their timestamp
            if (triggerCommitIds.has(commit.id))
                continue;
            this.appliedCommitIds.add(commit.id);
            const commitActions = this.allActions.filter(a => a.commitId === commit.id);
            for (const action of commitActions) {
                this.applyAction(action, commit);
                if (this.state.isFrozen)
                    return;
            }
        }
    }
    applyAction(action, commit) {
        if (action.targetType === "ENTITY") {
            let entity = this.state.entities.get(action.targetId);
            if (!entity) {
                if (action.actionType === "ADD") {
                    entity = {
                        id: action.targetId,
                        name: action.valueStr || "New Entity",
                        type: action.key || "ASSET",
                        growthBaseValue: 0,
                        growthMode: "ABSOLUTE",
                        currentValue: action.valueNum || 0,
                        refEnvVarId: action.refEnvVarId || undefined,
                    };
                    this.state.entities.set(action.targetId, entity);
                    return;
                }
                else {
                    this.state.isFrozen = true;
                    return;
                }
            }
            if (action.actionType === "ADD") {
                // Entity exists (likely pre-loaded from DB), so we just set its initial values
                entity.currentValue = action.valueNum || 0;
                if (action.valueStr)
                    entity.name = action.valueStr;
                if (action.key)
                    entity.type = action.key;
                if (action.refEnvVarId)
                    entity.refEnvVarId = action.refEnvVarId;
                return;
            }
            let value = action.valueNum || 0;
            if (action.refEnvVarId) {
                const envVarValue = this.state.envVars.get(action.refEnvVarId);
                if (envVarValue !== undefined) {
                    value = envVarValue;
                }
            }
            if (action.actionType === "UPDATE") {
                if (action.key === "value" || action.key === "currentValue") {
                    entity.currentValue += action.isRelative ? entity.currentValue * value : value;
                }
                else if (action.key === "growthBaseValue") {
                    entity.growthBaseValue += value;
                }
            }
            else if (action.actionType === "REPLACE") {
                if (action.key === "value" || action.key === "currentValue") {
                    entity.currentValue = action.isRelative ? entity.currentValue * value : value;
                }
                else if (action.key === "growthBaseValue") {
                    entity.growthBaseValue = value;
                }
                else if (action.key === "growthMode") {
                    entity.growthMode = action.valueStr;
                }
                else if (action.key === "name") {
                    entity.name = action.valueStr || entity.name;
                }
                else if (action.key === "refEnvVarId") {
                    entity.refEnvVarId = action.valueStr;
                }
            }
            else if (action.actionType === "DELETE") {
                this.state.entities.delete(action.targetId);
            }
        }
        else if (action.targetType === "ENV_VAR") {
            let current = this.state.envVars.get(action.targetId);
            if (current === undefined) {
                if (action.actionType === "ADD") {
                    this.state.envVars.set(action.targetId, action.valueNum || 0);
                    return;
                }
                else {
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
            }
            else if (action.actionType === "REPLACE") {
                this.state.envVars.set(action.targetId, value);
            }
            else if (action.actionType === "DELETE") {
                this.state.envVars.delete(action.targetId);
            }
        }
        else if (action.targetType === "GOAL") {
            let goal = this.state.goals.get(action.targetId);
            if (!goal) {
                if (action.actionType === "ADD") {
                    goal = {
                        id: action.targetId,
                        branchId: commit?.branchId || "",
                        type: action.key || "MEASUREMENT",
                        isMet: false,
                    };
                    this.state.goals.set(action.targetId, goal);
                    // Don't return
                }
                else {
                    this.state.isFrozen = true;
                    return;
                }
            }
            if (action.actionType === "UPDATE") {
                if (action.key === "targetValue" && action.valueNum !== undefined) {
                    goal.targetValue = (goal.targetValue || 0) + action.valueNum;
                }
            }
            else if (action.actionType === "REPLACE") {
                if (action.key === "targetValue" && action.valueNum !== undefined) {
                    goal.targetValue = action.valueNum;
                }
                else if (action.key === "targetDate" && action.valueStr) {
                    goal.targetDate = new Date(action.valueStr);
                }
                else if (action.key === "targetEntityId") {
                    goal.targetEntityId = action.valueStr;
                }
                else if (action.key === "dependencyGoalId") {
                    goal.dependencyGoalId = action.valueStr;
                }
                else if (action.key === "triggerCommitId") {
                    goal.triggerCommitId = action.valueStr;
                }
            }
            else if (action.actionType === "DELETE") {
                this.state.goals.delete(action.targetId);
            }
        }
    }
    createSnapshot() {
        let assets = 0;
        let liabilities = 0;
        const entitiesRecord = {};
        for (const entity of this.state.entities.values()) {
            entitiesRecord[entity.id] = entity.currentValue;
            if (entity.type === "ASSET")
                assets += entity.currentValue;
            if (entity.type === "LIABILITY")
                liabilities += entity.currentValue;
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
