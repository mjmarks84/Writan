export const ZenModeEditor = ({ value, onChange }: { value: string; onChange: (next: string) => void }) => (
  <textarea
    value={value}
    onChange={(event) => onChange(event.target.value)}
    aria-label="Zen editor"
    style={{ width: 'min(900px, 100%)', margin: '0 auto', display: 'block', minHeight: 280, border: 0, outline: 'none', background: 'transparent', fontSize: 18, lineHeight: 1.8 }}
  />
);
