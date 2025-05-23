import { Provider } from 'react-redux';
import { store } from './store';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-black text-green-400">
        <LandingPage />
      </div>
    </Provider>
  );
}