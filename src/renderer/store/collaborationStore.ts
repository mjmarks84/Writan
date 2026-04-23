import type { Collaborator } from '../../shared/types';

export interface CollaborationState {
  collaborators: Collaborator[];
}

export const collaborationStore: CollaborationState = {
  collaborators: []
};
