import { PredictionState } from '../models/PredictionState';

export class RoutingPredictor {
    private providerScores: Map<string, number> = new Map();

    public predictOptimalRoute(availableProviders: string[]): string {
        if (availableProviders.length === 0) return 'local';
        
        let bestProvider = availableProviders[0];
        let highestScore = -Infinity;

        for (const provider of availableProviders) {
            const score = this.providerScores.get(provider) ?? 1.0;
            if (score > highestScore) {
                highestScore = score;
                bestProvider = provider;
            }
        }

        return bestProvider;
    }

    public updateHeuristic(provider: string, latencyMs: number, success: boolean): void {
        const currentScore = this.providerScores.get(provider) ?? 1.0;
        
        // Lower latency = higher score; fail = massive penalty
        const adjustment = success ? (1000 / Math.max(latencyMs, 1)) * 0.1 : -0.5;
        
        // Dampen the adjustment
        const newScore = Math.max(0, currentScore + adjustment);
        this.providerScores.set(provider, newScore);
    }

    public getPredictionState(provider: string): PredictionState {
        return {
            id: `route-pred-${provider}-${Date.now()}`,
            predictedRoute: provider,
            failureProbability: 1 - (this.providerScores.get(provider) ?? 1.0) / 10,
            loadPrediction: 0.5,
            performanceDegradationRisk: 0.1,
            confidence: 0.8,
            predictedAt: Date.now(),
            validUntil: Date.now() + 60000
        };
    }
}

export const routingPredictor = new RoutingPredictor();
