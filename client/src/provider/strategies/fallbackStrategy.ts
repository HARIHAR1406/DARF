import { ProviderRequest } from '../models/ProviderRequest';
import { ProviderResponse } from '../models/ProviderResponse';

type ProviderAdapter = (req: ProviderRequest) => Promise<ProviderResponse>;

export const executeWithFallback = async (
    request: ProviderRequest,
    primaryAdapter: ProviderAdapter,
    fallbackAdapter: ProviderAdapter
): Promise<ProviderResponse> => {
    try {
        return await primaryAdapter(request);
    } catch (error: unknown) {
        console.warn(`[FallbackStrategy] Primary adapter failed. Falling back to backup adapter. Error: ${error instanceof Error ? error.message : String(error)}`);
        return await fallbackAdapter(request);
    }
};
