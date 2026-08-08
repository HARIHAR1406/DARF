export type EnvironmentType = 'DEV' | 'TEST' | 'STAGING' | 'PROD';

export interface RuntimeConfig {
    env: EnvironmentType;
    version: string;
    enableTelemetry: boolean;
    requireSecuritySanitization: boolean;
    storagePrefix: string;
    workerCountMax: number;
}

export const environmentConfig: RuntimeConfig = {
    env: (import.meta.env?.VITE_APP_ENV as EnvironmentType) || 'DEV',
    version: (import.meta.env?.VITE_APP_VERSION as string) || '2.3.0', // Updated for Phase 14 release version
    enableTelemetry: true,
    requireSecuritySanitization: true,
    storagePrefix: 'darf_',
    workerCountMax: navigator.hardwareConcurrency || 4
};
