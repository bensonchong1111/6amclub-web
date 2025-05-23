interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black/80"
        onClick={onClose}
      />
      <div className="relative bg-gray-900 p-8 rounded-xl border-2 border-green-500 w-full max-w-md">
        {children}
      </div>
    </div>
  );
};