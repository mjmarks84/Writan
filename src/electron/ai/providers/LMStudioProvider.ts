import { AIRequest, AIResponse, AIProviderConfig } from '../../../shared/types';
import { BaseProvider, ProviderHealth } from './BaseProvider';

export class LMStudioProvider extends BaseProvider {
  constructor(config: AIProviderConfig) {
    super(config);
  }

  async detect(): Promise<ProviderHealth> {
    try {
      const res = await this.fetchWithTimeout(`${this.config.endpoint}/v1/models`);
      if (!res.ok) return { available: true, healthy: false, message: `HTTP ${res.status}` };
      return { available: true, healthy: true, message: 'LM Studio detected' };
    } catch {
      return { available: false, healthy: false, message: 'LM Studio unavailable' };
    }
  }

  async listModels(): Promise<string[]> {
    try {
      const res = await this.fetchWithTimeout(`${this.config.endpoint}/v1/models`);
      if (!res.ok) return [];
      const data = (await res.json()) as { data?: Array<{ id: string }> };
      return (data.data ?? []).map((m) => m.id);
    } catch {
      return [];
    }
  }

  async complete(request: AIRequest): Promise<AIResponse> {
    const start = Date.now();
    const res = await this.fetchWithTimeout(`${this.config.endpoint}/v1/chat/completions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: this.config.model,
        messages: [{ role: 'user', content: request.prompt }],
        temperature: 0.7,
        stream: false
      })
    });

    if (!res.ok) {
      throw new Error(`LM Studio request failed with status ${res.status}`);
    }

    const data = (await res.json()) as { choices?: Array<{ message?: { content?: string } }> };
    return {
      requestId: request.requestId ?? crypto.randomUUID(),
      provider: 'lmstudio',
      model: this.config.model ?? 'unknown',
      content: data.choices?.[0]?.message?.content ?? '',
      createdAt: new Date().toISOString(),
      latencyMs: Date.now() - start
    };
  }
}
