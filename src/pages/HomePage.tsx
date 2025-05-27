import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Button } from '../components/Button';
import { CreateEventModal } from '../components/CreateEventModal';
import { EventCard } from '../components/EventCard';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

interface Event {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  currency: string;
  joiningFee: number;
  hostName: string;
}

const HomePage = () => {
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'events'), orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const eventsData: Event[] = [];
      querySnapshot.forEach((doc) => {
        eventsData.push({ id: doc.id, ...doc.data() } as Event);
      });
      setEvents(eventsData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-orange-50">
      <Navbar />
      <main className="pt-16 p-4">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {events.map((event) => (
              <EventCard
                key={event.id}
                name={event.name}
                startDate={event.startDate}
                endDate={event.endDate}
                currency={event.currency}
                joiningFee={event.joiningFee}
                hostName={event.hostName}
              />
            ))}
          </div>

          <div className="fixed bottom-8 right-8">
            <Button
              onClick={() => setIsCreateEventOpen(true)}
              className="shadow-lg"
            >
              Create Event
            </Button>
          </div>

          <CreateEventModal
            isOpen={isCreateEventOpen}
            onClose={() => setIsCreateEventOpen(false)}
            onEventCreated={() => {}}
          />
        </div>
      </main>
    </div>
  );
};

export default HomePage;