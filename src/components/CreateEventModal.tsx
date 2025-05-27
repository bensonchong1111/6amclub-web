import React, { useState } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateEventModal: React.FC<CreateEventModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [eventName, setEventName] = useState('');
  const [joiningFee, setJoiningFee] = useState('');
  const [currency, setCurrency] = useState('USDC');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [checkInStartTime, setCheckInStartTime] = useState('');
  const [checkInEndTime, setCheckInEndTime] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle event creation logic here
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-2xl font-bold text-orange-600">Create New Event</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-orange-600 mb-1">
              Event Name
            </label>
            <input
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              className="w-full bg-white/50 border-2 border-orange-300 rounded-lg px-4 py-2 text-orange-600 placeholder-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-orange-600 mb-1">
                Joining Fee
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={joiningFee}
                onChange={(e) => setJoiningFee(e.target.value)}
                className="w-full bg-white/50 border-2 border-orange-300 rounded-lg px-4 py-2 text-orange-600 placeholder-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                required
              />
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-orange-600 mb-1">
                Currency
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full bg-white/50 border-2 border-orange-300 rounded-lg px-4 py-2 text-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
                required
              >
                <option value="USDC">USDC</option>
                <option value="USDT">USDT</option>
              </select>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-orange-600 mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full bg-white/50 border-2 border-orange-300 rounded-lg px-4 py-2 text-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
                required
              />
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-orange-600 mb-1">
                End Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full bg-white/50 border-2 border-orange-300 rounded-lg px-4 py-2 text-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
                required
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-orange-600 mb-1">
                Check-in Start Time
              </label>
              <input
                type="time"
                value={checkInStartTime}
                onChange={(e) => setCheckInStartTime(e.target.value)}
                className="w-full bg-white/50 border-2 border-orange-300 rounded-lg px-4 py-2 text-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
                required
              />
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-orange-600 mb-1">
                Check-in End Time
              </label>
              <input
                type="time"
                value={checkInEndTime}
                onChange={(e) => setCheckInEndTime(e.target.value)}
                className="w-full bg-white/50 border-2 border-orange-300 rounded-lg px-4 py-2 text-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
                required
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit">
            Create Event
          </Button>
        </div>
      </form>
    </Modal>
  );
};