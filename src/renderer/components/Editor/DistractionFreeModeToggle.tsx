interface DistractionFreeModeToggleProps {
  enabled: boolean;
  onToggle: (value: boolean) => void;
}

export const DistractionFreeModeToggle = ({ enabled, onToggle }: DistractionFreeModeToggleProps) => (
  <label className="distraction-free-toggle">
    <input type="checkbox" checked={enabled} onChange={(event) => onToggle(event.target.checked)} />
    Distraction-free mode
  </label>
);
