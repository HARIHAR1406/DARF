import { CoverageState } from '../models/CoverageState';

export class CoverageValidator {
    private readonly MIN_OVERALL_COVERAGE = 80;
    private readonly MIN_CRITICAL_COVERAGE = 100;

    public validate(coverage: CoverageState): { passed: boolean; warnings: string[] } {
        const warnings: string[] = [];
        let passed = true;

        if (coverage.domainCoveragePercentage < this.MIN_OVERALL_COVERAGE) {
            warnings.push(`Overall domain coverage (${coverage.domainCoveragePercentage.toFixed(2)}%) is below ${this.MIN_OVERALL_COVERAGE}%`);
            passed = false;
        }

        if (coverage.criticalDomainCoverage < this.MIN_CRITICAL_COVERAGE) {
            warnings.push(`Critical domain coverage (${coverage.criticalDomainCoverage.toFixed(2)}%) is below ${this.MIN_CRITICAL_COVERAGE}%`);
            passed = false;
        }

        if (coverage.untestedDomains.length > 0) {
            warnings.push(`Untested domains detected: ${coverage.untestedDomains.join(', ')}`);
        }

        return { passed, warnings };
    }
}

export const coverageValidator = new CoverageValidator();
