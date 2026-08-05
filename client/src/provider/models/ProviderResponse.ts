export interface ProviderResponse {
    success: boolean;
    data: string;
    providerName?: string;
    tokensUsed?: number;
    latencyMs?: number;
}
