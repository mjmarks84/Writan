import React, { useMemo, useState } from 'react';
import type { TimelineEvent } from '../../../types/storyBible';
import { TimelineBranch } from './TimelineBranch';
import { TimelineZoom } from './TimelineZoom';

export function TimelineView({
  events,
  onSelect,
  onCreate,
}: {
  events: TimelineEvent[];
  onSelect: (event: TimelineEvent) => void;
  onCreate: () => void;
}) {
  const [typeFilter, setTypeFilter] = useState('');
  const [zoom, setZoom] = useState(1);

  const ordered = useMemo(
    () =>
      [...events]
        .filter((event) => !typeFilter || event.eventType === typeFilter)
        .sort((a, b) => (a.eventDate || '').localeCompare(b.eventDate || '')),
    [events, typeFilter]
  );

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        <button onClick={onCreate}>Add Event</button>
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
          <option value="">All event types</option>
          <option value="backstory">backstory</option>
          <option value="present">present</option>
          <option value="future">future</option>
          <option value="prophecy">prophecy</option>
          <option value="alternate">alternate</option>
        </select>
        <TimelineZoom zoom={zoom} onZoom={setZoom} />
      </div>
      <div style={{ fontSize: `${zoom}rem` }}>
        <ol>
          {ordered.map((event) => (
            <li key={event.id}>
              <button onClick={() => onSelect(event)}>
                {event.title} {event.eventDate ? `— ${event.eventDate}` : ''}
              </button>
            </li>
          ))}
        </ol>
      </div>
      <TimelineBranch events={ordered} />
    </div>
  );
}
