import { FormEvent, useState } from 'react';
import { useAIBrainstorm } from '../../../hooks/useAIBrainstorm';

export const BrainstormTab = () => {
  const { brainstorm, loading, history } = useAIBrainstorm();
  const [topic, setTopic] = useState('');

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!topic.trim()) return;
    await brainstorm(topic, '');
  };

  return (
    <section>
      <h3>Brainstorm</h3>
      <form onSubmit={onSubmit}>
        <input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="Topic or challenge" />
        <button type="submit" disabled={loading}>Generate</button>
      </form>
      <ul aria-label="Brainstorm results">
        {history.slice(0, 5).map((item) => (
          <li key={item.requestId}>{item.content}</li>
        ))}
      </ul>
    </section>
  );
};
