import React from 'react';
import type { Character } from '../../../types/storyBible';
import { ImageUpload } from '../Common/ImageUpload';
import { RichTextEditor } from '../Common/RichTextEditor';

export function CharacterForm({ value, onChange }: { value: Character; onChange: (next: Character) => void }) {
  const set = <K extends keyof Character>(key: K, next: Character[K]) => onChange({ ...value, [key]: next });

  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <input value={value.name} placeholder="Name" onChange={(e) => set('name', e.target.value)} />
      <input value={value.role || ''} placeholder="Role" onChange={(e) => set('role', e.target.value)} />
      <input value={value.archetype || ''} placeholder="Archetype" onChange={(e) => set('archetype', e.target.value)} />
      <input
        value={value.age?.toString() || ''}
        placeholder="Age"
        type="number"
        onChange={(e) => set('age', e.target.value ? Number(e.target.value) : undefined)}
      />
      <RichTextEditor value={value.physicalDescription} onChange={(v) => set('physicalDescription', v)} placeholder="Physical appearance" />
      <RichTextEditor value={value.personality} onChange={(v) => set('personality', v)} placeholder="Personality & psychology" />
      <RichTextEditor value={value.background} onChange={(v) => set('background', v)} placeholder="Background and history" />
      <RichTextEditor value={value.motivations} onChange={(v) => set('motivations', v)} placeholder="Goals and motivations" />
      <RichTextEditor value={value.conflicts} onChange={(v) => set('conflicts', v)} placeholder="Conflicts and fears" />
      <ImageUpload value={value.imageUrl} onChange={(v) => set('imageUrl', v)} />
    </div>
  );
}
