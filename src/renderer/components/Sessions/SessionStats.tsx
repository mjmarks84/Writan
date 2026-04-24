export const SessionStats = ({ count, avgMinutes, avgWpm }: { count: number; avgMinutes: number; avgWpm: number }) => (
  <section className="card">
    <h3 style={{ marginTop: 0 }}>Session Stats</h3>
    <p style={{ margin: 0 }}>Sessions: {count} · Avg length: {avgMinutes}m · Avg productivity: {avgWpm} wpm</p>
  </section>
);
