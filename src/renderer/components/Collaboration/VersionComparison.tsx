export const VersionComparison = ({ leftName, rightName }: { leftName: string; rightName: string }) => (
  <section className="card">
    <h3 style={{ marginTop: 0 }}>Version Comparison</h3>
    <p style={{ margin: 0 }}>Comparing {leftName} ↔ {rightName}</p>
  </section>
);
