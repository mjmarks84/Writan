import { FormEvent, useState } from 'react';
import { useAISuggestions } from '../../../hooks/useAISuggestions';

export const SuggestionsTab = () => {
  const { getSuggestions, loading, history } = useAISuggestions();
  const [text, setText] = useState('');

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await getSuggestions(text);
  };

  return (
    <section>
      <h3>Suggestions</h3>
      <form onSubmit={onSubmit}>
        <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Paste current scene" />
        <button type="submit" disabled={loading}>Suggest</button>
      </form>
      <ul>{history.slice(0, 3).map((item) => <li key={item.requestId}>{item.content}</li>)}</ul>
    </section>
  );
};
