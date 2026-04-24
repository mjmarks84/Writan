import { DEFAULT_AI_SETTINGS } from '../../shared/constants';
import { AIConnectionStatus, AIResponse, AISettings } from '../types/ai';

export interface AIState {
  settings: AISettings;
  loading: boolean;
  error: string | null;
  connectionStatus: AIConnectionStatus[];
  history: AIResponse[];
}

type Listener = (state: AIState) => void;
type StateUpdate = Partial<AIState> | ((current: AIState) => Partial<AIState>);

class SimpleAIStore {
  private state: AIState = {
    settings: DEFAULT_AI_SETTINGS,
    loading: false,
    error: null,
    connectionStatus: [],
    history: []
  };

  private listeners = new Set<Listener>();

  getState(): AIState {
    return this.state;
  }

  setState(update: StateUpdate): void {
    const partial = typeof update === 'function' ? update(this.state) : update;
    this.state = { ...this.state, ...partial };
    this.listeners.forEach((listener) => listener(this.state));
  }

  subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
}

export const aiStore = new SimpleAIStore();
