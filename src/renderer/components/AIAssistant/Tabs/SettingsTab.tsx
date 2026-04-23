import { FormEvent, useState } from 'react';
import { useAISettings } from '../../../hooks/useAISettings';
import { AI_PROVIDER_OPTIONS } from '../../../types/aiProviders';

export const SettingsTab = () => {
  const { settings, saveSettings, testConnection, loading } = useAISettings();
  const [provider, setProvider] = useState(settings.selectedProvider);
  const [model, setModel] = useState(settings.selectedModel);
  const [result, setResult] = useState('');

  const onSave = async (event: FormEvent) => {
    event.preventDefault();
    await saveSettings({ ...settings, selectedProvider: provider, selectedModel: model });
    setResult('Saved');
  };

  const onTest = async () => {
    const endpoint = settings.endpoints[provider];
    const response = (await testConnection(endpoint)) as { reachable: boolean };
    setResult(response.reachable ? 'Connection looks valid.' : 'Connection failed.');
  };

  return (
    <section>
      <h3>Settings</h3>
      <form onSubmit={onSave}>
        <label>
          Provider
          <select value={provider} onChange={(e) => setProvider(e.target.value as typeof provider)}>
            {AI_PROVIDER_OPTIONS.map((option) => (
              <option key={option.id} value={option.id}>{option.label}</option>
            ))}
          </select>
        </label>
        <label>
          Model
          <input value={model} onChange={(e) => setModel(e.target.value)} />
        </label>
        <button type="submit" disabled={loading}>Save</button>
        <button type="button" onClick={onTest} disabled={loading}>Test Connection</button>
      </form>
      <p>{result}</p>
    </section>
  );
};
