import { ValidationState } from '../models/ValidationState';

export class ContentValidator {
    public static validateString(input: unknown, maxLength = 10000): ValidationState {
        const errors: string[] = [];
        
        if (typeof input !== 'string') {
            errors.push('Content must be a string');
            return this.createState(errors);
        }
        
        if (input.length > maxLength) {
            errors.push(`Content exceeds maximum length of ${maxLength}`);
        }
        
        // Check for null bytes which shouldn't be in text payloads
        if (/\0/.test(input)) {
            errors.push('Content contains null bytes');
        }

        return this.createState(errors);
    }
    
    public static validateObjectStructure(input: unknown, requiredKeys: string[]): ValidationState {
        const errors: string[] = [];
        
        if (!input || typeof input !== 'object' || Array.isArray(input)) {
            errors.push('Input must be a JSON object');
            return this.createState(errors);
        }
        
        const obj = input as Record<string, unknown>;
        
        for (const key of requiredKeys) {
            if (!(key in obj)) {
                errors.push(`Missing required key: ${key}`);
            }
        }
        
        return this.createState(errors);
    }

    private static createState(errors: string[]): ValidationState {
        return {
            isValid: errors.length === 0,
            errors,
            warnings: [],
            timestamp: Date.now()
        };
    }
}
