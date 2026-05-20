import React from 'react';
import type { TimelineEvent as TimelineEventModel } from '../../../types/storyBible';
import { TimelineEventForm } from './TimelineEventForm';

export function TimelineEvent({ event, onChange, onSave }: { event: TimelineEventModel; onChange: (next: TimelineEventModel) => void; onSave: () => void }) {
  return (
    <section>
      <h3>{event.title || 'New Timeline Event'}</h3>
      <TimelineEventForm value={event} onChange={onChange} />
      <button onClick={onSave} disabled={!event.title.trim()}>Save Event</button>
    </section>
  );
}
