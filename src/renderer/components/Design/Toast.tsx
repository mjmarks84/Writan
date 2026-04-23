interface Props {
  message: string;
  variant?: 'success' | 'error' | 'warning' | 'info';
}

const variantToColorToken: Record<NonNullable<Props['variant']>, string> = {
  success: 'success',
  error: 'danger',
  warning: 'warning',
  info: 'primary'
};

export const Toast = ({ message, variant = 'info' }: Props) => {
  const colorToken = variantToColorToken[variant];
  return (
    <div role="status" className="card" style={{ borderLeft: `4px solid var(--color-${colorToken})` }}>
      {message}
    </div>
  );
};
