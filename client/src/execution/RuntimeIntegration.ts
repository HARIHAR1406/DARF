import { orchestrationService } from '../orchestrator/services/orchestrationService';
import { providerService } from '../provider/services/providerService';
import { knowledgeService } from '../knowledge/services/knowledgeService';
import { learningService } from '../learning/services/learningService';
import { agentService } from '../agent/services/agentService';

export class RuntimeIntegration {
    public static async executeFullPipeline(userRequest: string): Promise<string> {
        // User -> Agent
        const agentState = { id: 'agent-1', isActive: true };
        const agentResponse = agentService.execute(agentState);

        // Agent -> Orchestrator
        const orchestrationResult = orchestrationService.processRequest(userRequest);

        // Orchestrator -> Provider
        const providerConfig = { id: 'prov-1', payload: 'payload-data' };
        const providerResult = providerService.execute(providerConfig);

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
    }
}
