import { ProviderRequest } from '../models/ProviderRequest';
import { ProviderResponse } from '../models/ProviderResponse';
import { providerProxy } from '../proxy/providerProxy';

export const executeAnthropic = async (request: ProviderRequest): Promise<ProviderResponse> => {
    const startTime = Date.now();
    const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
    
    if (!apiKey) {
        throw new Error('Anthropic API Key is missing.');
    }

    try {
        const payload = {
            model: request.model || 'claude-3-opus-20240229',
            max_tokens: 1024,
            system: request.systemPrompt || '',
            messages: [
                { role: 'user', content: request.payload }
            ]
        };

        const response = await providerProxy.executeProxy({
            endpoint: 'https://api.anthropic.com/v1/messages',
            method: 'POST',
            headers: {
                'x-api-key': apiKey,
                'anthropic-version': '2023-06-01',
                'anthropic-dangerously-allow-browser': 'true', // Needed by Anthropic for direct browser calls
                'content-type': 'application/json'
            },
            body: payload,
            timeoutMs: 30000
        });

        const result = await response.json();
        const latencyMs = Date.now() - startTime;
        
        let textData = '';
        if (result.content && result.content.length > 0 && result.content[0].type === 'text') {
            textData = result.content[0].text;
        } else if (result.error) {
            throw new Error(`Anthropic API Error: ${result.error.message || JSON.stringify(result.error)}`);
        }

        return {
            success: true,
            data: textData,
            providerName: 'anthropic',
            tokensUsed: (result.usage?.input_tokens || 0) + (result.usage?.output_tokens || 0),
            latencyMs
        };
    } catch (error: unknown) {
        throw new Error(`Anthropic Error: ${error instanceof Error ? error.message : String(error)}`);
    }
};
