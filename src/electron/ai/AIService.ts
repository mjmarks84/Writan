import { DEFAULT_AI_SETTINGS } from '../../shared/constants';
import {
  AIConnectionStatus,
  AIProviderConfig,
  AIProviderId,
  AIRequest,
  AIResponse,
  AISettings
} from '../../shared/types';
import { aiLogger } from '../utils/aiLogger';
import { ContextBuilder } from './ContextBuilder';
import { PromptEngineering } from './PromptEngineering';
import { ProviderFactory } from './providers/ProviderFactory';
import { ResponseProcessor } from './ResponseProcessor';

export class AIService {
  private settings: AISettings;
  private contextBuilder = new ContextBuilder();
  private promptEngineering = new PromptEngineering();
  private responseProcessor = new ResponseProcessor();
  private responseCache = new Map<string, AIResponse>();
  private history: AIResponse[] = [];
  private requestTimestamps: number[] = [];

  constructor(initialSettings: Partial<AISettings> = {}) {
    this.settings = { ...DEFAULT_AI_SETTINGS, ...initialSettings };
  }

  getSettings(): AISettings {
    return this.settings;
  }

  updateSettings(next: Partial<AISettings>): AISettings {
    this.settings = { ...this.settings, ...next };
    return this.settings;
  }

  async checkConnections(): Promise<AIConnectionStatus[]> {
    const providers: AIProviderId[] = ['ollama', 'lmstudio'];
    const statuses = await Promise.all(
      providers.map(async (provider) => {
        const config: AIProviderConfig = {
          id: provider,
          endpoint: this.settings.endpoints[provider],
          model: this.settings.selectedModel,
          enabled: true,
          timeoutMs: this.settings.timeoutMs
        };

        const instance = ProviderFactory.createProvider(config);
        const health = await instance.detect();
        const models = health.available ? await instance.listModels() : [];

        return {
          provider,
          available: health.available,
          healthy: health.healthy,
          message: health.message,
          models,
          endpoint: config.endpoint
        } satisfies AIConnectionStatus;
      })
    );

    return statuses;
  }

  async listModels(provider: AIProviderId): Promise<string[]> {
    const config: AIProviderConfig = {
      id: provider,
      endpoint: this.settings.endpoints[provider],
      model: this.settings.selectedModel,
      enabled: true,
      timeoutMs: this.settings.timeoutMs
    };

    return ProviderFactory.createProvider(config).listModels();
  }

  async run(request: AIRequest): Promise<AIResponse> {
    this.enforceRateLimit();

    const cacheKey = JSON.stringify({
      provider: this.settings.selectedProvider,
      model: this.settings.selectedModel,
      type: request.type,
      prompt: request.prompt,
      context: request.context
    });

    const cached = this.responseCache.get(cacheKey);
    if (cached) {
      return { ...cached, cached: true };
    }

    const providerOrder = await this.resolveProviderOrder();
    const context = this.contextBuilder.build(request.context, this.settings.contextWindow);
    const prompt = this.promptEngineering.buildPrompt(request, context, this.settings);

    let lastError: unknown;
    for (const provider of providerOrder) {
      try {
        const response = await this.callProvider(provider, { ...request, prompt });
        const processed = this.responseProcessor.format(response);
        this.responseCache.set(cacheKey, processed);
        this.history.unshift(processed);
        this.history = this.history.slice(0, 200);
        return processed;
      } catch (error) {
        lastError = error;
        aiLogger.warn(`Provider ${provider} failed`, error);
      }
    }

    throw new Error(`All providers failed. Last error: ${String(lastError)}`);
  }

  getHistory(): AIResponse[] {
    return [...this.history];
  }

  private async resolveProviderOrder(): Promise<AIProviderId[]> {
    const selected = this.settings.selectedProvider;
    const fallback = (['ollama', 'lmstudio'] as AIProviderId[]).filter((p) => p !== selected);

    if (!this.settings.localOnlyMode) {
      return [selected, ...fallback, 'llama.cpp', 'gpt4all'];
    }

    return [selected, ...fallback];
  }

  private async callProvider(provider: AIProviderId, request: AIRequest): Promise<AIResponse> {
    const config: AIProviderConfig = {
      id: provider,
      endpoint: this.settings.endpoints[provider],
      model: this.settings.selectedModel,
      enabled: true,
      timeoutMs: this.settings.timeoutMs
    };

    const instance = ProviderFactory.createProvider(config);
    const health = await instance.detect();
    if (!health.healthy) {
      throw new Error(`${provider} unhealthy: ${health.message}`);
    }

    return instance.complete({ ...request, requestId: request.requestId ?? crypto.randomUUID() });
  }

  private enforceRateLimit(): void {
    const now = Date.now();
    this.requestTimestamps = this.requestTimestamps.filter((timestamp) => now - timestamp < 60_000);

    if (this.requestTimestamps.length >= this.settings.rateLimitPerMinute) {
      throw new Error('Rate limit exceeded for AI requests. Please try again shortly.');
    }

    this.requestTimestamps.push(now);
  }
}
