export interface ReleaseState {
    currentVersion: string;
    previousKnownVersion: string | null;
    isRollbackEligible: boolean;
    rollbackReason?: string;
}
