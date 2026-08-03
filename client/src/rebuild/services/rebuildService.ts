import { RebuildEngine } from '../engine/rebuildEngine';
import { RebuildContext } from '../models/RebuildContext';
import { RebuildResult } from '../models/RebuildResult';

class RebuildService {
    private engine = new RebuildEngine();

    public rebuild(context: RebuildContext): RebuildResult {
        return this.engine.process(context);
    }
}

export const rebuildService = new RebuildService();
