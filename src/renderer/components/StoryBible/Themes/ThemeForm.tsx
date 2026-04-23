import React from 'react';
import type { Theme } from '../../../types/storyBible';
import { RichTextEditor } from '../Common/RichTextEditor';

export function ThemeForm({ value, onChange }: { value: Theme; onChange: (next: Theme) => void }) {
  const set = <K extends keyof Theme>(key: K, next: Theme[K]) => onChange({ ...value, [key]: next });

  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <input value={value.name} placeholder="Theme name" onChange={(e) => set('name', e.target.value)} />
      <input type="color" value={value.color || '#6366f1'} onChange={(e) => set('color', e.target.value)} />
      <RichTextEditor value={value.description} onChange={(v) => set('description', v)} placeholder="Core concept" />
      <RichTextEditor value={value.thematicElements} onChange={(v) => set('thematicElements', v)} placeholder="Thematic elements" />
      <RichTextEditor value={value.symbolism} onChange={(v) => set('symbolism', v)} placeholder="Symbolism" />
    </div>
  );
}
