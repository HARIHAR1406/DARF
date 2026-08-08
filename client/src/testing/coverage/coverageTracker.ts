import { TestRunState } from '../models/TestRunState';
import { CoverageState } from '../models/CoverageState';
import { DomainTag } from '../orchestration/suiteManager';

const ALL_DOMAINS: DomainTag[] = [
    'Runtime', 'Knowledge', 'Learning', 'Optimization', 
    'Storage', 'Workers', 'Security', 'Testing', 
    'Integration', 'E2E', 'Performance'
];

const CRITICAL_DOMAINS: DomainTag[] = [
    'Runtime', 'Security', 'Storage', 'Workers', 'Knowledge'
];

export class CoverageTracker {
    public trackCoverage(runState: TestRunState): CoverageState {
        const testedSet = new Set<string>();

        runState.suites.forEach(suite => {
            if (suite.totalTests > 0) {
                testedSet.add(suite.domain);
            }
        });

        const testedDomains = Array.from(testedSet);
        const untestedDomains = ALL_DOMAINS.filter(d => !testedSet.has(d));

        const domainCoveragePercentage = (testedDomains.length / ALL_DOMAINS.length) * 100;
        
        let criticalTestedCount = 0;
        CRITICAL_DOMAINS.forEach(d => {
            if (testedSet.has(d)) criticalTestedCount++;
        });

        const criticalDomainCoverage = (criticalTestedCount / CRITICAL_DOMAINS.length) * 100;

        return {
            totalDomains: ALL_DOMAINS.length,
            testedDomains,
            untestedDomains,
            domainCoveragePercentage,
            criticalDomainCoverage
        };
    }
}

export const coverageTracker = new CoverageTracker();
