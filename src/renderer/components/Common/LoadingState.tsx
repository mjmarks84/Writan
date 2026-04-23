import { Skeleton } from '../Design/Skeleton';

export const LoadingState = () => (
  <div className="card" aria-live="polite">
    <Skeleton height={18} />
    <div style={{ height: 8 }} />
    <Skeleton />
  </div>
);
