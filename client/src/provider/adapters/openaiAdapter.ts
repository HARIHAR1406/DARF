import { ProviderRequest } from '../models/ProviderRequest';
import { ProviderResponse } from '../models/ProviderResponse';
import { providerProxy } from '../proxy/providerProxy';

export const executeOpenAI = async (request: ProviderRequest): Promise<ProviderResponse> => {
    const startTime = Date.now();
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    
    if (!apiKey) {
        throw new Error('OpenAI API Key is missing.');
    }

    try {
        const payload = {
            model: request.model || 'gpt-4o',
            messages: [
                { role: 'system', content: request.systemPrompt || 'You are a helpful assistant.' },
                { role: 'user', content: request.payload }
            ]
        };

        const response = await providerProxy.executeProxy({
            endpoint: 'https://api.openai.com/v1/chat/completions',
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: payload,
            timeoutMs: 30000
        });

        const result = await response.json();
        const latencyMs = Date.now() - startTime;
        
        if (result.error) {
            throw new Error(`OpenAI API Error: ${result.error.message || JSON.stringify(result.error)}`);
        }

        return {
            success: true,
            data: result.choices?.[0]?.message?.content || '',
            providerName: 'openai',
            tokensUsed: result.usage?.total_tokens || 0,
            latencyMs
        };
    } catch (error: unknown) {
        throw new Error(`OpenAI Error: ${error instanceof Error ? error.message : String(error)}`);
    }
};
