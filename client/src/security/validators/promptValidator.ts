import { ValidationState } from '../models/ValidationState';
import { ContentValidator } from './contentValidator';

export class PromptValidator {
    // 50,000 characters is a reasonable limit for complex prompt contexts while avoiding DoS
    private static readonly MAX_PROMPT_LENGTH = 50000;
    
    public static validate(prompt: string): ValidationState {
        // 1. Check structural constraints
        const contentValidation = ContentValidator.validateString(prompt, this.MAX_PROMPT_LENGTH);
        if (!contentValidation.isValid) {
            return contentValidation;
        }

        const errors: string[] = [];
        const warnings: string[] = [];

        // 2. Check for recursive execution markers (infinite loop prevention)
        if (prompt.includes('__DARF_INTERNAL_EXEC__')) {
            errors.push('Prompt contains reserved internal execution tokens');
        }

        // 3. Structural checks
        if (prompt.trim().length === 0) {
            errors.push('Prompt cannot be empty');
        }
        
        // 4. Warning for extremely large prompts (heuristics)
        if (prompt.length > 20000) {
            warnings.push('Prompt is very large and may consume significant resources');
        }

        return {
            isValid: errors.length === 0,
            errors,
            warnings,
            timestamp: Date.now()
        };
    }
}
