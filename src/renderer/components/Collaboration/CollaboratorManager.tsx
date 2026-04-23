import type { Collaborator } from '../../../shared/types';

export const CollaboratorManager = ({ collaborators }: { collaborators: Collaborator[] }) => (
  <section className="card">
    <h3 style={{ marginTop: 0 }}>Collaborators</h3>
    <ul style={{ margin: 0, paddingLeft: 18 }}>
      {collaborators.map((c) => <li key={c.id}>{c.name} ({c.permission})</li>)}
    </ul>
  </section>
);
