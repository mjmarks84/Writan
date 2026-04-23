import { EditorContent } from '@tiptap/react';
import { useMemo, useState } from 'react';
import { useEditor } from '../../hooks/useEditor';
import { useDocumentOutline } from '../../hooks/useDocumentOutline';
import { useEditorStats } from '../../hooks/useEditorStats';
import { useKeyboardShortcuts } from '../../hooks/useKeyboardShortcuts';
import { EditorToolbar } from './EditorToolbar';
import { EditorStatusBar } from './EditorStatusBar';
import { DocumentOutline } from './DocumentOutline';
import { FindAndReplace } from './FindAndReplace';
import { EditorSettingsPanel } from './EditorSettingsPanel';
import { WritingStatsPanel } from './WritingStatsPanel';
import { DistractionFreeModeToggle } from './DistractionFreeModeToggle';
import { EditorMenu } from './EditorMenu';
import type { EditorSettings } from '../../types/editor';

interface RichTextEditorProps {
  initialContent: string;
}

const defaultSettings: EditorSettings = {
  fontSize: 18,
  lineHeight: 1.6,
  letterSpacing: 0
};

export const RichTextEditor = ({ initialContent }: RichTextEditorProps) => {
  const [autosaveStatus, setAutosaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const [dialog, setDialog] = useState<'none' | 'find' | 'replace'>('none');
  const [settings, setSettings] = useState(defaultSettings);
  const [distractionFree, setDistractionFree] = useState(false);
  const [zenMode, setZenMode] = useState(false);
  const [typewriterMode, setTypewriterMode] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  const editor = useEditor(initialContent, () => {
    setAutosaveStatus('saving');
    window.setTimeout(() => setAutosaveStatus('saved'), 250);
  });

  const stats = useEditorStats(editor);
  const { outline, search, setSearch, jumpToNode } = useDocumentOutline(editor);

  useKeyboardShortcuts(editor, {
    onFind: () => setDialog('find'),
    onReplace: () => setDialog('replace')
  });

  const editorStyle = useMemo(
    () => ({
      fontSize: `${settings.fontSize}px`,
      lineHeight: settings.lineHeight,
      letterSpacing: `${settings.letterSpacing}px`
    }),
    [settings]
  );

  return (
    <main
      className={`rich-editor-layout ${theme} ${distractionFree ? 'distraction-free' : ''} ${zenMode ? 'zen-mode' : ''} ${
        typewriterMode ? 'typewriter-mode' : ''
      }`}
    >
      <EditorMenu
        onToggleTheme={() => setTheme((value) => (value === 'dark' ? 'light' : 'dark'))}
        onToggleZen={() => setZenMode((value) => !value)}
        onToggleTypewriter={() => setTypewriterMode((value) => !value)}
      />
      <EditorToolbar editor={editor} onFind={() => setDialog('find')} onReplace={() => setDialog('replace')} />
      <div className="editor-main-grid">
        <DocumentOutline outline={outline} search={search} onSearchChange={setSearch} onJump={jumpToNode} />
        <section className="editor-content-panel">
          <div style={editorStyle} className="editor-content-wrapper">
            <EditorContent editor={editor} />
          </div>
          <EditorStatusBar stats={stats} autosaveStatus={autosaveStatus} />
        </section>
        <aside className="editor-right-rail">
          <DistractionFreeModeToggle enabled={distractionFree} onToggle={setDistractionFree} />
          <EditorSettingsPanel settings={settings} onChange={setSettings} />
          <WritingStatsPanel stats={stats} />
        </aside>
      </div>
      <FindAndReplace editor={editor} open={dialog === 'find'} mode="find" onClose={() => setDialog('none')} />
      <FindAndReplace editor={editor} open={dialog === 'replace'} mode="replace" onClose={() => setDialog('none')} />
    </main>
  );
};
