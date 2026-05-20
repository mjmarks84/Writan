import { useMemo } from 'react';
import type { PlotPoint } from '../types/storyBible';
import { storyBibleStore } from '../store/storyBibleStore';
import { plotService } from '../services/plotService';
import { useStoryBible } from './useStoryBible';

export function usePlots(projectId: string) {
  const state = useStoryBible(projectId);

  return useMemo(
    () => ({
      plotPoints: state.plotPoints,
      savePlotPoint: async (plotPoint: PlotPoint) => {
        const saved = await plotService.save(plotPoint);
        storyBibleStore.updatePlotPoint(saved);
        return saved;
      },
      deletePlotPoint: async (id: string) => {
        await plotService.remove(id);
        storyBibleStore.setState({ plotPoints: state.plotPoints.filter((p) => p.id !== id) });
      },
    }),
    [state.plotPoints]
  );
}
