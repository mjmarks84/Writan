import type { PropsWithChildren } from 'react';

export const Badge = ({ children }: PropsWithChildren) => (
  <span style={{ display: 'inline-block', padding: '2px 8px', borderRadius: 999, background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>{children}</span>
);
