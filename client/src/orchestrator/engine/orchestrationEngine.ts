import { ExecutionResult } from '../models/ExecutionResult';
import { executeDestructorPipeline } from '../pipelines/destructorPipeline';
import { executeContextPipeline } from '../pipelines/contextPipeline';
import { executePromptPipeline } from '../pipelines/promptPipeline';
import { executeRebuildPipeline } from '../pipelines/rebuildPipeline';
import { executeProviderPipeline } from '../pipelines/providerPipeline';
import { executeAnalysisPipeline } from '../pipelines/analysisPipeline';

export class OrchestrationEngine {
    public execute(request: string): ExecutionResult {
        // Step 1: Receive the user request.
        console.log(request);

        // Step 2: Send the request to pipelines
        executeDestructorPipeline();
        executeContextPipeline();
        executePromptPipeline();
        executeRebuildPipeline();

        // Step 3: Transfer the optimized request into the provider layer
        executeProviderPipeline();

        // Step 4: Send the generated response to analysis, logging, monitoring
        executeAnalysisPipeline();

        // Step 5: Return the finalized response
        return { success: true, data: 'Response' };
    }
}
