import { AIProviderId } from './ai';

export interface AIProviderOption {
  id: AIProviderId;
  label: string;
  defaultEndpoint: string;
}

export const AI_PROVIDER_OPTIONS: AIProviderOption[] = [
  { id: 'ollama', label: 'Ollama', defaultEndpoint: 'http://localhost:11434' },
  { id: 'lmstudio', label: 'LM Studio', defaultEndpoint: 'http://localhost:1234' },
  { id: 'llama.cpp', label: 'llama.cpp', defaultEndpoint: 'http://localhost:8080' },
  { id: 'gpt4all', label: 'GPT4All', defaultEndpoint: 'http://localhost:4891' }
];
