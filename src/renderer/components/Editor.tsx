import React from 'react';

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

export const Editor = ({ value, onChange }: EditorProps) => {
  return (
    <section
      aria-label="editor"
      style={{ border: '1px solid #d0d7de', borderRadius: 8, padding: 12 }}
    >
      <header style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
        <button type="button" aria-label="bold">
          B
        </button>
        <button type="button" aria-label="italic">
          I
        </button>
      </header>
      <textarea
        aria-label="editor-input"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        style={{ width: '100%', minHeight: 120, padding: 8, borderRadius: 6 }}
      />
    </section>
  );
};
