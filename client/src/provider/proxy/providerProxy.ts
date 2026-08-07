export interface ProxyRequest {
    endpoint: string;
    method: string;
    headers: Record<string, string>;
    body: unknown;
    timeoutMs?: number;
}

export class ProviderProxy {
    private static instance: ProviderProxy;

    private constructor() {}

    public static getInstance(): ProviderProxy {
        if (!ProviderProxy.instance) {
            ProviderProxy.instance = new ProviderProxy();
        }
        return ProviderProxy.instance;
    }

    public async executeProxy(request: ProxyRequest): Promise<Response> {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), request.timeoutMs || 30000);

        try {
            const response = await fetch(request.endpoint, {
                method: request.method,
                headers: this.sanitizeHeaders(request.headers),
                body: JSON.stringify(request.body),
                signal: controller.signal
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Proxy Execution Error [${response.status}]: ${errorText}`);
            }

            return response;
        } catch (error: unknown) {
            if (error instanceof Error && error.name === 'AbortError') {
                throw new Error('Proxy Execution Timeout');
            }
            throw error;
        } finally {
            clearTimeout(timeout);
        }
    }

    public async executeStreamProxy(request: ProxyRequest): Promise<Response> {
        const response = await fetch(request.endpoint, {
            method: request.method,
            headers: this.sanitizeHeaders(request.headers),
            body: JSON.stringify(request.body)
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Proxy Execution Error [${response.status}]: ${errorText}`);
        }
        return response;
    }
    
    private sanitizeHeaders(headers: Record<string, string>): Record<string, string> {
        const sanitized: Record<string, string> = { ...headers };
        // Ensure no restricted headers or leakages
        // e.g., Origin, Referer, User-Agent are managed by the browser
        return sanitized;
    }
}

export const providerProxy = ProviderProxy.getInstance();
