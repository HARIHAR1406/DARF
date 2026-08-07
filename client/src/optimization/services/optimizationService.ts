import { OptimizationEngine } from '../engine/optimizationEngine';
import { ProviderRequest } from '../../provider/models/ProviderRequest';
import { ProviderResponse } from '../../provider/models/ProviderResponse';

class OptimizationService {
    private engine = new OptimizationEngine();

    public optimizePreExecution(request: ProviderRequest): ProviderRequest {
        return this.engine.optimizePreExecution(request);
    }

    public checkCache(request: ProviderRequest): ProviderResponse | null {
        return this.engine.checkCache(request);
    }

    public optimizePostExecution(request: ProviderRequest, response: ProviderResponse): ProviderResponse {
        this.engine.recordExecutionMetrics(response.providerName || 'unknown', response.latencyMs || 0, response.success);
        return this.engine.optimizePostExecution(request, response);
    }

    public getProfile() {
        return this.engine.getSystemProfile();
    }
}

export const optimizationService = new OptimizationService();
