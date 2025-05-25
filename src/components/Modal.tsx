import React from 'react';

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
        className="absolute inset-0 bg-orange-100/30 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative glass-effect p-8 rounded-2xl w-full max-w-md">
        {children}
      </div>
    </div>
  );
};