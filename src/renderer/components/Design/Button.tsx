import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

type Variant = 'primary' | 'secondary' | 'tertiary';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  loading?: boolean;
}

export const Button = ({ variant = 'primary', loading = false, children, className = '', ...props }: PropsWithChildren<Props>) => {
  const variantClass = variant === 'primary' ? 'btn-primary' : variant === 'secondary' ? 'btn-secondary' : 'btn-tertiary';
  return (
    <button
      type="button"
      className={`btn ${variantClass} ${className}`.trim()}
      aria-busy={loading}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? 'Loading…' : children}
    </button>
  );
};
