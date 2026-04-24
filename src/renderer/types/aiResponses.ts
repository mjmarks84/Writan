import { AIResponse } from './ai';

export interface RatedResponse extends AIResponse {
  rating?: 'good' | 'bad';
  tags?: string[];
}
