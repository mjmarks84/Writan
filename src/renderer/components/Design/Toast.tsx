interface Props {
  message: string;
  variant?: 'success' | 'error' | 'warning' | 'info';
}

export const Toast = ({ message, variant = 'info' }: Props) => (
  <div role="status" className="card" style={{ borderLeft: `4px solid var(--color-${variant === 'error' ? 'danger' : variant})` }}>
    {message}
  </div>
);
