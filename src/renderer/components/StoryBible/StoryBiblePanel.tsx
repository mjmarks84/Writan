import React, { useMemo, useState } from 'react';
import { useCharacters } from '../../hooks/useCharacters';
import { useCrossReferences } from '../../hooks/useCrossReferences';
import { useLocations } from '../../hooks/useLocations';
import { usePlots } from '../../hooks/usePlots';
import { useStoryBible } from '../../hooks/useStoryBible';
import { useThemes } from '../../hooks/useThemes';
import { useTimeline } from '../../hooks/useTimeline';
import type { Character, Location, PlotPoint, Theme, TimelineEvent } from '../../types/storyBible';
import { CharacterList } from './Characters/CharacterList';
import { CharacterProfile } from './Characters/CharacterProfile';
import { CharacterRelationshipMap } from './Characters/CharacterRelationshipMap';
import { DataExportDialog } from './Export/DataExportDialog';
import { LocationList } from './Locations/LocationList';
import { LocationProfile } from './Locations/LocationProfile';
import { PlotOutline } from './Plots/PlotOutline';
import { PlotPointEditor } from './Plots/PlotPointEditor';
import { CrossReferencePanel } from './Search/CrossReferencePanel';
import { StoryBibleSearch } from './Search/StoryBibleSearch';
import { ThemeEditor } from './Themes/ThemeEditor';
import { ThemeList } from './Themes/ThemeList';
import { TimelineEvent as TimelineEventEditor } from './Timeline/TimelineEvent';
import { TimelineView } from './Timeline/TimelineView';

type Tab = 'characters' | 'locations' | 'plots' | 'timeline' | 'themes';

const uuid = () => (typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`);

export function StoryBiblePanel({ projectId }: { projectId: string }) {
  const { timelineEvents, stats } = useStoryBible(projectId);
  const { characters, relationships, saveCharacter } = useCharacters(projectId);
  const { locations, saveLocation } = useLocations(projectId);
  const { plotPoints, savePlotPoint } = usePlots(projectId);
  const { timelineEvents: orderedEvents, saveTimelineEvent } = useTimeline(projectId);
  const { themes, saveTheme } = useThemes(projectId);
  const { crossReferences } = useCrossReferences(projectId);

  const [tab, setTab] = useState<Tab>('characters');
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [selectedPlot, setSelectedPlot] = useState<PlotPoint | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);

  const recentItems = useMemo(
    () =>
      [...characters, ...locations, ...plotPoints, ...timelineEvents, ...themes]
        .sort((a, b) => (b.updatedAt || '').localeCompare(a.updatedAt || ''))
        .slice(0, 5),
    [characters, locations, plotPoints, timelineEvents, themes]
  );

  return (
    <aside style={{ display: 'grid', gap: 12 }}>
      <header>
        <h2>Story Bible</h2>
        <small>
          Characters: {stats.characters} • Locations: {stats.locations} • Plot: {stats.plotPoints} • Timeline: {stats.timelineEvents} • Themes:{' '}
          {stats.themes}
        </small>
      </header>

      <StoryBibleSearch projectId={projectId} />

      <nav style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {(['characters', 'locations', 'plots', 'timeline', 'themes'] as Tab[]).map((item) => (
          <button key={item} onClick={() => setTab(item)} aria-pressed={tab === item}>
            {item}
          </button>
        ))}
      </nav>

      {tab === 'characters' ? (
        <>
          <CharacterList
            characters={characters}
            onSelect={setSelectedCharacter}
            onCreate={() =>
              setSelectedCharacter({
                id: uuid(),
                projectId,
                name: '',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                status: 'alive',
              })
            }
          />
          {selectedCharacter ? (
            <CharacterProfile
              character={selectedCharacter}
              timelineEvents={orderedEvents}
              onChange={setSelectedCharacter}
              onSave={() => saveCharacter(selectedCharacter)}
            />
          ) : null}
          <CharacterRelationshipMap characters={characters} relationships={relationships} />
        </>
      ) : null}

      {tab === 'locations' ? (
        <>
          <LocationList
            locations={locations}
            onSelect={setSelectedLocation}
            onCreate={() =>
              setSelectedLocation({
                id: uuid(),
                projectId,
                name: '',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              })
            }
          />
          {selectedLocation ? (
            <LocationProfile
              location={selectedLocation}
              allLocations={locations}
              onChange={setSelectedLocation}
              onSave={() => saveLocation(selectedLocation)}
            />
          ) : null}
        </>
      ) : null}

      {tab === 'plots' ? (
        <>
          <PlotOutline
            plotPoints={plotPoints}
            onSelect={setSelectedPlot}
            onCreate={() =>
              setSelectedPlot({
                id: uuid(),
                projectId,
                title: '',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                importance: 5,
              })
            }
          />
          {selectedPlot ? <PlotPointEditor plotPoint={selectedPlot} onChange={setSelectedPlot} onSave={() => savePlotPoint(selectedPlot)} /> : null}
        </>
      ) : null}

      {tab === 'timeline' ? (
        <>
          <TimelineView
            events={orderedEvents}
            onSelect={setSelectedEvent}
            onCreate={() =>
              setSelectedEvent({
                id: uuid(),
                projectId,
                title: '',
                eventType: 'present',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              })
            }
          />
          {selectedEvent ? <TimelineEventEditor event={selectedEvent} onChange={setSelectedEvent} onSave={() => saveTimelineEvent(selectedEvent)} /> : null}
        </>
      ) : null}

      {tab === 'themes' ? (
        <>
          <ThemeList
            themes={themes}
            onSelect={setSelectedTheme}
            onCreate={() =>
              setSelectedTheme({
                id: uuid(),
                projectId,
                name: '',
                color: '#6366f1',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              })
            }
          />
          {selectedTheme ? <ThemeEditor theme={selectedTheme} onChange={setSelectedTheme} onSave={() => saveTheme(selectedTheme)} /> : null}
        </>
      ) : null}

      <CrossReferencePanel references={crossReferences} />

      <DataExportDialog
        payload={{
          projectId,
          characters,
          locations,
          plotPoints,
          timelineEvents,
          themes,
        }}
      />

      <section>
        <h4>Recent Items</h4>
        <ul>
          {recentItems.map((item) => (
            <li key={item.id}>{'name' in item ? item.name : item.title}</li>
          ))}
        </ul>
      </section>
    </aside>
  );
}
