import { AIContext } from '../../shared/types';

export class ContextBuilder {
  build(context: AIContext, contextWindow: number): string {
    const sections = [
      this.buildStoryBibleContext(context),
      this.buildWritingContext(context, contextWindow),
      this.buildProjectContext(context)
    ].filter(Boolean);

    return sections.join('\n\n');
  }

  buildStoryBibleContext(context: AIContext): string {
    const sb = context.storyBible;
    if (!sb) return '';

    return [
      'Story Bible:',
      `Genres: ${(sb.genres ?? []).join(', ')}`,
      `Setting: ${sb.setting ?? ''}`,
      `Characters: ${(sb.characters ?? []).join(', ')}`,
      `Locations: ${(sb.locations ?? []).join(', ')}`,
      `Themes: ${(sb.themes ?? []).join(', ')}`,
      `Timeline: ${(sb.timeline ?? []).join(' | ')}`,
      `Plot summary: ${sb.plotSummary ?? ''}`
    ].join('\n');
  }

  buildWritingContext(context: AIContext, contextWindow: number): string {
    const current = context.writing.currentText ?? '';
    const recent = context.writing.recentText ?? '';
    const clipped = `${recent}\n${current}`.slice(-contextWindow);

    return ['Writing Context:', clipped, `Style analysis: ${context.writing.styleAnalysis ?? 'N/A'}`].join('\n');
  }

  buildProjectContext(context: AIContext): string {
    const project = context.project;
    if (!project) return '';

    return [
      'Project Context:',
      `Audience: ${project.audience ?? ''}`,
      `Goals: ${(project.goals ?? []).join(', ')}`,
      `Status: ${project.status ?? ''}`,
      `Progress: ${project.progress ?? ''}`
    ].join('\n');
  }
}
