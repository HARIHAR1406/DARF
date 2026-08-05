import { ProviderRequest } from '../models/ProviderRequest';
import { ProviderResponse } from '../models/ProviderResponse';
import { routeProvider } from './routingStrategy';
import { executeWithRetry } from './retryStrategy';
import { executeWithFallback } from './fallbackStrategy';
import { executeLocal } from '../adapters/localAdapter';

export const executeBalanced = async (request: ProviderRequest): Promise<ProviderResponse> => {
    // Balancer selects the route, wraps it in a retry, and attaches a fallback to local
    
    // Create the primary execution function with retry logic
    const primaryExecution = (req: ProviderRequest) => executeWithRetry(req, routeProvider, 3);
    
    // The fallback is Local model running locally, wrapped in its own retry
    const localFallback = (req: ProviderRequest) => executeWithRetry({ ...req, providerName: 'local' }, executeLocal, 1);
    
    // Execute primary with fallback protection
    return await executeWithFallback(request, primaryExecution, localFallback);
};
