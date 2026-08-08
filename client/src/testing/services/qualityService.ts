import { QualityState } from '../models/QualityState';
import { testOrchestrator } from '../orchestration/testOrchestrator';
import { coverageTracker } from '../coverage/coverageTracker';
import { healthMonitor } from '../monitoring/healthMonitor';
import { regressionDetector } from '../regression/regressionDetector';
import { qualityScore } from '../quality/qualityScore';
import { qualityGate } from '../quality/qualityGate';
import { qualityValidator } from '../quality/qualityValidator';
import { testReportGenerator } from '../reporting/testReportGenerator';

export class QualityService {
    public async executeQualityGate(): Promise<{ state: QualityState; report: string }> {
        // 1. Orchestrate tests
        const runState = await testOrchestrator.executeAll();
        
        // 2. Track coverage
        const coverage = coverageTracker.trackCoverage(runState);
        
        // 3. Monitor health
        const health = await healthMonitor.checkAllSubsystems();
        
        // 4. Detect regressions
        const regressions = regressionDetector.detectAll(runState);

        // 5. Evaluate Quality Gate & Score
        const score = qualityScore.calculate(runState, coverage, health, regressions);
        const gateResult = qualityGate.evaluate(runState, coverage, health, regressions);
        const validation = qualityValidator.extractFailuresAndRecommendations(runState, coverage, health, regressions);

        // 6. Aggregate final state
        const state: QualityState = {
            id: `qs-${Date.now()}`,
            timestamp: Date.now(),
            score,
            gateResult,
            testRun: runState,
            coverage,
            health,
            regressions,
            failures: validation.failures,
            recommendations: validation.recommendations
        };

        // 7. Generate report
        const report = testReportGenerator.generateMarkdownReport(state);

        return { state, report };
    }

    public async checkSystemHealthOnly() {
        return await healthMonitor.checkAllSubsystems();
    }
}

export const qualityService = new QualityService();
