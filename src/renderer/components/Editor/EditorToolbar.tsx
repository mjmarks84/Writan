import type { Editor } from '@tiptap/react';
import { ToolbarButton } from './ToolbarButton';
import { ToolbarDropdown } from './ToolbarDropdown';

interface EditorToolbarProps {
  editor: Editor | null;
  onFind: () => void;
  onReplace: () => void;
}

export const EditorToolbar = ({ editor, onFind, onReplace }: EditorToolbarProps) => {
  if (!editor) {
    return null;
  }

  const blockValue = editor.isActive('heading', { level: 1 })
    ? 'h1'
    : editor.isActive('heading', { level: 2 })
      ? 'h2'
      : editor.isActive('heading', { level: 3 })
        ? 'h3'
        : editor.isActive('blockquote')
          ? 'blockquote'
          : editor.isActive('codeBlock')
            ? 'codeBlock'
            : 'paragraph';

  return (
    <div className="editor-toolbar" aria-label="Editor toolbar">
      <ToolbarDropdown
        value={blockValue}
        onChange={(value) => {
          const chain = editor.chain().focus();
          if (value === 'paragraph') {
            chain.setParagraph().run();
          } else if (value === 'blockquote') {
            chain.toggleBlockquote().run();
          } else if (value === 'codeBlock') {
            chain.toggleCodeBlock().run();
          } else {
            chain.toggleHeading({ level: Number(value[1]) as 1 | 2 | 3 }).run();
          }
        }}
        options={[
          { label: 'Paragraph', value: 'paragraph' },
          { label: 'Heading 1', value: 'h1' },
          { label: 'Heading 2', value: 'h2' },
          { label: 'Heading 3', value: 'h3' },
          { label: 'Blockquote', value: 'blockquote' },
          { label: 'Code Block', value: 'codeBlock' }
        ]}
      />
      <ToolbarButton active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()}>
        B
      </ToolbarButton>
      <ToolbarButton active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()}>
        I
      </ToolbarButton>
      <ToolbarButton active={editor.isActive('underline')} onClick={() => editor.chain().focus().toggleUnderline().run()}>
        U
      </ToolbarButton>
      <ToolbarButton
        active={editor.isActive('strike')}
        onClick={() => editor.chain().focus().toggleStrike().run()}
      >
        S
      </ToolbarButton>
      <ToolbarButton active={editor.isActive('code')} onClick={() => editor.chain().focus().toggleCode().run()}>
        {'</>'}
      </ToolbarButton>
      <ToolbarButton
        active={editor.isActive('bulletList')}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        • List
      </ToolbarButton>
      <ToolbarButton
        active={editor.isActive('orderedList')}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        1. List
      </ToolbarButton>
      <ToolbarButton
        active={editor.isActive('taskList')}
        onClick={() => editor.chain().focus().toggleTaskList().run()}
      >
        ☑
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().setHorizontalRule().run()}>—</ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}>
        Table
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('left').run()}>Left</ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('center').run()}>Center</ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('right').run()}>Right</ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('justify').run()}>Justify</ToolbarButton>
      <input
        aria-label="Text color"
        type="color"
        onChange={(event) => editor.chain().focus().setColor(event.target.value).run()}
      />
      <input
        aria-label="Highlight color"
        type="color"
        onChange={(event) => editor.chain().focus().setHighlight({ color: event.target.value }).run()}
      />
      <ToolbarButton onClick={() => editor.chain().focus().undo().run()}>Undo</ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().redo().run()}>Redo</ToolbarButton>
      <ToolbarButton onClick={onFind}>Find</ToolbarButton>
      <ToolbarButton onClick={onReplace}>Replace</ToolbarButton>
    </div>
  );
};
