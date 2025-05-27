import React, { useState } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  username: string;
  email: string;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  username,
  email,
}) => {
  const [poapAddress, setPoapAddress] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const { uid } = useSelector((state: RootState) => state.auth);

  const handleSave = async () => {
    if (!uid) return;
    
    setIsSaving(true);
    try {
      const userRef = doc(db, 'users', uid);
      await updateDoc(userRef, {
        poapAddress
      });
      onClose();
    } catch (error) {
      console.error('Error saving POAP address:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-orange-600">Settings</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-orange-600 mb-1">
              Username
            </label>
            <input
              type="text"
              value={username}
              disabled
              className="w-full bg-gray-100 border-2 border-orange-200 rounded-lg px-4 py-2 text-gray-600"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-orange-600 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              disabled
              className="w-full bg-gray-100 border-2 border-orange-200 rounded-lg px-4 py-2 text-gray-600"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-orange-600 mb-1">
              POAP EVM Address
            </label>
            <input
              type="text"
              value={poapAddress}
              onChange={(e) => setPoapAddress(e.target.value)}
              placeholder="Enter your POAP EVM address"
              className="w-full bg-white/50 border-2 border-orange-300 rounded-lg px-4 py-2 text-orange-600 placeholder-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};