import { useMemo, useState } from 'react';
import type { Editor } from '@tiptap/react';
import { Modal } from '../Common/Modal';
import { applyReplaceToEditor, findMatches } from '../../services/editorService';

interface FindAndReplaceProps {
  editor: Editor | null;
  open: boolean;
  mode: 'find' | 'replace';
  onClose: () => void;
}

export const FindAndReplace = ({ editor, open, mode, onClose }: FindAndReplaceProps) => {
  const [query, setQuery] = useState('');
  const [replaceValue, setReplaceValue] = useState('');
  const [useRegex, setUseRegex] = useState(false);
  const text = editor?.getText() ?? '';

  const matches = useMemo(() => findMatches(text, query, useRegex), [query, text, useRegex]);

  return (
    <Modal open={open} title={mode === 'find' ? 'Find' : 'Find & Replace'} onClose={onClose}>
      <label>
        Find
        <input value={query} onChange={(event) => setQuery(event.target.value)} autoFocus />
      </label>
      {mode === 'replace' ? (
        <label>
          Replace with
          <input value={replaceValue} onChange={(event) => setReplaceValue(event.target.value)} />
        </label>
      ) : null}
      <label>
        <input type="checkbox" checked={useRegex} onChange={(event) => setUseRegex(event.target.checked)} />
        Regex
      </label>
      <p>{matches.length} matches</p>
      {mode === 'replace' ? (
        <div className="find-actions">
          <button
            onClick={() => editor && applyReplaceToEditor(editor, query, replaceValue, useRegex, false)}
            disabled={!query}
          >
            Replace Next
          </button>
          <button onClick={() => editor && applyReplaceToEditor(editor, query, replaceValue, useRegex, true)} disabled={!query}>
            Replace All
          </button>
        </div>
      ) : null}
    </Modal>
  );
};
