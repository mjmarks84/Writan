import type { DocumentOutlineNode } from '../../types/editor';

interface DocumentOutlineProps {
  outline: DocumentOutlineNode[];
  search: string;
  onSearchChange: (value: string) => void;
  onJump: (node: DocumentOutlineNode) => void;
}

export const DocumentOutline = ({ outline, search, onSearchChange, onJump }: DocumentOutlineProps) => (
  <aside className="document-outline" aria-label="Document outline">
    <h3>Outline</h3>
    <input
      value={search}
      onChange={(event) => onSearchChange(event.target.value)}
      placeholder="Search chapters/scenes"
      aria-label="Search outline"
    />
    <ul>
      {outline.map((node) => (
        <li key={node.id} style={{ marginLeft: `${Math.max(0, node.level - 1) * 12}px` }}>
          <button onClick={() => onJump(node)}>
            {node.type === 'chapter' ? '📘' : '📝'} {node.title}
          </button>
        </li>
      ))}
    </ul>
  </aside>
);
