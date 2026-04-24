import type { InputHTMLAttributes } from 'react';

export const Input = ({ className = '', ...props }: InputHTMLAttributes<HTMLInputElement>) => (
  <input
    className={`input ${className}`.trim()}
    style={{ width: '100%', borderRadius: 10, border: '1px solid var(--color-border)', padding: '10px 12px' }}
    {...props}
  />
);
