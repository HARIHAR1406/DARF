export interface ValidationState {
    isValid: boolean;
    errors: string[];
    warnings: string[];
    sanitizedContent?: string;
    timestamp: number;
}
