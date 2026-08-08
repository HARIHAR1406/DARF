import { TestRunState } from '../models/TestRunState';
import { TestCaseState } from '../models/TestSuiteState';
import { CoverageState } from '../models/CoverageState';
import { HealthState } from '../models/HealthState';
import { RegressionState } from '../models/RegressionState';

export class QualityValidator {
    public extractFailuresAndRecommendations(
        runState: TestRunState, 
        coverage: CoverageState, 
        health: HealthState[], 
        regressions: RegressionState[]
    ): { failures: string[]; recommendations: string[] } {
        const failures: string[] = [];
        const recommendations: string[] = [];

        // Failures
        runState.suites.forEach(suite => {
            suite.cases.forEach((testCase: TestCaseState) => {
                if (!testCase.passed) {
                    failures.push(`[${suite.name}] ${testCase.name}: ${testCase.error}`);
                }
            });
        });

        health.forEach(h => {
            if (h.status !== 'HEALTHY') {
                failures.push(`[Health] ${h.subsystem} is ${h.status}`);
            }
        });

        // Recommendations
        if (coverage.untestedDomains.length > 0) {
            recommendations.push(`Add tests for domains: ${coverage.untestedDomains.join(', ')}`);
        }
        
        regressions.forEach(r => {
            if (r.level === 'CRITICAL' || r.level === 'DEGRADED') {
                recommendations.push(`Investigate performance shift in ${r.operation}`);
            }
        });

        return { failures, recommendations };
    }
}

export const qualityValidator = new QualityValidator();
