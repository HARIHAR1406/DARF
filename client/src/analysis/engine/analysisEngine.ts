import { AnalysisResult } from '../models/AnalysisResult';
import { validateAnalysis } from '../validators/analysisValidator';
import { analyzeRequest } from '../analyzers/requestAnalyzer';
import { trackExecution } from '../trackers/executionTracker';
import { logApplication } from '../loggers/applicationLogger';
import { calculateScore } from '../utils/scorer';

export class AnalysisEngine {
    public process(input: string): AnalysisResult {
        const result: AnalysisResult = {
            score: calculateScore(input),
            riskLevel: 'LOW',
            timestamp: new Date().toISOString()
        };
        
        if (!validateAnalysis(result)) {
            throw new Error('Analysis validation failed');
        }
        
        analyzeRequest(input);
        trackExecution('exec-1');
        logApplication('Analysis engine executed');
        
        return result;
    }
}
