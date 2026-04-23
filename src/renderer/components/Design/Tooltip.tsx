import type { PropsWithChildren } from 'react';

export const Tooltip = ({ children, text }: PropsWithChildren<{ text: string }>) => (
  <span title={text} aria-label={text}>
    {children}
  </span>
);
