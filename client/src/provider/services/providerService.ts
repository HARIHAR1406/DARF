import { ProviderEngine } from '../engine/providerEngine';
import { ProviderRequest } from '../models/ProviderRequest';
import { ProviderResponse } from '../models/ProviderResponse';

class ProviderService {
    private engine = new ProviderEngine();

    public execute(request: ProviderRequest): ProviderResponse {
        return this.engine.process(request);
    }
}

export const providerService = new ProviderService();
