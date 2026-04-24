import { FormEvent, useState } from 'react';
import { useAI } from '../../../hooks/useAI';
import { aiContextService } from '../../../services/aiContextService';

export const PromptsTab = () => {
  const { run, api, loading, history } = useAI();
  const [seed, setSeed] = useState('fantasy intrigue');

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await run(
      {
        type: 'prompt',
        prompt: `Generate 5 creative writing prompts inspired by: ${seed}`,
        context: aiContextService.fromEditor('')
      },
      api.generatePrompt
    );
  };

  return (
    <section>
      <h3>Prompts</h3>
      <form onSubmit={onSubmit}>
        <input value={seed} onChange={(e) => setSeed(e.target.value)} placeholder="Genre / theme" />
        <button type="submit" disabled={loading}>Generate Prompts</button>
      </form>
      <ul>{history.slice(0, 3).map((item) => <li key={item.requestId}>{item.content}</li>)}</ul>
    </section>
  );
};
