import { EnvironmentType } from '../../config/environment';

export interface ReleaseManifest {
    version: string;
    releaseId: string;
    buildId: string;
    environment: EnvironmentType;
    generatedAt: number;
    enabledCapabilities: string[];
    requiredRuntimeVersion: string;
}
