import { AIProvider, ProviderConfiguration } from '../types/provider';
import { ChatContext, StreamingChunk } from '../types/ai';
import { withRetry } from '../utils/retry';
import { providerProxy } from '../../provider/proxy/providerProxy';

export class OpenAIProvider implements AIProvider {
  name = 'openai';

  async generateText(context: ChatContext, config?: ProviderConfiguration): Promise<string> {
    return withRetry(async () => {
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY || '';
      const messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [];
      if (context.systemInstruction) {
        messages.push({ role: 'system', content: context.systemInstruction });
      }
      messages.push(...context.messages.map(m => ({
        role: (m.role === 'model' ? 'assistant' : m.role) as 'user' | 'system' | 'assistant',
        content: m.content
      })));

      const response = await providerProxy.executeProxy({
        endpoint: 'https://api.openai.com/v1/chat/completions',
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        },
        body: {
            messages,
            model: config?.model || 'gpt-4o',
            temperature: config?.temperature
        }
      });

      const result = await response.json();
      return result.choices?.[0]?.message?.content || '';
    });
  }

  async streamText(context: ChatContext, onChunk: (chunk: StreamingChunk) => void, config?: ProviderConfiguration): Promise<void> {
    return withRetry(async () => {
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY || '';
      const messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [];
      if (context.systemInstruction) {
        messages.push({ role: 'system', content: context.systemInstruction });
      }
      messages.push(...context.messages.map(m => ({
        role: (m.role === 'model' ? 'assistant' : m.role) as 'user' | 'system' | 'assistant',
        content: m.content
      })));

      const response = await providerProxy.executeStreamProxy({
        endpoint: 'https://api.openai.com/v1/chat/completions',
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        },
        body: {
            messages,
            model: config?.model || 'gpt-4o',
            temperature: config?.temperature,
            stream: true
        }
      });

      if (!response.body) return;
      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');

      let isDone = false;
      while (!isDone) {
        const { done, value } = await reader.read();
        if (done) {
            isDone = true;
            continue;
        }
        
        const chunkStr = decoder.decode(value, { stream: true });
        const lines = chunkStr.split('\n').filter(line => line.trim().startsWith('data: '));
        for (const line of lines) {
            const data = line.replace(/^data: /, '').trim();
            if (data === '[DONE]') continue;
            try {
                const parsed = JSON.parse(data);
                const content = parsed.choices[0]?.delta?.content || '';
                if (content) {
                    onChunk({ text: content, isFinished: false });
                }
            } catch (e) {
                // Ignore parse errors on partial chunks
            }
        }
      }
      onChunk({ text: '', isFinished: true });
    });
  }
}
