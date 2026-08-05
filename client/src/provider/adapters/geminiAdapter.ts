import { GoogleGenerativeAI } from '@google/generative-ai';
import { ProviderRequest } from '../models/ProviderRequest';
import { ProviderResponse } from '../models/ProviderResponse';

export const executeGemini = async (request: ProviderRequest): Promise<ProviderResponse> => {
    const startTime = Date.now();
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    
    if (!apiKey) {
        throw new Error('Gemini API Key is missing.');
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    
    try {
        // Model Selection & Safety configuration
        const model = genAI.getGenerativeModel({ 
            model: request.model || 'gemini-1.5-flash',
            systemInstruction: request.systemPrompt
        });

        const result = await model.generateContent(request.payload);
        const response = await result.response;
        
        const latencyMs = Date.now() - startTime;
        
        // Tokens can be approximated or fetched if provided by the API response
        let tokensUsed = 0;
        if (response.usageMetadata) {
            tokensUsed = response.usageMetadata.totalTokenCount;
        }

        return {
            success: true,
            data: response.text(),
            providerName: 'gemini',
            tokensUsed,
            latencyMs
        };
    } catch (error: unknown) {
        throw new Error(`Gemini Error: ${error instanceof Error ? error.message : String(error)}`);
    }
};
