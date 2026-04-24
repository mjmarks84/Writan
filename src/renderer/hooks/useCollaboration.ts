import { useCallback, useState } from 'react';
import { createShareLink } from '../services/collaborationService';

export const useCollaboration = (projectId: string) => {
  const [shareLink, setShareLink] = useState('');

  const createLink = useCallback(
    (permission: 'view' | 'comment' | 'edit') => setShareLink(createShareLink(projectId, permission)),
    [projectId]
  );

  return { shareLink, createLink };
};
