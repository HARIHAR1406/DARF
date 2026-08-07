import { orchestrationService } from '../orchestrator/services/orchestrationService';
import { providerService } from '../provider/services/providerService';
import { storageService } from '../storage/services/storageService';
import { workerService } from '../workers/services/workerService';
import { agentService } from '../agent/services/agentService';
import { ProviderRequest } from '../provider/models/ProviderRequest';
import { ProviderResponse } from '../provider/models/ProviderResponse';
import { dispatchResponse } from '../agent/dispatchers/responseDispatcher';
import { agentManager } from '../agent/managers/agentManager';

export class RuntimeIntegration {
    private static isInitialized = false;

    public static async executeFullPipeline(userRequest: string): Promise<string> {
        try {
            if (!this.isInitialized) {
                await storageService.initialize();
                await workerService.initialize();
                this.isInitialized = true;
            }
            
            // 1. Agent Initialization
            const agentState = agentManager.registerAgent(`agent-${Date.now()}`);

            // 2. Agent Dispatcher
            const agentResponse = agentService.execute(agentState, userRequest);

            // 3. Orchestration
            const orchestrationResult = await orchestrationService.processRequest(userRequest);
            if (!orchestrationResult.success) {
                throw new Error('Orchestration failed');
            }

            // 4. Execution Engine (Offloaded to WebWorker)
            const execResult = await workerService.executeTask<unknown, { data: unknown }>('execution', {
                state: { id: `exec-${Date.now()}`, isActive: true, status: 'initialized' },
                userRequest
            });
            
            // 5. Optimization (Pre-Execution & Cache) & Provider Layer
            let providerConfig: ProviderRequest = { 
                id: `prov-${Date.now()}`, 
                payload: execResult.data as string, 
                providerName: 'gemini' 
            };
            
            // Rewrite prompt via optimization worker
            providerConfig = await workerService.executeTask<unknown, ProviderRequest>('optimization', {
                action: 'pre',
                request: providerConfig
            });
            
            // Check cache via worker
            let providerResult: ProviderResponse | null = await workerService.executeTask<unknown, ProviderResponse | null>('optimization', {
                action: 'cache',
                request: providerConfig
            });
            
            if (!providerResult) {
                // Cache miss, execute provider
                providerResult = await providerService.execute(providerConfig);
                if (!providerResult.success) {
                    throw new Error('Provider execution failed');
                }
                
                // Cache response via worker
                providerResult = await workerService.executeTask<unknown, ProviderResponse>('optimization', {
                    action: 'post',
                    request: providerConfig,
                    response: providerResult
                });
            }

            // 6. Knowledge Layer (Offloaded to worker)
            const knowledgeNode = { id: `know-${Date.now()}`, type: 'execution', content: providerResult!.data };
            const knowledgeResult = await workerService.executeTask<unknown, { score: number }>('knowledge', { node: knowledgeNode });

            // 7. Learning Layer (Offloaded to worker)
            const learningState = { 
                id: `learn-${Date.now()}`, 
                isActive: true, 
                timestamp: Date.now(),
                context: {
                    userRequest,
                    providerResponse: providerResult!.data,
                    knowledgeScore: knowledgeResult.score,
                    latencyMs: providerResult!.latencyMs || 500,
                    tokenUsage: providerResult!.tokensUsed || 100
                }
            };
            const learningResult = await workerService.executeTask<unknown, { passed: boolean, recommendations: string[] }>('learning', { state: learningState });

            // 8. Analysis & Response Generation
            const finalPayload = {
                agentPayload: agentResponse.payload,
                orchestrationStatus: orchestrationResult.success.toString(),
                providerData: providerResult!.data,
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

