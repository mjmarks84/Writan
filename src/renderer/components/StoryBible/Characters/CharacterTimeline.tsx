import React from 'react';
import type { TimelineEvent } from '../../../types/storyBible';

export function CharacterTimeline({ events }: { events: TimelineEvent[] }) {
  const ordered = [...events].sort((a, b) => (a.eventDate || '').localeCompare(b.eventDate || ''));
  return (
    <ol>
      {ordered.map((event) => (
        <li key={event.id}>
          <strong>{event.title}</strong> {event.eventDate ? `(${event.eventDate})` : ''}
        </li>
      ))}
    </ol>
  );
}
