import { AIRequest, AIResponse, AIProviderConfig } from '../../../shared/types';
import { BaseProvider, ProviderHealth } from './BaseProvider';

export class OllamaProvider extends BaseProvider {
  constructor(config: AIProviderConfig) {
    super(config);
  }

  async detect(): Promise<ProviderHealth> {
    try {
      const res = await this.fetchWithTimeout(`${this.config.endpoint}/api/tags`);
      if (!res.ok) return { available: true, healthy: false, message: `HTTP ${res.status}` };
      return { available: true, healthy: true, message: 'Ollama detected' };
    } catch {
      return { available: false, healthy: false, message: 'Ollama unavailable' };
    }
  }

  async listModels(): Promise<string[]> {
    try {
      const res = await this.fetchWithTimeout(`${this.config.endpoint}/api/tags`);
      if (!res.ok) return [];
      const data = (await res.json()) as { models?: Array<{ name: string }> };
      return (data.models ?? []).map((m) => m.name);
    } catch {
      return [];
    }
  }

  async complete(request: AIRequest): Promise<AIResponse> {
    const start = Date.now();
    const res = await this.fetchWithTimeout(`${this.config.endpoint}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: this.config.model, prompt: request.prompt, stream: false })
    });

    if (!res.ok) {
      throw new Error(`Ollama request failed with status ${res.status}`);
    }

    const data = (await res.json()) as { response?: string };
    return {
      requestId: request.requestId ?? crypto.randomUUID(),
      provider: 'ollama',
      model: this.config.model ?? 'unknown',
      content: data.response ?? '',
      createdAt: new Date().toISOString(),
      latencyMs: Date.now() - start
    };
  }
}
