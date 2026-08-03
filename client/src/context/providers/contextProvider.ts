import { ContextEntry } from '../models/ContextEntry';

export class ContextProvider {
    private state: ContextEntry[] = [];

    public provideContext(): ContextEntry[] {
        return this.state;
    }

    public updateState(entry: ContextEntry): void {
        this.state.push(entry);
    }
}
