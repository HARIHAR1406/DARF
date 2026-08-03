import { RebuildContext } from '../models/RebuildContext';
import { RebuildResult } from '../models/RebuildResult';
import { validateSyntax } from '../validators/syntaxValidator';
import { validateSecurity } from '../validators/securityValidator';
import { validateConsistency } from '../validators/consistencyValidator';
import { optimizeTokens } from '../optimizers/tokenOptimizer';
import { optimizeSemantics } from '../optimizers/semanticOptimizer';
import { buildPrompt } from '../builders/promptBuilder';
import { buildContext } from '../builders/contextBuilder';
import { buildInstructions } from '../builders/instructionBuilder';
import { buildTemplate } from '../builders/templateBuilder';

export class RebuildEngine {
  public process(context: RebuildContext): RebuildResult {
    const originalLength = context.originalPrompt.length;
    
    validateSyntax(context.sanitizedPrompt);
    validateSecurity(context.sanitizedPrompt);
    validateConsistency(context.sanitizedPrompt);

    const optimizedTokens = optimizeTokens(context.sanitizedPrompt);
    const optimizedSemantics = optimizeSemantics(optimizedTokens);
    
    const builtContext = buildContext(optimizedSemantics);
    const builtInstructions = buildInstructions(['Follow security guidelines.', 'Ensure safe output.']);
    const finalPrompt = buildPrompt(builtContext, builtInstructions);
    const templatedPrompt = buildTemplate(finalPrompt);

    const optimizedLength = templatedPrompt.length;
    const compressionRatio = originalLength > 0 ? optimizedLength / originalLength : 1;

    return {
      prompt: templatedPrompt,
      context: builtContext,
      instructions: builtInstructions,
      score: 95,
      optimization: {
        originalLength,
        optimizedLength,
        compressionRatio
      }
    };
  }
}
