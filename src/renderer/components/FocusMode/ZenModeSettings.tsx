import type { FocusModeConfig, FocusHighlight } from '../../types/focusMode';

interface ZenModeSettingsProps {
  config: FocusModeConfig;
  onUpdate: (partial: Partial<FocusModeConfig>) => void;
  onClose: () => void;
  onExit: () => void;
}

const BG_PRESETS = [
  { label: 'Dark', value: '#1a1a2e' },
  { label: 'Ink', value: '#0d0d0d' },
  { label: 'Sepia', value: '#2d2416' },
  { label: 'Light', value: '#f5f0e8' },
  { label: 'Parchment', value: '#fdf6e3' }
];

export function ZenModeSettings({ config, onUpdate, onClose, onExit }: ZenModeSettingsProps) {
  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/60">
      <div
        className="w-96 rounded-lg p-6 shadow-2xl"
        style={{ backgroundColor: config.backgroundColor, color: config.textColor, border: `1px solid ${config.textColor}30` }}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Focus Mode Settings</h2>
          <button onClick={onClose} className="opacity-60 hover:opacity-100 text-xl leading-none">×</button>
        </div>

        <div className="space-y-4 text-sm">
          {/* Background */}
          <div>
            <label className="block mb-1 opacity-70">Background</label>
            <div className="flex gap-2 flex-wrap">
              {BG_PRESETS.map((p) => (
                <button
                  key={p.value}
                  title={p.label}
                  onClick={() => onUpdate({ backgroundColor: p.value })}
                  className="w-8 h-8 rounded-full border-2 transition-transform hover:scale-110"
                  style={{
                    backgroundColor: p.value,
                    borderColor: config.backgroundColor === p.value ? config.textColor : 'transparent'
                  }}
                />
              ))}
              <input
                type="color"
                value={config.backgroundColor}
                onChange={(e) => onUpdate({ backgroundColor: e.target.value })}
                className="w-8 h-8 rounded-full cursor-pointer border-0 bg-transparent"
                title="Custom color"
              />
            </div>
          </div>

          {/* Font size */}
          <div>
            <label className="block mb-1 opacity-70">Font Size: {config.fontSize}px</label>
            <input
              type="range" min={14} max={32} value={config.fontSize}
              onChange={(e) => onUpdate({ fontSize: Number(e.target.value) })}
              className="w-full accent-current"
            />
          </div>

          {/* Focus highlight */}
          <div>
            <label className="block mb-1 opacity-70">Focus Highlight</label>
            <div className="flex gap-2">
              {(['paragraph', 'sentence', 'none'] as FocusHighlight[]).map((v) => (
                <button
                  key={v}
                  onClick={() => onUpdate({ focusHighlight: v })}
                  className="rounded px-3 py-1 capitalize transition-opacity"
                  style={{
                    opacity: config.focusHighlight === v ? 1 : 0.5,
                    border: `1px solid ${config.textColor}40`
                  }}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          {/* Dim opacity */}
          <div>
            <label className="block mb-1 opacity-70">Dim Opacity: {Math.round(config.dimOpacity * 100)}%</label>
            <input
              type="range" min={0} max={80} value={Math.round(config.dimOpacity * 100)}
              onChange={(e) => onUpdate({ dimOpacity: Number(e.target.value) / 100 })}
              className="w-full accent-current"
            />
          </div>

          {/* Auto-hide */}
          <div>
            <label className="block mb-1 opacity-70">Auto-hide UI: {config.autoHideMs / 1000}s</label>
            <input
              type="range" min={5} max={30} step={5} value={config.autoHideMs / 1000}
              onChange={(e) => onUpdate({ autoHideMs: Number(e.target.value) * 1000 })}
              className="w-full accent-current"
            />
          </div>

          {/* Typewriter mode */}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={config.typewriterMode}
              onChange={(e) => onUpdate({ typewriterMode: e.target.checked })}
            />
            <span>Typewriter mode</span>
          </label>
        </div>

        <div className="mt-6 flex gap-2 justify-end">
          <button
            onClick={onClose}
            className="rounded px-4 py-2 text-sm transition-opacity opacity-70 hover:opacity-100"
            style={{ border: `1px solid ${config.textColor}40` }}
          >
            Resume Writing
          </button>
          <button
            onClick={onExit}
            className="rounded px-4 py-2 text-sm transition-opacity opacity-70 hover:opacity-100"
            style={{ border: `1px solid ${config.textColor}40` }}
          >
            Exit Focus Mode
          </button>
        </div>
      </div>
    </div>
  );
}
