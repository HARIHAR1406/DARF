import { RegressionState } from '../models/RegressionState';

export class RegressionReporter {
    public formatRegressions(regressions: RegressionState[]): string[] {
        return regressions.map(r => {
            const shiftText = r.shiftPercentage > 0 ? `+${r.shiftPercentage.toFixed(2)}%` : `${r.shiftPercentage.toFixed(2)}%`;
            return `[${r.level}] ${r.operation} shifted by ${shiftText} (Baseline: ${r.baselineLatencyMs}ms -> Current: ${r.currentLatencyMs}ms)`;
        });
    }

    public hasCriticalRegressions(regressions: RegressionState[]): boolean {
        return regressions.some(r => r.level === 'CRITICAL');
    }
}

export const regressionReporter = new RegressionReporter();
