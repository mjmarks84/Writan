import { Modal } from '../Design/Modal';

export const InstallPluginDialog = ({ open, onClose, pluginName }: { open: boolean; onClose: () => void; pluginName: string }) => (
  <Modal open={open} onClose={onClose}>
    <h3 style={{ marginTop: 0 }}>Install Plugin</h3>
    <p>Install {pluginName}?</p>
  </Modal>
);
