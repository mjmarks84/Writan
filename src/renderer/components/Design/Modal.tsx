import type { PropsWithChildren } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
}

export const Modal = ({ open, onClose, children }: PropsWithChildren<Props>) => {
  if (!open) return null;

  return (
    <div role="dialog" aria-modal="true" onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.45)', display: 'grid', placeItems: 'center' }}>
      <div className="card" onClick={(event) => event.stopPropagation()} style={{ minWidth: 320, animation: 'slideUp 180ms ease' }}>
        {children}
      </div>
    </div>
  );
};
