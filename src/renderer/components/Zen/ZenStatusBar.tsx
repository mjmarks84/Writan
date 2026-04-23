export const ZenStatusBar = ({ words, goalPercent, elapsed, clock }: { words: number; goalPercent: number; elapsed: string; clock: string }) => (
  <footer style={{ position: 'sticky', bottom: 0, padding: '8px 16px', background: 'var(--color-surface)', borderTop: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', gap: 16 }}>
    <span>{words} words</span>
    <span>Goal {goalPercent}%</span>
    <span>Session {elapsed}</span>
    <span>{clock}</span>
  </footer>
);
