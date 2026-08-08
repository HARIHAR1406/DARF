import { runner } from '../utils/testRunner';

export type DomainTag = 'Runtime' | 'Knowledge' | 'Learning' | 'Optimization' | 'Storage' | 'Workers' | 'Security' | 'Testing' | 'Integration' | 'E2E' | 'Performance';

export interface DomainMapping {
    suiteNamePattern: RegExp;
    domain: DomainTag;
}

const DOMAIN_MAPPINGS: DomainMapping[] = [
    { suiteNamePattern: /Runtime/i, domain: 'Runtime' },
    { suiteNamePattern: /Knowledge/i, domain: 'Knowledge' },
    { suiteNamePattern: /Learning/i, domain: 'Learning' },
    { suiteNamePattern: /Optimization/i, domain: 'Optimization' },
    { suiteNamePattern: /Storage/i, domain: 'Storage' },
    { suiteNamePattern: /Worker/i, domain: 'Workers' },
    { suiteNamePattern: /Security/i, domain: 'Security' },
    { suiteNamePattern: /Pipeline|Integration/i, domain: 'Integration' },
    { suiteNamePattern: /E2E/i, domain: 'E2E' },
    { suiteNamePattern: /Bench/i, domain: 'Performance' },
];

export class SuiteManager {
    public getDomainForSuite(suiteName: string): DomainTag {
        for (const mapping of DOMAIN_MAPPINGS) {
            if (mapping.suiteNamePattern.test(suiteName)) {
                return mapping.domain;
            }
        }
        return 'Testing'; // Fallback domain
    }

    public getRegisteredSuites() {
        return runner.getSuites().map(suite => ({
            ...suite,
            domain: this.getDomainForSuite(suite.name)
        }));
    }
}

export const suiteManager = new SuiteManager();
