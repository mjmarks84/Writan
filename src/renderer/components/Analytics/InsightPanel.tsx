export interface Insight {
  id: string;
  severity: 'low' | 'medium' | 'high';
  message: string;
}

export const InsightPanel = ({ insights }: { insights: Insight[] }) => (
  <section className="card" aria-live="polite">
    <h3 style={{ marginTop: 0 }}>Insights</h3>
    <ul style={{ margin: 0, paddingLeft: 18 }}>
      {insights.map((insight) => (
        <li key={insight.id}>
          <strong>[{insight.severity}]</strong> {insight.message}
        </li>
      ))}
    </ul>
  </section>
);
