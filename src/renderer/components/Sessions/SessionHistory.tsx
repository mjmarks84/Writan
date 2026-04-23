import type { WritingSession } from '../../../shared/types';

export const SessionHistory = ({ sessions }: { sessions: WritingSession[] }) => (
  <section className="card">
    <h3 style={{ marginTop: 0 }}>Session History</h3>
    <ul style={{ margin: 0, paddingLeft: 18 }}>
      {sessions.map((session) => (
        <li key={session.id}>{new Date(session.startTime).toLocaleString()} · {session.wordsWritten} words</li>
      ))}
    </ul>
  </section>
);
