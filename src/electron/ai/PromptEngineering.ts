import { buildSystemPrompt } from '../../shared/prompts/systemPrompts';
import { AIRequest, AISettings } from '../../shared/types';

export class PromptEngineering {
  buildPrompt(request: AIRequest, compiledContext: string, settings: AISettings): string {
    const system = buildSystemPrompt(request.type, request.context);

    return [
      system,
      '',
      'Context window:',
      compiledContext,
      '',
      `Temperature: ${settings.temperature}`,
      `Max tokens: ${settings.maxTokens}`,
      '',
      `User task: ${request.prompt}`
    ].join('\n');
  }
}
