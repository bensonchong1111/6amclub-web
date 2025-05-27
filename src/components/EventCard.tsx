import React from 'react';

interface EventCardProps {
  name: string;
  startDate: string;
  endDate: string;
  currency: string;
  joiningFee: number;
  hostName: string;
}

export const EventCard: React.FC<EventCardProps> = ({
  name,
  startDate,
  endDate,
  currency,
  joiningFee,
  hostName,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <h3 className="text-xl font-bold text-orange-600 mb-2">{name}</h3>
        
        <div className="space-y-2 text-gray-600">
          <div className="flex justify-between">
            <span className="text-sm">Start Date:</span>
            <span className="font-medium">{new Date(startDate).toLocaleDateString()}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-sm">End Date:</span>
            <span className="font-medium">{new Date(endDate).toLocaleDateString()}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-sm">Joining Fee:</span>
            <span className="font-medium">{joiningFee} {currency}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-sm">Host:</span>
            <span className="font-medium">{hostName}</span>
          </div>
        </div>
      </div>
    </div>
  );
};