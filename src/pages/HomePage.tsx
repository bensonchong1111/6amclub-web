import React from 'react';
import { Navbar } from '../components/Navbar';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-orange-50">
      <Navbar />
      <main className="pt-16 p-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-orange-600 mb-8">Welcome to 6AM Club</h1>
          {/* Add more content here */}
        </div>
      </main>
    </div>
  );
};

export default HomePage;