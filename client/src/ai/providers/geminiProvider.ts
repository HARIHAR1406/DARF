import { GoogleGenerativeAI } from '@google/generative-ai';
import { AIProvider, ProviderConfiguration } from '../types/provider';
import { ChatContext, StreamingChunk } from '../types/ai';
import { withRetry } from '../utils/retry';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(apiKey);

export class GeminiProvider implements AIProvider {
  name = 'gemini';

  async generateText(context: ChatContext, config?: ProviderConfiguration): Promise<string> {
    return withRetry(async () => {
      const model = genAI.getGenerativeModel({ 
        model: config?.model || 'gemini-1.5-pro',
        systemInstruction: context.systemInstruction
      });
      const chat = model.startChat({
        history: context.messages.slice(0, -1).map(m => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.content }]
        }))
      });
      const lastMsg = context.messages[context.messages.length - 1];
      const result = await chat.sendMessage(lastMsg.content);
      return result.response.text();
    });
  }

  async streamText(context: ChatContext, onChunk: (chunk: StreamingChunk) => void, config?: ProviderConfiguration): Promise<void> {
    return withRetry(async () => {
      const model = genAI.getGenerativeModel({ 
        model: config?.model || 'gemini-1.5-pro',
        systemInstruction: context.systemInstruction
      });
      const chat = model.startChat({
        history: context.messages.slice(0, -1).map(m => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.content }]
        }))
      });
      const lastMsg = context.messages[context.messages.length - 1];
      const result = await chat.sendMessageStream(lastMsg.content);
      
      for await (const chunk of result.stream) {
        onChunk({ text: chunk.text(), isFinished: false });
      }
      onChunk({ text: '', isFinished: true });
    });
  }
}
