import { AnalysisEngine } from '../engine/analysisEngine';
import { AnalysisResult } from '../models/AnalysisResult';

class AnalysisService {
    private engine = new AnalysisEngine();

    public processAnalysis(input: string): AnalysisResult {
        return this.engine.process(input);
    }
}

export const analysisService = new AnalysisService();
