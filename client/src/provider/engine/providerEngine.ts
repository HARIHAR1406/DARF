import { ProviderRequest } from '../models/ProviderRequest';
import { ProviderResponse } from '../models/ProviderResponse';
import { executeBalanced } from '../strategies/balancingStrategy';
import { validateRequest } from '../validators/requestValidator';

export class ProviderEngine {
    public async process(request: ProviderRequest): Promise<ProviderResponse> {
        if (!validateRequest(request)) {
            throw new Error('Invalid request');
        }
        
        return await executeBalanced(request);
    }
}
