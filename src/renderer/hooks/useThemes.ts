import { useMemo } from 'react';
import type { Theme } from '../types/storyBible';
import { storyBibleStore } from '../store/storyBibleStore';
import { themeService } from '../services/themeService';
import { useStoryBible } from './useStoryBible';

export function useThemes(projectId: string) {
  const state = useStoryBible(projectId);

  return useMemo(
    () => ({
      themes: state.themes,
      saveTheme: async (theme: Theme) => {
        const saved = await themeService.save(theme);
        storyBibleStore.updateTheme(saved);
        return saved;
      },
      deleteTheme: async (id: string) => {
        await themeService.remove(id);
        storyBibleStore.setState({ themes: state.themes.filter((t) => t.id !== id) });
      },
    }),
    [state.themes]
  );
}
