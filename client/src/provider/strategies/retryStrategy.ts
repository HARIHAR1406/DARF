import { ProviderRequest } from '../models/ProviderRequest';
import { ProviderResponse } from '../models/ProviderResponse';

type ProviderAdapter = (req: ProviderRequest) => Promise<ProviderResponse>;

export const executeWithRetry = async (
    request: ProviderRequest,
    adapter: ProviderAdapter,
    maxRetries: number = 3
): Promise<ProviderResponse> => {
    let attempt = 0;
    
    while (attempt < maxRetries) {
        try {
            return await adapter(request);
        } catch (error: unknown) {
            attempt++;
            
            // Log warning internally
            console.warn(`[RetryStrategy] Adapter failed on attempt ${attempt}. Error: ${error instanceof Error ? error.message : String(error)}`);
            
            if (attempt >= maxRetries) {
                throw new Error(`Execution failed after ${maxRetries} attempts: ${error instanceof Error ? error.message : String(error)}`);
            }
            
            // Exponential backoff
            const delayMs = Math.pow(2, attempt) * 1000;
            await new Promise(resolve => setTimeout(resolve, delayMs));
        }
    }
    
    throw new Error('Retry strategy failed unexpectedly.');
};
