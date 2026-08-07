export class InjectionAnalyzer {
    // Common prompt injection patterns (e.g., ignoring previous instructions)
    private static readonly INJECTION_PATTERNS = [
        /ignore previous instructions/i,
        /disregard all prior/i,
        /system prompt/i,
        /you are now/i,
        /forget everything/i,
        /bypass constraints/i,
        /print your instructions/i
    ];

    public static analyze(prompt: string): { isInjected: boolean; confidence: number; detectedPatterns: string[] } {
        const detected: string[] = [];
        let confidence = 0.0;
        
        for (const pattern of this.INJECTION_PATTERNS) {
            if (pattern.test(prompt)) {
                detected.push(pattern.toString());
                confidence += 0.3; // Arbitrary confidence bump per match
            }
        }
        
        // Cap confidence at 1.0
        confidence = Math.min(confidence, 1.0);
        
        return {
            isInjected: confidence > 0.5, // Threshold
            confidence,
            detectedPatterns: detected
        };
    }
}
