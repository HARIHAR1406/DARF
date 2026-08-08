import { RuntimeConfig } from './environment';
import { telemetryService } from '../telemetry/services/telemetryService';

export class ConfigurationError extends Error {
    constructor(message: string) {
        super(`[ConfigurationError] ${message}`);
        this.name = 'ConfigurationError';
    }
}

export class EnvironmentValidator {
    public static validate(config: RuntimeConfig): void {
        const errors: string[] = [];

        // Validate Environment
        if (!['DEV', 'TEST', 'STAGING', 'PROD'].includes(config.env)) {
            errors.push(`Invalid environment type: ${config.env}`);
        }

        // Validate Version
        if (!config.version || typeof config.version !== 'string') {
            errors.push('Version string must be defined');
        }

        // Environment-specific constraints
        if (config.env === 'PROD') {
            if (!config.requireSecuritySanitization) {
                errors.push('Security sanitization MUST be enabled in PROD');
            }
            if (!config.enableTelemetry) {
                // Not strictly an error but warn
                telemetryService.trackEvent('RUNTIME', 'EnvironmentValidator', 'validate', 'FAILURE', 'WARNING', undefined, { note: 'Telemetry disabled in PROD' });
            }
        }

        if (errors.length > 0) {
            telemetryService.trackEvent('RUNTIME', 'EnvironmentValidator', 'validate', 'FAILURE', 'CRITICAL', undefined, { errors: errors.join(', ') });
            throw new ConfigurationError(errors.join(', '));
        }

        telemetryService.trackEvent('RUNTIME', 'EnvironmentValidator', 'validate', 'SUCCESS', 'INFO');
    }
}
