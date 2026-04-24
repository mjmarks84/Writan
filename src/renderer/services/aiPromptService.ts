import { brainstormPrompt } from '../../shared/prompts/brainstormPrompts';
import { dialoguePrompt } from '../../shared/prompts/dialoguePrompts';
import { plotPrompt } from '../../shared/prompts/plotPrompts';
import { suggestionPrompt } from '../../shared/prompts/suggestionPrompts';

export const aiPromptService = {
  brainstorm: brainstormPrompt,
  suggestions: suggestionPrompt,
  plot: plotPrompt,
  dialogue: dialoguePrompt
};
