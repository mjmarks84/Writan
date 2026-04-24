export const ConflictResolver = ({ leftLabel, rightLabel }: { leftLabel: string; rightLabel: string }) => (
  <section className="card">
    <h3 style={{ marginTop: 0 }}>Conflict Resolver</h3>
    <p style={{ margin: 0 }}>Compare "{leftLabel}" with "{rightLabel}" and choose merge/replace.</p>
  </section>
);
