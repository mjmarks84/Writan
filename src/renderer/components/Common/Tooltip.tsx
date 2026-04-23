import type { PropsWithChildren } from 'react';

interface TooltipProps extends PropsWithChildren {
  text: string;
}

export const Tooltip = ({ text, children }: TooltipProps) => (
  <span className="tooltip" aria-label={text} title={text}>
    {children}
  </span>
);
