import { describe, it, expect } from '../utils/testRunner';
import { LearningEngine } from '../../learning/engine/learningEngine';

describe('Learning Engine Unit Tests', () => {
    it('should expose execute method', () => {
        const engine = new LearningEngine();
        expect(typeof engine.execute).toEqual('function');
    });
});
