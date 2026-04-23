import { AISettings } from './types';

export const RECOMMENDED_MODELS = {
  generalWriting: ['mistral', 'neural-chat', 'openchat'],
  creativeWriting: ['dolphin-mixtral', 'hermes'],
  instructionFollowing: ['openchat', 'neural-chat'],
  speed: ['orca-mini', 'phi'],
  quality: ['mistral:7b', 'hermes-2-pro']
} as const;

export const DEFAULT_AI_SETTINGS: AISettings = {
  selectedProvider: 'ollama',
  selectedModel: 'mistral',
  localOnlyMode: true,
  temperature: 0.7,
  maxTokens: 512,
  timeoutMs: 20000,
  contextWindow: 4000,
  rateLimitPerMinute: 20,
  endpoints: {
    ollama: 'http://localhost:11434',
    lmstudio: 'http://localhost:1234',
    'llama.cpp': 'http://localhost:8080',
    gpt4all: 'http://localhost:4891'
  }
};
