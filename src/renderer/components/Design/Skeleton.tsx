export const Skeleton = ({ height = 14 }: { height?: number }) => (
  <div aria-hidden style={{ height, borderRadius: 8, background: 'linear-gradient(90deg, var(--color-surface), var(--color-border), var(--color-surface))', animation: 'fadeIn 300ms ease' }} />
);
