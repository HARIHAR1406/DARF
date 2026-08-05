export const validateEntity = (entity: string): boolean => {
    if (!entity || typeof entity !== 'string') return false;
    
    // Basic sanitization check
    const sanitized = entity.trim();
    if (sanitized.length === 0 || sanitized.length > 255) return false;
    
    // Disallow pure symbols
    if (/^[^a-zA-Z0-9]+$/.test(sanitized)) return false;
    
    return true;
};
