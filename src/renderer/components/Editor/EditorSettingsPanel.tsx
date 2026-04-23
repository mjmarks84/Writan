import type { EditorSettings } from '../../types/editor';

interface EditorSettingsPanelProps {
  settings: EditorSettings;
  onChange: (settings: EditorSettings) => void;
}

export const EditorSettingsPanel = ({ settings, onChange }: EditorSettingsPanelProps) => (
  <section className="editor-settings-panel" aria-label="Editor settings">
    <h3>Editor Settings</h3>
    <label>
      Font size
      <input
        type="number"
        min={12}
        max={32}
        value={settings.fontSize}
        onChange={(event) => onChange({ ...settings, fontSize: Number(event.target.value) })}
      />
    </label>
    <label>
      Line height
      <input
        type="number"
        min={1}
        max={3}
        step={0.1}
        value={settings.lineHeight}
        onChange={(event) => onChange({ ...settings, lineHeight: Number(event.target.value) })}
      />
    </label>
    <label>
      Letter spacing
      <input
        type="number"
        min={0}
        max={3}
        step={0.1}
        value={settings.letterSpacing}
        onChange={(event) => onChange({ ...settings, letterSpacing: Number(event.target.value) })}
      />
    </label>
  </section>
);
