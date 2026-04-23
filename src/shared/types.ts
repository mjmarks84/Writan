export type AIProviderId = 'ollama' | 'lmstudio' | 'llama.cpp' | 'gpt4all';

export type AITabId =
  | 'brainstorm'
  | 'suggestions'
  | 'prompts'
  | 'plot'
  | 'character'
  | 'settings';

export type AIRequestType =
  | 'brainstorm'
  | 'suggestions'
  | 'prompt'
  | 'plot'
  | 'dialogue'
  | 'analysis';

export interface AIProviderConfig {
  id: AIProviderId;
  endpoint: string;
  model?: string;
  enabled: boolean;
  timeoutMs: number;
}

export interface AISettings {
  selectedProvider: AIProviderId;
  selectedModel: string;
  localOnlyMode: boolean;
  temperature: number;
  maxTokens: number;
  timeoutMs: number;
  contextWindow: number;
  rateLimitPerMinute: number;
  endpoints: Record<AIProviderId, string>;
}

export interface StoryBibleContext {
  genres?: string[];
  setting?: string;
  characters?: string[];
  plotSummary?: string;
  locations?: string[];
  themes?: string[];
  timeline?: string[];
}

export interface WritingContext {
  currentText: string;
  recentText?: string;
  styleAnalysis?: string;
}

export interface ProjectContext {
  audience?: string;
  goals?: string[];
  status?: string;
  progress?: string;
}

export interface AIContext {
  storyBible?: StoryBibleContext;
  writing: WritingContext;
  project?: ProjectContext;
}

export interface AIRequest {
  type: AIRequestType;
  prompt: string;
  context: AIContext;
  requestId?: string;
}

export interface AISuggestion {
  id: string;
  text: string;
  score?: number;
  used?: boolean;
}

export interface AIResponse {
  requestId: string;
  provider: AIProviderId;
  model: string;
  content: string;
  suggestions?: AISuggestion[];
  createdAt: string;
  latencyMs?: number;
  cached?: boolean;
}

export interface AIConnectionStatus {
  provider: AIProviderId;
  available: boolean;
  healthy: boolean;
  message: string;
  models: string[];
  endpoint: string;
}
