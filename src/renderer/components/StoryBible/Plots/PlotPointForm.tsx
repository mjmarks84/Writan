import React from 'react';
import type { PlotPoint, PlotType } from '../../../types/storyBible';
import { RichTextEditor } from '../Common/RichTextEditor';

const plotTypes: PlotType[] = ['inciting_incident', 'rising_action', 'midpoint', 'climax', 'resolution', 'subplot', 'other'];

export function PlotPointForm({ value, onChange }: { value: PlotPoint; onChange: (next: PlotPoint) => void }) {
  const set = <K extends keyof PlotPoint>(key: K, next: PlotPoint[K]) => onChange({ ...value, [key]: next });

  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <input value={value.title} placeholder="Title" onChange={(e) => set('title', e.target.value)} />
      <select value={value.plotType || 'other'} onChange={(e) => set('plotType', e.target.value as PlotType)}>
        {plotTypes.map((type) => (
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
      <RichTextEditor value={value.description} onChange={(v) => set('description', v)} placeholder="Plot details" />
    </div>
  );
}
