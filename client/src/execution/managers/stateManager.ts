import { ExecutionState } from '../models/ExecutionState';

class StateManager {
    private states: Map<string, ExecutionState> = new Map();

    public createState(id: string): ExecutionState {
        const state: ExecutionState = {
            id,
            isActive: true,
            status: 'initialized'
        };
        this.states.set(id, state);
        return state;
    }

    public updateState(id: string, status: string): void {
        const state = this.states.get(id);
        if (state) {
            state.status = status;
        }
    }

    public getState(id: string): ExecutionState | undefined {
        return this.states.get(id);
    }
}

export const stateManager = new StateManager();
