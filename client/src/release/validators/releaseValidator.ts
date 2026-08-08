import { ReleaseManifest } from '../models/ReleaseManifest';
import { environmentConfig } from '../../config/environment';

export class ReleaseError extends Error {
    constructor(message: string) {
        super(`[ReleaseError] ${message}`);
        this.name = 'ReleaseError';
    }
}

export class ReleaseValidator {
    public static validateManifest(manifest: ReleaseManifest): void {
        const errors: string[] = [];

        if (!manifest.version || manifest.version !== environmentConfig.version) {
            errors.push(`Version mismatch: expected ${environmentConfig.version}, got ${manifest.version}`);
        }
        
        if (!manifest.releaseId) {
            errors.push('Missing releaseId');
        }

        if (manifest.environment !== environmentConfig.env) {
            errors.push(`Environment mismatch: manifest expects ${manifest.environment}, but runtime is ${environmentConfig.env}`);
        }

        if (!manifest.requiredRuntimeVersion || !manifest.requiredRuntimeVersion.startsWith(environmentConfig.version.split('.')[0])) {
            errors.push(`Incompatible runtime version: requires ${manifest.requiredRuntimeVersion}`);
        }

        if (errors.length > 0) {
            throw new ReleaseError(errors.join('; '));
        }
    }
}
