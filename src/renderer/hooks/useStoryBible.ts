import { useEffect, useMemo, useState } from 'react';
import type { StoryBibleState } from '../types/storyBible';
import { storyBibleStore } from '../store/storyBibleStore';
import { characterService } from '../services/characterService';
import { crossReferenceService } from '../services/crossReferenceService';
import { locationService } from '../services/locationService';
import { plotService } from '../services/plotService';
import { themeService } from '../services/themeService';
import { timelineService } from '../services/timelineService';

export function useStoryBible(projectId: string) {
  const [state, setState] = useState<StoryBibleState>(storyBibleStore.getState());
  const [loading, setLoading] = useState(false);

  useEffect(() => storyBibleStore.subscribe(setState), []);

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    Promise.all([
      characterService.list(projectId),
      characterService.listRelationships(projectId),
      locationService.list(projectId),
      plotService.list(projectId),
      timelineService.list(projectId),
      themeService.list(projectId),
      crossReferenceService.list(projectId),
    ])
      .then(([characters, relationships, locations, plotPoints, timelineEvents, themes, crossReferences]) => {
        if (!mounted) return;
        storyBibleStore.setState({
          characters,
          relationships,
          locations,
          plotPoints,
          timelineEvents,
          themes,
          crossReferences,
        });
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [projectId]);

  const stats = useMemo(
    () => ({
      characters: state.characters.length,
      locations: state.locations.length,
      plotPoints: state.plotPoints.length,
      timelineEvents: state.timelineEvents.length,
      themes: state.themes.length,
    }),
    [state]
  );

  const validationIssues = useMemo(() => {
    const issues: Array<{ id: string; message: string; level: 'warning' | 'error' }> = [];

    state.relationships.forEach((relationship) => {
      if (relationship.character1Id === relationship.character2Id) {
        issues.push({
          id: `self-${relationship.id}`,
          level: 'error',
          message: 'Character relationship cannot reference the same character on both sides.',
        });
      }
    });

    state.timelineEvents.forEach((event) => {
      if (event.eventDate && Number.isNaN(Date.parse(event.eventDate))) {
        issues.push({
          id: `invalid-date-${event.id}`,
          level: 'warning',
          message: `Timeline event "${event.title}" has an invalid date value.`,
        });
      }
    });

    return issues;
  }, [state.relationships, state.timelineEvents]);

  return { ...state, stats, loading, validationIssues };
}
