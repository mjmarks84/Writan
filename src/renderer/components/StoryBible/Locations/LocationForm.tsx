import React from 'react';
import type { Location } from '../../../types/storyBible';
import { ImageUpload } from '../Common/ImageUpload';
import { RichTextEditor } from '../Common/RichTextEditor';

export function LocationForm({ value, onChange }: { value: Location; onChange: (next: Location) => void }) {
  const set = <K extends keyof Location>(key: K, next: Location[K]) => onChange({ ...value, [key]: next });

  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <input value={value.name} placeholder="Name" onChange={(e) => set('name', e.target.value)} />
      <input value={value.type || ''} placeholder="Type" onChange={(e) => set('type', e.target.value)} />
      <input value={value.region || ''} placeholder="Region" onChange={(e) => set('region', e.target.value)} />
      <input value={value.climate || ''} placeholder="Climate" onChange={(e) => set('climate', e.target.value)} />
      <RichTextEditor value={value.description} onChange={(v) => set('description', v)} placeholder="Description" />
      <RichTextEditor value={value.geography} onChange={(v) => set('geography', v)} placeholder="Geography and layout" />
      <RichTextEditor value={value.culture} onChange={(v) => set('culture', v)} placeholder="Culture and society" />
      <ImageUpload value={value.imageUrl} onChange={(v) => set('imageUrl', v)} />
      <input value={value.mapUrl || ''} placeholder="Map URL" onChange={(e) => set('mapUrl', e.target.value)} />
    </div>
  );
}
