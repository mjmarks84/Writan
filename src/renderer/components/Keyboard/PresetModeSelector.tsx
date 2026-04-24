import { Dropdown } from '../Design/Dropdown';

export const PresetModeSelector = ({ value, onChange }: { value: string; onChange: (next: string) => void }) => (
  <Dropdown options={['default', 'vim', 'emacs']} value={value} onChange={onChange} />
);
