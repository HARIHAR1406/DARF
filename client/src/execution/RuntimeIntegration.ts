import { orchestrationService } from '../orchestrator/services/orchestrationService';
import { providerService } from '../provider/services/providerService';
import { knowledgeService } from '../knowledge/services/knowledgeService';
import { learningService } from '../learning/services/learningService';
import { agentService } from '../agent/services/agentService';
import { ProviderRequest } from '../provider/models/ProviderRequest';
import { ExecutionEngine } from './engine/executionEngine';
import { dispatchResponse } from '../agent/dispatchers/responseDispatcher';
import { agentManager } from '../agent/managers/agentManager';

export class RuntimeIntegration {
    public static async executeFullPipeline(userRequest: string): Promise<string> {
        try {
            // User -> Request Dispatcher -> Agent Coordinator -> Workflow Coordinator -> Execution Manager -> Provider Layer -> Knowledge Layer -> Learning Layer -> Analysis Layer -> Response Generator -> User
            
            // 1. Agent Initialization
            const agentState = agentManager.registerAgent(`agent-${Date.now()}`);

            // 2. Agent Dispatcher (Validates, queues, and tracks)
            const agentResponse = agentService.execute(agentState, userRequest);

            // 3. Orchestration
            const orchestrationResult = await orchestrationService.processRequest(userRequest);
            if (!orchestrationResult.success) {
                throw new Error('Orchestration failed');
            }

            // 4. Execution Engine (Wraps Workflow Manager)
            const execEngine = new ExecutionEngine();
            const execResult = execEngine.execute({ id: `exec-${Date.now()}`, isActive: true, status: 'initialized' }, userRequest);
            
            // 5. Provider Layer
            const providerConfig: ProviderRequest = { 
                id: `prov-${Date.now()}`, 
                payload: execResult.data, 
                providerName: 'gemini' 
            };
            const providerResult = await providerService.execute(providerConfig);
            if (!providerResult.success) {
                throw new Error('Provider execution failed');
            }

            // 6. Knowledge Layer
            const knowledgeNode = { id: `know-${Date.now()}`, type: 'execution', content: providerResult.data };
            const knowledgeResult = knowledgeService.processKnowledge(knowledgeNode);

            // 7. Learning Layer
            const learningState = { 
                id: `learn-${Date.now()}`, 
                isActive: true, 
                timestamp: Date.now(),
                context: {
                    userRequest,
                    providerResponse: providerResult.data,
                    knowledgeScore: knowledgeResult.score,
                    latencyMs: providerResult.latencyMs || 500,
                    tokenUsage: providerResult.tokensUsed || 100
                }
            };
            const learningResult = learningService.processLearning(learningState);

            // 8. Analysis & Response Generation (Mapped to Response Dispatcher)
            const finalPayload = {
                agentPayload: agentResponse.payload,
                orchestrationStatus: orchestrationResult.success.toString(),
                providerData: providerResult.data,
                knowledgeScore: knowledgeResult.score,
                learningPassed: learningResult.passed,
                learningRecommendations: learningResult.recommendations
            };

            const dispatchedResponse = dispatchResponse(finalPayload);
            
            return JSON.stringify(dispatchedResponse.payload);
            
        } catch (error: unknown) {
            console.error('Pipeline execution error:', error);
            throw error;
        }
    }
}
