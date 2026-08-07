export const TRUST_POLICY = {
    allowedDomains: [
        'localhost',
        '127.0.0.1',
        'api.anthropic.com',
        'generativelanguage.googleapis.com'
    ],
    
    trustedProtocols: ['http:', 'https:', 'wss:'],

    isUrlTrusted(url: string): boolean {
        try {
            const parsedUrl = new URL(url);
            
            if (!this.trustedProtocols.includes(parsedUrl.protocol)) {
                return false;
            }

            return this.allowedDomains.some(domain => 
                parsedUrl.hostname === domain || parsedUrl.hostname.endsWith(`.${domain}`)
            );
        } catch {
            // Invalid URLs are inherently untrusted
            return false;
        }
    }
};
