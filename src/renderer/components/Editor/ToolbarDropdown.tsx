interface ToolbarDropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: Array<{ label: string; value: string }>;
}

export const ToolbarDropdown = ({ value, onChange, options }: ToolbarDropdownProps) => (
  <select value={value} onChange={(event) => onChange(event.target.value)} className="toolbar-dropdown">
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);
