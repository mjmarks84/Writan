export const ProgressBar = ({ value }: { value: number }) => (
  <div aria-label="Progress" style={{ width: '100%', height: 10, background: 'var(--color-border)', borderRadius: 999 }}>
    <div style={{ width: `${Math.max(0, Math.min(100, value))}%`, height: '100%', background: 'var(--color-primary)', borderRadius: 999, transition: 'width 200ms ease' }} />
  </div>
);
