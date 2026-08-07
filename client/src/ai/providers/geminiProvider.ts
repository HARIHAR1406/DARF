import { AIProvider, ProviderConfiguration } from '../types/provider';
import { ChatContext, StreamingChunk } from '../types/ai';
import { withRetry } from '../utils/retry';
import { providerProxy } from '../../provider/proxy/providerProxy';

export class GeminiProvider implements AIProvider {
  name = 'gemini';

  async generateText(context: ChatContext, config?: ProviderConfiguration): Promise<string> {
    return withRetry(async () => {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
      const model = config?.model || 'gemini-1.5-pro';
      
      const contents = context.messages.map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }]
      }));

      const payload: Record<string, unknown> = {
          contents
      };

      if (context.systemInstruction) {
          payload.systemInstruction = {
              parts: [{ text: context.systemInstruction }]
          };
      }

      const response = await providerProxy.executeProxy({
        endpoint: `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: payload
      });

      const result = await response.json();
      
      if (result.error) {
          throw new Error(`Gemini API Error: ${result.error.message || JSON.stringify(result.error)}`);
      }

      if (result.candidates && result.candidates.length > 0) {
          const candidate = result.candidates[0];
          if (candidate.content && candidate.content.parts && candidate.content.parts.length > 0) {
              return candidate.content.parts[0].text || '';
          }
      }
      return '';
    });
  }

  async streamText(context: ChatContext, onChunk: (chunk: StreamingChunk) => void, config?: ProviderConfiguration): Promise<void> {
    return withRetry(async () => {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
      const model = config?.model || 'gemini-1.5-pro';
      
      const contents = context.messages.map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }]
      }));

      const payload: Record<string, unknown> = {
          contents
      };

      if (context.systemInstruction) {
          payload.systemInstruction = {
              parts: [{ text: context.systemInstruction }]
          };
      }

      const response = await providerProxy.executeStreamProxy({
        endpoint: `https://generativelanguage.googleapis.com/v1beta/models/${model}:streamGenerateContent?key=${apiKey}&alt=sse`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: payload
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
                if (parsed.candidates && parsed.candidates.length > 0) {
                  const candidate = parsed.candidates[0];
                  if (candidate.content && candidate.content.parts && candidate.content.parts.length > 0) {
                      const content = candidate.content.parts[0].text || '';
                      if (content) {
                          onChunk({ text: content, isFinished: false });
                      }
                  }
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
