import { optimizationManager } from '../managers/optimizationManager';
import { profilingManager } from '../managers/profilingManager';
import { ProviderRequest } from '../../provider/models/ProviderRequest';
import { ProviderResponse } from '../../provider/models/ProviderResponse';
import { latencyAnalyzer } from '../analyzers/latencyAnalyzer';
import { routingPredictor } from '../predictors/routingPredictor';

export class OptimizationEngine {
    public optimizePreExecution(request: ProviderRequest): ProviderRequest {
        // 1. Optimize Prompt
        const optimizedPayload = optimizationManager.prompt.optimizePrompt(request.payload);
        
        // Return an optimized request
        return {
            ...request,
            payload: optimizedPayload
        };
    }

    public checkCache(request: ProviderRequest): ProviderResponse | null {
        // Form a cache key out of the payload and system prompt
        const key = `${request.providerName}-${request.systemPrompt}-${request.payload}`;
        return optimizationManager.response.getCachedResponse(key);
    }

    public recordExecutionMetrics(provider: string, latencyMs: number, success: boolean): void {
        latencyAnalyzer.recordLatency(latencyMs);
        routingPredictor.updateHeuristic(provider, latencyMs, success);
    }

    public optimizePostExecution(request: ProviderRequest, response: ProviderResponse): ProviderResponse {
        const key = `${request.providerName}-${request.systemPrompt}-${request.payload}`;
        
        // Cache the successful response
        if (response.success) {
            optimizationManager.response.cacheResponse(key, response);
        }

        return response;
    }

    public getSystemProfile() {
        return profilingManager.getGlobalProfile();
    }
}
