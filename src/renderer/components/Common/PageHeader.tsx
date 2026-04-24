export const PageHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <header style={{ marginBottom: 16 }}>
    <h1 style={{ margin: 0 }}>{title}</h1>
    {subtitle ? <p style={{ margin: '6px 0 0', color: 'var(--color-secondary)' }}>{subtitle}</p> : null}
  </header>
);
