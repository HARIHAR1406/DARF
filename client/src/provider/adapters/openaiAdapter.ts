import OpenAI from 'openai';
import { ProviderRequest } from '../models/ProviderRequest';
import { ProviderResponse } from '../models/ProviderResponse';

export const executeOpenAI = async (request: ProviderRequest): Promise<ProviderResponse> => {
    const startTime = Date.now();
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    
    if (!apiKey) {
        throw new Error('OpenAI API Key is missing.');
    }

    const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });
    
    try {
        const completion = await openai.chat.completions.create({
            model: request.model || 'gpt-4o',
            messages: [
                { role: 'system', content: request.systemPrompt || 'You are a helpful assistant.' },
                { role: 'user', content: request.payload }
            ],
            // Stream support would require a streaming interface which we aren't standardizing here yet,
            // but we can prepare the infrastructure. For now we use standard blocking await.
        });

        const latencyMs = Date.now() - startTime;
        
        return {
            success: true,
            data: completion.choices[0]?.message?.content || '',
            providerName: 'openai',
            tokensUsed: completion.usage?.total_tokens || 0,
            latencyMs
        };
    } catch (error: unknown) {
        if (error instanceof OpenAI.APIError) {
            // Exception mapping
            throw new Error(`OpenAI Error [${error.status}]: ${error.message}`);
        }
        throw error;
    }
};
