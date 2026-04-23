export type DatabaseResetMode = 'soft' | 'hard';

export interface DatabaseHealthResult {
  ok: boolean;
  message: string;
}

export interface MigrationStatus {
  id: string;
  executedAt: string;
}
