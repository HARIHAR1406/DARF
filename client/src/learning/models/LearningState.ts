export interface LearningContext {
    userRequest?: string;
    providerResponse?: string;
    knowledgeScore?: number;
    latencyMs?: number;
    tokenUsage?: number;
}

export interface LearningState {
    id: string;
    isActive: boolean;
    context: LearningContext;
    timestamp: number;
}
