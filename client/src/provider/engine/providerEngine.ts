import { ProviderRequest } from '../models/ProviderRequest';
import { ProviderResponse } from '../models/ProviderResponse';
import { executeOpenAI } from '../adapters/openaiAdapter';
import { executeFallback } from '../strategies/fallbackStrategy';
import { validateRequest } from '../validators/requestValidator';

export class ProviderEngine {
    public process(request: ProviderRequest): ProviderResponse {
        /* operationalized */
        if (!validateRequest(request)) {
            throw new Error('Invalid request');
        }
        
        executeOpenAI();
        executeFallback();
        
        return {
            success: true,
            data: 'Provider response data'
        };
    }
}
