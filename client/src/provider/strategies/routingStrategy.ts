import { ProviderRequest } from '../models/ProviderRequest';
import { ProviderResponse } from '../models/ProviderResponse';
import { executeGemini } from '../adapters/geminiAdapter';
import { executeOpenAI } from '../adapters/openaiAdapter';
import { executeAnthropic } from '../adapters/anthropicAdapter';
import { executeLocal } from '../adapters/localAdapter';

export const routeProvider = async (request: ProviderRequest): Promise<ProviderResponse> => {
    const provider = request.providerName?.toLowerCase() || 'gemini';
    
    switch (provider) {
        case 'openai':
            return await executeOpenAI(request);
        case 'anthropic':
            return await executeAnthropic(request);
        case 'local':
            return await executeLocal(request);
        case 'gemini':
        default:
            return await executeGemini(request);
    }
};
