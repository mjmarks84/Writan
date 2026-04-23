import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

interface ToolbarButtonProps extends PropsWithChildren, ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

export const ToolbarButton = ({ active, children, ...rest }: ToolbarButtonProps) => (
  <button type="button" className={`toolbar-button ${active ? 'active' : ''}`} {...rest}>
    {children}
  </button>
);
