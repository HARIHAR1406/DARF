export interface AdaptationState {
    id: string;
    originalScore: number;
    adaptedScore: number;
    appliedStrategies: string[];
    timestamp: number;
}
