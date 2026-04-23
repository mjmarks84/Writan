import React from 'react';

export function ImageUpload({ value, onChange }: { value?: string; onChange: (value: string) => void }) {
  return (
    <div>
      <input
        type="url"
        placeholder="Image URL"
        value={value || ''}
        onChange={(event) => onChange(event.target.value)}
        style={{ width: '100%' }}
      />
      {value ? <img src={value} alt="entity" style={{ width: '100%', marginTop: 8, borderRadius: 8 }} /> : null}
    </div>
  );
}
