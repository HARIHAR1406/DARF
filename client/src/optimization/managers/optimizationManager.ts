import { promptOptimizer } from '../optimizers/promptOptimizer';
import { responseOptimizer } from '../optimizers/responseOptimizer';
import { contextOptimizer } from '../optimizers/contextOptimizer';
import { executionOptimizer } from '../optimizers/executionOptimizer';
import { OptimizationState } from '../models/OptimizationState';
import { cacheAnalyzer } from '../analyzers/cacheAnalyzer';

export class OptimizationManager {
    public get prompt() { return promptOptimizer; }
    public get response() { return responseOptimizer; }
    public get context() { return contextOptimizer; }
    public get execution() { return executionOptimizer; }

    public getOptimizationState(targetModule: string): OptimizationState {
        return {
            id: `opt-${targetModule}-${Date.now()}`,
            targetModule,
            cacheHitRatio: cacheAnalyzer.getHitRatio(),
            latencyReduction: 0.2, // estimated 20%
            contextCompressionRatio: 0.3, // estimated 30%
            lastOptimizedAt: Date.now(),
            status: 'active',
            metrics: {}
        };
    }
}

export const optimizationManager = new OptimizationManager();
