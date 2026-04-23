import type { Theme } from '../types/storyBible';
import { invokeStoryBible } from './storyBibleApi';

export const themeService = {
  list: (projectId: string) => invokeStoryBible<Theme[]>('storyBible:themes:list', projectId),
  save: (theme: Theme) => invokeStoryBible<Theme>('storyBible:themes:save', theme),
  remove: (id: string) => invokeStoryBible<boolean>('storyBible:themes:delete', id),
};
