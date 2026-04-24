import { useCallback, useEffect, useRef, useState } from 'react';
import type { FocusModeConfig } from '../../types/focusMode';
import { useDocumentStore } from '../../store/documentStore';
import { useInactivityHide } from '../../hooks/useInactivityHide';
import { ZenStatusBar } from './ZenStatusBar';
import { ZenModeSettings } from './ZenModeSettings';

interface ZenEditorProps {
  config: FocusModeConfig;
  onUpdateConfig: (partial: Partial<FocusModeConfig>) => void;
  showSettings: boolean;
  onShowSettings: (show: boolean) => void;
  onExit: () => void;
  sessionElapsedSec?: number;
  sessionGoal?: number;
}

export function ZenEditor({ config, onUpdateConfig, showSettings, onShowSettings, onExit, sessionElapsedSec, sessionGoal }: ZenEditorProps) {
  const { document: doc, setContent } = useDocumentStore();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [focusedParagraph, setFocusedParagraph] = useState(0);

  const { hidden: uiHidden, show: showUI } = useInactivityHide(config.autoHideMs, true);

  const wordCount = doc.content.trim().split(/\s+/).filter(Boolean).length;

  // Focus textarea on mount
  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  // Typewriter mode: scroll current line to center
  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    if (config.typewriterMode && textareaRef.current) {
      const el = textareaRef.current;
      const lineHeight = parseInt(getComputedStyle(el).lineHeight) || 28;
      const cursorPos = el.selectionStart;
      const textUpToCursor = e.target.value.slice(0, cursorPos);
      const lines = textUpToCursor.split('\n').length;
      const scrollTop = (lines - 1) * lineHeight - el.clientHeight / 2 + lineHeight;
      el.scrollTop = Math.max(0, scrollTop);
    }
    // Update focused paragraph index
    const cursorPos = e.target.value.slice(0, e.currentTarget.selectionStart).split('\n\n').length - 1;
    setFocusedParagraph(cursorPos);
  }, [setContent, config.typewriterMode]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onShowSettings(true);
    }
  }, [onShowSettings]);

  const paragraphs = doc.content.split('\n\n');

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col overflow-hidden"
      style={{ backgroundColor: config.backgroundColor, color: config.textColor }}
      onMouseMove={showUI}
    >
      {/* Settings overlay */}
      {showSettings && (
        <ZenModeSettings
          config={config}
          onUpdate={onUpdateConfig}
          onClose={() => onShowSettings(false)}
          onExit={onExit}
        />
      )}

      {/* Top bar - auto-hide */}
      <div
        className="flex items-center justify-between px-6 py-3 transition-opacity duration-500"
        style={{ opacity: uiHidden ? 0 : 1 }}
      >
        <span className="text-sm font-medium opacity-60">{doc.title}</span>
        <div className="flex items-center gap-3">
          <button
            className="rounded px-3 py-1 text-sm opacity-60 hover:opacity-100 transition-opacity"
            style={{ border: `1px solid ${config.textColor}40` }}
            onClick={() => onShowSettings(true)}
          >
            Settings
          </button>
          <button
            className="rounded px-3 py-1 text-sm opacity-60 hover:opacity-100 transition-opacity"
            style={{ border: `1px solid ${config.textColor}40` }}
            onClick={onExit}
          >
            Exit Focus Mode
          </button>
        </div>
      </div>

      {/* Main writing area */}
      <div className="flex-1 overflow-y-auto flex justify-center">
        <div style={{ width: config.maxWidth, maxWidth: '100%', padding: '2rem 1rem' }}>
          {config.focusHighlight !== 'none' ? (
            // Rendered paragraphs with dimming for non-focused ones
            <div
              style={{ fontSize: config.fontSize, lineHeight: config.lineHeight }}
              onClick={() => textareaRef.current?.focus()}
            >
              {paragraphs.map((para, i) => (
                <p
                  key={i}
                  style={{
                    opacity: i === focusedParagraph ? 1 : config.dimOpacity,
                    transition: 'opacity 0.2s',
                    marginBottom: '1.5em',
                    whiteSpace: 'pre-wrap',
                    outline: 'none'
                  }}
                >
                  {para || '\u00A0'}
                </p>
              ))}
              {/* Hidden textarea for actual editing */}
              <textarea
                ref={textareaRef}
                className="absolute opacity-0 pointer-events-none"
                value={doc.content}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                style={{ width: 1, height: 1 }}
              />
            </div>
          ) : (
            <textarea
              ref={textareaRef}
              className="w-full resize-none bg-transparent outline-none"
              style={{
                fontSize: config.fontSize,
                lineHeight: config.lineHeight,
                color: config.textColor,
                minHeight: '80vh'
              }}
              value={doc.content}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="Start writing..."
            />
          )}
        </div>
      </div>

      {/* Status bar */}
      <ZenStatusBar
        wordCount={wordCount}
        sessionGoal={sessionGoal}
        elapsedSec={sessionElapsedSec}
        hidden={uiHidden}
        textColor={config.textColor}
        backgroundColor={config.backgroundColor}
      />
    </div>
  );
}
