import React from 'react';
import type { TimelineEvent, TimelineEventType } from '../../../types/storyBible';
import { RichTextEditor } from '../Common/RichTextEditor';

const eventTypes: TimelineEventType[] = ['backstory', 'present', 'future', 'prophecy', 'alternate'];

export function TimelineEventForm({ value, onChange }: { value: TimelineEvent; onChange: (next: TimelineEvent) => void }) {
  const set = <K extends keyof TimelineEvent>(key: K, next: TimelineEvent[K]) => onChange({ ...value, [key]: next });

  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <input value={value.title} placeholder="Title" onChange={(e) => set('title', e.target.value)} />
      <input type="date" value={value.eventDate || ''} onChange={(e) => set('eventDate', e.target.value)} />
      <select value={value.eventType || 'present'} onChange={(e) => set('eventType', e.target.value as TimelineEventType)}>
        {eventTypes.map((type) => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>
      <input
        type="range"
        min={1}
        max={10}
        value={value.importance ?? 5}
        onChange={(e) => set('importance', Number(e.target.value))}
      />
      <RichTextEditor value={value.description} onChange={(v) => set('description', v)} placeholder="Event details" />
    </div>
  );
}
