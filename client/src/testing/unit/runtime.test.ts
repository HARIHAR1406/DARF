import { describe, it, expect } from '../utils/testRunner';
import { RuntimeIntegration } from '../../execution/RuntimeIntegration';

describe('RuntimeIntegration Unit Tests', () => {
    it('should throw an error for empty request via security validator', async () => {
        let threw = false;
        try {
            await RuntimeIntegration.executeFullPipeline('   ');
        } catch (e: unknown) {
            threw = true;
            expect((e as Error).message.includes('SECURITY ALERT')).toBeTruthy();
        }
        expect(threw).toBeTruthy();
    });
});
