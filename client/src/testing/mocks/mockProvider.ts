import { ProviderRequest } from '../../provider/models/ProviderRequest';
import { ProviderResponse } from '../../provider/models/ProviderResponse';

export class MockProvider {
    public static async execute(request: ProviderRequest): Promise<ProviderResponse> {
        // Simulate network latency (50-100ms)
        const delay = Math.random() * 50 + 50;
        await new Promise(resolve => setTimeout(resolve, delay));
        
        // Mock simple responses for testing logic
        const responseData = 'Mocked response';
        if (request.payload.includes('error')) {
            return {
                data: '',
                success: false,
                latencyMs: delay,
                tokensUsed: 0
            };
        }
        
        return {
            data: responseData,
            success: true,
            latencyMs: delay,
            tokensUsed: 42
        };
    }
}
