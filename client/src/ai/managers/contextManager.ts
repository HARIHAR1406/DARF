import { ChatContext, AIMessage } from '../types/ai';
import { SystemPrompt } from '../prompts/systemPrompt';
import { SafetyPrompt } from '../prompts/safetyPrompt';
import { ChatPrompt } from '../prompts/chatPrompt';

export const ContextManager = {
  buildContext(messages: AIMessage[]): ChatContext {
    return {
      messages,
      systemInstruction: `${SystemPrompt}\n${SafetyPrompt}\n${ChatPrompt}`
    };
  }
};
