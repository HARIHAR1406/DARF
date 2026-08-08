export interface CoverageState {
    totalDomains: number;
    testedDomains: string[];
    untestedDomains: string[];
    domainCoveragePercentage: number;
    criticalDomainCoverage: number;
}
