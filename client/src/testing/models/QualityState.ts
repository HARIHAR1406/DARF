import { TestRunState } from './TestRunState';
import { CoverageState } from './CoverageState';
import { HealthState } from './HealthState';
import { RegressionState } from './RegressionState';

export type QualityGateResult = 'PASS' | 'WARN' | 'FAIL';

export interface QualityState {
    id: string;
    timestamp: number;
    score: number;
    gateResult: QualityGateResult;
    testRun: TestRunState;
    coverage: CoverageState;
    health: HealthState[];
    regressions: RegressionState[];
    failures: string[];
    recommendations: string[];
}
