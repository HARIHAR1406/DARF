import { describe, it, expect } from '../utils/testRunner';
import { KnowledgeEngine } from '../../knowledge/engine/knowledgeEngine';

describe('Knowledge Engine Unit Tests', () => {
    it('should expose execute method', () => {
        const engine = new KnowledgeEngine();
        expect(typeof engine.execute).toEqual('function');
    });
});
