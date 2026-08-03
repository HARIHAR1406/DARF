import { OptimizationResult } from './OptimizationResult';

export interface RebuildResult {
    prompt: string;
    context: string;
    instructions: string[];
    score: number;
    optimization: OptimizationResult;
}
