import { HTMLSanitizer } from './htmlSanitizer';
import { TRUST_POLICY } from '../policies/trustPolicy';

export class ResponseSanitizer {
    public static sanitize(response: string): string {
        if (!response) return response;

        // 1. Remove dangerous HTML tags and inline scripts
        let sanitized = HTMLSanitizer.sanitize(response);

        // 2. Validate markdown links to ensure they follow trust policies or use safe protocols
        sanitized = this.sanitizeMarkdownLinks(sanitized);
        
        // 3. Fallback: Escape raw `<` and `>` that aren't part of valid markdown or allowed HTML 
        // For simplicity and since we use markdown renders, we will leave valid HTML structure 
        // intact if it survived HTMLSanitizer, but we could enforce strict DOM escaping here if needed.
        
        return sanitized;
    }
    
    private static sanitizeMarkdownLinks(content: string): string {
        // Matches markdown links: [text](url)
        const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
        
        return content.replace(markdownLinkRegex, (match, text, url) => {
            const cleanUrl = url.trim();
            
            if (cleanUrl.toLowerCase().startsWith('javascript:')) {
                return `[${text}](#blocked)`;
            }
            
            // Allow relative links
            if (cleanUrl.startsWith('/') || cleanUrl.startsWith('#') || cleanUrl.startsWith('.')) {
                return match;
            }
            
            // If it's absolute, check trust policy
            if (TRUST_POLICY.isUrlTrusted(cleanUrl)) {
                return match;
            }
            
            // Allow standard http/https links even if not strictly trusted domains,
            // but ensure they are well-formed to prevent protocol attacks.
            if (cleanUrl.startsWith('http://') || cleanUrl.startsWith('https://')) {
                return match;
            }
            
            // Block data URIs or unknown protocols in links
            return `[${text}](#unsupported-protocol)`;
        });
    }
}
