import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Button } from '../components/Button';
import { CreateEventModal } from '../components/CreateEventModal';

const HomePage = () => {
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false);

  return (
    <div className="min-h-screen bg-orange-50">
      <Navbar />
      <main className="pt-16 p-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-orange-600 mb-8">Welcome to 6AM Club</h1>
          
          {/* Create Event Button */}
          <div className="fixed bottom-8 right-8">
            <Button
              onClick={() => setIsCreateEventOpen(true)}
              className="shadow-lg"
            >
              Create Event
            </Button>
          </div>

          {/* Create Event Modal */}
          <CreateEventModal
            isOpen={isCreateEventOpen}
            onClose={() => setIsCreateEventOpen(false)}
          />
        </div>
      </main>
    </div>
  );
};

export default HomePage;