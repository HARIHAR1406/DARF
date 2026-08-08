import { releaseManager } from '../managers/releaseManager';
import { EnvironmentValidator, ConfigurationError } from '../../config/environmentValidator';
import { environmentConfig } from '../../config/environment';
import { telemetryService } from '../../telemetry/services/telemetryService';
import { healthAggregator } from '../../telemetry/aggregators/healthAggregator';
import { DeploymentState } from '../models/DeploymentState';
import { ReleaseState } from '../models/ReleaseState';
import { ReleaseError } from '../validators/releaseValidator';

export class ReleaseService {
    private currentState: DeploymentState = 'BOOTING';
    private releaseState: ReleaseState | null = null;

    public async bootstrap(): Promise<void> {
        telemetryService.trackEvent('RUNTIME', 'ReleaseService', 'application_boot_started', 'SUCCESS', 'INFO');
        this.currentState = 'VALIDATING';

        try {
            // 1. Validate environment
            EnvironmentValidator.validate(environmentConfig);
            
            // 2. Validate release manifest and establish rollback state
            this.releaseState = await releaseManager.initializeAndValidate();
            telemetryService.trackEvent('RUNTIME', 'ReleaseService', 'release_validation_completed', 'SUCCESS', 'INFO');

            // 3. Deployment readiness check (check health of dependencies)
            const isReady = await this.checkDeploymentReadiness();
            
            if (!isReady) {
                this.currentState = 'DEGRADED';
                telemetryService.trackEvent('RUNTIME', 'ReleaseService', 'deployment_readiness_failed', 'FAILURE', 'WARNING');
                // We do not throw here, DEGRADED means it runs but might be slow/limited.
            } else {
                this.currentState = 'READY';
                telemetryService.trackEvent('RUNTIME', 'ReleaseService', 'application_boot_completed', 'SUCCESS', 'INFO');
            }

        } catch (e) {
            this.currentState = 'FAILED';
            if (e instanceof ConfigurationError || e instanceof ReleaseError) {
                telemetryService.trackEvent('RUNTIME', 'ReleaseService', 'compatibility_check_failed', 'FAILURE', 'CRITICAL', undefined, { error: e.message });
            } else {
                telemetryService.trackError('RUNTIME', 'ReleaseService', 'bootstrap', e);
            }
            // Critical failures block unsafe execution
            throw e;
        }
    }

    private async checkDeploymentReadiness(): Promise<boolean> {
        try {
            const states = await healthAggregator.aggregateHealth();
            // If any critical subsystem is UNAVAILABLE, we are DEGRADED.
            // Wait, DARF initializes storage/workers after bootstrap in RuntimeIntegration.
            // But if there's pre-existing telemetry that says it's UNAVAILABLE constantly, we degrade.
            const unavailable = states.filter(s => s.status === 'UNAVAILABLE' && s.subsystem !== 'Security');
            if (unavailable.length > 0) {
                return false; // Degraded
            }
            return true;
        } catch (e) {
            // Telemetry failure shouldn't crash readiness
            return true; 
        }
    }

    public getDeploymentState(): DeploymentState {
        return this.currentState;
    }

    public getReleaseState(): ReleaseState | null {
        return this.releaseState;
    }
}

export const releaseService = new ReleaseService();
