import { AIProviderConfig } from '../../../shared/types';
import { OllamaProvider } from './OllamaProvider';

export class Llama2Provider extends OllamaProvider {
  constructor(config: AIProviderConfig) {
    super({ ...config, model: config.model ?? 'llama2' });
  }
}
