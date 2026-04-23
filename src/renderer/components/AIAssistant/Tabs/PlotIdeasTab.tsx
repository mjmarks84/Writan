import { FormEvent, useState } from 'react';
import { useAIPlots } from '../../../hooks/useAIPlots';

export const PlotIdeasTab = () => {
  const { generatePlotIdea, loading, history } = useAIPlots();
  const [context, setContext] = useState('');

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await generatePlotIdea(context);
  };

  return (
    <section>
      <h3>Plot Ideas</h3>
      <form onSubmit={onSubmit}>
        <textarea value={context} onChange={(e) => setContext(e.target.value)} placeholder="Current plot state" />
        <button type="submit" disabled={loading}>Generate Plot Ideas</button>
      </form>
      <ul>{history.slice(0, 3).map((item) => <li key={item.requestId}>{item.content}</li>)}</ul>
    </section>
  );
};
