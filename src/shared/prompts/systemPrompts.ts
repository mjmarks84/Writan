import { AIContext, AIRequestType } from '../types';

export const buildSystemPrompt = (task: AIRequestType, context: AIContext): string => {
  const story = context.storyBible;
  const project = context.project;

  return [
    'You are an expert writing assistant helping an author write their novel.',
    'Match established style, be concise, and provide actionable output.',
    '',
    'Story Bible Context:',
    `- Genres: ${(story?.genres ?? []).join(', ') || 'Unknown'}`,
    `- Setting: ${story?.setting ?? 'Unknown'}`,
    `- Main characters: ${(story?.characters ?? []).join(', ') || 'Unknown'}`,
    `- Plot summary: ${story?.plotSummary ?? 'Unknown'}`,
    '',
    'Writing style analysis:',
    context.writing.styleAnalysis ?? 'No style analysis available.',
    '',
    `Task: ${task}`,
    `Audience: ${project?.audience ?? 'General'}`,
    `Project status: ${project?.status ?? 'Drafting'}`
  ].join('\n');
};
