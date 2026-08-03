import { ContextEngine } from '../engine/contextEngine';
import { ContextEntry } from '../models/ContextEntry';
import { RetrievalResult } from '../models/RetrievalResult';

class ContextService {
    private engine = new ContextEngine();

    public initialize(): void {
        // Initialization logic
    }

    public processContext(entry: ContextEntry): RetrievalResult {
        return this.engine.process(entry);
    }
}

export const contextService = new ContextService();
