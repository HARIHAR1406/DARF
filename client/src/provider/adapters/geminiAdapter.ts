import { ProviderRequest } from '../models/ProviderRequest';
import { ProviderResponse } from '../models/ProviderResponse';
import { providerProxy } from '../proxy/providerProxy';

export const executeGemini = async (request: ProviderRequest): Promise<ProviderResponse> => {
    const startTime = Date.now();
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    
    if (!apiKey) {
        throw new Error('Gemini API Key is missing.');
    }

    try {
        const model = request.model || 'gemini-1.5-flash';
        const payload: Record<string, unknown> = {
            contents: [
                {
                    role: 'user',
                    parts: [{ text: request.payload }]
                }
            ]
        };

        if (request.systemPrompt) {
            payload.systemInstruction = {
                parts: [{ text: request.systemPrompt }]
            };
        }

        const response = await providerProxy.executeProxy({
            endpoint: `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: payload,
            timeoutMs: 30000
        });

        const result = await response.json();
        const latencyMs = Date.now() - startTime;
        
        if (result.error) {
            throw new Error(`Gemini API Error: ${result.error.message || JSON.stringify(result.error)}`);
        }

        let textData = '';
        if (result.candidates && result.candidates.length > 0) {
            const candidate = result.candidates[0];
            if (candidate.content && candidate.content.parts && candidate.content.parts.length > 0) {
                textData = candidate.content.parts[0].text || '';
            }
        }

        let tokensUsed = 0;
        if (result.usageMetadata) {
            tokensUsed = result.usageMetadata.totalTokenCount || 0;
        }

        return {
            success: true,
            data: textData,
            providerName: 'gemini',
            tokensUsed,
            latencyMs
        };
    } catch (error: unknown) {
        throw new Error(`Gemini Error: ${error instanceof Error ? error.message : String(error)}`);
    }
};
