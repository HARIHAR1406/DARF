import { Intent, RiskLevel } from '../../destructor';

export interface RebuildContext {
    originalPrompt: string;
    sanitizedPrompt: string;
    intent: Intent;
    riskLevel: RiskLevel;
}
