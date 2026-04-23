import type { Collaborator } from '../../shared/types';

export const createShareLink = (projectId: string, permission: Collaborator['permission']): string => {
  const token = Buffer.from(`${projectId}:${permission}:${Date.now()}`).toString('base64url');
  return `writan://share/${token}`;
};
