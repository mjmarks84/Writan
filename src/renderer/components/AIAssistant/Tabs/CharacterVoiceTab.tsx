import { FormEvent, useState } from 'react';
import { useAIDialogue } from '../../../hooks/useAIDialogue';

export const CharacterVoiceTab = () => {
  const { generateDialogue, loading, history } = useAIDialogue();
  const [character, setCharacter] = useState('Protagonist');
  const [scene, setScene] = useState('');

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await generateDialogue(character, scene);
  };

  return (
    <section>
      <h3>Character Voice</h3>
      <form onSubmit={onSubmit}>
        <input value={character} onChange={(e) => setCharacter(e.target.value)} placeholder="Character" />
        <textarea value={scene} onChange={(e) => setScene(e.target.value)} placeholder="Scene context" />
        <button type="submit" disabled={loading}>Generate Dialogue</button>
      </form>
      <ul>{history.slice(0, 3).map((item) => <li key={item.requestId}>{item.content}</li>)}</ul>
    </section>
  );
};
