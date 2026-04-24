import { Button } from '../Design/Button';

export const DistractionFreeToggle = ({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) => (
  <Button variant={enabled ? 'secondary' : 'primary'} onClick={onToggle} aria-pressed={enabled}>
    {enabled ? 'Exit Zen Mode' : 'Enter Zen Mode'}
  </Button>
);
