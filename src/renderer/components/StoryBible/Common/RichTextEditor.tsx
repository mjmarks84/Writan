import React from 'react';

export function RichTextEditor({ value, onChange, placeholder }: { value?: string; onChange: (value: string) => void; placeholder?: string }) {
  return (
    <textarea
      value={value || ''}
      placeholder={placeholder || 'Write notes...'}
      onChange={(event) => onChange(event.target.value)}
      style={{ width: '100%', minHeight: 120 }}
    />
  );
}
