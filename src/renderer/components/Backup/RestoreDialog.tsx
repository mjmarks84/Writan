import { Modal } from '../Design/Modal';

export const RestoreDialog = ({ open, onClose, backupId }: { open: boolean; onClose: () => void; backupId: string }) => (
  <Modal open={open} onClose={onClose}>
    <h3 style={{ marginTop: 0 }}>Restore Backup</h3>
    <p>Restore snapshot: {backupId}</p>
  </Modal>
);
