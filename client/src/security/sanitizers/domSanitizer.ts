export class DOMSanitizer {
    public static escapeHTML(input: string): string {
        const entityMap: Record<string, string> = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;',
            '/': '&#x2F;',
            '`': '&#x60;',
            '=': '&#x3D;'
        };

        return String(input).replace(/[&<>"'`=/]/g, s => entityMap[s]);
    }

    public static unescapeHTML(input: string): string {
        const reverseEntityMap: Record<string, string> = {
            '&amp;': '&',
            '&lt;': '<',
            '&gt;': '>',
            '&quot;': '"',
            '&#39;': "'",
            '&#x2F;': '/',
            '&#x60;': '`',
            '&#x3D;': '='
        };
        
        return String(input).replace(/&(amp|lt|gt|quot|#39|#x2F|#x60|#x3D);/g, s => reverseEntityMap[s]);
    }
}
