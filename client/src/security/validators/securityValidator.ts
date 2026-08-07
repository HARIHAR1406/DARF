import { ValidationState } from '../models/ValidationState';

export class SecurityValidator {
    public static validateWorkerMessage(messageType: string, payload: unknown): ValidationState {
        const errors: string[] = [];
        
        // Enforce strict worker message boundary typing
        if (!messageType || typeof messageType !== 'string') {
            errors.push('Invalid worker message type');
        }
        
        // Simple serialization check to ensure payload can cross worker boundary safely
        if (payload !== undefined) {
            try {
                // If it can't be structured-cloned/stringified, it's unsafe for worker transport
                JSON.stringify(payload);
            } catch {
                errors.push('Worker payload contains non-serializable data (possible function or cyclic ref)');
            }
        }
        
        return {
            isValid: errors.length === 0,
            errors,
            warnings: [],
            timestamp: Date.now()
        };
    }
    
    public static validateStorageKey(key: string): ValidationState {
        const errors: string[] = [];
        
        if (typeof key !== 'string' || key.trim() === '') {
            errors.push('Storage key must be a non-empty string');
        } else if (/[^a-zA-Z0-9_\-.]/.test(key)) {
            // Protect against path traversal or injection via weird keys
            errors.push('Storage key contains invalid characters');
        }
        
        return {
            isValid: errors.length === 0,
            errors,
            warnings: [],
            timestamp: Date.now()
        };
    }
}
