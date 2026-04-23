export const ChangeTracker = ({ inserts, deletes }: { inserts: number; deletes: number }) => (
  <section className="card">
    <h3 style={{ marginTop: 0 }}>Change Tracker</h3>
    <p style={{ margin: 0 }}>+{inserts} insertions / -{deletes} deletions</p>
  </section>
);
