interface EditorMenuProps {
  onToggleTheme: () => void;
  onToggleZen: () => void;
  onToggleTypewriter: () => void;
}

export const EditorMenu = ({ onToggleTheme, onToggleZen, onToggleTypewriter }: EditorMenuProps) => (
  <div className="editor-menu">
    <button onClick={onToggleTheme}>Theme</button>
    <button onClick={onToggleZen}>Zen</button>
    <button onClick={onToggleTypewriter}>Typewriter</button>
  </div>
);
