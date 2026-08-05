import { ProviderRequest } from '../models/ProviderRequest';
import { ProviderResponse } from '../models/ProviderResponse';

export const executeLocal = async (request: ProviderRequest): Promise<ProviderResponse> => {
    const startTime = Date.now();
    const endpoint = import.meta.env.VITE_LOCAL_MODEL_ENDPOINT || 'http://localhost:11434/api/generate'; // Defaulting to Ollama format
    
    try {
        // Health check logic (Optional, usually we just try the request and catch connection refused)
        // Payload generation
        const payload = {
            model: request.model || 'llama3',
            prompt: (request.systemPrompt ? request.systemPrompt + '\n' : '') + request.payload,
            stream: false
        };

        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`Local Provider Error: HTTP ${response.status}`);
        }

        const json = await response.json();
        const latencyMs = Date.now() - startTime;

        // Response parsing (Ollama format by default)
        const data = json.response || json.text || json.content || '';
        const tokensUsed = json.prompt_eval_count ? json.prompt_eval_count + (json.eval_count || 0) : 0;

        return {
            success: true,
            data,
            providerName: 'local',
            tokensUsed,
            latencyMs
        };
    } catch (error: unknown) {
        throw new Error(`Local Model Error: ${error instanceof Error ? error.message : String(error)}`);
    }
};
