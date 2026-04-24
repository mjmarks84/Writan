interface Props {
  tabs: string[];
  value: string;
  onChange: (value: string) => void;
}

export const Tabs = ({ tabs, value, onChange }: Props) => (
  <div role="tablist" aria-label="Tabs" style={{ display: 'flex', gap: 8 }}>
    {tabs.map((tab) => (
      <button key={tab} role="tab" aria-selected={tab === value} className="btn btn-secondary" onClick={() => onChange(tab)}>
        {tab}
      </button>
    ))}
  </div>
);
