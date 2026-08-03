import { Intent } from './Intent';
import { RiskLevel } from './RiskLevel';

export interface PromptAnalysis {
  id: string;
  timestamp: number;
  prompt: string;
  tokens: string[];
  intent: Intent;
  category: string;
  complexity: number;
  confidence: number;
  riskLevel: RiskLevel;
  metadata: Record<string, unknown>;
}
