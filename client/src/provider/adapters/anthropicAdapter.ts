import Anthropic from '@anthropic-ai/sdk';
import { ProviderRequest } from '../models/ProviderRequest';
import { ProviderResponse } from '../models/ProviderResponse';

export const executeAnthropic = async (request: ProviderRequest): Promise<ProviderResponse> => {
    const startTime = Date.now();
    const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
    
    if (!apiKey) {
        throw new Error('Anthropic API Key is missing.');
    }

    const anthropic = new Anthropic({ apiKey, dangerouslyAllowBrowser: true });
    
    try {
        const response = await anthropic.messages.create({
            model: request.model || 'claude-3-opus-20240229',
            max_tokens: 1024,
            system: request.systemPrompt || '',
            messages: [
                { role: 'user', content: request.payload }
            ]
        });

        const latencyMs = Date.now() - startTime;
        
        let textData = '';
        if (response.content.length > 0 && response.content[0].type === 'text') {
            textData = response.content[0].text;
        }

        return {
            success: true,
            data: textData,
            providerName: 'anthropic',
            tokensUsed: response.usage.input_tokens + response.usage.output_tokens,
            latencyMs
        };
    } catch (error: unknown) {
        if (error instanceof Anthropic.APIError) {
            throw new Error(`Anthropic Error [${error.status}]: ${error.message}`);
        }
        throw new Error(`Anthropic Error: ${error instanceof Error ? error.message : String(error)}`);
    }
};
