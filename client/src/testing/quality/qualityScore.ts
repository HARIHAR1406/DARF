import { TestRunState } from '../models/TestRunState';
import { CoverageState } from '../models/CoverageState';
import { HealthState } from '../models/HealthState';
import { RegressionState } from '../models/RegressionState';

export class QualityScore {
    public calculate(runState: TestRunState, coverage: CoverageState, health: HealthState[], regressions: RegressionState[]): number {
        let score = 100;

        // Penalty for test failures
        const successRate = runState.totalTests > 0 ? runState.passedTests / runState.totalTests : 1;
        score -= (1 - successRate) * 40; // Max 40 point penalty

        // Penalty for low coverage
        if (coverage.domainCoveragePercentage < 100) {
            score -= (100 - coverage.domainCoveragePercentage) * 0.2; // Max 20 point penalty
        }

        // Penalty for unhealthy subsystems
        const unhealthyCount = health.filter(h => h.status !== 'HEALTHY').length;
        score -= unhealthyCount * 10; // 10 points per degraded subsystem

        // Penalty for regressions
        regressions.forEach(r => {
            if (r.level === 'CRITICAL') score -= 15;
            else if (r.level === 'DEGRADED') score -= 5;
        });

        return Math.max(0, Math.round(score));
    }
}

export const qualityScore = new QualityScore();
