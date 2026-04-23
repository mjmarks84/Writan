export const Avatar = ({ name }: { name: string }) => (
  <span aria-label={name} style={{ display: 'inline-grid', placeItems: 'center', width: 30, height: 30, borderRadius: '50%', background: 'var(--color-primary)', color: 'white', fontWeight: 700 }}>
    {name.slice(0, 1).toUpperCase()}
  </span>
);
