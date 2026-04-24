import { AIProviderConfig, AIRequest, AIResponse } from '../../../shared/types';

export interface ProviderHealth {
  available: boolean;
  healthy: boolean;
  message: string;
}

export abstract class BaseProvider {
  protected config: AIProviderConfig;

  constructor(config: AIProviderConfig) {
    this.config = config;
  }

  public getConfig(): AIProviderConfig {
    return this.config;
  }

  public updateConfig(config: Partial<AIProviderConfig>): void {
    this.config = { ...this.config, ...config };
  }

  protected async fetchWithTimeout(url: string, init?: RequestInit): Promise<Response> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), this.config.timeoutMs);

    try {
      return await fetch(url, { ...init, signal: controller.signal });
    } finally {
      clearTimeout(timeout);
    }
  }

  abstract detect(): Promise<ProviderHealth>;
  abstract listModels(): Promise<string[]>;
  abstract complete(request: AIRequest): Promise<AIResponse>;
}
