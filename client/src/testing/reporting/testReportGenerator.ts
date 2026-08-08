import { QualityState } from '../models/QualityState';

export class TestReportGenerator {
    public generateMarkdownReport(state: QualityState): string {
        const date = new Date(state.timestamp).toISOString();
        
        let report = `# DARF Quality Report\n`;
        report += `Generated: ${date}\n`;
        report += `Quality Score: ${state.score}/100\n`;
        report += `Quality Gate Result: **${state.gateResult}**\n\n`;

        report += `## Test Summary\n`;
        report += `- Total Tests: ${state.testRun.totalTests}\n`;
        report += `- Passed: ${state.testRun.passedTests}\n`;
        report += `- Failed: ${state.testRun.failedTests}\n`;
        report += `- Duration: ${state.testRun.durationMs}ms\n\n`;

        report += `## Coverage Summary\n`;
        report += `- Domain Coverage: ${state.coverage.domainCoveragePercentage}%\n`;
        report += `- Tested Domains: ${state.coverage.testedDomains.join(', ') || 'None'}\n`;
        report += `- Untested Domains: ${state.coverage.untestedDomains.join(', ') || 'None'}\n\n`;

        report += `## Health Summary\n`;
        state.health.forEach(h => {
            report += `- ${h.subsystem}: [${h.status}] (Latency: ${h.latencyMs}ms)\n`;
        });
        report += `\n`;

        if (state.regressions.length > 0) {
            report += `## Regressions\n`;
            state.regressions.forEach(r => {
                report += `- [${r.level}] ${r.operation}: Shift ${r.shiftPercentage.toFixed(2)}%\n`;
            });
            report += `\n`;
        }

        if (state.failures.length > 0) {
            report += `## Failures\n`;
            state.failures.forEach(f => {
                report += `- ${f}\n`;
            });
            report += `\n`;
        }

        if (state.recommendations.length > 0) {
            report += `## Recommendations\n`;
            state.recommendations.forEach(r => {
                report += `- ${r}\n`;
            });
        }

        return report;
    }
}

export const testReportGenerator = new TestReportGenerator();
