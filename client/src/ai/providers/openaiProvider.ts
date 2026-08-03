import OpenAI from 'openai';
import { AIProvider, ProviderConfiguration } from '../types/provider';
import { ChatContext, StreamingChunk } from '../types/ai';
import { withRetry } from '../utils/retry';

const apiKey = import.meta.env.VITE_OPENAI_API_KEY || '';
const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

export class OpenAIProvider implements AIProvider {
  name = 'openai';

  async generateText(context: ChatContext, config?: ProviderConfiguration): Promise<string> {
    return withRetry(async () => {
      const messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [];
      if (context.systemInstruction) {
        messages.push({ role: 'system', content: context.systemInstruction });
      }
      messages.push(...context.messages.map(m => ({
        role: (m.role === 'model' ? 'assistant' : m.role) as 'user' | 'system' | 'assistant',
        content: m.content
      })));

      const completion = await openai.chat.completions.create({
        messages,
        model: config?.model || 'gpt-4o',
        temperature: config?.temperature
      });
      return completion.choices[0].message.content || '';
    });
  }

  async streamText(context: ChatContext, onChunk: (chunk: StreamingChunk) => void, config?: ProviderConfiguration): Promise<void> {
    return withRetry(async () => {
      const messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [];
      if (context.systemInstruction) {
        messages.push({ role: 'system', content: context.systemInstruction });
      }
      messages.push(...context.messages.map(m => ({
        role: (m.role === 'model' ? 'assistant' : m.role) as 'user' | 'system' | 'assistant',
        content: m.content
      })));

      const stream = await openai.chat.completions.create({
        messages,
        model: config?.model || 'gpt-4o',
        temperature: config?.temperature,
        stream: true
      });

      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || '';
        if (content) {
          onChunk({ text: content, isFinished: false });
        }
      }
      onChunk({ text: '', isFinished: true });
    });
  }
}
