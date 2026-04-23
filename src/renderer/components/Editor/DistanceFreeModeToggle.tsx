interface DistanceFreeModeToggleProps {
  enabled: boolean;
  onToggle: (value: boolean) => void;
}

export const DistanceFreeModeToggle = ({ enabled, onToggle }: DistanceFreeModeToggleProps) => (
  <label className="distance-free-toggle">
    <input type="checkbox" checked={enabled} onChange={(event) => onToggle(event.target.checked)} />
    Distraction-free mode
  </label>
);
