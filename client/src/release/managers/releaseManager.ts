import { ReleaseManifest } from '../models/ReleaseManifest';
import { ReleaseState } from '../models/ReleaseState';
import { environmentConfig } from '../../config/environment';
import { databaseManager } from '../../storage/database/databaseManager';
import { telemetryService } from '../../telemetry/services/telemetryService';
import { ReleaseValidator } from '../validators/releaseValidator';

export class ReleaseManager {
    private currentManifest: ReleaseManifest;

    constructor() {
        // Hardcoded manifest for the client-side build (typically injected during CI/CD)
        this.currentManifest = {
            version: environmentConfig.version,
            releaseId: `rel-${environmentConfig.version}-${environmentConfig.env}`,
            buildId: `build-${Date.now()}`,
            environment: environmentConfig.env,
            generatedAt: Date.now(),
            enabledCapabilities: ['telemetry', 'workers', 'indexeddb'],
            requiredRuntimeVersion: environmentConfig.version
        };
    }

    public getManifest(): ReleaseManifest {
        return this.currentManifest;
    }

    public async initializeAndValidate(): Promise<ReleaseState> {
        // 1. Validate the current manifest
        ReleaseValidator.validateManifest(this.currentManifest);
        
        // 2. Determine rollback eligibility
        let previousVersion: string | null = null;
        let rollbackReason: string | undefined = undefined;
        let isRollbackEligible = false;

        try {
            // Check metadata store for previous version
            const storedMeta = await databaseManager.get<{version: string}>('metadata', 'app_version');
            if (storedMeta && storedMeta.version && storedMeta.version !== this.currentManifest.version) {
                previousVersion = storedMeta.version;
                // If it's a minor/patch downgrade or upgrade, we might be eligible to rollback
                isRollbackEligible = true;
            }

            // Save new version
            await databaseManager.put('metadata', 'app_version', { version: this.currentManifest.version });
        } catch (e) {
            telemetryService.trackError('RUNTIME', 'ReleaseManager', 'fetchPreviousVersion', e);
            rollbackReason = 'Storage unavailable to verify previous version';
        }

        return {
            currentVersion: this.currentManifest.version,
            previousKnownVersion: previousVersion,
            isRollbackEligible,
            rollbackReason
        };
    }
}

export const releaseManager = new ReleaseManager();
