import type { DocumentItem, Version } from '../../shared/types';

async function invoke<T>(channel: string, ...args: unknown[]): Promise<T> {
  const response = await window.writan.invoke<T>(channel, ...args);
  if (!response.ok || response.data === undefined) throw new Error(response.error ?? `${channel} failed`);
  return response.data;
}

export const versionService = {
  list(documentId: string): Promise<Version[]> {
    return invoke<Version[]>('version:list', documentId);
  },
  recover(versionId: string): Promise<DocumentItem> {
    return invoke<DocumentItem>('version:recover', versionId);
  },
};
