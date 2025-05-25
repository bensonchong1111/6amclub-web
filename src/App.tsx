import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-orange-50 text-orange-600">
        <LandingPage />
      </div>
    </Provider>
  );
}

export default App;