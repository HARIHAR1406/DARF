import { orchestrationService } from '../orchestrator/services/orchestrationService';
import { providerService } from '../provider/services/providerService';
import { knowledgeService } from '../knowledge/services/knowledgeService';
import { learningService } from '../learning/services/learningService';
import { agentService } from '../agent/services/agentService';
import { ProviderRequest } from '../provider/models/ProviderRequest';

export class RuntimeIntegration {
    public static async executeFullPipeline(userRequest: string): Promise<string> {
        try {
            // User -> Agent
            const agentState = { id: 'agent-1', isActive: true };
            const agentResponse = agentService.execute(agentState);

            // Agent -> Orchestrator
            // Orchestrator internally calls pipelines and returns standard status
            const orchestrationResult = await orchestrationService.processRequest(userRequest);

            if (!orchestrationResult.success) {
                throw new Error('Orchestration failed');
            }

            // Orchestrator -> Execution Engine / Provider Layer
            const providerConfig: ProviderRequest = { 
                id: 'prov-1', 
                payload: userRequest, // Pass the actual user request payload instead of hardcoded stub
                providerName: 'gemini' // Can be parameterized or read from store
            };
            
            const providerResult = await providerService.execute(providerConfig);

            if (!providerResult.success) {
                throw new Error('Provider execution failed');
            }

            // Provider -> Knowledge
            const knowledgeNode = { id: 'know-1', type: 'execution' };
            const knowledgeResult = knowledgeService.processKnowledge(knowledgeNode);

            // Knowledge -> Learning
            const learningState = { id: 'learn-1', isActive: true };
            const learningResult = learningService.processLearning(learningState);

            return JSON.stringify({
                agentPayload: agentResponse.payload,
                orchestrationStatus: orchestrationResult.success.toString(),
                providerData: providerResult.data,
                knowledgeScore: knowledgeResult.score,
                learningPassed: learningResult.passed
            });
        } catch (error: unknown) {
            console.error('Pipeline execution error:', error);
            throw error;
        }
    }
}
