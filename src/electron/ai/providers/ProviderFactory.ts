import { AIProviderConfig, AIProviderId } from '../../../shared/types';
import { BaseProvider } from './BaseProvider';
import { LMStudioProvider } from './LMStudioProvider';
import { Llama2Provider } from './Llama2Provider';
import { OllamaProvider } from './OllamaProvider';

export class ProviderFactory {
  static createProvider(config: AIProviderConfig): BaseProvider {
    switch (config.id) {
      case 'ollama':
        return new OllamaProvider(config);
      case 'lmstudio':
        return new LMStudioProvider(config);
      case 'llama.cpp':
        return new Llama2Provider(config);
      case 'gpt4all':
        return new LMStudioProvider(config);
      default:
        throw new Error(`Unsupported provider: ${(config as { id: string }).id}`);
    }
  }

  static supportedProviders(): AIProviderId[] {
    return ['ollama', 'lmstudio', 'llama.cpp', 'gpt4all'];
  }
}
