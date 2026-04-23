import { useState } from 'react';
import { useKeyboardBindings } from '../../hooks/useKeyboardBindings';
import { ShortcutList } from './ShortcutList';
import { ShortcutEditor } from './ShortcutEditor';
import { PresetModeSelector } from './PresetModeSelector';

export const KeyboardSettings = () => {
  const { shortcuts, updateShortcut } = useKeyboardBindings();
  const [preset, setPreset] = useState('default');

  return (
    <section className="card">
      <h3 style={{ marginTop: 0 }}>Keyboard Settings</h3>
      <PresetModeSelector value={preset} onChange={setPreset} />
      <p style={{ color: 'var(--color-secondary)' }}>Preset: {preset}</p>
      <ShortcutList shortcuts={shortcuts} />
      {shortcuts[0] ? <ShortcutEditor shortcut={shortcuts[0]} onChange={updateShortcut} /> : null}
    </section>
  );
};
