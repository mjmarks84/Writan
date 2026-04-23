import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

type Variant = 'primary' | 'secondary' | 'tertiary';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  loading?: boolean;
}

export const Button = ({ variant = 'primary', loading = false, children, className = '', ...props }: PropsWithChildren<Props>) => (
  <button
    type="button"
    className={`btn ${variant === 'primary' ? 'btn-primary' : 'btn-secondary'} ${className}`.trim()}
    aria-busy={loading}
    disabled={loading || props.disabled}
    {...props}
  >
    {loading ? 'Loading…' : children}
  </button>
);
