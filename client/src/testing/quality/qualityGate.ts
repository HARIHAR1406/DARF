import { TestRunState } from '../models/TestRunState';
import { CoverageState } from '../models/CoverageState';
import { HealthState } from '../models/HealthState';
import { RegressionState } from '../models/RegressionState';
import { QualityGateResult } from '../models/QualityState';
import { coverageValidator } from '../coverage/coverageValidator';

export class QualityGate {
    public evaluate(runState: TestRunState, coverage: CoverageState, health: HealthState[], regressions: RegressionState[]): QualityGateResult {
        // Fail if tests are failing
        if (runState.failedTests > 0) return 'FAIL';
        
        // Fail if critical coverage drops
        const covVal = coverageValidator.validate(coverage);
        if (!covVal.passed) return 'FAIL';
        
        // Fail if any subsystem is unavailable
        if (health.some(h => h.status === 'UNAVAILABLE')) return 'FAIL';
        
        // Fail on critical regression
        if (regressions.some(r => r.level === 'CRITICAL')) return 'FAIL';
        
        // Warn if subsystems degraded
        if (health.some(h => h.status === 'DEGRADED')) return 'WARN';
        
        // Warn if non-critical regressions
        if (regressions.some(r => r.level === 'DEGRADED')) return 'WARN';
        
        return 'PASS';
    }
}

export const qualityGate = new QualityGate();
