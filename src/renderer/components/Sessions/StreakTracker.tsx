export const StreakTracker = ({ current, longest }: { current: number; longest: number }) => (
  <section className="card">
    <h3 style={{ marginTop: 0 }}>Streaks</h3>
    <p style={{ margin: 0 }}>Current: {current} days · Longest: {longest} days</p>
  </section>
);
