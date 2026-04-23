import { Modal } from '../Design/Modal';

export const ShareDialog = ({ open, onClose, link }: { open: boolean; onClose: () => void; link: string }) => (
  <Modal open={open} onClose={onClose}>
    <h3 style={{ marginTop: 0 }}>Share Project</h3>
    <input readOnly value={link} style={{ width: '100%' }} />
  </Modal>
);
