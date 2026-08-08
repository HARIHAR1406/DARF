import { securityManager } from '../managers/securityManager';
import { telemetryService } from '../../telemetry/services/telemetryService';
import { PromptValidator } from '../validators/promptValidator';
import { ResponseSanitizer } from '../sanitizers/responseSanitizer';
import { InjectionAnalyzer } from '../analyzers/injectionAnalyzer';
import { VulnerabilityAnalyzer } from '../analyzers/vulnerabilityAnalyzer';

export class SecurityService {
    public initialize(): void {
        securityManager.initialize();
    }
    
    /**
     * Validates and analyzes an incoming request.
     * Throws an error if the request is deemed malicious or invalid.
     */
    public validateRequest(request: string): void {
        if (securityManager.isSystemCompromised()) {
            throw new Error('SECURITY LOCKDOWN: System is currently compromised or under attack.');
        }

        // 1. Structural Validation
        const validation = PromptValidator.validate(request);
        if (!validation.isValid) {
            securityManager.incrementBlockedRequests();
            telemetryService.trackEvent('SECURITY', 'SecurityService', 'validateRequest', 'FAILURE', 'WARNING');
            throw new Error(`SECURITY ALERT: Invalid request payload. ${validation.errors.join(', ')}`);
        }
        
        // 2. Injection Analysis
        const injection = InjectionAnalyzer.analyze(request);
        if (injection.isInjected) {
            securityManager.incrementBlockedRequests();
            telemetryService.trackEvent('SECURITY', 'SecurityService', 'validateRequest', 'FAILURE', 'CRITICAL');
            throw new Error(`SECURITY ALERT: Prompt injection detected with confidence ${injection.confidence}`);
        }
        
        telemetryService.trackEvent('SECURITY', 'SecurityService', 'validateRequest', 'SUCCESS', 'INFO');
    }
    
    /**
     * Sanitizes and analyzes an outgoing response.
     * Throws an error if the response contains severe vulnerabilities that can't be sanitized.
     * Otherwise returns the sanitized safe string.
     */
    public sanitizeResponse(response: string): string {
        if (securityManager.isSystemCompromised()) {
            throw new Error('SECURITY LOCKDOWN: System is currently compromised.');
        }

        // 1. Check for DoS structural payloads
        if (VulnerabilityAnalyzer.hasKnownVulnerabilities(response)) {
            securityManager.incrementBlockedRequests();
            throw new Error('SECURITY ALERT: Response contains a known vulnerable structure (e.g., deep nesting). Blocked.');
        }

        // 2. Deep sanitize
        const sanitized = ResponseSanitizer.sanitize(response);
        return sanitized;
    }
}

export const securityService = new SecurityService();
