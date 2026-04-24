interface Props {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export const Dropdown = ({ options, value, onChange }: Props) => (
  <select value={value} onChange={(event) => onChange(event.target.value)} style={{ padding: 10, borderRadius: 10, border: '1px solid var(--color-border)' }}>
    {options.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </select>
);
