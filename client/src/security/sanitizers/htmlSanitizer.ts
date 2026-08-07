export class HTMLSanitizer {
    private static readonly scriptRegex = /<script\b[^>]*>[\s\S]*?<\/script>/gi;
    private static readonly eventHandlerRegex = /\son[a-z]+\s*=\s*(['"])[^'"]*\1/gi;
    private static readonly javascriptProtocolRegex = /href\s*=\s*(['"])javascript:[^'"]*\1/gi;
    private static readonly iframeRegex = /<iframe\b[^>]*>[\s\S]*?<\/iframe>/gi;
    private static readonly objectRegex = /<object\b[^>]*>[\s\S]*?<\/object>/gi;
    private static readonly embedRegex = /<embed\b[^>]*>[\s\S]*?<\/embed>/gi;

    public static sanitize(html: string): string {
        if (!html) return html;

        let sanitized = html;
        
        // Remove dangerous tags completely
        sanitized = sanitized.replace(this.scriptRegex, '');
        sanitized = sanitized.replace(this.iframeRegex, '');
        sanitized = sanitized.replace(this.objectRegex, '');
        sanitized = sanitized.replace(this.embedRegex, '');

        // Remove inline event handlers (e.g., onclick="...")
        sanitized = sanitized.replace(this.eventHandlerRegex, '');

        // Remove javascript: URIs
        sanitized = sanitized.replace(this.javascriptProtocolRegex, 'href="#"');

        return sanitized;
    }
}
